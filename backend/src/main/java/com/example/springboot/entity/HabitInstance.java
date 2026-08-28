package com.example.springboot.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "habit_instance")
@Data
@NoArgsConstructor
public class HabitInstance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long habitInstanceId;

    @Column(nullable = false)
    private LocalDate habitDate;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal completion;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "habit_id", nullable = false)
    @ToString.Exclude
    private Habit habit;
}
