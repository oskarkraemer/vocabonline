package me.oskarkraemer.vocabonline.model.importer;
import me.oskarkraemer.vocabonline.model.list.List;
import me.oskarkraemer.vocabonline.model.list.ListRepository;
import me.oskarkraemer.vocabonline.model.translation.Translation;
import me.oskarkraemer.vocabonline.model.translation.TranslationRepository;
import me.oskarkraemer.vocabonline.parser.ZornPDFParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class ImporterService {
    @Autowired
    private ListRepository listRepository;

    @Autowired
    private TranslationRepository translationRepository;

    public HttpStatus zornPDF(String list_name, byte[] pdf_data) {
        try {
            java.util.List<Translation> parsedTranslations = ZornPDFParser.parsePDF(pdf_data);

            //Create new List
            List newList = new List();
            newList.setName(list_name);
            newList.setTranslation_amount(parsedTranslations.size());

            //Assign new translation to List
            for(int i = 0; i < parsedTranslations.size(); i++) {
                Translation t = parsedTranslations.get(i);
                t.setList(newList);

                String[] synonyms = {};
                t.setSynonyms(synonyms);

                parsedTranslations.set(i, t);
            }

            //Save both
            listRepository.save(newList);
            translationRepository.saveAllAndFlush(parsedTranslations);

        } catch (Exception e) {
            return HttpStatus.UNPROCESSABLE_ENTITY;
        }

        return HttpStatus.OK;
    }
}
