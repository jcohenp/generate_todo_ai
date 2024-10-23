from openai import OpenAI
import json

client = OpenAI()

def generate_tasks_stream(user_input):
    prompt = f"""
                You are an assistant that generates structured todo lists. Based on the user's input: '{user_input}', create a detailed todo list in JSON format. The list should have:
                1. A title of the todo list.
                2. A set of topics. Each topic can have several tasks.
                3. For each task, include:
                    - A task name.
                    - A date (in yyyy-mm-dd format).
                    - A time (in HH:MM format).
                    - A list of subtasks, each with a name, date, and time.

                Ensure the response is only the raw JSON, no extra text outside the JSON structure.
                The JSON format should follow this structure:
                {{
                    "title": "Todo List Title",
                    "topics": [
                        {{
                            "topicName": "Topic 1",
                            "tasks": [
                                {{
                                    "taskName": "Task",
                                    "date": "yyyy-mm-dd",
                                    "time": "HH:MM",
                                    "subtasks": [
                                        {{
                                            "subtaskName": "Subtask",
                                            "date": "yyyy-mm-dd",
                                            "time": "HH:MM"
                                        }}
                                    ]
                                }}
                            ]
                        }}
                    ]
                }}
            """

    # Use streaming to get chunks of response
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        stream=True  # Enable streaming
    )

    buffer = ""
    title_parsed = False
    topic_parsed = False

    try:
        for chunk in response:
            delta = chunk.choices[0].delta
            content = getattr(delta, 'content', None)

            if content:
                buffer += content
                print(f"Received content chunk: {content}")


                try:
                    json_object = json.loads(buffer)

                    # If title has not been parsed, yield the title
                    if not title_parsed and "title" in json_object:
                        print(f"Parsed Title: {json_object['title']}")
                        yield {"title": json_object["title"]}
                        title_parsed = True
                        buffer = ""  # Reset buffer

                    # Parse topics
                    if title_parsed and not topic_parsed and "topics" in json_object:
                        for topic in json_object["topics"]:
                            print(f"Parsed Topic: {topic}")
                            yield {"topic": topic}
                        topic_parsed = True
                        buffer = ""  # Reset buffer

                except json.JSONDecodeError:
                    # Continue to buffer until complete JSON is formed
                    pass

    except Exception as e:
        print(f"Error during task generation: {str(e)}")
        raise