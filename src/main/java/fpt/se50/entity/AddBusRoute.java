package fpt.se50.entity;

public class AddBusRoute {
    private String source;
    private String destination;
    private String busServiceDestination;
    private String busService;
    private String departureTime;
    private String departureDate;
    private String totalTickets;
    
    public String getTotalTickets() {
		return totalTickets;
	}
	public void setTotalTickets(String totalTickets) {
		this.totalTickets = totalTickets;
	}
	public String getDepartureDate() {
		return departureDate;
	}
	public void setDepartureDate(String departureDate) {
		this.departureDate = departureDate;
	}
	public String getArrivalDate() {
		return arrivalDate;
	}
	public void setArrivalDate(String arrivalDate) {
		this.arrivalDate = arrivalDate;
	}
	private String arrivalTime;
    private String arrivalDate;
    private String ticketPrice;
    private String remainingTicket;
    private String contact;
    
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
	public String getBusServiceDestination() {
		return busServiceDestination;
	}
	public void setBusServiceDestination(String busServiceDestination) {
		this.busServiceDestination = busServiceDestination;
	}
	public String getBusService() {
		return busService;
	}
	public void setBusService(String busService) {
		this.busService = busService;
	}
	public String getDepartureTime() {
		return departureTime;
	}
	public void setDepartureTime(String departureTime) {
		this.departureTime = departureTime;
	}
	public String getArrivalTime() {
		return arrivalTime;
	}
	public void setArrivalTime(String arrivalTime) {
		this.arrivalTime = arrivalTime;
	}
	public String getTicketPrice() {
		return ticketPrice;
	}
	public void setTicketPrice(String ticketPrice) {
		this.ticketPrice = ticketPrice;
	}
	public String getRemainingTicket() {
		return remainingTicket;
	}
	public void setRemainingTicket(String remainingTicket) {
		this.remainingTicket = remainingTicket;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
    
}
