package at.htl.boundary;

import at.htl.control.NoteRepository;
import at.htl.entity.Note;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("note")
@ApplicationScoped
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Transactional
public class NoteEndpoint {

    @Inject
    NoteRepository nr;

    @PUT
    public Response putNote(Note note) {
        nr.update(note);
        return Response.ok(note).build();
    }
}
