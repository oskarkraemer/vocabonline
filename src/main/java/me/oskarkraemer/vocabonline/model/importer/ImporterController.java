package me.oskarkraemer.vocabonline.model.importer;

import me.oskarkraemer.vocabonline.model.list.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/importer")
public class ImporterController {

    @Autowired
    private ImporterService importerService;

    @RequestMapping(value = "/upload_zorn/{list_name}", method = RequestMethod.POST)
    public ResponseEntity<String> importZornPDF(@RequestParam("file") MultipartFile file, @PathVariable String list_name) {
        if(list_name.isEmpty()) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        byte[] bt;

        try {
            bt = file.getBytes();
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<String>(importerService.zornPDF(list_name, bt).toString(), HttpStatus.NOT_IMPLEMENTED);
    }
}