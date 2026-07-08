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

    @Column(nullable = false, length = 128)
    private String name;

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

    @ManyToOne
    @JoinColumn(name = "category_id")
    @ToString.Exclude
    private Category category;
}