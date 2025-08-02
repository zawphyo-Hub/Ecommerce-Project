package com.zmp.spring_security.products;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zmp.spring_security.category.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping(value = "/saveProduct", consumes = "multipart/form-data")
    public ResponseEntity<Product> createProduct(
            @RequestParam("productName") String productName,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam("categoryId") Long categoryId,
            @RequestParam("image") MultipartFile imageFile
    ) {
        try {
            // Save image to local folder
            String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
            String uploadDir = "product-images/";
            FileUploadUtil.saveFile(uploadDir, fileName, imageFile);

            // Create product and set fields
            Product product = new Product();
            product.setProductName(productName);
            product.setDescription(description);
            product.setPrice(price);
            product.setImageUrl("/" + uploadDir + fileName); // saved path

            Category category = new Category();
            category.setCategory_id(categoryId); // only ID needed
            product.setCategory(category);

            // Save product
            Product saved = productService.createProductById(product);
            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }


    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return ResponseEntity.ok(productService.updateProduct(id, product));
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<Product> updateProduct(
//            @PathVariable Long id,
//            @RequestParam("product") String productJson,
//            @RequestParam(value = "image", required = false) MultipartFile imageFile
//    ) throws IOException {
//        ObjectMapper objectMapper = new ObjectMapper();
//        Product product = objectMapper.readValue(productJson, Product.class);
//        return ResponseEntity.ok(productService.updateProduct(id, product, imageFile));
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

}
