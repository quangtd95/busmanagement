package fpt.se50.entity;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


import lombok.Data;

@Data
@Entity
@Table(name="bus_service")
public class BusService {
	@Id
	@GeneratedValue
	@Column(name="ID")
	private int id;
	
	@Column(name="NAME")
	private String name;
	
	@Column(name="PHONE")
	private String phoneNumber;
	
	@OneToMany(mappedBy="busService")
	private Set<BusRoute> busRoutes;
	
	
}
