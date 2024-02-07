package me.oskarkraemer.vocabonline.model.list;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WordListService {
    @Autowired
    private WordListRepository wordListRepository;
    public List<WordList> allLists() {
        return wordListRepository.findAllByOrderByCreatedDesc();
    }

    public Optional<WordList> singleList(String name) {
        return wordListRepository.findByName(name);
    }
}
