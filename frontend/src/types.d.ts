export type List = {
    id: number;
    name: string;
    translation_amount: number;
    created: Date;
}

type Meaning = {
    id: number;
    translation_id: number;
    partOfSpeech: string;

    synonyms: string[];
    antonyms: string[];
    definition: string[];
}

type Translation = {
    id: number;
    english: string;
    german: string;
    wordList: List;
    meanings: Meaning[];
  }