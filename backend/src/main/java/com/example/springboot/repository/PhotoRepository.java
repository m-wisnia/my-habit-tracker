package com.example.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springboot.entity.Photo;

public interface PhotoRepository extends JpaRepository<Photo, Long> {
}