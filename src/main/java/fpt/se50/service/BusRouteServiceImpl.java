package fpt.se50.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fpt.se50.entity.BusRoute;
import fpt.se50.repository.BusRouteRepository;

@Service
public class BusRouteServiceImpl implements BusRouteService {

	@Autowired
	private BusRouteRepository busRouteRepository;
	
	@Override
	public BusRoute findOne(int id) {
		return busRouteRepository.findOne(id);
	}

	@Override
	public void save(BusRoute busRoute) {
		busRouteRepository.save(busRoute);
	}

	@Override
	public void delete(int id) {
		busRouteRepository.delete(id);
	}

	@Override
	public List<BusRoute> findAll() {
		return busRouteRepository.findAll();
	}
	
}
