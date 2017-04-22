package fpt.se50.controller.auth;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import fpt.se50.entity.Admin;
import fpt.se50.service.AdminService;


@Controller
public class AuthController {
	
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private AdminService adminService;
	
	@GetMapping("/login")
	public String getLogin(){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (!(auth instanceof AnonymousAuthenticationToken)) {
			return "redirect:/";
		}
		return "login";
	}
	
	@GetMapping("/register")
	public String getRegister(Model model) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (!(auth instanceof AnonymousAuthenticationToken)) {
			return "redirect:/";
		}
		model.addAttribute("admin",new Admin());
		return "register";
	}

	@PostMapping("/register")
	public String postRegister(Admin admin, BindingResult result, RedirectAttributes redirect) {
		if (result.hasErrors()) {
			List<ObjectError> errors = result.getAllErrors();
			for (ObjectError error : errors) {
				System.out.println(error.toString());
			}
			return "register";
		}
		try {
			admin.setPassword(passwordEncoder.encode(admin.getPassword()));
			adminService.save(admin);
			redirect.addFlashAttribute("success", "Đăng ký thành công");
			return "redirect:/login";
		} catch (org.springframework.dao.DataIntegrityViolationException e) {
			e.printStackTrace();
			redirect.addFlashAttribute("error", "Email đã được sử dụng");
			return "redirect:/register";
		}

	}
	
	@GetMapping("/logout")
	public String logout(HttpServletRequest request, HttpServletResponse response, Model model,
			RedirectAttributes redirectAttributes) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			new SecurityContextLogoutHandler().logout(request, response, auth);
		}
		return "redirect:/";
	}
}
