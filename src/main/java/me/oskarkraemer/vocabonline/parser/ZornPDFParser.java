package me.oskarkraemer.vocabonline.parser;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import me.oskarkraemer.vocabonline.model.translation.Translation;
import org.apache.pdfbox.pdmodel.PDDocument;
import technology.tabula.*;
import technology.tabula.extractors.SpreadsheetExtractionAlgorithm;

public class ZornPDFParser {
    public static List<Translation> parsePDFPath(String path) {
        //return parsePDF(new File(path).get);
        return new ArrayList<Translation>();
    }

    public static List<Translation> parsePDF(byte[] pdf_data) {
        List<Translation> translations = new ArrayList<>();

        try (PDDocument document = PDDocument.load(pdf_data)) {
            SpreadsheetExtractionAlgorithm sea = new SpreadsheetExtractionAlgorithm();
            PageIterator pi = new ObjectExtractor(document).extract();
            while (pi.hasNext()) {
                // iterate over the pages of the document
                Page page = pi.next();
                List<Table> table = sea.extract(page);
                // iterate over the tables of the page
                for(Table tables: table) {
                    List<List<RectangularTextContainer>> rows = tables.getRows();
                    // iterate over the rows of the table
                    for (int i = 1; i < rows.size(); i++) {
                        List<RectangularTextContainer> cells = rows.get(i);

                        String[] english = cells.get(0).getText()
                                .replace("\r", "")
                                .replace("\n", "")
                                .split("→ | ↔ ");

                        String[] german = cells.get(1).getText()
                                .replace("\r", "")
                                .replace("\n", "")
                                .split("→ | ↔ ");

                        if(german.length != english.length) {
                            System.out.println("UNEQUAL LENGTH AT: " + german[0]);
                        }

                        for(int j = 0; j < english.length; j++) {
                            Translation translation = new Translation();
                            translation.setEnglish(english[j]);

                            if(german.length > j) {
                                translation.setGerman(german[j]);

                                translations.add(translation);
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.out.println(e);
        }

        for(Translation translation: translations) {
            System.out.println("English: " + translation.getEnglish());
            System.out.println("German: " + translation.getGerman());
            System.out.println();
        }

        return translations;
    }
}
