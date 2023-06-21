package com.ECE651.cultureMingle.service;

import com.ECE651.cultureMingle.exception.ResourceNotFoundException;
import com.ECE651.cultureMingle.model.User;
import com.ECE651.cultureMingle.repository.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
  @Autowired private UserRepository userRepository;

  @Override
  public User createUser(User user) {
    return userRepository.save(user);
  }

  @Override
  public User updateUser(User user) {
    Optional<User> userDb = userRepository.findById(user.getId());

    if (userDb.isPresent()) {
      User userUpdate = userDb.get();
      userUpdate.setId(user.getId());
      userUpdate.setEmail(user.getEmail());
      userUpdate.setDescription(user.getDescription());
      userRepository.save(user);
      return userUpdate;
    } else {
      throw new ResourceNotFoundException("User not found with id : " + user.getId());
    }
  }

  @Override
  public User getUserById(String id) {
    Optional<User> userDb = userRepository.findById(id);

    if (userDb.isPresent()) {
      return userDb.get();
    } else {
      throw new ResourceNotFoundException("User not found with id : " + id);
    }
  }

  @Override
  public void deleteUser(String id) {
    Optional<User> userDb = userRepository.findById(id);

    if (userDb.isPresent()) {
      userRepository.delete(userDb.get());
    } else {
      throw new ResourceNotFoundException("Record not found with id : " + id);
    }
  }
}
