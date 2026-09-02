package com.example.springboot.entity;

import java.time.Duration;
import java.time.LocalDateTime;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "course_class")
@Data
@NoArgsConstructor
public class CourseClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseClassId;

    @Column(nullable = false)
    private LocalDateTime classStart;

    @JdbcTypeCode(SqlTypes.INTERVAL_SECOND)
    @Column(nullable = false, columnDefinition = "interval")
    private Duration duration;

    @Column
    private String professor;

    @Column
    private String room;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    @ToString.Exclude
    private Course course;
}
