package me.oskarkraemer.vocabonline.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.oskarkraemer.vocabonline.model.list.List;

import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "translation")
public class Translation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String german;

    @Column(nullable = false)
    private String english;

    @Column
    private String[] synonyms;

    @ManyToOne(cascade = CascadeType.REMOVE)
    private List list;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(columnDefinition = "timestamptz default now()")
    private Date created_at;
}
