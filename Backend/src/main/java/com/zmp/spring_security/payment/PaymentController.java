package com.zmp.spring_security.payment;

import com.zmp.spring_security.order.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @GetMapping()
    public ResponseEntity<List<Payment>> getAllPayments(){
        return ResponseEntity.ok(paymentService.getAllPayments());

    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long id){
        return ResponseEntity.ok(paymentService.getPaymentByID(id));
    }

    @PostMapping("/savePayment")
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment){
        return ResponseEntity.ok(paymentService.createPayment(payment));
    }



}
