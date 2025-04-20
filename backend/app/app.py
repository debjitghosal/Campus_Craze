from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import os

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev_secret_key')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///eduquest.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt_dev_secret_key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)

# Initialize extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='student')
    phone_number = db.Column(db.String(20), nullable=True)
    department = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_name': self.user_name,
            'email': self.email,
            'role': self.role,
            'phone_number': self.phone_number,
            'department': self.department
        }

# Create database tables
@app.before_first_request
def create_tables():
    db.create_all()

# Routes
@app.route('/login/', methods=['POST'])
def login():
    data = request.json
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400
    
    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid email or password'}), 401
    
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        'message': 'Login successful',
        'token': access_token,
        'user': user.to_dict(),
        'role': user.role
    }), 200

@app.route('/signup/', methods=['POST'])
def signup():
    data = request.json
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    # Validate required fields
    required_fields = ['user_name', 'email', 'password', 'confirm_password', 'role']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({'error': f'{field} is required'}), 400
    
    # Check if email already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400
    
    # Check if passwords match
    if data['password'] != data['confirm_password']:
        return jsonify({'error': 'Passwords do not match'}), 400
    
    # Create new user
    new_user = User(
        user_name=data['user_name'],
        email=data['email'],
        role=data['role'],
        phone_number=data.get('phone_number', ''),
        department=data.get('department', '')
    )
    new_user.set_password(data['password'])
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/user', methods=['GET'])
@jwt_required()
def get_user_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({'user': user.to_dict()}), 200

# Include the Course model from your existing app
class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    students = db.Column(db.Integer, default=0)
    lastUpdated = db.Column(db.String(20))
    status = db.Column(db.String(20), default="Draft")
    progress = db.Column(db.Integer, default=0)
    coverImage = db.Column(db.String(255))
    
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "students": self.students,
            "lastUpdated": self.lastUpdated,
            "status": self.status,
            "progress": self.progress,
            "coverImage": self.coverImage
        }

# Route: Initialize DB (call once)
@app.route('/init-db')
def init_db():
    db.create_all()
    return "Database initialized!"

# Route: Get all courses
@app.route('/api/courses', methods=['GET'])
def get_courses():
    courses = Course.query.all()
    return jsonify({"courses": [course.to_dict() for course in courses]})

# Route: Get course by ID
@app.route('/api/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    course = Course.query.get_or_404(course_id)
    return jsonify({"course": course.to_dict()})

# Route: Get dashboard stats
@app.route('/api/dashboard/stats', methods=['GET'])
@jwt_required()
def get_dashboard_stats():
    total_students = sum(course.students for course in Course.query.all())
    active_courses = Course.query.filter_by(status="Published").count()
    
    # In a real app, you would calculate this from quiz data
    quiz_engagement = "78%"
    
    return jsonify({
        "totalStudents": total_students,
        "activeCourses": active_courses,
        "quizEngagement": quiz_engagement,
        "studentGrowth": "+12% from last month",  # This would be calculated in a real app
        "courseGrowth": "2 published this month"  # This would be calculated in a real app
    })

# Route: Add new course (protected)
@app.route('/api/courses', methods=['POST'])
@jwt_required()
def add_course():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    # Check if user is an instructor
    if user.role != 'instructor':
        return jsonify({"error": "Only instructors can add courses"}), 403
    
    data = request.json
    
    # Set lastUpdated to today's date if not provided
    if "lastUpdated" not in data or not data["lastUpdated"]:
        data["lastUpdated"] = datetime.now().strftime("%Y-%m-%d")
    
    new_course = Course(
        title=data["title"],
        description=data["description"],
        students=data.get("students", 0),
        lastUpdated=data["lastUpdated"],
        status=data.get("status", "Draft"),
        progress=data.get("progress", 0),
        coverImage=data.get("coverImage", "")
    )
    db.session.add(new_course)
    db.session.commit()
    return jsonify({"message": "Course added", "course": new_course.to_dict()}), 201

# Route: Delete course (protected)
@app.route('/api/courses/<int:course_id>', methods=['DELETE'])
@jwt_required()
def delete_course(course_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    # Check if user is an instructor or admin
    if user.role not in ['instructor', 'admin']:
        return jsonify({"error": "Permission denied"}), 403
    
    course = Course.query.get_or_404(course_id)
    db.session.delete(course)
    db.session.commit()
    return jsonify({"message": "Course deleted"})

# Route: Update course (protected)
@app.route('/api/courses/<int:course_id>', methods=['PUT'])
@jwt_required()
def update_course(course_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    # Check if user is an instructor
    if user.role != 'instructor':
        return jsonify({"error": "Only instructors can update courses"}), 403
    
    course = Course.query.get_or_404(course_id)
    data = request.json
    
    # Update lastUpdated to today's date if any content changes
    data["lastUpdated"] = datetime.now().strftime("%Y-%m-%d")
    
    course.title = data.get("title", course.title)
    course.description = data.get("description", course.description)
    course.students = data.get("students", course.students)
    course.lastUpdated = data.get("lastUpdated", course.lastUpdated)
    course.status = data.get("status", course.status)
    course.progress = data.get("progress", course.progress)
    course.coverImage = data.get("coverImage", course.coverImage)
    
    db.session.commit()
    return jsonify({"message": "Course updated", "course": course.to_dict()})

# Seed data for testing
@app.route('/seed', methods=['GET'])
def seed():
    # Create test users if they don't exist
    if not User.query.filter_by(email='student@eduquest.com').first():
        student = User(
            user_name='Test Student',
            email='student@eduquest.com',
            role='student',
            phone_number='123-456-7890',
            department='Computer Science'
        )
        student.set_password('password123')
        db.session.add(student)
    
    if not User.query.filter_by(email='instructor@eduquest.com').first():
        instructor = User(
            user_name='Test Instructor',
            email='instructor@eduquest.com',
            role='instructor',
            phone_number='123-456-7891',
            department='Computer Science'
        )
        instructor.set_password('password123')
        db.session.add(instructor)
    
    if not User.query.filter_by(email='admin@eduquest.com').first():
        admin = User(
            user_name='Admin User',
            email='admin@eduquest.com',
            role='admin',
            phone_number='123-456-7892',
            department='Administration'
        )
        admin.set_password('password123')
        db.session.add(admin)
    
    # Add courses if database is empty
    if Course.query.count() == 0:
        courses = [
            Course(title="Intro to CS", description="A comprehensive introduction to computer science principles and programming fundamentals.", students=100, lastUpdated="2023-04-15", status="Published", progress=100),
            Course(title="Math 101", description="Explore advanced mathematical concepts including calculus, linear algebra, and statistics.", students=85, lastUpdated="2023-05-22", status="Published", progress=100),
            Course(title="Physics Fundamentals", description="Learn the basic principles of physics including mechanics, thermodynamics, and electromagnetism.", students=64, lastUpdated="2023-06-10", status="Draft", progress=75),
            Course(title="Creative Writing Workshop", description="Develop your creative writing skills through guided exercises and peer feedback.", students=42, lastUpdated="2023-07-05", status="Draft", progress=50),
            Course(title="Data Science Essentials", description="Master the fundamentals of data science, including data analysis, visualization, and machine learning.", students=64, lastUpdated="2023-08-18", status="Published", progress=96),
            Course(title="Web Development Bootcamp", description="A hands-on course covering HTML, CSS, JavaScript, and modern web frameworks.", students=112, lastUpdated="2023-09-30", status="Published", progress=100),
        ]
        db.session.bulk_save_objects(courses)
    
    db.session.commit()
    return jsonify({"message": "Database seeded with test data"}), 200

if __name__ == '__main__':
    app.run(debug=True,port=5000)