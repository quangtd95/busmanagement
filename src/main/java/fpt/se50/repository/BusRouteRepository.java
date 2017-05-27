package fpt.se50.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fpt.se50.entity.BusRoute;
@Repository
public interface BusRouteRepository extends JpaRepository<BusRoute, Integer> {
	List<BusRoute> findByDepartureTime(Date date);
	List<BusRoute> findBySourceContainingAndDestinationContaining(String source,String destination);
}
