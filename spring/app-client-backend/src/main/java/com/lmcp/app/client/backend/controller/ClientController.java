package com.lmcp.app.client.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.lmcp.app.client.backend.model.Client;
import com.lmcp.app.client.backend.service.ClientService;

// Allows CORS request. Exchange information between
// the backend domain and frontend domain
@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
// Namespace
@RequestMapping("/app-client")
public class ClientController {
	
	// Searches for the first class implementing the interface 
	@Autowired
	private ClientService service;
	
	@GetMapping("/clients")
	public ResponseEntity<?> findAllClients() {
		List<Client> lc = null;
		Map<String, Object> response = new HashMap<String, Object>();
		
		try {
			lc = service.findAll();
		}
		catch(DataAccessException ex) {
			response.put("message", "No clients found");
			
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("message", "success");
		response.put("clients", lc);
		
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
	
	@GetMapping("/clients/page/{page}")
	public ResponseEntity<?> findAllClients(@PathVariable int page) {
		Page<Client> pc = null;
		Map<String, Object> response = new HashMap<String, Object>();
		
		try {
			pc = service.findAll(PageRequest.of(page, 5));
		}
		catch(DataAccessException ex) {
			response.put("message", "No clients found");
			
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("message", "success");
		response.put("clients", pc);
		
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
	
	
	@GetMapping("/clients/{id}")
	public ResponseEntity<?> findClientById(@PathVariable int id) {
		Client c = null;
		Map<String, Object> response = new HashMap<String, Object>();
		
		try {
			c = service.findById(id);
		}
		catch(DataAccessException ex) {
			response.put("message", "Server error: "
					.concat(ex.getMostSpecificCause().getLocalizedMessage()));
			
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(c == null) {
			response.put("message", "Client not found");
			
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		response.put("message", "success");
		response.put("client", c);
		
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
	
	@PostMapping("/clients")
	public ResponseEntity<?> saveClient(@Valid @RequestBody Client client, BindingResult result) {
		Client c = null;
		Map<String, Object> response = new HashMap<String, Object>();
		
		if(result.hasErrors()) {
			List<String> errors = result.getFieldErrors()
					.stream()
					.map(e -> "Field " + e.getField() + " " + e.getDefaultMessage())
					.collect(Collectors.toList());
			
//			for(FieldError e: result.getFieldErrors()) {
//				errors.add("Field " + e.getField() + " " + e.getDefaultMessage());
//			}
			
			response.put("errors", errors);
			
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		try {
			c = service.save(client);
		}
		catch(DataAccessException ex) {
			response.put("message", "Client could not be created.");
			
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("message", "success");
		response.put("client", c);
		
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@PutMapping("/clients/{id}")
	public ResponseEntity<?> updateClient(@Valid @RequestBody Client client, BindingResult result, @PathVariable int id) {
		Map<String, Object> response = new HashMap<String, Object>();
		
		if(result.hasErrors()) {
			List<String> errors = result.getFieldErrors()
					.stream()
					.map(e -> "Field " + e.getField() + " " + e.getDefaultMessage())
					.collect(Collectors.toList());
		
			response.put("errors", errors);
			
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		if(client == null) {
			response.put("message", "Client with ID " + id + " does not exists");
			
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		} 
		
		Client cc = null;
		
		try {
			cc = service.findById(id);
			
			cc.setFirstName(client.getFirstName());
			cc.setLastName(client.getLastName());
			cc.setEmail(client.getEmail());
			
			service.save(cc);
		}
		catch(DataAccessException ex) {
			response.put("message", "Client with ID " + id + " could not be updated");
			
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("message", "success");
		response.put("client", cc);
		
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/clients/{id}")
	public ResponseEntity<?> deleteClientById(@PathVariable int id) {
		Map<String, Object> response = new HashMap<String, Object>();
		
		try {
			service.deleteById(id);
		}
		catch(DataAccessException ex) {
			response.put("message", "Client with ID " + id + " could not be deleted");
			
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("message", "success");
		
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
}
