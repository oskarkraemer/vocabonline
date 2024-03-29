package me.oskarkraemer.vocabonline.model.translation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TranslationRepository extends JpaRepository<Translation, Long> {
    Optional<List<Translation>> findByWordListId(long listId);

    Optional<Translation> findById(long translationId);
}
