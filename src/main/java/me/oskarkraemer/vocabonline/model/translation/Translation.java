package me.oskarkraemer.vocabonline.model.translation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.oskarkraemer.vocabonline.api.bht.BhtConfigProperties;
import me.oskarkraemer.vocabonline.api.dictionary.DictionaryAPI;
import me.oskarkraemer.vocabonline.api.dictionary.DictionaryAPIResult;
import me.oskarkraemer.vocabonline.api.dictionary.Meaning;
import me.oskarkraemer.vocabonline.model.list.WordList;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "translation")
public class Translation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String german;

    @Column(nullable = false)
    private String english;

    @Column(nullable = false)
    private String[] synonyms;

    @ManyToOne(cascade = CascadeType.REMOVE)
    private WordList wordList;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(columnDefinition = "timestamptz default now()")
    private Date created;

    public void loadSynonyms(String bhtKey) {
        if(english.isEmpty()) throw new IllegalStateException("The english definition has to be set in order for synonyms to be loaded");

        //clean translation
        final String cleaned_english = this.english
                .replace("to ", "")
                .replace(" sb/sth", "")
                .replaceAll("\\([^(]*\\)", "") //Remove everything inside parentheses i.e. (doing)
                .replace(" sth", "")
                .replace(" of", "")
                .replace(" doing ", "")
                .replace(" sb", "")
                .replace("/", "")
                .split(",")[0];

        System.out.println(cleaned_english);

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<String> entity = new HttpEntity<>(headers);

        String result;

        try {
            String url = "https://words.bighugelabs.com/api/2/" + bhtKey + "/" + cleaned_english + "/json";
            System.out.println(url);

            ResponseEntity<String> resultEntity = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            result = resultEntity.getBody();
        } catch (Exception e) {
            System.out.println(e);
            return;
        }

        if(result.isEmpty()) {
            System.out.println("no snys found - setting syns to empty.");
            String[] synonyms = {};
            this.setSynonyms(synonyms);
            return;
        }

        final boolean isVerb = this.english.startsWith("to");

        System.out.println(result);
        System.out.println();
    }
}
