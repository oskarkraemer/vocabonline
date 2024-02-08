package me.oskarkraemer.vocabonline;

import me.oskarkraemer.vocabonline.api.bht.BhtConfigProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
public class VocabonlineApplication {

	public static void main(String[] args) {
		SpringApplication.run(VocabonlineApplication.class, args);
	}

}
