package entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Cycle extends AbstractPersistable<Long> {

    @ManyToOne
    private UserAccount owner;

    private Date startDate;

    private Date endDate;

    private boolean active;
}
