package fpt.se50.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fpt.se50.entity.Customer;

@Repository
public interface CustomerRepo extends JpaRepository< Customer,Integer>{
}
