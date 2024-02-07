package me.oskarkraemer.vocabonline.model.list;

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
@RequestMapping("/api/v1/lists")
public class WordListController {
    @Autowired
    private WordListService wordListService;
    @GetMapping
    public ResponseEntity<List<WordList>> getAllLists() {
        return new ResponseEntity<List<WordList>>(wordListService.allLists(), HttpStatus.OK);
    }

    @GetMapping("/{name}")
    public ResponseEntity<Optional<WordList>> getSingleList(@PathVariable String name) {
        return new ResponseEntity<Optional<WordList>>(wordListService.singleList(name), HttpStatus.OK);
    }
}
