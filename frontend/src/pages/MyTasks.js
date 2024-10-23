// frontend/src/pages/MyTasks.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const TaskContainer = styled.div`
  padding: 2rem;
`;

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/todo_list').then((response) => {
      setTasks(response.data.todo_list);
    });
  }, []);

  return (
    <TaskContainer>
      <h2>My Tasks</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </TaskContainer>
  );
};

export default MyTasks;
