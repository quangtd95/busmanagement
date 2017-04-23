package fpt.se50.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fpt.se50.entity.BusRoute;

public interface BusRouteRepository extends JpaRepository<BusRoute, Integer> {
	List<BusRoute> findByDepartureTime(Date date);
	List<BusRoute> findBySourceContainingAndDestinationContaining(String source,String destination);
}
