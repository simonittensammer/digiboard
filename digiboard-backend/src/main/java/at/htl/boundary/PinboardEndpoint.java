package at.htl.boundary;

import at.htl.control.PinboardRepository;
import at.htl.control.UserRepository;
import at.htl.entity.Pinboard;
import at.htl.entity.User;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("pinboard")
@ApplicationScoped
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Transactional
public class PinboardEndpoint {

    @Inject
    PinboardRepository pr;

    @GET
    public List<Pinboard> getAll() {
        return pr.listAll();
    }
}
