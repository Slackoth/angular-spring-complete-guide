package com.lmcp.app.client.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.lmcp.app.client.backend.model.Client;

// JpaRepository extends CrudRepository and also PagingAndSortingRepository
public interface ClientDao extends JpaRepository<Client, Integer>/*CrudRepository<Client, Integer>*/ {

}
