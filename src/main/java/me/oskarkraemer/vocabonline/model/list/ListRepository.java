package me.oskarkraemer.vocabonline.model.list;

import me.oskarkraemer.vocabonline.model.list.List;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Repository
public interface ListRepository extends JpaRepository<List, Long> {
    Optional<List> findByName(String name);
}
