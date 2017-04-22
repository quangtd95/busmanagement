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
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getSource() {
		return source;
	}


	public void setSource(String source) {
		this.source = source;
	}


	public String getDestination() {
		return destination;
	}


	public void setDestination(String destination) {
		this.destination = destination;
	}


	public Date getDepartureTime() {
		return departureTime;
	}


	public void setDepartureTime(Date departureTime) {
		this.departureTime = departureTime;
	}


	public Date getArrivalTime() {
		return arrivalTime;
	}


	public void setArrivalTime(Date arrivalTime) {
		this.arrivalTime = arrivalTime;
	}


	public int getRemainingTickets() {
		return remainingTickets;
	}


	public void setRemainingTickets(int remainingTickets) {
		this.remainingTickets = remainingTickets;
	}


	public int getTotalTickets() {
		return totalTickets;
	}


	public void setTotalTickets(int totalTickets) {
		this.totalTickets = totalTickets;
	}


	public int getTicketPrice() {
		return ticketPrice;
	}

	public void setTicketPrice(int ticketPrice) {
		this.ticketPrice = ticketPrice;
	}

	public BusService getBusService() {
		return busService;
	}

	public void setBusService(BusService busService) {
		this.busService = busService;
	}

	public Set<Ticket> getTickets() {
		return tickets;
	}

	public void setTickets(Set<Ticket> tickets) {
		this.tickets = tickets;
	}	
	
	
}
