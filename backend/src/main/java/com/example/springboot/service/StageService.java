package com.example.springboot.service;

import org.springframework.stereotype.Service;
import com.example.springboot.repository.StageRepository;
import com.example.springboot.entity.Stage;

import java.util.List;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class StageService {

  private final StageRepository stageRepository;

  public StageService(StageRepository stageRepository) {
    this.stageRepository = stageRepository;
  }

  public Stage getStageById(Long id) {
    return stageRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Project stage not found"));
  }

  public Stage createStage(Stage stage) {
    return stageRepository.save(stage);
  }

  public Stage updateEvent(Long id, Stage updatedStage) {
    Stage stage = stageRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Project stage not found"));

    stage.setStageNumber(updatedStage.getStageNumber());
    stage.setName(updatedStage.getName());
    stage.setCompleted(updatedStage.getCompleted());
    stage.setDeadline(updatedStage.getDeadline());

    return stageRepository.save(stage);
  }

  public void deleteStage(Long id) {
    stageRepository.deleteById(id);
  }

  public List<Stage> getStagesBetweenDates(LocalDate date1, LocalDate date2) {
    LocalDateTime start = date1.atStartOfDay();
    LocalDateTime end = date2.plusDays(1).atStartOfDay();
    return stageRepository.findStagesBetweenDates(start, end);
  }
}
