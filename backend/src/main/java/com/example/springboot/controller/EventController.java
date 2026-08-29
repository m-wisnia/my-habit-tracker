package com.example.springboot.controller;

import com.example.springboot.entity.Event;
import com.example.springboot.service.EventService;

import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.time.LocalDate;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/events")
public class EventController {

  private final EventService eventService;

  public EventController(EventService eventService) {
    this.eventService = eventService;
  }

  @GetMapping("/between")
  public List<Event> getEventsBetweenDates(
      @RequestParam LocalDate date1,
      @RequestParam LocalDate date2) {

    return eventService.getEventsBetweenDays(date1, date2);
  }

  @GetMapping
  public List<Event> getEventsOnDate(
      @RequestParam LocalDate date) {

    return eventService.getEventsOnDate(date);
  }

  @GetMapping("/{id}")
  public Event getEventById(@PathVariable Long id) {
    return eventService.getEventById(id);
  }

  @PostMapping
  public Event createEvent(@Valid @RequestBody Event event) {
    return eventService.createEvent(event);
  }

  @PutMapping("/{id}")
  public Event updateEvent(
      @PathVariable Long id,
      @Valid @RequestBody Event event) {

    return eventService.updateEvent(id, event);
  }

  @DeleteMapping("/{id}")
  public void deleteEvent(@PathVariable Long id) {
    eventService.deleteEvent(id);
  }
}