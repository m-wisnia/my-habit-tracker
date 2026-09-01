package com.example.springboot.entity;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "event")
@Data
@NoArgsConstructor
public class Event {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long eventId;

  @NotBlank(message = "Color is required")
  @Pattern(regexp = "^#[0-9A-Fa-f]{6}$", message = "Color must be a valid hex color")
  @Column(length = 7)
  private String color;

  @NotBlank(message = "Name is required")
  @Column(nullable = false)
  private String name;

  @Column
  private String address;

  @NotNull(message = "Fullday must be specified")
  @Column(nullable = false)
  private Boolean fullday;

  @NotNull(message = "Start date is required")
  @Column(nullable = false)
  private LocalDate dateStart;

  @Column
  private LocalDate dateEnd;

  @Column
  private LocalTime timeStart;

  @JdbcTypeCode(SqlTypes.INTERVAL_SECOND)
  @Column(columnDefinition = "interval")
  private Duration duration;

  @Column
  private String notes;

  @ManyToOne(optional = false, fetch = FetchType.LAZY)
  @JoinColumn(name = "category_id", nullable = false)
  private Category category;
}