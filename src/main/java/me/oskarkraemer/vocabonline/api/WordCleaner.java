package me.oskarkraemer.vocabonline.api;

public class WordCleaner {
    public static String reduceDown(String english_word) {
        return english_word
                .replace("to ", "")
                .replace(" sb/sth", "")
                .replaceAll("\\([^(]*\\)", "") //Remove everything inside parentheses i.e. (doing)
                .replace(" sth", "")
                .replace(" of", "")
                .replace(" doing ", "")
                .replace(" sb", "")
                .replace("/", "")
                .split(",")[0];
    }
}
