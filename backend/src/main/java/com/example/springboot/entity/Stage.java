package com.example.springboot.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "stage")
@Data
@NoArgsConstructor
public class Stage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stageId;

    @Column(nullable = false)
    private int stageNumber;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Boolean completed;

    @Column
    private LocalDateTime deadline;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    @ToString.Exclude
    private Project project;
}
