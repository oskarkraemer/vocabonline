package me.oskarkraemer.vocabonline.api.bht;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import me.oskarkraemer.vocabonline.api.WordCleaner;
import me.oskarkraemer.vocabonline.api.dictionary.DictionaryAPIResult;
import me.oskarkraemer.vocabonline.model.meaning.Meaning;
import org.springframework.http.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.*;
import java.util.Map.Entry;

public class BhtAPI {
    static final String BASE_URL = "https://words.bighugelabs.com/api/2/%s/%s/json";

    static final ObjectMapper mapper = new ObjectMapper();
    static final ObjectReader listReader = mapper.readerFor(new TypeReference<List<String>>() {});

    private static Meaning getSynsAndAnts(JsonNode parentNode) {
        Meaning meaning = new Meaning();

        try {
            if(parentNode.has("syn")) {
                meaning.setSynonyms(listReader.readValue(parentNode.get("syn")));
            }
            if(parentNode.has("ant")) {
                meaning.setAntonyms(listReader.readValue(parentNode.get("ant")));
            }
        } catch (IOException e) {
            System.out.println(e);
        }

        return meaning;
    }
    private static DictionaryAPIResult filterResponse(JsonNode jsonNode, String english_word) {
        DictionaryAPIResult result = new DictionaryAPIResult();
        result.word = english_word;

        final boolean isVerb = english_word.startsWith("to");
        if(isVerb && jsonNode.has("verb")) {
            JsonNode verbNode = jsonNode.get("verb");

            Meaning meaning = getSynsAndAnts(verbNode);
            meaning.setPartOfSpeech("verb");

            result.meanings.add(meaning);
            return result;
        }
        else if(!isVerb) {
            for (Iterator<Map.Entry<String, JsonNode>> it = jsonNode.fields(); it.hasNext(); ) {
                Entry<String, JsonNode> entry = it.next();

                Meaning meaning = getSynsAndAnts(entry.getValue());
                meaning.setPartOfSpeech(entry.getKey());

                result.meanings.add(meaning);
            }
        }

        return result;
    }

    public static Optional<DictionaryAPIResult> getEntry(String english_word, String api_key) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<String> entity = new HttpEntity<>(headers);

        String result;

        try {
            ResponseEntity<String> resultEntity = restTemplate.exchange(String.format(BASE_URL, api_key, WordCleaner.reduceDown(english_word)), HttpMethod.GET, entity, String.class);
            result = resultEntity.getBody();
        } catch (HttpClientErrorException e) {
            return Optional.empty();
        }

        try {
            JsonNode jsonNode = mapper.readTree(result);
            return Optional.of(filterResponse(jsonNode, english_word));

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
