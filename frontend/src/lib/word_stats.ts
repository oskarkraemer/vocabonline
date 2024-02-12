import { Translation } from "@/types";
import { useState, useEffect } from "react";

export type WordStat = {
    word_id: number;
    word_en: string;
    correct: number;
    incorrect: number;
}

const initialState: WordStat[] = [];

export const useWordStats = () => {
    const [wordStats, setWordStats] = useState<WordStat[]>(() => {
        const saved = localStorage.getItem("wordStats");
        return saved ? JSON.parse(saved) : initialState;
    });

    const getWordStat = (word_id: number) => {
        return wordStats.find((wordStat) => wordStat.word_id === word_id);
    }

    const isHard = (word_id: number) => {
        const wordStat = getWordStat(word_id);
        if (!wordStat) return false;

        return wordStat.incorrect * 2 > wordStat.correct;
    }

    const increaseWordStat = (word: Translation, correct: number, incorrect: number) => {
        const word_id = word.id;
        const word_en = word.english;

        setWordStats(prevStats => {
            const newWordStats = [...prevStats];
            let wordStat = newWordStats.find((wordStat) => wordStat.word_id === word_id);
            if (wordStat) {
                wordStat.correct += correct;
                wordStat.incorrect += incorrect;
                wordStat.word_en = word_en;
            } else {
                wordStat = { word_id, word_en, correct, incorrect };
                newWordStats.push(wordStat);
            }
            return newWordStats;
        });
    }

    const getWordStatsDiff = (word_stats_a: WordStat[], word_stats_b: WordStat[]) => {
        const word_stats_diff: WordStat[] = [];
        for (let i = 0; i < word_stats_a.length; i++) {
            const word_stat_a = word_stats_a[i];
            const word_stat_b = word_stats_b.find((wordStat) => wordStat.word_id === word_stat_a.word_id);
            if (!word_stat_b) {
                word_stats_diff.push(word_stat_a);
            } else {
                const correct = word_stat_a.correct - word_stat_b.correct;
                const incorrect = word_stat_a.incorrect - word_stat_b.incorrect;
                if (correct > 0 || incorrect > 0) {
                    word_stats_diff.push({ word_id: word_stat_a.word_id, word_en: word_stat_a.word_en, correct, incorrect });
                }
            }
        }
        return word_stats_diff;
    }

    useEffect(() => {
        localStorage.setItem("wordStats", JSON.stringify(wordStats));
    }, [wordStats]);

    return { getWordStat, wordStats, increaseWordStat, isHard, getWordStatsDiff };
};