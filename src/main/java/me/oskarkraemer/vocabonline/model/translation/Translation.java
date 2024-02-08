package me.oskarkraemer.vocabonline.model.translation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.oskarkraemer.vocabonline.api.dictionary.DictionaryAPI;
import me.oskarkraemer.vocabonline.api.dictionary.DictionaryAPIResult;
import me.oskarkraemer.vocabonline.api.dictionary.Meaning;
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

    @Column(nullable = false)
    private String[] synonyms;

    @ManyToOne(cascade = CascadeType.REMOVE)
    private WordList wordList;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(columnDefinition = "timestamptz default now()")
    private Date created;

    public void loadSynonyms() {
        if(english.isEmpty()) throw new IllegalStateException("The english definition has to be set in order for synonyms to be loaded");

        //clean translation
        final String cleaned_english = this.english
                .replace("to ", "")
                .replace(" sth", "")
                .replace(" of", "")
                .replace(" doing ", "")
                .replace(" sb ", "")
                .replace("/", "")
                .split(",")[0];

        System.out.println(cleaned_english);

        Optional<DictionaryAPIResult> result = DictionaryAPI.getEntry(cleaned_english);
        if(result.isEmpty()) {
            System.out.println("no snys found - setting syns to empty.");
            String[] synonyms = {};
            this.setSynonyms(synonyms);
            return;
        }

        final boolean isVerb = this.english.startsWith("to");

        for(Meaning meaning: result.get().meanings) {
            if(isVerb && meaning.partOfSpeech != null && meaning.partOfSpeech.equals("verb")) {
                this.setSynonyms(meaning.synonyms.toArray(new String[0]));
            }
            else if (!isVerb) {
                String[] currentSynonyms = this.getSynonyms();
                if(currentSynonyms == null) {
                    currentSynonyms = new String[0];
                }

                Set<String> mergedSynonyms = new HashSet<>(Arrays.asList(currentSynonyms));
                mergedSynonyms.addAll(meaning.synonyms);

                this.setSynonyms(mergedSynonyms.toArray(String[]::new));
            }
        }
    }
}
