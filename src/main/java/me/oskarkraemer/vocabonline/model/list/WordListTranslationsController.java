package me.oskarkraemer.vocabonline.model.list;

import me.oskarkraemer.vocabonline.model.translation.Translation;
import me.oskarkraemer.vocabonline.model.translation.TranslationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/list_translations")
public class WordListTranslationsController {
    @Autowired
    private TranslationService translationService;

    @GetMapping("/{listId}")
    private ResponseEntity<Optional<List<Translation>>> getTranslationsOfList(@PathVariable long listId) {
        return new ResponseEntity<Optional<List<Translation>>>(translationService.translationsOfList(listId), HttpStatus.OK);
    }
}
