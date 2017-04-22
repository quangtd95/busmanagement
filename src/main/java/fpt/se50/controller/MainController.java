package fpt.se50.controller;


import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import fpt.se50.entity.BusRoute;
import fpt.se50.service.BusRouteService;

@Controller
public class MainController {
	
	@Autowired
	private BusRouteService busRouteService;
	
	 @GetMapping("/")
	    public String getHome(Model model) {
	        List<BusRoute> busRoutes = busRouteService.findAll();
	        model.addAttribute("busRoutes", busRoutes);
	        return "home";
	    }
	   
	    // Thêm tuyến xe - Gửi object lên cho create-form  
	    @GetMapping("/busroute/create")
	    public String create(Model model) {
	        model.addAttribute("create-form");
	        model.addAttribute("busRoute", new BusRoute());
	        return "home";
	    }
	   
	    // Sửa tuyến xe - Lấy object từ db gửi lên cho edit-form
	    @GetMapping("/busroute/{id}/edit")
	    public String edit(@PathVariable int id, Model model) {
	        model.addAttribute("edit-form");
	        model.addAttribute("busRoute", busRouteService.findOne(id));
	        return "home";
	    }
	   
	    // Lưu tuyến xe: kết quả trả về từ create-form hoặc edit-form
	    @PostMapping("/busroute/save")
	    public String save(@Valid BusRoute busRoute, BindingResult result, RedirectAttributes redirect) {
	        if (result.hasErrors()) {
	            redirect.addFlashAttribute("unsuccess", "Saved bus route unsuccessfully!");
	            return "redirect:/home";
	        }
	        busRouteService.save(busRoute);
	        redirect.addFlashAttribute("success", "Saved bus route successfully!");
	        return "redirect:/home";
	    }
	    
	    // Xoá tuyến xe
	    @RequestMapping(value = "/busroute/delete", method = RequestMethod.POST)
	    public @ResponseBody
	    String delete(@RequestBody Integer[] delete_ids) {
	    	for(int i = 0; i < delete_ids.length; i++)
	    		busRouteService.delete(delete_ids[i].intValue());
	    	return "redirect:/home";
	    }
}
