package me.oskarkraemer.vocabonline.model.importer;
import com.fasterxml.jackson.core.JsonProcessingException;
import me.oskarkraemer.vocabonline.api.MeaningFactory;
import me.oskarkraemer.vocabonline.model.meaning.Meaning;
import me.oskarkraemer.vocabonline.model.meaning.MeaningRepository;
import me.oskarkraemer.vocabonline.model.list.WordList;
import me.oskarkraemer.vocabonline.model.list.WordListRepository;
import me.oskarkraemer.vocabonline.model.translation.Translation;
import me.oskarkraemer.vocabonline.model.translation.TranslationRepository;
import me.oskarkraemer.vocabonline.parser.PDFParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ImporterService {
    @Autowired
    private WordListRepository wordListRepository;

    @Autowired
    private TranslationRepository translationRepository;

    @Autowired
    private MeaningRepository meaningRepository;

    @Value("${bht.apiKey}")
    private String bhtKey;

    public HttpStatus importPDF(String list_name, PDFParser pdfParser, byte[] pdf_data) {
        try {
            List<Translation> parsedTranslations = pdfParser.parsePDF(pdf_data);

            return importTranslations(list_name, parsedTranslations);
        }
        catch (Exception e) {
            System.out.println("Exception in importPDF: " + e);
            return HttpStatus.UNPROCESSABLE_ENTITY;
        }
    }

    HttpStatus importTranslations(String list_name, List<Translation> translations) throws JsonProcessingException {
        if(translations.isEmpty()) return HttpStatus.UNPROCESSABLE_ENTITY;

        //Create new List
        WordList newWordList = new WordList();
        newWordList.setName(list_name);
        newWordList.setTranslation_amount(translations.size());

        //Meanings list
        List<Meaning> meanings = new ArrayList<>();

        //Assign new translation to List
        for(int i = 0; i < translations.size(); i++) {
            Translation t = translations.get(i);
            t.setWordList(newWordList);

            List<Meaning> m = MeaningFactory.createFor(t, bhtKey);
            if(m != null) {
                meanings.addAll(m);
                t.setMeanings(meanings);
            } else {
                t.setMeanings(new ArrayList<>());
            }

            translations.set(i, t);
        }

        //Save both
        wordListRepository.save(newWordList);
        translationRepository.saveAll(translations);
        meaningRepository.saveAllAndFlush(meanings);

        return HttpStatus.OK;
    }
}
