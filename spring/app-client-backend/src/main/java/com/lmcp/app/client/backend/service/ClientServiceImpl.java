package com.lmcp.app.client.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.lmcp.app.client.backend.dao.ClientDao;
import com.lmcp.app.client.backend.model.Client;

@Service
public class ClientServiceImpl implements ClientService {

	// Dependency injection	
	@Autowired
	private ClientDao dao;
	
	@Override
	public List<Client> findAll() {
		return (List<Client>) dao.findAll();
	}
	
	@Override
	public Page<Client> findAll(Pageable pageable) {
		return dao.findAll(pageable);
	}

	@Override
	public Client findById(int id) {
		return dao.findById(id).orElse(null);
	}

	@Override
	public Client save(Client client) {
		return dao.save(client);
	}

	@Override
	public void deleteById(int id) {
		dao.deleteById(id);
	}

}
