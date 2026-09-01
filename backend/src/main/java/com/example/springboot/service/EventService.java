package com.example.springboot.service;

import org.springframework.stereotype.Service;
import com.example.springboot.repository.EventRepository;
import com.example.springboot.entity.Event;

import java.util.List;
import java.time.LocalDate;

@Service
public class EventService {

  private final EventRepository eventRepository;

  public EventService(EventRepository eventRepository) {
    this.eventRepository = eventRepository;
  }

  public List<Event> getEventsBetweenDays(LocalDate date1, LocalDate date2) {
    return eventRepository.findEventsBetweenDates(date1, date2);
  }

  public Event getEventById(Long id) {
    return eventRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Event not found"));
  }

  public Event createEvent(Event event) {
    validateEvent(event);
    return eventRepository.save(event);
  }

  public Event updateEvent(Long id, Event updatedEvent) {
    Event event = eventRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Event not found"));

    event.setColor(updatedEvent.getColor());
    event.setName(updatedEvent.getName());
    event.setAddress(updatedEvent.getAddress());
    event.setFullday(updatedEvent.getFullday());
    event.setDateStart(updatedEvent.getDateStart());
    event.setTimeStart(updatedEvent.getTimeStart());
    event.setDateEnd(updatedEvent.getDateEnd());
    event.setDuration(updatedEvent.getDuration());
    event.setNotes(updatedEvent.getNotes());
    event.setCategory(updatedEvent.getCategory());

    validateEvent(event);
    return eventRepository.save(event);
  }

  public void deleteEvent(Long id) {
    eventRepository.deleteById(id);
  }

  public List<Event> getEventsOnDate(LocalDate date) {
    return eventRepository.findEventsHappeningOn(date);
  }

  private void validateEvent(Event event) {
    if (event.getDateEnd().isBefore(event.getDateStart())) {
      throw new IllegalArgumentException("Event end date cannot be before its start date");
    }
    if (event.getFullday()) {
      if (event.getTimeStart() != null || event.getDuration() != null) {
        throw new IllegalArgumentException("Fullday events cannot have set times");
      }
    } else if (event.getTimeStart() == null || event.getDuration() == null) {
      throw new IllegalArgumentException("Non-fullday events need to have a specified start and end times");
    }
  }
}