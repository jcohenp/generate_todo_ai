from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.requests import Request
from fastapi.responses import JSONResponse
import uvicorn


from fastapi import FastAPI
from services.calendar_service import get_calendar_events
from services.ai_service import generate_tasks
from services.todo_service import generate_todo_with_calendar

app = FastAPI()

# Allow CORS for all routes and origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")



@app.get('/')
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# AI-generated task and calendar integration
@app.post('/api/generate_todo')
async def generate_todo(request: Request):
    user_data = await request.json()
    user_input = user_data.get('objectives')
    
    # Fetch Google Calendar events
    events = get_calendar_events()
    
    # Generate a combined todo list with AI tasks and calendar events
    todo_list = generate_todo_with_calendar(user_input, events)
    return JSONResponse(content={"todo_list": todo_list})


# For testing purposes, just return static tasks
@app.get('/api/todo_list')
async def get_todo_list(request: Request):
    # Example response for now
    todo_list = ["Task 1", "Task 2", "Task 3"]
    return JSONResponse({'todo_list': todo_list})

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)