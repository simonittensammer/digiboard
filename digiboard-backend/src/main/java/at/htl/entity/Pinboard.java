package at.htl.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "digi_pbd")
public class Pinboard extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;

    @JsonbTransient
    @OneToMany(cascade = CascadeType.ALL)
    List<Note> notes;

    public Pinboard() {
    }

    public Pinboard(String name) {
        this.name = name;
        this.notes = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

//    public void setId(Long id) {
//        this.id = id;
//    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Note> getNotes() {
        return notes;
    }

    public void addNote(Note note) {
        this.notes.add(note);
    }
}
