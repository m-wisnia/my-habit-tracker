export interface Category {
  categoryId: number;
  name: string;
  color: string;
}

export interface Event {
  eventId: number;
  color: string;
  name: string;
  address: string | null;
  fullday: boolean;
  dateStart: string;
  timeStart: string | null;
  dateEnd: string | null;
  duration: string | null;
  notes: string | null;
  category: Category;
}

export interface Subject {
  subjectId: number;
  color: string;
  name: string;
}

export interface Course {
  courseId: number;
  type: string;
  repeatWeeks: number | null;
  subject: Subject;
}

export interface CourseClass {
  courseClassId: number;
  classStart: string;
  duration: string;
  professor: string | null;
  room: string | null;
  course: Course;
}

export interface Project {
  projectId: number;
  color: string;
  name: string;
  startDate: string;
}

export interface Stage {
  stageId: number;
  stageNumber: number;
  name: string;
  completed: boolean;
  deadline: string | null;
  project: Project;
}

export type CalendarItem = Event | CourseClass | Stage;