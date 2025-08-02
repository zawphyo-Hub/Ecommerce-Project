package com.zmp.spring_security.orderItem;

import com.zmp.spring_security.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

   List<OrderItem> findByOrderOrderID (Long orderID);

}
