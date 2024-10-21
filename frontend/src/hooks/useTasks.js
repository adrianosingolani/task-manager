import { useState, useEffect } from 'react';
import { getTasks } from '../services/task';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError('Erro ao carregar tarefas');
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return { tasks, setTasks, error, loadTasks };
};
