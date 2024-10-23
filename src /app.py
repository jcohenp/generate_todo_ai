from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from services.calendar_service import get_calendar_events
from services.ai_service import generate_tasks
from services.todo_service import generate_todo_with_calendar

app = Flask(__name__)

# Allow CORS for all routes and origins
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

# AI-generated task and calendar integration
@app.route('/api/generate_todo', methods=['POST'])
def generate_todo():
    user_data = request.json
    user_input = user_data.get('objectives')
    
    # Fetch Google Calendar events
    events = get_calendar_events()
    
    # Generate a combined todo list with AI tasks and calendar events
    todo_list = generate_todo_with_calendar(user_input, events)
    
    return jsonify({'todo_list': todo_list})

# For testing purposes, just return static tasks
@app.route('/api/todo_list', methods=['GET'])
def get_todo_list():
    # Example response for now
    todo_list = ["Task 1", "Task 2", "Task 3"]
    return jsonify({'todo_list': todo_list})

if __name__ == '__main__':
    app.run(debug=True)
