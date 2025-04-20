from flask import Flask, render_template, request, send_file, redirect
from flask_socketio import SocketIO, emit
from collections import defaultdict
import csv
import io

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

quiz_data = []  # List of MCQs
student_submissions = defaultdict(dict)  # student_name -> {answers, score}

# ✅ HOME ROUTE
@app.route('/')
def home():
    return '''
    <h2>Welcome to the Quiz Platform</h2>
    <p><a href="/student">Go to Student Page</a></p>
    <p><a href="/instructor">Go to Instructor Page</a></p>
    '''

@app.route('/instructor')
def instructor():
    return render_template('instructor.html', submissions=student_submissions, quiz_data=quiz_data)

@app.route('/student')
def student():
    return render_template('student.html')

@app.route('/download_csv')
def download_csv():
    si = io.StringIO()
    cw = csv.writer(si)
    cw.writerow(['Student Name', 'Score', 'Answers'])
    for student, data in student_submissions.items():
        cw.writerow([student, data.get('score', 0), data.get('answers', {})])
    output = io.BytesIO()
    output.write(si.getvalue().encode('utf-8'))
    output.seek(0)
    return send_file(output, mimetype='text/csv', as_attachment=True, download_name='submissions.csv')

@socketio.on('send_quiz')
def handle_send_quiz(data):
    global quiz_data
    quiz_data = data['questions']
    student_submissions.clear()
    emit('receive_quiz', {'questions': quiz_data, 'timer': data['timer']}, broadcast=True)

@socketio.on('submit_answers')
def handle_submit_answers(data):
    student_name = data['name']
    answers = data['answers']
    score = 0

    for i, q in enumerate(quiz_data):
        correct_answer = q['correct']
        selected_answer = answers.get(q['question'])
        if selected_answer == correct_answer:
            score += 1

    student_submissions[student_name] = {'answers': answers, 'score': score}
    emit('update_submissions', student_submissions, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)
