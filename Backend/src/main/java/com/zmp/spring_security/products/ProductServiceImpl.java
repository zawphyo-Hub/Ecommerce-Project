package com.zmp.spring_security.products;

import com.zmp.spring_security.category.Category;
import com.zmp.spring_security.category.CategoryRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found with id: " + id));
    }

    @Override
    public Product createProductById(Product product) {
        //check if product name already exists
//        if (productRepository.findByProductName(product.getProductName()).isPresent()) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product name already exists");
//        }
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long id, Product newProduct) {
        Product existingProduct = productRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Product Not Found"));

        productRepository.findByProductName(newProduct.getProductName())
                .filter(pro -> !pro.getProductId().equals(id))
                .ifPresent(cat -> {
                    throw new RuntimeException("Product name already exists");
        });



        //saved data
        existingProduct.setProductName(newProduct.getProductName());
        existingProduct.setPrice(newProduct.getPrice());
        existingProduct.setDescription(newProduct.getDescription());
        existingProduct.setCategory(newProduct.getCategory());


        return productRepository.save(existingProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }


}
