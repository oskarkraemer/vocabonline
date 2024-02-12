import { WordStat } from "./word_stats";

export function getCorrectTotal(wordStatsDiff: WordStat[]) {
    return wordStatsDiff.filter(stat => !stat.incorrect).length;
  }

export function getWrongTotal(wordStatsDiff: WordStat[]) {
    let wrongTotal = 0;
    wordStatsDiff.forEach(stat => {
        wrongTotal += stat.incorrect;
    });

    return wrongTotal;
}

export function getCorrectPerc(wordStatsDiff: WordStat[]) {
    const correctTotal = getCorrectTotal(wordStatsDiff);
    const wrongTotal = getWrongTotal(wordStatsDiff);
    return correctTotal/(correctTotal + wrongTotal) * 100;
}