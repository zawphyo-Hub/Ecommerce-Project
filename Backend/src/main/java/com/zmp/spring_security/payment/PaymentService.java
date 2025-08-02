package com.zmp.spring_security.payment;

import com.zmp.spring_security.order.Order;

import java.util.List;

public interface PaymentService {
    List<Payment> getAllPayments();
    Payment getPaymentByID(Long id);
    Payment createPayment(Payment payment);
}
