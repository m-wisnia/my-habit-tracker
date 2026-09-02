package com.example.springboot.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.springboot.entity.CourseClass;

public interface CourseClassRepository extends JpaRepository<CourseClass, Long> {

  @Query("""
      SELECT cc
      FROM CourseClass cc
      WHERE cc.classStart <= :date2
      AND cc.classStart >= :date1
      """)
  List<CourseClass> findClassesBetweenDates(
      @Param("date1") LocalDateTime date1,
      @Param("date2") LocalDateTime date2);
}