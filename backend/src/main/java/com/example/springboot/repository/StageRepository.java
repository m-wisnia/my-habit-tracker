package com.example.springboot.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.springboot.entity.Stage;

public interface StageRepository extends JpaRepository<Stage, Long> {

  @Query("""
      SELECT s
      FROM Stage s
      WHERE s.deadline is not null
      AND CAST (s.deadline as LocalDate) >= :date1
      AND CAST (s.deadline as LocalDate) <= :date2
      """)
  List<Stage> findStagesBetweenDates(
      @Param("date1") LocalDate date1,
      @Param("date2") LocalDate date2);

  @Query("""
      SELECT s
      FROM Stage s
      WHERE CAST (s.deadline as LocalDate) = :date
      """)
  List<Stage> findStagesHappeningOn(
      @Param("date") LocalDate date);
}