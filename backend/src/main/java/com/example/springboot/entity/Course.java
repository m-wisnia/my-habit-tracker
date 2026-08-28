package com.example.springboot.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "course")
@Data
@NoArgsConstructor
public class Course {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long courseId;

  @Column(nullable = false)
  private String type;

  @Column
  private Integer repeatWeeks;

  @ManyToOne(optional = false, fetch = FetchType.LAZY)
  @JoinColumn(name = "subject_id", nullable = false)
  @ToString.Exclude
  private Subject subject;
}
