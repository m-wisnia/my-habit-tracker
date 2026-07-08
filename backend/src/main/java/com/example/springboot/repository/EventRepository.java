package com.example.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springboot.entity.Event;

public interface EventRepository extends JpaRepository<Event, Long> {}