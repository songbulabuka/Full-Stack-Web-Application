package com.ECE651.cultureMingle.repository;

import com.ECE651.cultureMingle.model.ERole;
import com.ECE651.cultureMingle.model.Role;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByName(ERole name);
}
