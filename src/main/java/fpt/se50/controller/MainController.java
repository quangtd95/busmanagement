package fpt.se50.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpSession;
import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import fpt.se50.entity.AddBusRoute;
import fpt.se50.entity.BusRoute;
import fpt.se50.entity.BusService;
import fpt.se50.entity.Customer;
import fpt.se50.service.BusRouteService;
import fpt.se50.service.BusServiceService;
import fpt.se50.service.CustomerService;

@Controller
public class MainController {

	@Autowired
	private BusRouteService busRouteService;

	@Autowired
	private BusServiceService busSvSv;

	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private JavaMailSender mailSender;

	@GetMapping("/")
	public String getSearch(@RequestParam(required = false) String source,
			@RequestParam(required = false) String destination, @RequestParam(required = false) String busService,
			Model model,HttpSession session) {
		session.setAttribute("id", null);
		List<BusRoute> busRoutes = busRouteService.search(source, destination, busService);
		System.out.println(source + " " + destination + " " + busService);
		System.out.println(busRoutes.size());
		model.addAttribute("busRoutes", busRoutes);
		String message = "";
		if (busRoutes.isEmpty() && (source != null || destination != null || busService != null)) {
			message = "empty!";
			model.addAttribute("message", message);
		} else if (!busRoutes.isEmpty() && (source != null || destination != null || busService != null)) {
			message = "có " + busRoutes.size() + " kết quả!";
			model.addAttribute("message", message);
		} else {
			model.addAttribute("message", message);
		}
		System.out.println(message);
		return "index";

	}

	// Thêm tuyến xe
	@PostMapping("/busroute/add")
	public @ResponseBody ResponseEntity<String> add(@RequestBody AddBusRoute addBusRoute) {

		BusRoute busRoute = new BusRoute();
		busRoute.setSource(addBusRoute.getSource());
		busRoute.setDestination(addBusRoute.getDestination() + "-" + addBusRoute.getBusServiceDestination());

		try {
			DateFormat format = new SimpleDateFormat("dd-MM-yyyy HH:mm");

			java.util.Date departureDatetime = (java.util.Date) format
					.parse(addBusRoute.getDepartureDate() + " " + addBusRoute.getDepartureTime());
			java.sql.Timestamp timestamp = new java.sql.Timestamp(departureDatetime.getTime());
			busRoute.setDepartureTime(timestamp);

			java.util.Date arrivalDateTime = (java.util.Date) format
					.parse(addBusRoute.getArrivalDate() + " " + addBusRoute.getArrivalTime());
			timestamp = new java.sql.Timestamp(arrivalDateTime.getTime());
			busRoute.setArrivalTime(timestamp);

		} catch (ParseException e) {
			e.printStackTrace();
		}

		busRoute.setRemainingTickets(Integer.parseInt(addBusRoute.getTotalTickets()));
		busRoute.setTotalTickets(Integer.parseInt(addBusRoute.getTotalTickets()));
		busRoute.setTicketPrice(Integer.parseInt(addBusRoute.getTicketPrice()));
		BusService busSv = busSvSv.findByName(addBusRoute.getBusService());
		System.out.println("." + addBusRoute.getBusService() + ".");
		if (busSv == null) {

			System.out.println("Can't find bus service");
		}
		if (busSv != null) {
			busRoute.setBusService(busSv);
		}

		busRouteService.save(busRoute);

		return new ResponseEntity<String>("Thêm tuyến xe thành công", HttpStatus.OK);
	}

	// Sửa tuyến xe
	@PostMapping("/busroute/{id}/edit")
	public @ResponseBody ResponseEntity<String> edit(@PathVariable int id, @RequestBody AddBusRoute addBusRoute) {

		BusRoute busRoute = busRouteService.findOne(id);
		busRoute.setSource(addBusRoute.getSource());
		busRoute.setDestination(addBusRoute.getDestination() + "-" + addBusRoute.getBusServiceDestination());

		try {
			DateFormat format = new SimpleDateFormat("dd-MM-yyyy HH:mm");

			java.util.Date departureDatetime = (java.util.Date) format
					.parse(addBusRoute.getDepartureDate() + " " + addBusRoute.getDepartureTime());
			java.sql.Timestamp timestamp = new java.sql.Timestamp(departureDatetime.getTime());
			busRoute.setDepartureTime(timestamp);

			java.util.Date arrivalDateTime = (java.util.Date) format
					.parse(addBusRoute.getArrivalDate() + " " + addBusRoute.getArrivalTime());
			timestamp = new java.sql.Timestamp(arrivalDateTime.getTime());
			busRoute.setArrivalTime(timestamp);

		} catch (ParseException e) {
			e.printStackTrace();
		}

		busRoute.setTotalTickets(Integer.parseInt(addBusRoute.getTotalTickets()));
		busRoute.setTicketPrice(Integer.parseInt(addBusRoute.getTicketPrice()));
		BusService busSv = busSvSv.findByName(addBusRoute.getBusService());
		System.out.println("." + addBusRoute.getBusService() + ".");
		if (busSv == null) {

			System.out.println("Can't find bus service");
		}
		if (busSv != null) {
			busRoute.setBusService(busSv);
		}

		busRouteService.save(busRoute);

		return new ResponseEntity<String>("Sửa tuyến xe thành công", HttpStatus.OK);
	}

	// Xoá tuyến xe
	@PostMapping("/busroute/delete")
	public @ResponseBody ResponseEntity<String> delete(@RequestBody Integer[] delete_ids) {
		for (int i = 0; i < delete_ids.length; i++)
			busRouteService.delete(delete_ids[i].intValue());
		return new ResponseEntity<String>("xóa tuyến xe thành công", HttpStatus.OK);
	}

	@GetMapping("/busservice")
	public String getBusService(Model model) {
		List<BusService> busServices = busSvSv.findAll();
		model.addAttribute("busServices", busServices);
		model.addAttribute("size", busServices.size() - 1);
		return "nhaxe";
	}

	@GetMapping("/book/{id}")
	public String getBookTicket(@PathVariable int id, Model model) {
		BusRoute busRoute = busRouteService.findOne(id);
		model.addAttribute("busRoute", busRoute);
		model.addAttribute("max",busRoute.getRemainingTickets());
		return "booking-ticket-1";
	}

	@GetMapping("/book/{id}/{nbrTicket}")
	public String addInfoBookTicket(@PathVariable int id, @PathVariable int nbrTicket, Model model) {
		BusRoute busRoute = busRouteService.findOne(id);
		if (nbrTicket > busRoute.getRemainingTickets()){
			return "redirect:/book/"+id;	
		}
		model.addAttribute("busRoute", busRoute);
		model.addAttribute("number", nbrTicket);
		model.addAttribute("id", busRoute.getId());
		return "booking-ticket-2";
	}

	@PostMapping("/book/{id}/{nbrTicket}")
	public @ResponseBody ResponseEntity<String> postAddInfoBookTicket(HttpSession session,
			@RequestBody Customer customer, Model model) {
		customer.setId(UUID.randomUUID().toString());
		if (customer != null) {
			session.setAttribute("id", customer.getId());
			session.setAttribute("name", customer.getName());
			session.setAttribute("birthday", customer.getBirthDay());
			session.setAttribute("cardid", customer.getCardId());
			session.setAttribute("address", customer.getAddress());
			session.setAttribute("email", customer.getEmail());
			session.setAttribute("telephone", customer.getTelephone());
			session.setAttribute("number", customer.getNumberOfTickets());
			session.setAttribute("idticket", customer.getIdTicket());
		}
		return new ResponseEntity<String>("success", HttpStatus.OK);
	}

	@GetMapping("/confirm")
	public String getConfirm(HttpSession session, Model model) {
		if (session.getAttribute("id") == null) {
			model.addAttribute("error", "error");
		} else {
			Customer customer = new Customer();
			customer.setId((String) session.getAttribute("id"));
			customer.setName((String) session.getAttribute("name"));
			customer.setBirthDay((String) session.getAttribute("birthday"));
			customer.setCardId((String) session.getAttribute("cardid"));
			customer.setAddress((String) session.getAttribute("address"));
			customer.setEmail((String) session.getAttribute("email"));
			customer.setTelephone((String) session.getAttribute("telephone"));
			customer.setNumberOfTickets((int) session.getAttribute("number"));
			customer.setIdTicket((int) session.getAttribute("idticket"));
			BusRoute busRoute =busRouteService.findOne(customer.getIdTicket());
			model.addAttribute("customer",customer);
			model.addAttribute("busRoute",busRoute);
			model.addAttribute("route","Đà Nẵng - " + busRoute.getDestination().split("-")[0]);
		}
		return "booking-ticket-3";
	}
	
	@PostMapping("/cancel/{code}")
	public @ResponseBody ResponseEntity<String> postCancel(@PathVariable String code,Model model){
		Customer customer = customerService.find(code);
		if (customer == null) return new ResponseEntity<String>("Mã vé không tồn tại",HttpStatus.FORBIDDEN);
		customerService.delete(customer);
		BusRoute busRoute = busRouteService.findOne(customer.getIdTicket());
		busRoute.setRemainingTickets(busRoute.getRemainingTickets() + 1);
		busRouteService.save(busRoute);
		return new ResponseEntity<String>("Hủy vé thành công",HttpStatus.OK);
	}
	
	@PostMapping("/book/{method}")
	public @ResponseBody ResponseEntity<String> getBook(@PathVariable int method, HttpSession session, Model model) {
		if (session.getAttribute("id") == null) {
			model.addAttribute("error", "error");
			return new ResponseEntity<String>("false",HttpStatus.FORBIDDEN);
		} else {
			Customer customer = new Customer();
			customer.setId((String) session.getAttribute("id"));
			customer.setName((String) session.getAttribute("name"));
			customer.setBirthDay((String) session.getAttribute("birthday"));
			customer.setCardId((String) session.getAttribute("cardid"));
			customer.setAddress((String) session.getAttribute("address"));
			customer.setEmail((String) session.getAttribute("email"));
			customer.setTelephone((String) session.getAttribute("telephone"));
			customer.setNumberOfTickets((int) session.getAttribute("number"));
			customer.setIdTicket((int) session.getAttribute("idticket"));
			customer.setMethod(method);
			customerService.save(customer);
			BusRoute busRoute = busRouteService.findOne(customer.getIdTicket());
			busRoute.setRemainingTickets(busRoute.getRemainingTickets() - 1);
			if (busRoute.getRemainingTickets() <=0) busRoute.setRemainingTickets(0);
			busRouteService.save(busRoute);
			
				new Thread(() -> {
					SimpleMailMessage mailMessage = new SimpleMailMessage();
					mailMessage.setTo(customer.getEmail());
					mailMessage.setSubject("mã vé (vui lòng lưu lại)");
					mailMessage.setText("mã vé của bạn: "+customer.getId());
					mailSender.send(mailMessage);				
				}).start();
		}
		return new ResponseEntity<String>("ok",HttpStatus.OK);}
}
