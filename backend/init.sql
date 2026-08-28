create table category (
  category_id int generated always as identity primary key,
  name text not null,
  color varchar(7) not null
);

create table event (
  event_id int generated always as identity primary key,
  name text not null,
  address text,
  fullday boolean not null,
  date_start date not null,
  time_start time,
  date_end date not null,
  time_end time,
  category_id int not null,
  notes text
);

alter table event
add constraint event_category_fk foreign key (category_id) references category (category_id);

create table subject (
  subject_id int generated always as identity primary key,
  name text not null
);

create table class (
  class_id int generated always as identity primary key,
  type text not null,
  professor text,
  room text,
  repeat_weeks int not null,
  subject_id int not null
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
  unit text
);

create table habit_instance (
  habit_instance_id int generated always as identity primary key,
  habit_date date not null,
  completion numeric not null,
  habit_id int not null
);

alter table habit_instance
add constraint habit_instance_habit_fk foreign key (habit_id) references habit (habit_id);

create table project (
  project_id int generated always as identity primary key,
  name text not null
);

create table activity (
  project_activity_id int generated always as identity primary key,
  activity_date date not null,
  activity_time time,
  project_id int not null
);

alter table activity
add constraint activity_project_fk foreign key (project_id) references project (project_id);

create table stage (
  stage_id int generated always as identity primary key,
  stage_number int not null,
  name text not null,
  deadline timestamp,
  project_id int not null
);

alter table stage
add constraint stage_project_fk foreign key (project_id) references project (project_id);

create table task (
  task_id int generated always as identity primary key,
  name text not null,
  completed boolean not null,
  stage_id int not null
);

alter table task
add constraint task_stage_fk foreign key (stage_id) references stage (stage_id);

create table photo (
  photo_id int generated always as identity primary key,
  filename text,
  photo bytea,
  project_id int not null
);

alter table photo
add constraint photo_project_fk foreign key (project_id) references project (project_id);

insert into
  category (name, color)
values
  ('Default', '#808080');
