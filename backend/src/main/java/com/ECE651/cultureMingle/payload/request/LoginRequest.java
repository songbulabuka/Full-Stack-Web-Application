package com.ECE651.cultureMingle.payload.request;

import lombok.Data;

@Data
public class LoginRequest {
  private String username;

  private String password;

  private String email;
}
