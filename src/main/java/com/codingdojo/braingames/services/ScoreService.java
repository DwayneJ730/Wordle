package com.codingdojo.braingames.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.codingdojo.braingames.models.Score;
import com.codingdojo.braingames.repositories.ScoreRepository;

@Service
public class ScoreService {
	private final ScoreRepository scoreRepository;
	
	 public ScoreService(ScoreRepository scoreRepository) {
	     this.scoreRepository = scoreRepository;
	 }
	 
	 public Score createScore(Score b) {
	     return scoreRepository.save(b);
	 }
	 
	 public List<Score> allScores() {
		 return scoreRepository.findAll();
	 }
	 
	 public Score findScore(Long id) {
		 Optional<Score> optionalScore = scoreRepository.findById(id);
		 if (optionalScore.isPresent()) {
	         return optionalScore.get();
	     } else {
	         return null;
	     }
	 }
	 
	 public Score updateScore(Score b) {
	     return scoreRepository.save(b);
	 } 
	 
	 public void deleteScore(Long id) {
		 scoreRepository.deleteById(id);
	 }
}
