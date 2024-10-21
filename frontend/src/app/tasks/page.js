"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Table, Button, Input, Select, Checkbox, Alert, Popconfirm, message } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../hooks/useTasks';
import { updateTask, deleteTask, createTask } from '../../services/task';
import PageTitle from '../../components/PageTitle';
import Loading from '../../components/Loading';

export default function Tasks() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const { tasks, setTasks, error, loadTasks } = useTasks();
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [creatingNewTask, setCreatingNewTask] = useState(false);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredTasks(tasks);
    } else {
      const completed = statusFilter === 'completed';
      setFilteredTasks(tasks.filter((task) => task.completed === completed));
    }
  }, [tasks, statusFilter]);

  const handleDeleteTask = async (id) => {
    try {
      const response = await deleteTask(id);
      message.success(response.message);
      loadTasks();
    } catch (err) {
      setError(err.message);
      message.error('Erro ao excluir tarefa');
    }
  };

  const handleCheckboxChange = async (taskId, completed) => {
    try {
      const response = await updateTask(taskId, { completed: !completed });
      message.success(response.message);
      loadTasks();
    } catch (err) {
      setError(err.message);
      message.error('Erro ao atualizar status da tarefa');
    }
  };

  const handleTitleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingText(task.title);
  };

  const handleTitleSave = async (task) => {
    if (!editingText.trim()) {
      if (!task.id) {
        setTasks((prevTasks) => prevTasks.filter((t) => t.id !== null));
      }
      setCreatingNewTask(false);
      setEditingTaskId(null);
      return;
    }

    try {
      let response;
      if (task.id) {
        response = await updateTask(task.id, { title: editingText });
      } else {
        response = await createTask({ title: editingText });
      }
      message.success(response.message);
      setCreatingNewTask(false);
      setEditingTaskId(null);
      loadTasks();
    } catch (err) {
      message.error(err.message);

      setEditingText(task.title);
      setEditingTaskId(null);
      setCreatingNewTask(false);
    }
  };


  const handleTitleInputChange = (e) => {
    setEditingText(e.target.value);
  };

  const addNewTask = () => {
    const newTask = { id: null, title: '', completed: false };
    setTasks([newTask, ...tasks]);
    setEditingTaskId(newTask.id);
    setCreatingNewTask(true);
    setEditingText('');
  };

  const getColumns = () => [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
      width: '80%',
      render: (title, task) => (
        <>
          {editingTaskId === task.id ? (
            <Input
              value={editingText}
              onChange={handleTitleInputChange}
              onBlur={() => handleTitleSave(task)}
              onPressEnter={() => handleTitleSave(task)}
              autoFocus
            />
          ) : (
            <Checkbox
              checked={task.completed}
              onChange={() => handleCheckboxChange(task.id, task.completed)}
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            >
              <span onClick={() => handleTitleEdit(task)}>{title}</span>
            </Checkbox>
          )}
        </>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'completed',
      key: 'completed',
      render: (completed) => (completed ? 'Concluída' : 'Pendente'),
      hidden: true,
    },
    {
      title: 'Ações',
      key: 'actions',
      width: '20%',
      render: (task) => (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Popconfirm
            title="Tem certeza que deseja excluir esta tarefa?"
            onConfirm={() => handleDeleteTask(task.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button shape="circle" icon={<DeleteTwoTone />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', marginTop: '30px' }}>
            <PageTitle>Gerenciar Tarefas</PageTitle>
            <Button type="primary" danger onClick={logout}>
              Sair
            </Button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '20px', marginBottom: '20px' }}>
            <Button
              type="primary"
              onClick={addNewTask}
              disabled={creatingNewTask}
              style={{
                minWidth: '220px',
                flexShrink: 0,
              }}
            >
              Adicionar Nova Tarefa
            </Button>
            <Select
              style={{
                minWidth: '220px',
                flexShrink: 0,
              }}
              value={statusFilter}
              onChange={setStatusFilter}
            >
              <Select.Option value="all">Todas</Select.Option>
              <Select.Option value="completed">Concluídas</Select.Option>
              <Select.Option value="pending">Pendentes</Select.Option>
            </Select>
          </div>

          {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '20px' }} />}

          <Table
            dataSource={filteredTasks}
            showHeader={false}
            columns={getColumns()}
            rowKey={(task) => task.id || task.tempId}
            pagination={false}
          />
        </>
      )}
    </>
  )
}