package com.zmp.spring_security.user;

import com.zmp.spring_security.category.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.data.util.ClassUtils.ifPresent;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id){
        return userRepository.findById(id) .orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found with this id" + id));

    }


    @Override
    public User updateUser(Long id, User newUser) {

        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userRepository.findByFullName(newUser.getFullName())
                .filter(cat -> !cat.getId().equals(id))
                .ifPresent(cat -> {
                    throw new RuntimeException("Username already exists");
                });

        //save update data
        existingUser.setFullName(newUser.getFullName());
        existingUser.setEmail(newUser.getEmail());
        existingUser.setMfaEnabled(newUser.getMfaEnabled());
        existingUser.setRole(newUser.getRole());

        return userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }

}
