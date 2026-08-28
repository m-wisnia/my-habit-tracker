create table category (
  category_id int generated always as identity primary key,
  name text not null,
  color varchar(7) not null,
  check (color ~ '^#[0-9A-Fa-f]{6}$')
);

create table event (
  event_id int generated always as identity primary key,
  color varchar(7) Default '#EFD1E6',
  name text not null,
  address text,
  fullday boolean not null,
  date_start date not null,
  time_start time,
  date_end date not null,
  time_end time,
  category_id int not null Default 1,
  notes text,
  check (
    -- Full-day event
    (
      fullday = true
      and time_start is null
      and time_end is null
      and date_end >= date_start
    )
    or
    -- Not fullday
    (
      fullday = false
      and time_start is not null
      and time_end is not null
      and (
        date_end > date_start
        or (
          date_end = date_start
          and time_end > time_start
        )
      )
    )
    and (color ~ '^#[0-9A-Fa-f]{6}$')
  )
);

alter table event
add constraint event_category_fk foreign key (category_id) references category (category_id);

create table subject (
  subject_id int generated always as identity primary key,
  color varchar(7) Default '#F8E3BB',
  name text not null,
  check (color ~ '^#[0-9A-Fa-f]{6}$')
);

create table class (
  class_id int generated always as identity primary key,
  type text not null,
  professor text,
  room text,
  repeat_weeks int,
  subject_id int not null,
  check (
    repeat_weeks is null
    or repeat_weeks > 0
  )
);

alter table class
add constraint class_subject_fk foreign key (subject_id) references subject (subject_id);

create table class_event (
  class_event_id int generated always as identity primary key,
  class_date date not null,
  time_start time not null,
  duration interval not null,
  class_id int not null
);

alter table class_event
add constraint class_event_class_fk foreign key (class_id) references class (class_id);

create table exam (
  exam_id int generated always as identity primary key,
  name text not null,
  exam_date date not null,
  time_start time not null,
  duration interval not null,
  notes text,
  subject_id int not null
);

alter table exam
add constraint exam_subject_fk foreign key (subject_id) references subject (subject_id);

create table habit (
  habit_id int generated always as identity primary key,
  name text not null,
  days int[] not null,
  goal numeric not null,
  unit text,
  check (
    goal >= 0
    and days <@ ARRAY[1, 2, 3, 4, 5, 6, 7]
  )
);

create table habit_instance (
  habit_instance_id int generated always as identity primary key,
  habit_date date not null,
  completion numeric not null,
  habit_id int not null,
  check (completion >= 0)
);

alter table habit_instance
add constraint habit_instance_habit_fk foreign key (habit_id) references habit (habit_id);

create table project (
  project_id int generated always as identity primary key,
  name text not null,
  start_date date not null Default now()
);

create table activity (
  project_activity_id int generated always as identity primary key,
  activity_date date not null,
  activity_time interval,
  project_id int not null
);

alter table activity
add constraint activity_project_fk foreign key (project_id) references project (project_id);

create table stage (
  stage_id int generated always as identity primary key,
  stage_number int not null,
  name text not null,
  deadline timestamp,
  project_id int not null,
  check (stage_number >= 0)
);

alter table stage
add constraint stage_project_fk foreign key (project_id) references project (project_id);

create table task (
  task_id int generated always as identity primary key,
  name text not null,
  deadline timestamp,
  completed boolean not null,
  stage_id int
);

alter table task
add constraint task_stage_fk foreign key (stage_id) references stage (stage_id);

create table photo (
  photo_id int generated always as identity primary key,
  filename text,
  content_type text,
  photo bytea,
  project_id int not null,
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

insert into
  event (
    name,
    address,
    fullday,
    date_start,
    time_start,
    date_end,
    time_end,
    category_id,
    notes
  )
values
  (
    'Event 1',
    'ABC street DEF city',
    false,
    '2026-08-24',
    '12:30:00',
    '2026-08-24',
    '14:15:00',
    1,
    null
  ),
  (
    'Event 2',
    null,
    true,
    '2026-08-15',
    null,
    '2026-08-17',
    null,
    1,
    'Note'
  );
