def store_feedback(user_id, task_id, rating):
    # Simulated feedback storage (e.g., save to file or database)
    feedback_data = {
        "user_id": user_id,
        "task_id": task_id,
        "rating": rating
    }
    # Append the feedback to a JSON file or database
    print(f"Feedback stored: {feedback_data}")
