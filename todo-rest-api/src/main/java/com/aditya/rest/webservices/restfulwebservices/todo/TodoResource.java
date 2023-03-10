package com.aditya.rest.webservices.restfulwebservices.todo;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.aditya.rest.webservices.restfulwebservices.jpa.TodoJPAService;

@RestController
public class TodoResource {
	@Autowired
	private TodoJPAService todoService;
	@GetMapping("/basicAuth")
	public String basicAuth() {
		return "AUTHENTICATED";
	}
	@GetMapping("users/{username}/todos")
	public List<Todo> retrieveTodos(@PathVariable String username) {
		return todoService.findByUsername(username);
	}
	@GetMapping("users/{username}/todos/{id}")
	public Todo retrieveTodo(@PathVariable String username, @PathVariable int id) {
		return todoService.findById(id).get(); 	
	}	
	@DeleteMapping("users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable int id) {
		todoService.deleteById(id); 	
		return ResponseEntity.noContent().build();
	}	
	@PutMapping("users/{username}/todos/{id}")
	public Todo updateTodo(@PathVariable String username, @PathVariable int id, @RequestBody Todo todo) {
		todoService.save(todo); 	
		return todo;
	}
	@PostMapping("users/{username}/todos")
	public Todo createTodo(@PathVariable String username, @RequestBody Todo todo) {
		todo.setUsername(username);
		todo.setId(null);
		return todoService.save(todo);
	} 
}
