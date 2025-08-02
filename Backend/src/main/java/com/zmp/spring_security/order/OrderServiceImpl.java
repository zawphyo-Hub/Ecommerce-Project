package com.zmp.spring_security.order;

import com.zmp.spring_security.products.Product;
import com.zmp.spring_security.user.User;
import com.zmp.spring_security.user.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService{

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;


    @Override
    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order Not found"));
    }

    @Override
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUser_Id(userId);
    }



    @Override
    public Order createOrder(Order order){
        if (order.getUser() == null || order.getUser().getId() == 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User ID is missing");
        }

        // Fetch actual User entity
        User user = userRepository.findById(order.getUser().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        order.setUser(user);

        return orderRepository.save(order);
    }

//    @Override
//    public Order createOrder(Order order){
//        return orderRepository.save(order);
//
//    }



}
