package com.dabbat.backend.service;

import com.dabbat.backend.dto.ProductRequest;
import com.dabbat.backend.exception.BadRequestException;
import com.dabbat.backend.exception.ResourceNotFoundException;
import com.dabbat.backend.model.Product;
import com.dabbat.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getAll(String category, String search) {
        if (search != null && !search.isBlank()) {
            return productRepository.findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(search, search);
        }
        if (category != null && !category.isBlank() && !category.equalsIgnoreCase("All")) {
            return productRepository.findByCategoryIgnoreCase(category);
        }
        return productRepository.findAll();
    }

    public Product getBySlug(String slug) {
        return productRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + slug));
    }

    public Product getById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));
    }

    public Product create(ProductRequest request) {
        if (productRepository.existsBySlug(request.getSlug())) {
            throw new BadRequestException("A product with this slug already exists");
        }
        Product product = Product.builder()
                .name(request.getName())
                .slug(request.getSlug())
                .price(request.getPrice())
                .category(request.getCategory())
                .sizes(request.getSizes())
                .colors(request.getColors())
                .images(request.getImages())
                .description(request.getDescription())
                .inStock(request.isInStock())
                .build();
        return productRepository.save(product);
    }

    public Product update(Long id, ProductRequest request) {
        Product product = getById(id);
        product.setName(request.getName());
        product.setSlug(request.getSlug());
        product.setPrice(request.getPrice());
        product.setCategory(request.getCategory());
        product.setSizes(request.getSizes());
        product.setColors(request.getColors());
        product.setImages(request.getImages());
        product.setDescription(request.getDescription());
        product.setInStock(request.isInStock());
        return productRepository.save(product);
    }

    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found: " + id);
        }
        productRepository.deleteById(id);
    }
}
