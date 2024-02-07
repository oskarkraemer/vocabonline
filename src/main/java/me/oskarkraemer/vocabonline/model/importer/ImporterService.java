package me.oskarkraemer.vocabonline.model.importer;
import me.oskarkraemer.vocabonline.model.list.WordList;
import me.oskarkraemer.vocabonline.model.list.WordListRepository;
import me.oskarkraemer.vocabonline.model.translation.Translation;
import me.oskarkraemer.vocabonline.model.translation.TranslationRepository;
import me.oskarkraemer.vocabonline.parser.ZornPDFParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class ImporterService {
    @Autowired
    private WordListRepository wordListRepository;

    @Autowired
    private TranslationRepository translationRepository;

    public HttpStatus zornPDF(String list_name, byte[] pdf_data) {
        try {
            java.util.List<Translation> parsedTranslations = ZornPDFParser.parsePDF(pdf_data);

            //Create new List
            WordList newWordList = new WordList();
            newWordList.setName(list_name);
            newWordList.setTranslation_amount(parsedTranslations.size());

            //Assign new translation to List
            for(int i = 0; i < parsedTranslations.size(); i++) {
                Translation t = parsedTranslations.get(i);
                t.setWordList(newWordList);

                String[] synonyms = {};
                t.setSynonyms(synonyms);

                parsedTranslations.set(i, t);
            }

            //Save both
            wordListRepository.save(newWordList);
            translationRepository.saveAllAndFlush(parsedTranslations);

        } catch (Exception e) {
            return HttpStatus.UNPROCESSABLE_ENTITY;
        }

        return HttpStatus.OK;
    }
}
