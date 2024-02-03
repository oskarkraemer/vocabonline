package me.oskarkraemer.vocabonline.model.list;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/lists")
public class ListController {
    @Autowired
    private ListService listService;
    @GetMapping
    public ResponseEntity<java.util.List<List>> getAllLists() {
        return new ResponseEntity<java.util.List<List>>(listService.allLists(), HttpStatus.OK);
    }

    @GetMapping("/{name}")
    public ResponseEntity<Optional<List>> getSingleList(@PathVariable String name) {
        return new ResponseEntity<Optional<List>>(listService.singleList(name), HttpStatus.OK);
    }
}
