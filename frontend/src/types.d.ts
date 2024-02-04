export type List = {
    id: number;
    name: string;
    translation_amount: number;
    created_at: Date;
}

type Translation = {
    id: number;
    english: string;
    german: string;
    synonyms: string[];
  }