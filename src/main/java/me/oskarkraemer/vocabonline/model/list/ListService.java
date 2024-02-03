package me.oskarkraemer.vocabonline.model.list;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ListService {
    @Autowired
    private ListRepository listRepository;
    public java.util.List<List> allLists() {
        return listRepository.findAll();
    }

    public Optional<List> singleList(String name) {
        return listRepository.findByName(name);
    }
}
