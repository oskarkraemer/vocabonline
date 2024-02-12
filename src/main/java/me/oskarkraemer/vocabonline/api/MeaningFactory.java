package me.oskarkraemer.vocabonline.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import me.oskarkraemer.vocabonline.api.bht.BhtAPI;
import me.oskarkraemer.vocabonline.api.dictionary.Definition;
import me.oskarkraemer.vocabonline.api.dictionary.DictionaryAPI;
import me.oskarkraemer.vocabonline.api.dictionary.DictionaryAPIResult;
import me.oskarkraemer.vocabonline.model.meaning.Meaning;
import me.oskarkraemer.vocabonline.model.translation.Translation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class MeaningFactory {

    private static void setDefinitionReference(List<Meaning> meanings) {
        for(int i = 0; i < meanings.size(); i++) {
            Meaning meaning = meanings.get(i);
            if(meaning.definitions == null) continue;

            List<Definition> newDefinitions = new ArrayList<>();

            for(int y = 0; y < meaning.definitions.size(); y++) {
                Definition definition = meaning.definitions.get(y);
                definition.setMeaning(meaning);
                newDefinitions.add(definition);
            }

            meaning.definitions = newDefinitions;
            meanings.set(i, meaning);
        }
    }

    public static List<Meaning> createFor(Translation refrenced_translation, String bhtKey) throws JsonProcessingException {
        return createFor(refrenced_translation, bhtKey, DictionaryAPI.getEntry(refrenced_translation.getEnglish()));
    }
    public static List<Meaning> createFor(Translation refrenced_translation, String bhtKey, Optional<DictionaryAPIResult> resultDict) throws JsonProcessingException {
        if(refrenced_translation.getEnglish().isEmpty()) throw new IllegalStateException("The english definition has to be set in order for synonyms to be loaded");

        Optional<DictionaryAPIResult> resultBht = BhtAPI.getEntry(refrenced_translation.getEnglish(), bhtKey);

        List<Meaning> meanings = null;

        ObjectMapper mapper = new ObjectMapper();
        if(resultBht.isPresent()) {
            System.out.println(mapper.writeValueAsString(resultBht.get()));
            System.out.println();

            meanings = resultBht.get().meanings;
        }

        if(resultDict.isPresent()) {
            System.out.println(mapper.writeValueAsString(resultDict.get()));
            if(resultBht.isEmpty()) {
                meanings = resultDict.get().meanings;
            }
            else {
                List<Meaning> filledMeanings = new ArrayList<>();
                for (Meaning meaning : resultDict.get().meanings) {
                    for (Meaning bhtMeaning : meanings) {
                        if (meaning.partOfSpeech.equals(bhtMeaning.partOfSpeech)) {
                            bhtMeaning.setTranslation(refrenced_translation);

                            bhtMeaning.setDefinitions(meaning.definitions);
                            filledMeanings.add(bhtMeaning);
                        }
                    }
                }

                setDefinitionReference(filledMeanings);

                return filledMeanings;
            }
        }

        if(meanings == null)
            return null;

        for(Meaning meaning : meanings) {
            meaning.setTranslation(refrenced_translation);
        }

        setDefinitionReference(meanings);

        return meanings;
    }
}
