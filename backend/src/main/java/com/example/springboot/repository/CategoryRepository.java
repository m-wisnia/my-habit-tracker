package com.example.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springboot.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {}