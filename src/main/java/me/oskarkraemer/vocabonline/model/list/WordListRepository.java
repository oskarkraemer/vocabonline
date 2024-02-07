package me.oskarkraemer.vocabonline.model.list;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WordListRepository extends JpaRepository<WordList, Long> {
    Optional<WordList> findByName(String name);
    List<WordList> findAllByOrderByCreatedDesc();
}
