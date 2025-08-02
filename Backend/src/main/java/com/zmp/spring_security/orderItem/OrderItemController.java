package com.zmp.spring_security.orderItem;

import com.zmp.spring_security.order.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orderItem")
@RequiredArgsConstructor
public class OrderItemController {

    private final OrderItemService orderItemService;

    @GetMapping()
    public ResponseEntity<List<OrderItem>> getAllOrderItems(){
        return ResponseEntity.ok(orderItemService.getAllOrderItems());

    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderItem> getOrderItemById(@PathVariable Long id){
        return ResponseEntity.ok(orderItemService.getOrderItemById(id));
    }

    @PostMapping("/saveOrderItem")
    public ResponseEntity<OrderItem> createOrderItem(@RequestBody OrderItem orderItem){
        return ResponseEntity.ok(orderItemService.createOrderItem(orderItem));
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<OrderItem>> getOrderItemsByOrderId(@PathVariable Long orderId) {
        System.out.println("Fetching items for order ID: " + orderId);

        return ResponseEntity.ok(orderItemService.getOrderItemsByOrderId(orderId));
    }



}
