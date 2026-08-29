package com.example.springboot.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.springboot.entity.Event;

public interface EventRepository extends JpaRepository<Event, Long> {
  @Query("""
      SELECT e
      FROM Event e
      WHERE e.dateStart <= :date
      AND e.dateEnd >= :date
      """)
  List<Event> findEventsHappeningOn(@Param("date") LocalDate date);

  @Query("""
      SELECT e
      FROM Event e
      WHERE e.dateStart <= :date2
      AND e.dateEnd >= :date1
      """)
  List<Event> findEventsBetweenDates(
      @Param("date1") LocalDate date1,
      @Param("date2") LocalDate date2);
}