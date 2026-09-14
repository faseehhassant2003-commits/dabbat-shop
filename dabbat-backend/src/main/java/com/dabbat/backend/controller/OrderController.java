package com.dabbat.backend.controller;

import com.dabbat.backend.dto.order.OrderRequest;
import com.dabbat.backend.model.Order;
import com.dabbat.backend.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder(Authentication authentication, @Valid @RequestBody OrderRequest request) {
        Order order = orderService.createOrder(authentication.getName(), request);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/me")
    public List<Order> myOrders(Authentication authentication) {
        return orderService.getOrdersForUser(authentication.getName());
    }

    @GetMapping("/{id}")
    public Order getOrder(Authentication authentication, @PathVariable Long id) {
        return orderService.getOrderById(authentication.getName(), id);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Order> allOrders() {
        return orderService.getAllOrders();
    }
}
