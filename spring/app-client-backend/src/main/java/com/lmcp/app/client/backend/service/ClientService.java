package com.lmcp.app.client.backend.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.lmcp.app.client.backend.model.Client;

public interface ClientService {
	public List<Client> findAll();

	public Page<Client> findAll(Pageable pageable);
	
	public Client findById(int id);
	
	public Client save(Client client);

	public void deleteById(int id);
}
