package at.htl.control;

import at.htl.entity.Pinboard;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@ApplicationScoped
@Transactional
public class PinboardRepository implements PanacheRepository<Pinboard> {
}
