package com.zmp.spring_security.products;

import com.zmp.spring_security.category.Category;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    Product getProductById(Long id);
    Product createProductById(Product product);
    Product updateProduct(Long id, Product product);
    void deleteProduct(Long id);
}
