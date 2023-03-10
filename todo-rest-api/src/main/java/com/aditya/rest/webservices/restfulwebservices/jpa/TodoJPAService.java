package com.aditya.rest.webservices.restfulwebservices.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aditya.rest.webservices.restfulwebservices.todo.Todo;

public interface TodoJPAService extends JpaRepository<Todo, Integer> {
	List<Todo> findByUsername(String username); 
}
