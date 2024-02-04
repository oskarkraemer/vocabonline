package me.oskarkraemer.vocabonline.model.translation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TranslationService {
    @Autowired
    private TranslationRepository translationRepository;

    public List<Translation> allTranslations() {
        return translationRepository.findAll();
    }

    public Optional<List<Translation>> translationsOfList(long listId) {
        return translationRepository.findByListId(listId);
    }
}
