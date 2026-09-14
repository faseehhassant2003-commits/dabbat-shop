package com.dabbat.backend.dto.order;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderItemRequest {

    @NotNull
    private Long productId;

    @NotBlank
    private String size;

    @NotBlank
    private String color;

    @Min(1)
    private int quantity;
}
