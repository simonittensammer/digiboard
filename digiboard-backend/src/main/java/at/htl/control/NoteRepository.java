package at.htl.control;

import at.htl.entity.Note;
import io.quarkus.hibernate.orm.panache.Panache;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@ApplicationScoped
@Transactional
public class NoteRepository implements PanacheRepository<Note> {

    public void update(Note note){
        Panache.getEntityManager().merge(note);
    }
}
