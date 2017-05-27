package fpt.se50.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fpt.se50.entity.Customer;
import fpt.se50.repository.CustomerRepo;

@Service
public class CustomerServiceImpl implements CustomerService{

	@Autowired
	private CustomerRepo customerRepo;
	
	@Override
	public void save(Customer customer) {
		customerRepo.save(customer);
	}

	@Override
	public void update(Customer customer) {
		customerRepo.save(customer);
	}

	@Override
	public void delete(Customer customer) {
		customerRepo.delete(customer);
	}

}
