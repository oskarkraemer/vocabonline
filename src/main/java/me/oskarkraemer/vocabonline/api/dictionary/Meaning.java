package me.oskarkraemer.vocabonline.api.dictionary;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Meaning {
    @JsonProperty
    public String partOfSpeech;

    @JsonProperty
    public List<Definition> definitions;

    @JsonProperty
    public List<String> synonyms;

    @JsonProperty
    public List<String> antonyms;
}
