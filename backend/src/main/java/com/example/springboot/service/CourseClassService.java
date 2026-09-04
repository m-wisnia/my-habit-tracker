package com.example.springboot.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import com.example.springboot.repository.CourseClassRepository;
import com.example.springboot.entity.CourseClass;

@Service
public class CourseClassService {

  private final CourseClassRepository classRepository;

  public CourseClassService(CourseClassRepository classRepository) {
    this.classRepository = classRepository;
  }

  public CourseClass getClassById(Long id) {
    return classRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Class not found"));
  }

  public CourseClass createCourseClass(CourseClass cclass) {
    return classRepository.save(cclass);
  }

  public CourseClass updateCourseClass(Long id, CourseClass newCClass) {
    CourseClass cclass = classRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Class not found"));

    cclass.setClassStart(newCClass.getClassStart());
    cclass.setDuration(newCClass.getDuration());
    cclass.setProfessor(newCClass.getProfessor());
    cclass.setRoom(newCClass.getRoom());

    return classRepository.save(cclass);
  }

  public void deleteCourseClass(Long id) {
    classRepository.deleteById(id);
  }

  public List<CourseClass> getClassesBetweenDates(LocalDate date1, LocalDate date2) {
    return classRepository.findClassesBetweenDates(date1, date2);
  }

  public List<CourseClass> getClassesOnDate(LocalDate date) {
    return classRepository.findClassesHappeningOn(date);
  }
}
