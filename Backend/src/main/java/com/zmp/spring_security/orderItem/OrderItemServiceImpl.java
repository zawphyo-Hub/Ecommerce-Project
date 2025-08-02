package com.zmp.spring_security.orderItem;

import com.zmp.spring_security.order.Order;
import com.zmp.spring_security.order.OrderRepository;
import com.zmp.spring_security.products.Product;
import com.zmp.spring_security.products.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderItemServiceImpl implements OrderItemService {

    private final OrderItemRepository orderItemRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @Override
    public List<OrderItem> getAllOrderItems(){
        return orderItemRepository.findAll();
    }

    @Override
    public OrderItem getOrderItemById(Long id) {
        return orderItemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "OrderItem Not found"));
    }

    @Override
    public OrderItem createOrderItem(OrderItem orderItem){

        // Fetch the full Order entity
        Long orderId = orderItem.getOrder().getOrderID();
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        // Fetch the full Product entity
        Long productId = orderItem.getProduct().getProductId();
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));

        // Attach them to the OrderItem
        orderItem.setOrder(order);
        orderItem.setProduct(product);

        System.out.println("Saving order item: " + orderItem);

        return orderItemRepository.save(orderItem);

    }

    @Override
    public List<OrderItem> getOrderItemsByOrderId(Long orderId) {
        return orderItemRepository.findByOrderOrderID(orderId);
    }



}
