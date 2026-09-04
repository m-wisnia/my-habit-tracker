package com.example.springboot.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import com.example.springboot.repository.ExamRepository;
import com.example.springboot.entity.Exam;

@Service
public class ExamService {

    private final ExamRepository examRepository;

    public ExamService(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    public Exam getExamById(Long id) {
        return examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exam not found"));
    }

    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    public Exam updateExam(Long id, Exam newExam) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        exam.setName(newExam.getName());
        exam.setExamStart(newExam.getExamStart());
        exam.setDuration(newExam.getDuration());
        exam.setName(newExam.getNotes());

        return examRepository.save(exam);
    }

    public void deleteExam(Long id) {
        examRepository.deleteById(id);
    }

    public List<Exam> getExamsBetweenDates(LocalDate date1, LocalDate date2) {
        return examRepository.findExamsBetweenDates(date1, date2);
    }

    public List<Exam> getExamsOnDate(LocalDate date) {
        return examRepository.findExamsHappeningOn(date);
    }
}
