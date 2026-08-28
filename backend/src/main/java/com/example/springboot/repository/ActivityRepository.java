package com.example.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springboot.entity.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
}