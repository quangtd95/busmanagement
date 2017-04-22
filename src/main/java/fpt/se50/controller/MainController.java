package fpt.se50.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import fpt.se50.entity.BusRoute;
import fpt.se50.service.BusRouteService;

@Controller
public class MainController {
	
	@Autowired
	private BusRouteService busRouteService;
	
	@GetMapping("/")
	public String getHome(Model model) {
		List<BusRoute> busRoute = busRouteService.findAll();
		model.addAttribute("busRoute", busRoute);
		return "home";
	}
}
