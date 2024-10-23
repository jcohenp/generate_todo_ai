from utils.auth import authenticate_google_calendar

# def get_calendar_events():
#     service = authenticate_google_calendar()
    
#     # Fetch upcoming events from the user's primary calendar
#     events_result = service.events().list(calendarId='primary', maxResults=10, singleEvents=True, orderBy='startTime').execute()
#     events = events_result.get('items', [])

#     # Process and return events
#     event_list = []
#     for event in events:
#         start = event['start'].get('dateTime', event['start'].get('date'))
#         event_list.append(f"Event: {event['summary']} at {start}")

#     return event_list

def get_calendar_events():
    # Fake events for testing purposes
    events = [
        {'summary': 'Team Meeting', 'start': {'dateTime': '2024-10-18T10:00:00'}},
        {'summary': 'Project Deadline', 'start': {'dateTime': '2024-10-18T15:00:00'}},
        {'summary': 'Client Call', 'start': {'dateTime': '2024-10-19T09:00:00'}},
    ]
    return events
