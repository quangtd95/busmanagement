package fpt.se50.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fpt.se50.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin,Integer> {
	Admin findByUserName(String userName);
}
