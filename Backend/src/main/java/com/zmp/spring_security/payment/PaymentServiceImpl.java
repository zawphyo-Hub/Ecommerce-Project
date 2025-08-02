package com.zmp.spring_security.payment;

import com.zmp.spring_security.order.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    @Override
    public List<Payment> getAllPayments(){
        return paymentRepository.findAll();
    }

    @Override
    public Payment getPaymentByID(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Payment Not found"));
    }

    @Override
    public Payment createPayment(Payment payment){
        return paymentRepository.save(payment);

    }



}
