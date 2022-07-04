import { invoke } from '@tauri-apps/api/tauri';
import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';

type Task = {
  task: string;
  isCompleted: boolean;
};

const initialState = [
  {
    task: 'Learn vue.js',
    isCompleted: false,
  },
  {
    task: 'Learn React Hook',
    isCompleted: false,
  },
  {
    task: 'Learn Gatsby.js',
    isCompleted: false,
  },
];

const TodoList: FC = () => {
  const [todoList, setTodoList] = useState<Task[]>(initialState);
  const [task, setTask] = useState('');

  const handleNewTask: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (task === '') return;
    setTodoList((todoList) => [...todoList, { task, isCompleted: false }]);
    setTask('');
  };

  const handleRemoveTask = (index: number) => {
    const newTodos = [...todoList];
    newTodos.splice(index, 1);
    setTodoList(newTodos);
  };

  const handleUpdateTask = (index: number) => {
    const newTodos = todoList.map((todo, todoIndex) => {
      if (todoIndex === index) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodoList(newTodos);
  };

  invoke('simple_command');
  invoke('command_with_message', { message: 'TypeScript' }).then((result) => {
    console.log({ result });
  });
  invoke('command_with_object', {
    message: { field_str: 'some message', field_u32: 12 },
  }).then((result) => {
    console.log({ result });
  });

  return (
    <div>
      <h1>ToDo List</h1>
      <form onSubmit={handleSubmit}>
        Add Task :
        <input
          value={task}
          placeholder="Add New Task"
          onChange={handleNewTask}
        />
      </form>
      <ul>
        {todoList.map((todo, index) => (
          <li
            key={index}
            style={{
              textDecoration: todo.isCompleted ? 'line-through' : 'none',
            }}
          >
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => handleUpdateTask(index)}
            />
            {todo.task}
            <span
              onClick={() => handleRemoveTask(index)}
              style={{ marginLeft: 10, cursor: 'pointer', color: 'red' }}
            >
              [X]
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
