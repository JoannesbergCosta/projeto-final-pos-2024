import React, { useState, useEffect } from 'react';

const ToDoList = ({ todos, onEdit, onDelete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (todos.length > 0) {
      setIsLoading(false);
    }
  }, [todos]);

  const renderUser = (user) => {
    if (user) {
      return user.name;
    }
    return 'Usuário desconhecido';
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Título</th>
            <th>Usuário</th>
            <th>Concluído</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="4" className="text-center">Carregando tarefas...</td>
            </tr>
          ) : (
            todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{renderUser(todo.user)}</td>
                <td>{todo.completed ? 'Sim' : 'Não'}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(todo)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => onDelete(todo.id)}>Excluir</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ToDoList;
