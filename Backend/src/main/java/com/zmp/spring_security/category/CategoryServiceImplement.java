package com.zmp.spring_security.category;

import com.zmp.spring_security.exception.GlobalExceptionHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImplement implements CategoryService{

    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long id){
        return categoryRepository.findById(id) .orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category Not Found with this id" + id));

    }

    @Override
    public Category createCategory(Category category) {

        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Long id, Category newCategory) {
        
        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        categoryRepository.findByCategoryName(newCategory.getCategoryName())
                .filter(cat -> !cat.getCategory_id().equals(id))
                .ifPresent(cat -> {
                    throw new RuntimeException("Category name already exists");
                });

        existingCategory.setCategoryName(newCategory.getCategoryName()); //save update data

        return categoryRepository.save(existingCategory);
    }

    @Override
    public void deleteCategory(Long id) {
        Category category = getCategoryById(id);
        categoryRepository.delete(category);
    }


}
