package at.htl.boundary;

import at.htl.control.NoteRepository;
import at.htl.control.PinboardRepository;
import at.htl.control.UserRepository;
import at.htl.entity.Note;
import at.htl.entity.Pinboard;
import at.htl.entity.User;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@Path("pinboard")
@ApplicationScoped
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Transactional
public class PinboardEndpoint {

    @Inject
    PinboardRepository pr;

    @Inject
    NoteRepository nr;

    @GET
    public List<Pinboard> getAll() {
        return pr.listAll();
    }

    @GET
    @Path("/{id}")
    public Pinboard getPinboard(@PathParam("id") Long id) {
        return pr.findById(id);
    }

    @GET
    @Path("/{id}/notes")
    public List<Note> getNotesByPinboardId(@PathParam("id") Long id) {
        return new ArrayList<>(pr.findById(id).getNotes());
    }

    @POST
    @Transactional
    @Path("/{id}/note")
    public Response addNote(@PathParam("id") Long id, Note note) {
        Pinboard pinboard = pr.findById(id);
        pinboard.addNote(note);
        return Response.ok().build();
    }

    @DELETE
    @Path("{id}/deleteNote/{noteId}")
    public Response deleteNote(@PathParam("id") Long id, @PathParam("noteId") Long noteId) {
        Pinboard pinboard = pr.findById(id);
        Note note = nr.findById(noteId);

        pinboard.getNotes().remove(note);

        if (note != null) {
            nr.delete(note);
            return Response.ok(note).build();
        }

        return Response.status(406).entity("note does not exist").build();
    }
}
