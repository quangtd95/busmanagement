package fpt.se50.service;

import fpt.se50.entity.BusRoute;

public interface BusRouteService {
	
	BusRoute findOne(int id);
	
	void save(BusRoute busRoute);
	
	void delete(int id);
}
