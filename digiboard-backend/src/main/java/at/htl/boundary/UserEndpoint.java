package at.htl.boundary;

import at.htl.control.UserRepository;
import at.htl.entity.User;
import org.hibernate.Hibernate;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.json.JsonObject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
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
        return ur.streamAll().peek(o -> {
            Hibernate.initialize(o.getPinboards());
        }).collect(Collectors.toList());
    }

    @POST
    public Response addUser(User user) {
        ur.persist(user);
        return Response.ok(user).build();
    }
}
