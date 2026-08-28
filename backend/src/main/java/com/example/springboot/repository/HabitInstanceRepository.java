package com.example.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springboot.entity.HabitInstance;

public interface HabitInstanceRepository extends JpaRepository<HabitInstance, Long> {
}