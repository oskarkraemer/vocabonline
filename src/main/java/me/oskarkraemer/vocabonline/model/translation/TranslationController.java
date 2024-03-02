package me.oskarkraemer.vocabonline.model.translation;

import me.oskarkraemer.vocabonline.model.list.WordList;
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

    @GetMapping("/{translation_id}")
    public ResponseEntity<Optional<Translation>> getSingleTranslation(@PathVariable long translation_id) {
        return new ResponseEntity<Optional<Translation>>(translationService.singleTranslation(translation_id), HttpStatus.OK);
    }
}
