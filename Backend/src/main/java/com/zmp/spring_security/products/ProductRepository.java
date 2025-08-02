package com.zmp.spring_security.products;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {


    List<Product> findByCategory_CategoryName (String categoryName);
    Optional<Product> findByProductName(String productName);
}
