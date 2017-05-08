package fpt.se50.service;

import org.springframework.stereotype.Service;

import fpt.se50.entity.BusService;

@Service
public interface BusServiceService {
	BusService findByName(String name);
}
