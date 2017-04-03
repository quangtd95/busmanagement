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
@Table(name="transaction")
public class Transaction {
	@Id
	@GeneratedValue
	@Column(name="ID")
	private int id;
	
	@Column(name="AMOUNT")
	private int amount;
	
	@Column(name="FROM_ACCOUNT")
	private String fromAccount;
	
	@Column(name="TO_ACCOUNT")
	private String toAccount;
	
	@OneToOne
	@JoinColumn(name="TICKET_ID")
	private Ticket ticket;
}
