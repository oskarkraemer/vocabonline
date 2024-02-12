package me.oskarkraemer.vocabonline.model.importer;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.SneakyThrows;
import me.oskarkraemer.vocabonline.api.MeaningFactory;
import me.oskarkraemer.vocabonline.api.dictionary.DictionaryAPI;
import me.oskarkraemer.vocabonline.api.dictionary.DictionaryAPIResult;
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
import java.util.Optional;

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

    @SneakyThrows
    public HttpStatus importPDF(String list_name, PDFParser pdfParser, byte[] pdf_data) {
        List<Translation> parsedTranslations;

        try {
            parsedTranslations = pdfParser.parsePDF(pdf_data);
        }
        catch (Exception e) {
            System.out.println("Exception in importPDF: " + e);
            return HttpStatus.UNPROCESSABLE_ENTITY;
        }

        if(parsedTranslations != null) {
            return importTranslations(list_name, parsedTranslations);
        } else {
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

            //Set phonetics
            System.out.println("before dict");
            Optional<DictionaryAPIResult> resultDict = DictionaryAPI.getEntry(t.getEnglish());
            System.out.println("after dict");

            if(resultDict.isPresent() && !resultDict.get().phonetics.isEmpty()) {
                t.setIpa(resultDict.get().phonetics.get(0).text);
                t.setAudio_url(resultDict.get().phonetics.get(0).audio);
                System.out.println(t.getAudio_url());
            }

            System.out.println("before meanign fdatory");
            List<Meaning> m = MeaningFactory.createFor(t, bhtKey, resultDict);
            System.out.println("After menaing factory");
            if(m != null) {
                meanings.addAll(m);
                t.setMeanings(m);
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
