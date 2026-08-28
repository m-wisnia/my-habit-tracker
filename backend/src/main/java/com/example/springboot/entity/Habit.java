package com.example.springboot.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "habit")
@Data
@NoArgsConstructor
public class Habit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long habitId;

    @Column(length = 7)
    private String color;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int[] days;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal goal;

    @Column
    private String unit;
}
