package com.example.springboot.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "event")
@Data
@NoArgsConstructor
public class Event {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long eventId;

  @Column(length = 7)
  private String color;

  @Column(nullable = false)
  private String name;

  @Column
  private String address;

  @Column(nullable = false)
  private Boolean fullday;

  @Column(nullable = false)
  private LocalDate dateStart;

  @Column
  private LocalTime timeStart;

  @Column(nullable = false)
  private LocalDate dateEnd;

  @Column
  private LocalTime timeEnd;

  @Column
  private String notes;

  @ManyToOne(optional = false, fetch = FetchType.LAZY)
  @JoinColumn(name = "category_id", nullable = false)
  @ToString.Exclude
  private Category category;
}