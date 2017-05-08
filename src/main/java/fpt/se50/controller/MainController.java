package fpt.se50.controller;


import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import fpt.se50.entity.AddBusRoute;
import fpt.se50.entity.BusRoute;
import fpt.se50.entity.BusService;
import fpt.se50.service.BusRouteService;
import fpt.se50.service.BusServiceService;

@Controller
public class MainController {
	
	@Autowired
	private BusRouteService busRouteService;
	
	@Autowired
	private BusServiceService busSvSv;
	
	 @GetMapping("/")
		public String getSearch(@RequestParam(required=false) String source,@RequestParam(required=false) String destination, @RequestParam(required=false) String busService,Model model){
			List<BusRoute> busRoutes = busRouteService.search(source,destination,busService);
			System.out.println(source+" "+destination+" "+busService);
			System.out.println(busRoutes.size());
			model.addAttribute("busRoutes", busRoutes);
			return "index";
			
		}
	    
	    // Thêm tuyến xe
	    @PostMapping("/busroute/add")
	    public @ResponseBody ResponseEntity<String> add(@RequestBody AddBusRoute addBusRoute ) {
	    	
	    	BusRoute busRoute = new BusRoute();
	    	busRoute.setSource(addBusRoute.getSource());
	    	busRoute.setDestination(addBusRoute.getDestination() + "-"
	    						+ addBusRoute.getBusServiceDestination());
//	    	String format = "2011-01-18 00:00:00.0";
	    	try {
				Date departure = (Date) new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S")
						.parse(addBusRoute.getDepartureDate() + " "
								+addBusRoute.getDepartureTime());
				Date arrival = (Date) new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S")
						.parse(addBusRoute.getArrivalDate() + " "
								+addBusRoute.getArrivalTime());
				
				busRoute.setDepartureTime(departure);
				busRoute.setArrivalTime(arrival);
			} catch (ParseException e) {
				e.printStackTrace();
			}
	    	
	    	busRoute.setRemainingTickets(Integer.parseInt(addBusRoute.getRemainingTicket()));
	    	busRoute.setTotalTickets(Integer.parseInt(addBusRoute.getTotalTickets()));
	    	busRoute.setTicketPrice(Integer.parseInt(addBusRoute.getTicketPrice()));
	    	BusService busSv = busSvSv.findByName(addBusRoute.getBusService());
	    	if (busSv != null)
	    		busRoute.setBusService(busSv);
	    	
	    	return new ResponseEntity<String>("Thêm tuyến xe thành công",HttpStatus.OK);
	    }
	   
	    // Sửa tuyến xe - Lấy object từ db gửi lên cho edit-form
	    @GetMapping("/busroute/{id}/edit")
	    public String edit(@PathVariable int id, Model model) {
	        model.addAttribute("edit-form");
	        model.addAttribute("busRoute", busRouteService.findOne(id));
	        return "index";
	    }
	   
	    // Lưu tuyến xe: kết quả trả về từ create-form hoặc edit-form
	    @PostMapping("/busroute/save")
	    public String save(@Valid BusRoute busRoute, BindingResult result, RedirectAttributes redirect) {
	        if (result.hasErrors()) {
	            redirect.addFlashAttribute("unsuccess", "Saved bus route unsuccessfully!");
	            return "redirect:/index";
	        }
	        busRouteService.save(busRoute);
	        redirect.addFlashAttribute("success", "Saved bus route successfully!");
	        return "redirect:/index";
	    }
	    
	    // Xoá tuyến xe
	    @PostMapping("/busroute/delete")
	    public @ResponseBody ResponseEntity<String> delete(@RequestBody Integer[] delete_ids) {
	    	for(int i = 0; i < delete_ids.length; i++)
	    		busRouteService.delete(delete_ids[i].intValue());
	    	return new ResponseEntity<String>("xóa tuyến xe thành công",HttpStatus.OK);
	    }

}
