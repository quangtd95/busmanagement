package fpt.se50.service;

import fpt.se50.entity.Customer;

public interface CustomerService {
	void save(Customer customer);
	void update(Customer customer);
	void delete(Customer customer);
}
