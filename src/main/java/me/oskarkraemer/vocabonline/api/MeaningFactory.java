package me.oskarkraemer.vocabonline.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import me.oskarkraemer.vocabonline.api.bht.BhtAPI;
import me.oskarkraemer.vocabonline.api.dictionary.DictionaryAPIResult;
import me.oskarkraemer.vocabonline.model.meaning.Meaning;
import me.oskarkraemer.vocabonline.model.translation.Translation;

import java.util.List;
import java.util.Optional;

public class MeaningFactory {
    public static List<Meaning> createFor(Translation refrenced_translation, String bhtKey) throws JsonProcessingException {
        if(refrenced_translation.getEnglish().isEmpty()) throw new IllegalStateException("The english definition has to be set in order for synonyms to be loaded");

        Optional<DictionaryAPIResult> result = BhtAPI.getEntry(refrenced_translation.getEnglish(), bhtKey);

        if(result.isEmpty()) {
            System.out.println("no entry found for: " + refrenced_translation.getEnglish());
            return null;
        }

        ObjectMapper mapper = new ObjectMapper();
        System.out.println(mapper.writeValueAsString(result.get()));
        System.out.println();

        List<Meaning> meanings = result.get().meanings;

        for(Meaning meaning : meanings) {
            meaning.setTranslation(refrenced_translation);
        }
        return meanings;
    }
}
