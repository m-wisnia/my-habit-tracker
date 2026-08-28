package com.example.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springboot.entity.Exam;

public interface ExamRepository extends JpaRepository<Exam, Long> {
}