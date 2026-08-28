package com.example.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springboot.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}