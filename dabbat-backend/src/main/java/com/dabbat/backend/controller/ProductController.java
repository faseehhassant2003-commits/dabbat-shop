package com.dabbat.backend.controller;

import com.dabbat.backend.dto.ProductRequest;
import com.dabbat.backend.model.Product;
import com.dabbat.backend.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public List<Product> getAll(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        return productService.getAll(category, search);
    }

    @GetMapping("/{slug}")
    public Product getBySlug(@PathVariable String slug) {
        return productService.getBySlug(slug);
    }

    @PostMapping
    public ResponseEntity<Product> create(@Valid @RequestBody ProductRequest request) {
        Product created = productService.create(request);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable Long id, @Valid @RequestBody ProductRequest request) {
        return productService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
