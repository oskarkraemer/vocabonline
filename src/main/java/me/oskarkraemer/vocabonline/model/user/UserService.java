package me.oskarkraemer.vocabonline.model.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.security.spec.KeySpec;
import java.util.Base64;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Value("${ath.salt}")
    private String auth_salt;

    public enum AuthResponse {
        OK,
        INCORRECT
    };

    private String hashPassword(String password) {
        byte[] salt = auth_salt.getBytes(StandardCharsets.UTF_8);

        KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 65536, 128);

        try {
            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");

            return Base64.getEncoder().encodeToString(factory.generateSecret(spec).getEncoded());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public AuthResponse authenticate(String username, String password) {
        Optional<User> optionalUser = userRepository.findByName(username);

        if(optionalUser.isPresent()) {
            String password_hash = hashPassword(password);
            System.out.println(password_hash);

            if(optionalUser.get().getPasswordHash().equals(password_hash)) {
                return AuthResponse.OK;
            }
        }

        return AuthResponse.INCORRECT;
    }
}
