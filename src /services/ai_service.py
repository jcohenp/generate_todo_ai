from openai import OpenAI

client = OpenAI()

def generate_tasks(user_input):
    prompt = f"Generate a todo list based on this input: {user_input}. Make the todo list like a planning of study with day and times the todo list should have tasks and subtasks"
    
    # New method to use Chat API
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )
        # Process the response to clean up empty lines
    response_text = response.choices[0].message.content.strip()
    # Split tasks by line and filter out any empty entries
    tasks = [task.strip() for task in response_text.split('\n') if task.strip()]
    
    # Further parsing logic (if required) to distinguish between tasks and subtasks
    structured_tasks = []
    current_task = None

    for line in tasks:
        if line.startswith('-'):  # Assuming subtasks start with a hyphen "-"
            if current_task:
                current_task['subtasks'].append(line.strip('- ').strip())
        else:
            if current_task:
                structured_tasks.append(current_task)
            current_task = {'title': line.strip(), 'subtasks': []}
    
    if current_task:
        structured_tasks.append(current_task)
    
    return structured_tasks