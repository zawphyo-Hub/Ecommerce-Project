package com.zmp.spring_security.order;

import com.zmp.spring_security.products.Product;

import java.util.List;

public interface OrderService {
    List<Order> getAllOrders();
    Order getOrderById(Long id);
    List<Order> getOrdersByUserId(Long userId);

    Order createOrder(Order order);
}
