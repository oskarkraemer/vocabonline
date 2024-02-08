package me.oskarkraemer.vocabonline.parser;

import me.oskarkraemer.vocabonline.model.translation.Translation;

import java.util.List;

public interface PDFParser {
    List<Translation> parsePDF(byte[] pdf_data);
    List<Translation> parsePDFFile(String path);
}
