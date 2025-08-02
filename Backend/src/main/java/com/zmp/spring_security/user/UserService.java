package com.zmp.spring_security.user;

import com.zmp.spring_security.category.Category;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    User getUserById(Long id);

    User updateUser(Long id, User user);
    void deleteUser(Long id);
}
