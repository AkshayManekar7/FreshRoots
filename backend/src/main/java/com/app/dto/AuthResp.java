package com.app.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AuthResp {
	
	public AuthResp(String generateJwtToken) {
		// TODO Auto-generated constructor stub
	}
	private String token;
	private String message;
	private String name;
	private String role;
	
}
