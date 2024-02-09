package me.oskarkraemer.vocabonline.api.dictionary;

import com.fasterxml.jackson.annotation.JsonProperty;
import me.oskarkraemer.vocabonline.model.meaning.Meaning;

import java.util.ArrayList;
import java.util.List;

public class DictionaryAPIResult
{
    @JsonProperty
    public String word;

    @JsonProperty
    public Phonetics[] phonetics;

    @JsonProperty
    public List<Meaning> meanings = new ArrayList<>();
}
