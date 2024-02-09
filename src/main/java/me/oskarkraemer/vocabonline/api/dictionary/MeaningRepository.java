package me.oskarkraemer.vocabonline.api.dictionary;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MeaningRepository extends JpaRepository<Meaning, Long> {
}
