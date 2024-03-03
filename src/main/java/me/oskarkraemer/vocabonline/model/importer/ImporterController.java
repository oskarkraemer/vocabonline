package me.oskarkraemer.vocabonline.model.importer;

import me.oskarkraemer.vocabonline.model.user.UserService;
import me.oskarkraemer.vocabonline.parser.ZornPDFParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/importer")
public class ImporterController {

    @Autowired
    private ImporterService importerService;

    @Autowired
    private UserService userService;

    Optional<byte[]> getFileContent(MultipartFile file) {
        try {
            return Optional.of(file.getBytes());
        } catch (IOException e) {
            return Optional.empty();
        }
    }

    @RequestMapping(value = "/upload_zorn/{list_name}", method = RequestMethod.POST)
    public ResponseEntity<String> importZornPDF(@RequestParam("file") MultipartFile file, @PathVariable String list_name, @RequestParam("username") String username, @RequestParam("password") String password) {
        //Check if credentials are correct
        if(userService.authenticate(username, password) == UserService.AuthResponse.INCORRECT) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        //Check if list_name is defined
        if(list_name.isEmpty()) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        Optional<byte[]> file_content = getFileContent(file);
        if(file_content.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        HttpStatus importResponse = importerService.importPDF(list_name, new ZornPDFParser(), file_content.get());
        return new ResponseEntity<String>(importResponse.toString(), importResponse);
    }
}