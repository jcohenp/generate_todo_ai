from services.ai_service import generate_tasks_stream
from services.calendar_service import get_calendar_events

def generate_todo_with_calendar(user_input, events):
    # Generate tasks using AI (GPT-4o-mini)
    ai_tasks = generate_tasks(user_input)
    print(ai_tasks)
    # Integrate calendar events into a list
    #calendar_tasks = [f"Event: {event['summary']} at {event['start']['dateTime']}" for event in events]
    
    # Combine AI tasks and calendar events
    combined_tasks = ai_tasks
    return ai_tasks