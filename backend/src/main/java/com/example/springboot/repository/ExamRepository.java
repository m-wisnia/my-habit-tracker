package com.example.springboot.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.springboot.entity.Exam;

public interface ExamRepository extends JpaRepository<Exam, Long> {
  @Query("""
      SELECT e
      FROM Exam e
      WHERE CAST (e.examStart as LocalDate) <= :date2
      AND CAST (e.examStart as LocalDate) >= :date1
      """)
  List<Exam> findExamsBetweenDates(
      @Param("date1") LocalDate date1,
      @Param("date2") LocalDate date2);

  @Query("""
      SELECT e
      FROM Exam e
      WHERE CAST (e.examStart as LocalDate) = :date
      """)
  List<Exam> findExamsHappeningOn(
      @Param("date") LocalDate date);
}