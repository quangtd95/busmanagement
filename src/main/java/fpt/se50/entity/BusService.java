package fpt.se50.entity;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


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

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Set<BusRoute> getBusRoutes() {
		return busRoutes;
	}

	public void setBusRoutes(Set<BusRoute> busRoutes) {
		this.busRoutes = busRoutes;
	}
	
	
	
}
