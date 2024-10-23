from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from services.calendar_service import get_calendar_events
from services.ai_service import generate_tasks_stream
from services.todo_service import generate_todo_with_calendar

app = Flask(__name__)

# Allow CORS for all routes and origins
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

# AI-generated task and calendar integration with streaming
@app.route('/api/generate_todo_stream', methods=['POST'])
def generate_todo_stream():
    user_data = request.json
    user_input = user_data.get('objectives')

    def stream_response():
        for task_chunk in generate_tasks_stream(user_input):
            print(task_chunk)
            yield f"{task_chunk}\n"  # Send each chunk as a separate task

    return Response(stream_response(), content_type='text/plain')

# For testing purposes, just return static tasks
@app.route('/api/todo_list', methods=['GET'])
def get_todo_list():
    # Example response for now
    todo_list = ["Task 1", "Task 2", "Task 3"]
    return jsonify({'todo_list': todo_list})

if __name__ == '__main__':
    app.run(debug=True)
