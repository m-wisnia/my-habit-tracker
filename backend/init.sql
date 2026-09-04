create table category (
  category_id bigint generated always as identity primary key,
  name text not null,
  color varchar(7) not null,
  check (color ~ '^#[0-9A-Fa-f]{6}$')
);

create table event (
  event_id bigint generated always as identity primary key,
  color varchar(7) Default '#EFD1E6',
  name text not null,
  address text,
  fullday boolean not null,
  date_start date not null,
  date_end date,
  time_start time,
  duration interval,
  notes text,
  category_id bigint not null Default 1,
  check (
    -- Full-day event
    (
      (
        fullday = true
        and time_start is null
        and duration is null
        and date_end >= date_start
      )
      or
      -- Not fullday
      (
        fullday = false
        and time_start is not null
        and duration is not null
        and duration <= interval '1 day'
        and duration > interval '0'
      )
    )
    and (color ~ '^#[0-9A-Fa-f]{6}$')
  )
);

alter table event
add constraint event_category_fk foreign key (category_id) references category (category_id);

create table subject (
  subject_id bigint generated always as identity primary key,
  color varchar(7) Default '#F8E3BB',
  name text not null,
  check (color ~ '^#[0-9A-Fa-f]{6}$')
);

create table course (
  course_id bigint generated always as identity primary key,
  type text not null,
  repeat_weeks int,
  subject_id bigint not null,
  check (
    repeat_weeks is null
    or repeat_weeks > 0
  )
);

alter table course
add constraint course_subject_fk foreign key (subject_id) references subject (subject_id);

create table course_class (
  course_class_id bigint generated always as identity primary key,
  class_start timestamp not null,
  duration interval not null,
  professor text,
  room text,
  course_id bigint not null
);

alter table course_class
add constraint course_class_fk foreign key (course_id) references course (course_id);

create table exam (
  exam_id bigint generated always as identity primary key,
  name text not null,
  exam_start timestamp not null,
  duration interval not null,
  notes text,
  subject_id bigint not null
);

alter table exam
add constraint exam_subject_fk foreign key (subject_id) references subject (subject_id);

create table habit (
  habit_id bigint generated always as identity primary key,
  color varchar(7) Default '#D4E1CB',
  name text not null,
  days int[] not null,
  goal numeric(10, 2) not null,
  unit text,
  check (
    goal >= 0
    and days <@ ARRAY[1, 2, 3, 4, 5, 6, 7]
    and color ~ '^#[0-9A-Fa-f]{6}$'
  )
);

create table habit_instance (
  habit_instance_id bigint generated always as identity primary key,
  habit_date date not null,
  completion numeric(10, 2) not null,
  habit_id bigint not null,
  check (completion >= 0)
);

alter table habit_instance
add constraint habit_instance_habit_fk foreign key (habit_id) references habit (habit_id);

create table project (
  project_id bigint generated always as identity primary key,
  color varchar(7) Default '#BCD0E4',
  name text not null,
  start_date date not null Default now(),
  check (color ~ '^#[0-9A-Fa-f]{6}$')
);

create table activity (
  project_activity_id bigint generated always as identity primary key,
  activity_date date not null,
  duration interval,
  project_id bigint not null
);

alter table activity
add constraint activity_project_fk foreign key (project_id) references project (project_id);

create table stage (
  stage_id bigint generated always as identity primary key,
  stage_number int not null,
  name text not null,
  completed boolean not null,
  deadline timestamp,
  project_id bigint not null,
  check (stage_number >= 0)
);

alter table stage
add constraint stage_project_fk foreign key (project_id) references project (project_id);

create table task (
  task_id bigint generated always as identity primary key,
  name text not null,
  deadline timestamp,
  completed boolean not null,
  project_id bigint not null,
  stage_id bigint
);

alter table task
add constraint task_stage_fk foreign key (stage_id) references stage (stage_id);

create table photo (
  photo_id bigint generated always as identity primary key,
  filename text not null,
  content_type text not null,
  photo bytea not null,
  project_id bigint not null,
  check (
    content_type in ('jpeg', 'png')
    and length(trim(filename)) > 0
    and octet_length(photo) > 0
  )
);

alter table photo
add constraint photo_project_fk foreign key (project_id) references project (project_id);

-- TRIGGERS -----
CREATE OR REPLACE FUNCTION check_project_dates () RETURNS TRIGGER AS $$
DECLARE
    project_start DATE;
    checked_date DATE;
BEGIN
    SELECT start_date
    INTO project_start
    FROM project
    WHERE project_id = NEW.project_id;

    IF TG_TABLE_NAME = 'activity' THEN
      checked_date := NEW.activity_date;
    ELSE
      checked_date := NEW.deadline;
    END IF;

    IF checked_date IS NOT NULL
      AND checked_date < project_start THEN
        RAISE EXCEPTION
          'Date (%) cannot be before project start date (%)',
          checked_date,
          project_start;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER project_activity_linearity_check
BEFORE INSERT OR UPDATE ON activity FOR EACH ROW
EXECUTE FUNCTION check_project_dates ();

CREATE TRIGGER project_stage_linearity_check
BEFORE INSERT OR UPDATE ON stage FOR EACH ROW
EXECUTE FUNCTION check_project_dates ();

CREATE TRIGGER project_task_linearity_check
BEFORE INSERT OR UPDATE ON task FOR EACH ROW
EXECUTE FUNCTION check_project_dates ();

-- PLACEHOLDER DATA -----
insert into
  category (name, color)
values
  ('Default', '#EFD1E6');

-- =========================
-- SUBJECTS
-- =========================
INSERT INTO
  subject (name)
VALUES
  ('Mathematics'),
  ('Computer Science'),
  ('Physics'),
  ('English');

-- =========================
-- COURSES
-- =========================
INSERT INTO
  course (type, repeat_weeks, subject_id)
VALUES
  (
    'Lecture',
    12,
    (
      SELECT
        subject_id
      FROM
        subject
      WHERE
        name = 'Mathematics'
    )
  ),
  (
    'Lecture',
    12,
    (
      SELECT
        subject_id
      FROM
        subject
      WHERE
        name = 'Computer Science'
    )
  ),
  (
    'Lab',
    12,
    (
      SELECT
        subject_id
      FROM
        subject
      WHERE
        name = 'Physics'
    )
  ),
  (
    'Seminar',
    8,
    (
      SELECT
        subject_id
      FROM
        subject
      WHERE
        name = 'English'
    )
  );

-- =========================
-- COURSE CLASSES
-- =========================
-- Monday 2026-08-03
INSERT INTO
  course_class (class_start, duration, professor, room, course_id)
VALUES
  (
    '2026-08-03 09:00:00',
    INTERVAL '1 hour 30 minutes',
    'Dr. Smith',
    'A101',
    (
      SELECT
        course_id
      FROM
        course
      WHERE
        type = 'Lecture'
        AND subject_id = (
          SELECT
            subject_id
          FROM
            subject
          WHERE
            name = 'Mathematics'
        )
    )
  ),
  (
    '2026-08-03 13:00:00',
    INTERVAL '1 hour 30 minutes',
    'Dr. Johnson',
    'B204',
    (
      SELECT
        course_id
      FROM
        course
      WHERE
        type = 'Lecture'
        AND subject_id = (
          SELECT
            subject_id
          FROM
            subject
          WHERE
            name = 'Computer Science'
        )
    )
  );

-- Tuesday 2026-08-04
INSERT INTO
  course_class (class_start, duration, professor, room, course_id)
VALUES
  (
    '2026-08-04 10:00:00',
    INTERVAL '2 hours',
    'Dr. Williams',
    'C301',
    (
      SELECT
        course_id
      FROM
        course
      WHERE
        type = 'Lab'
        AND subject_id = (
          SELECT
            subject_id
          FROM
            subject
          WHERE
            name = 'Physics'
        )
    )
  ),
  (
    '2026-08-04 14:00:00',
    INTERVAL '1 hour',
    'Prof. Brown',
    'D102',
    (
      SELECT
        course_id
      FROM
        course
      WHERE
        type = 'Seminar'
        AND subject_id = (
          SELECT
            subject_id
          FROM
            subject
          WHERE
            name = 'English'
        )
    )
  );

-- Wednesday 2026-08-05
INSERT INTO
  course_class (class_start, duration, professor, room, course_id)
VALUES
  (
    '2026-08-05 08:30:00',
    INTERVAL '1 hour 30 minutes',
    'Dr. Smith',
    'A101',
    (
      SELECT
        course_id
      FROM
        course
      WHERE
        type = 'Lecture'
        AND subject_id = (
          SELECT
            subject_id
          FROM
            subject
          WHERE
            name = 'Mathematics'
        )
    )
  ),
  (
    '2026-08-05 15:00:00',
    INTERVAL '1 hour 30 minutes',
    'Dr. Johnson',
    'B204',
    (
      SELECT
        course_id
      FROM
        course
      WHERE
        type = 'Lecture'
        AND subject_id = (
          SELECT
            subject_id
          FROM
            subject
          WHERE
            name = 'Computer Science'
        )
    )
  );

-- =========================
-- EVENTS
-- =========================
-- Full-day event on Monday
INSERT INTO
  event (
    name,
    address,
    fullday,
    date_start,
    date_end,
    notes,
    category_id
  )
VALUES
  (
    'University Orientation',
    'Main Campus',
    true,
    '2026-08-03',
    '2026-08-03',
    'Welcome and orientation day',
    1
  );

-- Timed event on Monday (same day as classes)
INSERT INTO
  event (
    name,
    address,
    fullday,
    date_start,
    time_start,
    duration,
    notes,
    category_id
  )
VALUES
  (
    'Doctor Appointment',
    'City Medical Center',
    false,
    '2026-08-03',
    '11:00:00',
    INTERVAL '45 minutes',
    'Bring insurance card',
    1
  );

-- Timed event on Tuesday (same day as classes)
INSERT INTO
  event (
    color,
    name,
    address,
    fullday,
    date_start,
    time_start,
    duration,
    notes,
    category_id
  )
VALUES
  (
    '#A8DADC',
    'Study Group',
    'University Library',
    false,
    '2026-08-04',
    '16:00:00',
    INTERVAL '2 hours',
    'Prepare for physics lab',
    1
  );

-- Full-day event on Wednesday
INSERT INTO
  event (
    name,
    address,
    fullday,
    date_start,
    date_end,
    notes,
    category_id
  )
VALUES
  (
    'Project Deadline',
    NULL,
    true,
    '2026-08-05',
    '2026-08-05',
    'Submit semester project',
    1
  );

-- Multi-day full-day event
INSERT INTO
  event (
    name,
    address,
    fullday,
    date_start,
    date_end,
    notes,
    category_id
  )
VALUES
  (
    'Student Conference',
    'Conference Center',
    true,
    '2026-08-06',
    '2026-08-07',
    'Annual student conference',
    1
  );

-- Another timed event
INSERT INTO
  event (
    color,
    name,
    address,
    fullday,
    date_start,
    time_start,
    duration,
    notes,
    category_id
  )
VALUES
  (
    '#FFADAD',
    'Dinner with Friends',
    'Downtown Restaurant',
    false,
    '2026-08-07',
    '19:00:00',
    INTERVAL '2 hours',
    'Dinner after conference',
    1
  );

-- Weekend full-day event
INSERT INTO
  event (
    color,
    name,
    address,
    fullday,
    date_start,
    date_end,
    notes,
    category_id
  )
VALUES
  (
    '#BDE0FE',
    'Hiking Trip',
    'National Park',
    true,
    '2026-08-08',
    '2026-08-08',
    'Meet at 08:00',
    1
  );

-- Projects
INSERT INTO
  project (name, start_date)
VALUES
  ('Website Redesign', '2026-09-01'),
  ('Mobile App Development', '2026-09-05'),
  ('Marketing Campaign', '2026-09-10'),
  ('Database Migration', '2026-09-15');

-- Stages
INSERT INTO
  stage (
    stage_number,
    name,
    completed,
    deadline,
    project_id
  )
VALUES
  -- Website Redesign
  (
    1,
    'Research & Planning',
    true,
    '2026-09-05 17:00:00',
    1
  ),
  (2, 'UI/UX Design', true, '2026-09-12 17:00:00', 1),
  (
    3,
    'Frontend Development',
    false,
    '2026-09-25 17:00:00',
    1
  ),
  (
    4,
    'Testing & Launch',
    false,
    '2026-10-02 17:00:00',
    1
  ),
  -- Mobile App Development
  (1, 'Requirements', true, '2026-09-10 17:00:00', 2),
  (2, 'Wireframes', false, '2026-09-18 17:00:00', 2),
  (
    3,
    'Backend Development',
    false,
    '2026-10-01 17:00:00',
    2
  ),
  (
    4,
    'App Development',
    false,
    '2026-10-15 17:00:00',
    2
  ),
  (
    5,
    'App Store Release',
    false,
    '2026-10-25 17:00:00',
    2
  ),
  -- Marketing Campaign
  (
    1,
    'Market Research',
    true,
    '2026-09-14 12:00:00',
    3
  ),
  (
    2,
    'Content Creation',
    false,
    '2026-09-22 17:00:00',
    3
  ),
  (
    3,
    'Social Media Launch',
    false,
    '2026-09-30 17:00:00',
    3
  ),
  (
    4,
    'Campaign Analysis',
    false,
    '2026-10-10 17:00:00',
    3
  ),
  -- Database Migration
  (
    1,
    'Database Audit',
    true,
    '2026-09-20 17:00:00',
    4
  ),
  (
    2,
    'Migration Planning',
    false,
    '2026-09-27 17:00:00',
    4
  ),
  (
    3,
    'Data Migration',
    false,
    '2026-10-05 17:00:00',
    4
  ),
  (4, 'Validation', false, '2026-10-10 17:00:00', 4);
