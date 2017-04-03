package fpt.se50.entity;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="bus_route")
public class BusRoute {
	@Id
	@GeneratedValue
	@Column(name="ID")
	private int id;
	
	@Column(name="SOURCE")
	private String source;
	
	@Column(name="DESTINATION")
	private String destination;
	
	@Column(name="DEPARTURE_TIME")
	private Date departureTime;
	
	@Column(name="ARRIVAL_TIME")
	private Date arrivalTime;
	
	@Column(name="REMAINING_TICKETS")
	private int remainingTickets;
	
	@Column(name="TOTAL_TICKETS")
	private int totalTickets;
	
	@Column(name="TICKET_PRICE")
	private int ticketPrice;
	
	@ManyToOne
	@JoinColumn(name="BUS_SERVICE_ID")
	private BusService busService;
	
	
	@OneToMany(mappedBy="busRoute")
	private Set<Ticket> tickets;
}
