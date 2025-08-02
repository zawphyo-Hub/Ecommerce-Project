package com.zmp.spring_security.payment;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

   List<Payment> findByPaymentID (Long id);
}
