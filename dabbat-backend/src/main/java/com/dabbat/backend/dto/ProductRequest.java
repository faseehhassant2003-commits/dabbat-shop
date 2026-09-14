package com.dabbat.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String slug;

    @NotNull
    @Positive
    private BigDecimal price;

    @NotBlank
    private String category;

    private List<String> sizes;
    private List<String> colors;
    private List<String> images;
    private String description;
    private boolean inStock = true;
}
