package at.htl.boundary;

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

@Path("user")
@ApplicationScoped
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Transactional
public class UserEndpoint {

    @Inject
    UserRepository ur;

    @Inject
    PinboardRepository pr;

    @GET
    public List<User> getAll() {
        return ur.listAll();
    }

    @GET
    @Path("/{id}")
    public User getUser(@PathParam("id") String id) {
        return ur.find("uid", id).firstResult();
    }

    @GET
    @Path("/{id}/pinboards")
    public List<Pinboard> getPinboardsByUserId(@PathParam("id") String id) {
        return new ArrayList<>(ur.find("uid", id).firstResult().getPinboards());
    }

    @POST
    public Response addUser(User user) {
        ur.persist(user);
        return Response.ok(user).build();
    }

    @POST
    @Path("/login")
    public Response login(User loginUser) {
        User user = ur.find("uid", loginUser.getUid()).firstResult();

        if (user == null) {
            User newUser = new User(
                    loginUser.getUid(),
                    loginUser.getEmail(),
                    loginUser.getPhotoURL(),
                    loginUser.getDisplayName()
            );

            Pinboard pinboard = new Pinboard("My Notes");

            newUser.addPinboard(pinboard);
            ur.persist(newUser);

            return Response.ok(newUser).build();

        }

        return Response.ok(ur.find("uid", loginUser.getUid()).firstResult()).build();
    }

    @POST
    @Transactional
    @Path("/{id}/pinboard")
    public Response addPinboard(@PathParam("id") String id, Pinboard pinboard) {
        User user = ur.find("uid", id).firstResult();
        user.addPinboard(pinboard);
        return Response.ok().build();
    }

    @DELETE
    @Path("{id}/deletePinboard/{pinboardId}")
    public Response deletePinboard(@PathParam("id") String id, @PathParam("pinboardId") Long pinboardId) {
        User user = ur.find("uid", id).firstResult();
        Pinboard pinboard = pr.findById(pinboardId);

        user.getPinboards().remove(pinboard);

        if (pinboard != null) {
            pr.delete(pinboard);
            return Response.ok(pinboard).build();
        }

        return Response.status(406).entity("pinboard does not exist").build();
    }
}
