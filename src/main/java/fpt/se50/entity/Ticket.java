package fpt.se50.entity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="ticket")
public class Ticket {
	@Id
	@GeneratedValue
	@Column(name="ID")
	private int id;
	
	@Column(name="NAME")
	private String name;
	
	@Column(name="SEAT_ID")
	private int seatID;
	
	@Column(name="PAYMENT_METHOD")
	private String paymentMethod;
	
	@Column(name="STATUS")
	private int status;
	
	@ManyToOne
	@JoinColumn(name="BUS_ROUTE_ID")
	private BusRoute busRoute;
	
	@OneToOne(mappedBy="ticket")
	private Transaction transaction;
}
