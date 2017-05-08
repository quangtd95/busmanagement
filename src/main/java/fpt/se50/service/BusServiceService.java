package fpt.se50.service;

import org.springframework.stereotype.Service;

import fpt.se50.entity.BusService;

public interface BusServiceService {
	BusService findByName(String name);
}
