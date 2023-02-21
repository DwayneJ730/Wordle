package com.codingdojo.braingames.services;

import java.util.List;
import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import com.codingdojo.braingames.models.LoginUser;
import com.codingdojo.braingames.models.User;
import com.codingdojo.braingames.repositories.UserRepository;

    
@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepo;
    
    // TO-DO: Write register and login methods!
    public User register(User newUser, BindingResult result) {
// TO-DO - Reject values or register if no errors:
        String email = newUser.getEmail();
        Optional<User> potentialUser = userRepo.findByEmail(email);
        // Reject if email is taken (present in database)
        if(potentialUser.isPresent()) {
        	result.rejectValue("email", "unique", "Email already registered!");
        }
        
        // Reject if password doesn't match confirmation
    	if(!newUser.getPassword().equals(newUser.getConfirm())) {
    	    result.rejectValue("confirm", "Matches", "The Confirm Password must match Password!");
    	}

        
        // Return null if result has errors
        if(result.hasErrors()) {
        	return null;
        }
    
        // Hash and set password, save user to database
        String hashed = BCrypt.hashpw(newUser.getPassword(), BCrypt.gensalt());
        newUser.setPassword(hashed);
        
        userRepo.save(newUser);
        
        return newUser;
    }
    public User login(LoginUser newLoginObject, BindingResult result) {
 // TO-DO - Reject values:
        
    	// Find user in the DB by email
    	String email = newLoginObject.getEmail();
    	Optional<User> potentialUser = userRepo.findByEmail(email);
        // Reject if NOT present
        if(!potentialUser.isPresent()) {
        	result.rejectValue("password", "Matches", "Invalid email or password!");
        	return null;
        }
        
        User user = potentialUser.get();
        // Reject if BCrypt password match fails
        if(!BCrypt.checkpw(newLoginObject.getPassword(), user.getPassword())) {
            result.rejectValue("password", "Matches", "Invalid email or password!");
        }

        // Return null if result has errors
        if(result.hasErrors()) {
        	return null;
        }
    
        // Otherwise, return the user object
        return user;
    }
    
    public User findUser(Long id) {
    	Optional<User> optionalUser = userRepo.findById(id);
    	
    	return optionalUser.get();
    }
    
    public List<User> allUsers() {
		 return (List<User>) userRepo.findAll();
	 }
}

