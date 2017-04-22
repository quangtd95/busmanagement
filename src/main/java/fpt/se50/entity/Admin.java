package fpt.se50.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="admin")
public class Admin {
	@Id
	@GeneratedValue
	@Column(name="ID")
	private int id;
	
	@Column(name="USERNAME")
	private String userName;
	
	@Column(name="PASSWORD")
	private String password;

	public String getPassword() {
		return password;
	}

	public void setPassword(String encode) {
		this.password = encode;
	}

	public String getUserName() {
		return userName;
	}
}
