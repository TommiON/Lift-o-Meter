import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LiftOMeterBackendApplication {

    public static void main(String[] args) throws Exception {
        System.out.println("Lift-o-Meter backend starting up...");
        SpringApplication.run(LiftOMeterBackendApplication.class, args);
        System.out.println("Still running?");
    }
}
