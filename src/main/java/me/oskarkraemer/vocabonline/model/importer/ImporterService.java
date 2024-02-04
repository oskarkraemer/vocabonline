package me.oskarkraemer.vocabonline.model.importer;

import me.oskarkraemer.vocabonline.model.list.List;
import me.oskarkraemer.vocabonline.model.list.ListRepository;
import me.oskarkraemer.vocabonline.model.translation.TranslationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ImporterService {
    @Autowired
    private ListRepository listRepository;

    @Autowired
    private TranslationRepository translationRepository;

    public HttpStatus zornPDF() {
        return HttpStatus.NOT_IMPLEMENTED;
    }
}
