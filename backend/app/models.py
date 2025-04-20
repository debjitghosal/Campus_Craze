from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Initialize Flask and SQLAlchemy
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'  # Modify for your DB URI
db = SQLAlchemy(app)

# Define User App model (Corresponds to user_app in Django)
class UserApp(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(10))
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone_number = db.Column(db.String(15), nullable=True)
    user_name = db.Column(db.String(100), nullable=False)
    registration_date = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime, nullable=True)
    department = db.Column(db.String(100), nullable=True)
    profile_picture = db.Column(db.LargeBinary, nullable=True)

    def __repr__(self):
        return f"<UserApp {self.user_name} ({self.role})>"

# Course model
class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    instructor_id = db.Column(db.Integer, db.ForeignKey('user_app.id'), nullable=False)
    course_name = db.Column(db.String(255), nullable=False)
    course_code = db.Column(db.String(20), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=True)
    creation_date = db.Column(db.DateTime, default=datetime.utcnow)
    last_updated = db.Column(db.DateTime, default=datetime.utcnow)

    instructor = db.relationship('UserApp', backref='courses')

    def __repr__(self):
        return f"<Course {self.course_name}>"

# CourseModule model
class CourseModule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    module_title = db.Column(db.String(255), nullable=False)
    module_order = db.Column(db.Integer, nullable=False)
    estimated_time = db.Column(db.Integer, nullable=True)
    prerequisite_module_id = db.Column(db.Integer, db.ForeignKey('course_module.id'), nullable=True)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    course = db.relationship('Course', backref=db.backref('modules', lazy=True))
    prerequisite_module = db.relationship('CourseModule', remote_side=[id], backref='next_modules')

    def __repr__(self):
        return f"<CourseModule {self.module_title}>"

# Library model
class Library(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_type = db.Column(db.String(20))
    title = db.Column(db.String(255), nullable=False)
    file_url = db.Column(db.String(255), nullable=False)
    upload_date = db.Column(db.DateTime, default=datetime.utcnow)
    description = db.Column(db.Text, nullable=True)
    version = db.Column(db.Integer, default=1)
    previous_version_id = db.Column(db.Integer, db.ForeignKey('library.id'), nullable=True)
    source_type = db.Column(db.String(20))
    source_content_id = db.Column(db.Integer, db.ForeignKey('course_content.id'), nullable=True)

    previous_version = db.relationship('Library', remote_side=[id])
    source_content = db.relationship('CourseContent', backref='library_items')

    def __repr__(self):
        return f"<Library {self.title}>"

# CourseContent model
class CourseContent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    module_id = db.Column(db.Integer, db.ForeignKey('course_module.id'), nullable=False)
    content_type = db.Column(db.String(10))
    title = db.Column(db.String(255), nullable=False)
    uploaded_file = db.Column(db.String(255), nullable=True)  # File path or URL
    description = db.Column(db.Text, nullable=True)
    upload_date = db.Column(db.DateTime, default=datetime.utcnow)
    library_item_id = db.Column(db.Integer, db.ForeignKey('library.id'), nullable=True)

    module = db.relationship('CourseModule', backref=db.backref('contents', lazy=True))
    library_item = db.relationship('Library', backref='course_contents')

    def __repr__(self):
        return f"<CourseContent {self.title}>"

    def save(self, *args, **kwargs):
        is_new = not self.pk
        db.session.add(self)
        if is_new:
            file_url = self.uploaded_file if self.uploaded_file else ''
            library_item = Library(
                item_type=self.content_type,
                title=self.title,
                file_url=file_url,
                description=self.description,
                source_type='course_content',
                source_content=self,
            )
            db.session.add(library_item)
            db.session.commit()
            self.library_item_id = library_item.id
        super().save(*args, **kwargs)

# Assignment model
class Assignment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    instructor_id = db.Column(db.Integer, db.ForeignKey('user_app.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    module_id = db.Column(db.Integer, db.ForeignKey('course_module.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    due_date = db.Column(db.DateTime, nullable=False)
    assigned_date = db.Column(db.DateTime, default=datetime.utcnow)
    max_marks = db.Column(db.Numeric(5, 2), default=100)

    instructor = db.relationship('UserApp', backref='assignments')
    course = db.relationship('Course', backref='assignments')
    module = db.relationship('CourseModule', backref='assignments')

    def __repr__(self):
        return f"<Assignment {self.title}>"

# AssignmentSubmission model
class AssignmentSubmission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('user_app.id'), nullable=False)
    assignment_id = db.Column(db.Integer, db.ForeignKey('assignment.id'), nullable=False)
    submission_time = db.Column(db.DateTime, default=datetime.utcnow)
    submitted_file = db.Column(db.String(255))  # Store the file path here
    grade = db.Column(db.Numeric(5, 2), nullable=True)
    feedback = db.Column(db.Text, nullable=True)

    student = db.relationship('UserApp', backref='submissions')
    assignment = db.relationship('Assignment', backref='submissions')

    __table_args__ = (
        db.UniqueConstraint('student_id', 'assignment_id'),
    )

    def __repr__(self):
        return f"<AssignmentSubmission {self.student.user_name} - {self.assignment.title}>"

# Contest model
class Contest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    created_by_id = db.Column(db.Integer, db.ForeignKey('user_app.id'), nullable=False)
    department_hosted = db.Column(db.String(100), nullable=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=True)

    created_by = db.relationship('UserApp', backref='contests')
    course = db.relationship('Course', backref='contests')

    def __repr__(self):
        return f"<Contest {self.name}>"

# QuizSession model
class QuizSession(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    contest_id = db.Column(db.Integer, db.ForeignKey('contest.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user_app.id'), nullable=False)
    start_time = db.Column(db.DateTime, default=datetime.utcnow)
    end_time = db.Column(db.DateTime, nullable=True)
    score = db.Column(db.Numeric(5, 2), nullable=True)

    contest = db.relationship('Contest', backref='sessions')
    user = db.relationship('UserApp', backref='sessions')

    __table_args__ = (
        db.UniqueConstraint('contest_id', 'user_id'),
    )

    def __repr__(self):
        return f"<QuizSession {self.user.user_name} in {self.contest.name}>"

# QuizQuestion model
class QuizQuestion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    contest_id = db.Column(db.Integer, db.ForeignKey('contest.id'), nullable=False)
    question_text = db.Column(db.Text, nullable=False)
    correct_answer = db.Column(db.String(255), nullable=False)
    points = db.Column(db.Numeric(3, 1), default=1)

    contest = db.relationship('Contest', backref='questions')

    def __repr__(self):
        return f"<QuizQuestion {self.question_text[:50]}>"

# QuizOption model
class QuizOption(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('quiz_question.id'), nullable=False)
    option_text = db.Column(db.String(255), nullable=False)

    question = db.relationship('QuizQuestion', backref='options')

    def __repr__(self):
        return f"<QuizOption {self.option_text}>"

# UserCourseProgress model
class UserCourseProgress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user_app.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    module_id = db.Column(db.Integer, db.ForeignKey('course_module.id'), nullable=True)
    completion_status = db.Column(db.String(20), default='not_started')
    last_access_date = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('UserApp', backref='progress')
    course = db.relationship('Course', backref='progress')
    module = db.relationship('CourseModule', backref='progress')

    __table_args__ = (
        db.UniqueConstraint('user_id', 'course_id'),
    )

    def __repr__(self):
        return f"<UserCourseProgress {self.user.user_name} - {self.course.course_name}>"

# UserQuizAnswer model
class UserQuizAnswer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.Integer, db.ForeignKey('quiz_session.id'), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('quiz_question.id'), nullable=False)
    user_answer = db.Column(db.String(255), nullable=True)
    is_correct = db.Column(db.Boolean, default=False)
    answer_timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    session = db.relationship('QuizSession', backref='answers')
    question = db.relationship('QuizQuestion', backref='answers')

    __table_args__ = (
        db.UniqueConstraint('session_id', 'question_id'),
    )

    def __repr__(self):
        return f"<UserQuizAnswer {self.session.user.user_name}'s answer to {self.question.question_text[:30]}>"

# CourseEnrollment model
class CourseEnrollment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('user_app.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    enrolled_at = db.Column(db.DateTime, default=datetime.utcnow)

    student = db.relationship('UserApp', backref='enrollments')
    course = db.relationship('Course', backref='enrollments')

    __table_args__ = (
        db.UniqueConstraint('student_id', 'course_id'),
    )

    def __repr__(self):
        return f"<CourseEnrollment {self.student.user_name} in {self.course.course_name}>"

# For migrations, use Flask-Migrate:
# flask db init
# flask db migrate
# flask db upgrade

if __name__ == '__main__':
    db.create_all()  # Creates the tables
    app.run(debug=True)
