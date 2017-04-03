package fpt.se50.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fpt.se50.entity.Admin;
import fpt.se50.repository.AdminRepository;

@Service
public class AdminServiceImpl  implements AdminService{

	@Autowired
	private AdminRepository adminRepo;
	@Override
	public void save(Admin admin) {
		adminRepo.save(admin);
	}

}
