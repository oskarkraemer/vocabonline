package me.oskarkraemer.vocabonline.model.meaning;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeaningRepository extends JpaRepository<Meaning, Long> {
}
