package jiras.DatabaseAppTest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("jiras.DatabaseAppTest.data.repository")
public class DatabaseAppTestApplication {

	public static void main(String[] args) {
		SpringApplication.run(DatabaseAppTestApplication.class, args);
	}
}
