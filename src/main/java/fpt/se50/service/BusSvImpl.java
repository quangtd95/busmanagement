package fpt.se50.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fpt.se50.entity.BusService;
import fpt.se50.repository.BusServiceRepository;

@Service
public class BusSvImpl implements BusServiceService
{

	@Autowired
	private BusServiceRepository busSvRepo;
	@Override
	public BusService findByName(String name) {
		// T=DO Auto-generated method stub
		busSvRepo.findByName(name);
		return null;
	}

}
