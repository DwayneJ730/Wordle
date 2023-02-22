package com.codingdojo.braingames.controllers;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.codingdojo.braingames.services.UserService;
import com.codingdojo.braingames.services.ScoreService;

import com.codingdojo.braingames.models.Score;

@Controller
public class WordleController {
	@Autowired
	private UserService userServ;
	
	@Autowired
	private ScoreService scoreServ;
	
	@GetMapping("/")
	public String wordle(HttpSession session, Model model) {
		if (session.getAttribute("userId") != null) {
			model.addAttribute("userId", session.getAttribute("userId"));
			Score newScore = new Score();
			model.addAttribute("newScore", newScore);
			return "wordle.jsp";
		} else {
			return "wordle.jsp";
		}
	}
	
	@PostMapping("/scores/new")
	public String scoreProcess(@Valid @ModelAttribute("newScore") Score newScore, BindingResult result, HttpSession session, 
			 Model model) {
		 if (session.getAttribute("userId") == null) {
			 return "redirect:/";
		 }
		 model.addAttribute("userId", session.getAttribute("userId"));
		 scoreServ.createScore(newScore);
			 
		 return "redirect:/";
	}
	
	@GetMapping("/scores")
	public String scores(HttpSession session, Model model) {
		if (session.getAttribute("userId") != null) {
			model.addAttribute("userId", session.getAttribute("userId"));
			model.addAttribute("scores", scoreServ.allScores());
			return "scores.jsp";
		} else {
			return "redirect:/";
		}
	}
}
