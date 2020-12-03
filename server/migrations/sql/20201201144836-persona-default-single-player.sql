INSERT INTO persona (id, name, description, color, author_id, is_read_only, is_shared)
VALUES
  (1, 'Participant', 'The default user participating in a single person scenario.', '#FFFFFF', 3, TRUE, TRUE),
  (2, 'Teacher', 'A non-specific teacher, participating in a multi person scenario.', '#3f59a9', 3, TRUE, TRUE),
  (3, 'Student', 'A non-specific student, participating in a multi person scenario.', '#e59235', 3, TRUE, TRUE),
  (4, 'Facilitator', 'A non-specific facilitator, leading participation in a multi person scenario.', '#73b580', 3, TRUE, TRUE)
;


-- Up above
---
-- Down below

DELETE FROM scenario_persona WHERE persona_id IN (1, 2, 3, 4);
DELETE FROM persona WHERE id IN (1, 2, 3, 4);

