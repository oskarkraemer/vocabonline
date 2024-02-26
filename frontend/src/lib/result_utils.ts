import { WordStat } from "./word_stats";

//Minimum score for each word
const score_in_words: { [key: number]: string } = {
    100: "perfectly 🚀",
    90: "very well",
    80: "well",
    50: "okay",
    40: "badly",
    0: "terribly",
};

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

export function getCorrectPercInWords(wordStatsDiff: WordStat[]): string {
    const score = getCorrectPerc(wordStatsDiff);

    let result = "";
    for (const key in score_in_words) {
        if (score >= parseInt(key)) {
            result = score_in_words[key];
        } else {
            break;
        }
    }

    return result;
}