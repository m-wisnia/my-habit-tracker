package com.example.springboot.controller;

import com.example.springboot.service.EventService;
import com.example.springboot.service.CourseClassService;

import com.example.springboot.service.ExamService;
import com.example.springboot.service.StageService;
import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calendarEvents")
public class CalendarEventController {

  private final ExamService examService;
  private final StageService stageService;
  private final EventService eventService;
  private final CourseClassService classService;

  public CalendarEventController(EventService eventService, CourseClassService classService,
      StageService stageService, ExamService examService) {
    this.eventService = eventService;
    this.classService = classService;
    this.stageService = stageService;
    this.examService = examService;
  }

  @GetMapping("/between")
  public List<Object> getCalendarEventsBetweenDates(@RequestParam LocalDate date1,
      @RequestParam LocalDate date2) {
    List<Object> result = new ArrayList<>();

    result.addAll(eventService.getEventsBetweenDates(date1, date2));
    result.addAll(classService.getClassesBetweenDates(date1, date2));
    result.addAll(stageService.getStagesBetweenDates(date1, date2));
    result.addAll(examService.getExamsBetweenDates(date1, date2));

    return result;
  }

}
