package me.oskarkraemer.vocabonline.api.dictionary;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Definition {
    @JsonProperty
    public String definition;

    @JsonProperty
    public String example;

    @JsonProperty
    public List<String> synonyms;

    @JsonProperty
    public List<String> antonyms;

}