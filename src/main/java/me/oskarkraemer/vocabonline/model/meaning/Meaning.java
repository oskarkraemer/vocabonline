package me.oskarkraemer.vocabonline.model.meaning;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.oskarkraemer.vocabonline.api.bht.BhtAPI;
import me.oskarkraemer.vocabonline.api.dictionary.Definition;
import me.oskarkraemer.vocabonline.model.translation.Translation;

import java.util.List;
import java.util.Optional;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "meaning")
public class Meaning {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="translation_id")
    @JsonIgnore
    private Translation translation;

    @Column(nullable = false)
    @JsonProperty
    public String partOfSpeech;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "meaning", cascade = CascadeType.ALL, orphanRemoval = true)
    @Column
    @JsonProperty
    public List<Definition> definitions;

    @Column
    @JsonProperty
    public List<String> synonyms;

    @Column
    @JsonProperty
    public List<String> antonyms;

}
