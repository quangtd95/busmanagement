package fpt.se50.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fpt.se50.entity.BusService;
@Repository
public interface BusServiceRepo extends JpaRepository<BusService, Integer>{
	BusService findByName(String name);
}
