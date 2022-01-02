package at.htl.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "digi_usr")
public class User extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String uid;
    String email;
    String photoURL;
    String displayName;

    @JsonbTransient
    @OneToMany
    List<Pinboard> pinboards;

    public User() {
    }

    public User(String uid, String email, String photoURL, String displayName) {
        this.uid = uid;
        this.email = email;
        this.photoURL = photoURL;
        this.displayName = displayName;
        this.pinboards = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

//    public void setId(Long id) {
//        this.id = id;
//    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhotoURL() {
        return photoURL;
    }

    public void setPhotoURL(String photoURL) {
        this.photoURL = photoURL;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public List<Pinboard> getPinboards() {
        return pinboards;
    }

    public void addPinboard(Pinboard pinboard) {
        this.pinboards.add(pinboard);
    }
}
