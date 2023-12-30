package org.springframework.samples.pubus.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import org.springframework.samples.pubus.model.BaseEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "authorities")
public class Authorities extends BaseEntity{
	
	@ManyToOne
	@JoinColumn(name = "username")
	User user;
	
	@Column(length = 20)
	String authority;
	
	
}
