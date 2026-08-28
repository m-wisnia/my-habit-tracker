package com.example.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springboot.entity.Habit;

public interface HabitRepository extends JpaRepository<Habit, Long> {
}