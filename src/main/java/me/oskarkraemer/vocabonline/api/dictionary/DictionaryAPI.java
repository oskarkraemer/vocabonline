package me.oskarkraemer.vocabonline.api.dictionary;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
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
        ResponseEntity<String> resultEntity = restTemplate.exchange(BASE_URL + english_word, HttpMethod.GET, entity, String.class);
        String result = resultEntity.getBody();

        System.out.println(result);

        ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        try {
            return Optional.of(mapper.readValue(result, DictionaryAPIResult[].class)[0]);
        } catch (JsonProcessingException e) {
            return Optional.empty();
        }
    }
}