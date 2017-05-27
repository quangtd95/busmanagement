package fpt.se50.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fpt.se50.entity.BusService;
import fpt.se50.repository.BusServiceRepo;

@Service
public class BusSvImpl implements BusServiceService
{
	@Autowired
	private BusServiceRepo busSvRepo;
	@Override
	public BusService findByName(String name) {
		return busSvRepo.findByName(name);
	}
	@Override
	public List<BusService> findAll() {
		return busSvRepo.findAll();
	}

}
