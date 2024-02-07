package me.oskarkraemer.vocabonline.model.translation;

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
@RequestMapping("/api/v1/translations")
public class TranslationController {
    @Autowired
    private TranslationService translationService;

    @GetMapping
    private ResponseEntity<List<Translation>> getAllTranslations() {
        return new ResponseEntity<List<Translation>>(translationService.allTranslations(), HttpStatus.OK);
    }

    @GetMapping("/{listId}")
    private ResponseEntity<Optional<List<Translation>>> getTranslationsOfList(@PathVariable long listId) {
        return new ResponseEntity<Optional<List<Translation>>>(translationService.translationsOfList(listId), HttpStatus.OK);
    }
}
