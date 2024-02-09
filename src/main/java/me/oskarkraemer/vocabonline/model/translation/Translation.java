package me.oskarkraemer.vocabonline.model.translation;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.oskarkraemer.vocabonline.api.bht.BhtAPI;
import me.oskarkraemer.vocabonline.api.dictionary.DictionaryAPIResult;
import me.oskarkraemer.vocabonline.model.list.WordList;
import org.hibernate.annotations.CreationTimestamp;

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

    @ManyToOne(cascade = CascadeType.REMOVE)
    private WordList wordList;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(columnDefinition = "timestamptz default now()")
    private Date created;

    public void loadSynonyms(String bhtKey) throws JsonProcessingException {
        if(english.isEmpty()) throw new IllegalStateException("The english definition has to be set in order for synonyms to be loaded");

        Optional<DictionaryAPIResult> result = BhtAPI.getEntry(this.english, bhtKey);

        if(result.isEmpty()) {
            System.out.println("no snys found for: " + this.english);
            return;
        }

        ObjectMapper mapper = new ObjectMapper();

        System.out.println(mapper.writeValueAsString(result.get()));
        System.out.println();

    }
}
