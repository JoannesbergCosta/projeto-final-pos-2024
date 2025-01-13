import React, { useEffect, useState } from 'react';
import api from '../api/api';

const UserList = ({ onEdit, onDelete }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users/')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Erro ao buscar usuários:', error));
  }, []);

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-primary" onClick={() => onEdit(user)}>Editar</button>
                <button className="btn btn-danger" onClick={() => onDelete(user.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
