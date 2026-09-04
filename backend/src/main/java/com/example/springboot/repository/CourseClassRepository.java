package com.example.springboot.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.springboot.entity.CourseClass;

public interface CourseClassRepository extends JpaRepository<CourseClass, Long> {

  @Query("""
      SELECT cc
      FROM CourseClass cc
      WHERE CAST (cc.classStart as LocalDate) <= :date2
      AND CAST (cc.classStart as LocalDate) >= :date1
      """)
  List<CourseClass> findClassesBetweenDates(
      @Param("date1") LocalDate date1,
      @Param("date2") LocalDate date2);

  @Query("""
      SELECT cc
      FROM CourseClass cc
      WHERE CAST (cc.classStart as LocalDate) = :date
      """)
  List<CourseClass> findClassesHappeningOn(
      @Param("date") LocalDate date);
}