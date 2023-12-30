package org.springframework.samples.pubus.auth;

import java.util.ArrayList;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.pubus.auth.payload.request.SignupRequest;
import org.springframework.samples.pubus.researcher.Researcher;
import org.springframework.samples.pubus.researcher.ResearcherService;
import org.springframework.samples.pubus.user.Authorities;
import org.springframework.samples.pubus.user.AuthoritiesService;
import org.springframework.samples.pubus.user.User;
import org.springframework.samples.pubus.user.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

	private final PasswordEncoder encoder;
	private final AuthoritiesService authoritiesService;
	private final UserService userService;
	private final ResearcherService researcherService;

	@Autowired
	public AuthService(PasswordEncoder encoder, AuthoritiesService authoritiesService, UserService userService,
			ResearcherService researcherService) {
		this.encoder = encoder;
		this.authoritiesService = authoritiesService;
		this.userService = userService;
		this.researcherService = researcherService;
	}

	@Transactional
	public void createUser(@Valid SignupRequest request) {
		User user = new User();
		user.setUsername(request.getUsername());
		user.setPassword(encoder.encode(request.getPassword()));
		String strRoles = request.getAuthority();
		Authorities role;

		switch (strRoles.toLowerCase()) {
		case "admin":
			role = authoritiesService.findByAuthority("ADMIN");
			user.setAuthority(role);
			userService.saveUser(user);
			break;

		default:
			role = authoritiesService.findByAuthority("RESEARCHER");
			user.setAuthority(role);
			userService.saveUser(user);
			Researcher researcher = new Researcher();
			researcher.setFirstName(request.getFirstName());
			researcher.setLastName(request.getLastName());
			researcher.setCity(request.getCity());
			researcher.setUser(user);
			researcherService.saveResearcher(researcher);

		}
	}

}
