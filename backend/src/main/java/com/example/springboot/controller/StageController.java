package com.example.springboot.controller;

import com.example.springboot.entity.Stage;
import com.example.springboot.repository.StageRepository;
import com.example.springboot.service.StageService;

import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/stages")
public class StageController {

  private final StageService stageService;

  public StageController(StageService stageService, StageRepository stageRepository) {
    this.stageService = stageService;
  }

  @GetMapping("/between")
  public List<Stage> getStagesBetweenDates(
      @RequestParam LocalDate date1,
      @RequestParam LocalDate date2) {

    return stageService.getStagesBetweenDates(date1, date2);
  }

  @GetMapping
  public List<Stage> getStagesOnDate(
      @RequestParam LocalDate date) {

    return stageService.getStagesOnDate(date);
  }

  @GetMapping("/{id}")
  public Stage getstageById(@PathVariable Long id) {
    return stageService.getStageById(id);
  }

  @PostMapping
  public Stage createEvent(@Valid @RequestBody Stage stage) {
    return stageService.createStage(stage);
  }

  @PutMapping("/{id}")
  public Stage updateStage(
      @PathVariable Long id,
      @Valid @RequestBody Stage stage) {

    return stageService.updateStage(id, stage);
  }

  @DeleteMapping("/{id}")
  public void deleteStage(@PathVariable Long id) {
    stageService.deleteStage(id);
  }
}