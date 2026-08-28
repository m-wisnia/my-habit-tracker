package com.example.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springboot.entity.Stage;

public interface StageRepository extends JpaRepository<Stage, Long> {
}