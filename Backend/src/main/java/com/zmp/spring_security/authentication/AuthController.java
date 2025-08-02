package com.zmp.spring_security.authentication;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest registerRequest){
        var response = authService.register(registerRequest);
        return ResponseEntity.ok(response);

    }

    @PostMapping("/authentication")
    public ResponseEntity<AuthenticationResponse> authentication(
            @RequestBody AuthRequest authRequest){

        return ResponseEntity.ok(authService.authentication(authRequest));
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyCode(
            @RequestBody VerificationRequest verificationRequest){
        return ResponseEntity.ok(authService.verifyCode(verificationRequest));

    }

//    @PreAuthorize("hasRole('ADMIN')")
//    @GetMapping("/admin")
//    public String adminOnlyEndpoint() {
//        return "You are an admin!";
//    }



}
