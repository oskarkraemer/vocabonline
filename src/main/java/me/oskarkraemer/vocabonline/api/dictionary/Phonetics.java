package me.oskarkraemer.vocabonline.api.dictionary;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Phonetics {
    @JsonProperty
    public String text;

    @JsonProperty
    public String audio;

    @JsonProperty
    public String sourceUrl;
}
