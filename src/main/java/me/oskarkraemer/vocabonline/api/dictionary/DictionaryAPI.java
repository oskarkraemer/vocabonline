package me.oskarkraemer.vocabonline.api.dictionary;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import me.oskarkraemer.vocabonline.api.WordCleaner;
import org.springframework.http.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.Optional;

public class DictionaryAPI {
    static final String BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

    public static Optional<DictionaryAPIResult> getEntry(String english_word) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<String> entity = new HttpEntity<>(headers);

        String result;

        try {
            ResponseEntity<String> resultEntity = restTemplate.exchange(BASE_URL + WordCleaner.reduceDown(english_word), HttpMethod.GET, entity, String.class);
            result = resultEntity.getBody();
        } catch (HttpClientErrorException e) {
            System.out.println(e);
            return Optional.empty();
        }

        ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        try {
            return Optional.of(mapper.readValue(result, DictionaryAPIResult[].class)[0]);
        } catch (JsonProcessingException e) {
            System.out.println("json: " + e);
            return Optional.empty();
        }
    }
}