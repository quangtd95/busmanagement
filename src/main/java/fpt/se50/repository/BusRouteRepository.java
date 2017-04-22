package fpt.se50.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import fpt.se50.entity.BusRoute;

public interface BusRouteRepository extends JpaRepository<BusRoute, Integer> {
	List<BusRoute> findByDepartureTime(Date date);
}
