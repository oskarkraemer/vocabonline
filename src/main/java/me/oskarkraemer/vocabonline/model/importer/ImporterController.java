package me.oskarkraemer.vocabonline.model.importer;

import me.oskarkraemer.vocabonline.model.list.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/importer")
public class ImporterController {

    @Autowired
    private ImporterService importerService;

    @GetMapping("/import_zorn")
    public ResponseEntity<String> importZornPDF(@PathVariable String name) {
        return new ResponseEntity<String>(importerService.zornPDF().toString(), HttpStatus.NOT_IMPLEMENTED);
    }
}