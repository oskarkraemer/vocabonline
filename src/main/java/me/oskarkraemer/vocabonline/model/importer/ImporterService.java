package me.oskarkraemer.vocabonline.model.importer;

import me.oskarkraemer.vocabonline.model.list.List;
import me.oskarkraemer.vocabonline.model.list.ListRepository;
import me.oskarkraemer.vocabonline.model.translation.TranslationRepository;
import me.oskarkraemer.vocabonline.parser.ZornPDFParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.Optional;

@Service
public class ImporterService {
    @Autowired
    private ListRepository listRepository;

    @Autowired
    private TranslationRepository translationRepository;

    public HttpStatus zornPDF(byte[] pdf_data) {
        try {
            ZornPDFParser.parsePDF(pdf_data);
        } catch (Exception e) {
            return HttpStatus.UNPROCESSABLE_ENTITY;
        }

        return HttpStatus.OK;
    }
}
