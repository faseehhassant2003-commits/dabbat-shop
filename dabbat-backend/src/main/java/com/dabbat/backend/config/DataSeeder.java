package com.dabbat.backend.config;

import com.dabbat.backend.model.Product;
import com.dabbat.backend.model.Role;
import com.dabbat.backend.model.User;
import com.dabbat.backend.repository.ProductRepository;
import com.dabbat.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

/**
 * Seeds the DB on first run so the frontend has real data instead of mockData.ts.
 * Safe to run repeatedly - only inserts when tables are empty.
 */
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedAdmin();
        seedProducts();
    }

    private void seedAdmin() {
        if (userRepository.existsByEmail("admin@dabbat.in")) return;

        userRepository.save(User.builder()
                .name("Dabbat Admin")
                .email("admin@dabbat.in")
                .password(passwordEncoder.encode("admin123"))
                .role(Role.ADMIN)
                .build());
    }

    private void seedProducts() {
        if (productRepository.count() > 0) return;

        List<Product> products = List.of(
                Product.builder()
                        .name("Oxford Shirt").slug("oxford-shirt")
                        .price(new BigDecimal("1799")).category("Shirts")
                        .sizes(List.of("S", "M", "L", "XL"))
                        .colors(List.of("Black", "Stone", "Navy"))
                        .images(List.of("/images/product-black.svg"))
                        .description("A crisp cotton oxford with a structured collar and relaxed modern fit.")
                        .inStock(true).build(),
                Product.builder()
                        .name("Classic Shirt").slug("classic-shirt")
                        .price(new BigDecimal("1699")).category("Shirts")
                        .sizes(List.of("S", "M", "L", "XL"))
                        .colors(List.of("White", "Stone", "Navy"))
                        .images(List.of("/images/product-white.svg"))
                        .description("A clean everyday shirt cut from smooth cotton with an understated finish.")
                        .inStock(true).build(),
                Product.builder()
                        .name("Linen Shirt").slug("linen-shirt")
                        .price(new BigDecimal("1899")).category("Shirts")
                        .sizes(List.of("S", "M", "L", "XL"))
                        .colors(List.of("Navy", "White"))
                        .images(List.of("/images/product-navy.svg"))
                        .description("Lightweight linen with a refined silhouette for warm-weather dressing.")
                        .inStock(true).build(),
                Product.builder()
                        .name("Tailored Trousers").slug("tailored-trousers")
                        .price(new BigDecimal("2299")).category("Trousers")
                        .sizes(List.of("30", "32", "34", "36"))
                        .colors(List.of("Charcoal", "Navy", "Black"))
                        .images(List.of("/images/product-trouser.svg"))
                        .description("Tailored trousers with a clean front and softly tapered leg.")
                        .inStock(true).build(),
                Product.builder()
                        .name("Relaxed Trousers").slug("relaxed-trousers")
                        .price(new BigDecimal("1999")).category("Trousers")
                        .sizes(List.of("30", "32", "34", "36"))
                        .colors(List.of("Stone", "Charcoal"))
                        .images(List.of("/images/product-stone-trouser.svg"))
                        .description("A relaxed trouser built for effortless everyday styling.")
                        .inStock(true).build()
        );

        productRepository.saveAll(products);
    }
}
