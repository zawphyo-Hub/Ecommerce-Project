package com.zmp.spring_security.user;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "admin1111"; // admin password
        String hashedPassword = encoder.encode(rawPassword);
        System.out.println("Hashed admin password: " + hashedPassword);
    }
}
