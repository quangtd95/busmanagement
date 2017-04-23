package fpt.se50.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fpt.se50.entity.BusService;

public interface BusServiceRepository extends JpaRepository<BusService, Integer>{
	BusService findByName(String name);
}
