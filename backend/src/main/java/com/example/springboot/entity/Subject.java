package com.example.springboot.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "subject")
@Data
@NoArgsConstructor
public class Subject {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long subjectId;

  @Column(length = 7)
  private String color;

  @Column(nullable = false)
  private String name;
}
