package com.codingdojo.braingames.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.codingdojo.braingames.models.Score;



public interface ScoreRepository extends CrudRepository<Score, Long>{
	List<Score> findAll();
}
