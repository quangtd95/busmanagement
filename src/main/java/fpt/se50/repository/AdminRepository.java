package fpt.se50.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fpt.se50.entity.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin,Integer> {
	Admin findByUserName(String userName);
}
