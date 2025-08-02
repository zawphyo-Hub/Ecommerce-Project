package com.zmp.spring_security.payment;

import com.zmp.spring_security.order.Order;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentID;

    @NotNull
    private String paymentType;


    private double amountPaid;

    //Credit Visa
    private String holderName;
    private String cardNumber;
    private String cardExpiry;
    private Integer cvv;


    @OneToOne
    @JoinColumn(name = "orderID")
    private Order order;
}





