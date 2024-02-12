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
import me.oskarkraemer.vocabonline.model.meaning.Meaning;
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
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "translation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Meaning> meanings;

    @Column
    private String ipa;

    @Column
    private String audio_url;

    @JoinColumn(name = "word_list_id")
    @ManyToOne(cascade = CascadeType.REMOVE)
    private WordList wordList;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(columnDefinition = "timestamptz default now()")
    private Date created;
}
