package com.example.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springboot.entity.CourseClass;

public interface CourseClassRepository extends JpaRepository<CourseClass, Long> {
}