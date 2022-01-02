package at.htl.boundary;

import at.htl.control.UserRepository;
import at.htl.entity.Pinboard;
import at.htl.entity.User;
import org.hibernate.Hibernate;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.json.JsonObject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Path("user")
@ApplicationScoped
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Transactional
public class UserEndpoint {

    @Inject
    UserRepository ur;

    @GET
    public List<User> getAll() {
//        return ur.streamAll().peek(o -> {
//            Hibernate.initialize(o.getPinboards());
//        }).collect(Collectors.toList());
        return ur.listAll();
    }

    @GET
    @Path("/{id}")
    public User getUser(@PathParam("id") Long id) {
        return ur.findById(id);
    }

    @GET
    @Path("/{id}/pinboards")
    public List<Pinboard> getPinboards(@PathParam("id") Long id) {
        return new ArrayList<>(ur.findById(id).getPinboards());
    }

    @POST
    public Response addUser(User user) {
        ur.persist(user);
        return Response.ok(user).build();
    }

    @POST
    @Transactional
    @Path("/{id}/pinboard")
    public Response addPinboard(@PathParam("id") Long id, Pinboard pinboard) {
        User user = ur.findById(id);
        user.addPinboard(pinboard);
        return Response.ok().build();
    }
}
