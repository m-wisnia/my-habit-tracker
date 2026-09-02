package com.example.springboot.repository;

import java.time.LocalDateTime;
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
            AND s.deadline >= :date1
            AND s.deadline <= :date2
            """)
    List<Stage> findStagesBetweenDates(
            @Param("date1") LocalDateTime date1,
            @Param("date2") LocalDateTime date2);
}