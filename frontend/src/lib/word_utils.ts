import { Translation } from "@/types";

export function hasMeanings(translation: Translation): boolean {
    return translation.meanings.length > 0;
}

export function formatSynonyms(translation: Translation): string[] {
    if (!hasMeanings(translation)){
        return [];
    }

    let synonyms: string[] = [];
    translation.meanings.map((meaning) => {
        //add meaning.part_of_speech to every synonym

        if(meaning.synonyms != null) {
        meaning.synonyms.map((synonym) => {
            synonyms.push(meaning.partOfSpeech.substring(0, 3) + ": " + (meaning.partOfSpeech=="verb" ? "to ": "") + synonym);
        });
        }
    });

    return synonyms;
}

export function formatAntonyms(translation: Translation): string[] {
    if (!hasMeanings(translation)){
        return [];
    }

    let antonyms: string[] = [];
    translation.meanings.map((meaning) => {
        //add meaning.part_of_speech to every synonym

        if(meaning.antonyms != null) {
        meaning.antonyms.map((antonym) => {
            antonyms.push(meaning.partOfSpeech.substring(0, 3) + ": " + (meaning.partOfSpeech=="verb" ? "to ": "") + antonym);
        });
        }
    });

    return antonyms;
}