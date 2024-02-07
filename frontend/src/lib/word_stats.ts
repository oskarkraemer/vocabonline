import { useState, useEffect } from "react";

export type WordStat = {
    word_id: number;
    correct: number;
    incorrect: number;
}

const initialState: WordStat[] = [];

export const useWordStats = () => {
    const [wordStats, setWordStats] = useState<WordStat[]>(() => {
        const saved = localStorage.getItem("wordStats");
        return saved ? JSON.parse(saved) : initialState;
    });

    const increaseWordStat = (word_id: number, correct: number, incorrect: number) => {
        setWordStats(prevStats => {
            const newWordStats = [...prevStats];
            let wordStat = newWordStats.find((wordStat) => wordStat.word_id === word_id);
            if (wordStat) {
                wordStat.correct += correct;
                wordStat.incorrect += incorrect;
            } else {
                wordStat = { word_id, correct, incorrect };
                newWordStats.push(wordStat);
            }
            return newWordStats;
        });
    }

    useEffect(() => {
        localStorage.setItem("wordStats", JSON.stringify(wordStats));
    }, [wordStats]);

    return { wordStats, increaseWordStat };
};