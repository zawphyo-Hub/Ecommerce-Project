package com.zmp.spring_security.order;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

   List<Order> findByUser_Id (Long userId);
}
