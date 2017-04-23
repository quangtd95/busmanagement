package fpt.se50.service;

import java.util.List;

import org.springframework.stereotype.Service;

import fpt.se50.entity.BusRoute;


public interface BusRouteService {
	
	BusRoute findOne(int id);
	
	void save(BusRoute busRoute);
	
	void delete(int id);
	
	List<BusRoute> findAll();
	
	List<BusRoute> findBusRouteToday();
	
	List<BusRoute> search(String source,String destination,String busService);
}
