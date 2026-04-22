export interface LexisDictionaryResponse {
    cefrLevel: string;
    pronunciation: string;
    definitions: Definition[];
    synonyms: Synonym[];
    collocations: string[];
}

export interface Definition {
    partOfSpeech: string;
    context: string;
    exampleEn: string;
    exampleVi: string;
}

export interface Synonym {
    word: string;
    meaningVi: string;
}