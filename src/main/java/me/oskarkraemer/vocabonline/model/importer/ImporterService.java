package me.oskarkraemer.vocabonline.model.importer;
import me.oskarkraemer.vocabonline.model.list.WordList;
import me.oskarkraemer.vocabonline.model.list.WordListRepository;
import me.oskarkraemer.vocabonline.model.translation.Translation;
import me.oskarkraemer.vocabonline.model.translation.TranslationRepository;
import me.oskarkraemer.vocabonline.parser.PDFParser;
import me.oskarkraemer.vocabonline.parser.ZornPDFParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImporterService {
    @Autowired
    private WordListRepository wordListRepository;

    @Autowired
    private TranslationRepository translationRepository;

    public HttpStatus importPDF(String list_name, PDFParser pdfParser, byte[] pdf_data) {
        try {
            List<Translation> parsedTranslations = pdfParser.parsePDF(pdf_data);

            return importTranslations(list_name, parsedTranslations);
        }
        catch (Exception e) {
            return HttpStatus.UNPROCESSABLE_ENTITY;
        }
    }

    HttpStatus importTranslations(String list_name, List<Translation> translations) {
        if(translations.isEmpty()) return HttpStatus.UNPROCESSABLE_ENTITY;

        try {
            //Create new List
            WordList newWordList = new WordList();
            newWordList.setName(list_name);
            newWordList.setTranslation_amount(translations.size());

            //Assign new translation to List
            for(int i = 0; i < translations.size(); i++) {
                Translation t = translations.get(i);
                t.setWordList(newWordList);

                String[] synonyms = {};
                t.setSynonyms(synonyms);

                translations.set(i, t);
            }

            //Save both
            wordListRepository.save(newWordList);
            translationRepository.saveAllAndFlush(translations);

        } catch (Exception e) {
            return HttpStatus.UNPROCESSABLE_ENTITY;
        }

        return HttpStatus.OK;
    }
}
