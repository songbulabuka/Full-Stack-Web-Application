package com.ECE651.cultureMingle.service;

import com.ECE651.cultureMingle.model.Event;
import java.util.List;

public interface EventService {

  Event createEvent(Event event);

  Event updateEvent(Event event);

  Event joinEvent(String userId, String eventId);

  Event hostEvent(String userId, String eventId);

  Event bindEvent(String groupId, String eventId);

  List<Event> getAllEvent();

  Event getEventById(String id);

  void deleteEvent(String id);
}
