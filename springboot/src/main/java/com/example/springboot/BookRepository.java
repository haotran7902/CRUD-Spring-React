package com.example.springboot;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookRepository extends JpaRepository<Book, Integer>{
	
	@Query("select p from Book p where p.title = ?1 and p.author = ?2 and p.bookcode != ?3")
	List<Book> getAllBookByTitleAndAuthorIdNot(String title, String author, Integer bookcode);
}
