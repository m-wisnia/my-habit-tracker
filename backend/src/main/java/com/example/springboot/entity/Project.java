package com.example.springboot.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "project")
@Data
@NoArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;

    @Column(length = 7)
    private String color;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDate startDate;
}
