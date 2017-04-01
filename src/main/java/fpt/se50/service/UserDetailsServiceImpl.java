package fpt.se50.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import fpt.se50.entity.Admin;
import fpt.se50.repository.AdminRepository;


@Service
public class UserDetailsServiceImpl implements UserDetailsService{

	@Autowired
	private AdminRepository adminRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Admin admin = adminRepository.findByUserName(username);
		if (admin == null) {
			throw new UsernameNotFoundException("admin not found");
		}
		Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
		/*Set<Role> roles = admin.getRoles();
		for (Role role : roles) {
			grantedAuthorities.add(new SimpleGrantedAuthority(role.getName()));
		}*/
		return new org.springframework.security.core.userdetails.User(
				admin.getUserName(),admin.getPassword(),grantedAuthorities);
	}
}
