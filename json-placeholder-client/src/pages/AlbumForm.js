import React, { useState, useEffect } from 'react';
import api from '../api/api';

const initialState = {
  title: '',
  user: '',
};

const AlbumForm = ({ albumToEdit, onSave }) => {
  const [album, setAlbum] = useState(initialState);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (albumToEdit?.id) {
      setAlbum(albumToEdit);
    } else {
      setAlbum(initialState);
    }


    api.get('/users/')
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false);  
      })
      .catch((error) => {
        console.error('Erro ao buscar usuários:', error);
        setIsLoading(false);  
      });
  }, [albumToEdit]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbum((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const apiCall = album.id
      ? api.put(`/albums/${album.id}/`, album)
      : api.post('/albums/', album);

    apiCall
      .then(() => {
        setAlbum(initialState);  
        onSave();  
      })
      .catch((error) => console.error('Erro ao salvar álbum:', error));
  };


  const renderUsers = () => {
    if (isLoading) {
      return <option>Carregando usuários...</option>;
    }

    return users.map((user) => (
      <option key={user.id} value={user.id}>
        {user.name} ({user.username})
      </option>
    ));
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">{album.id ? 'Editar Álbum' : 'Criar Álbum'}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={album.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="user" className="form-label">Usuário</label>
            <select
              id="user"
              name="user"
              className="form-select"
              value={album.user}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um usuário</option>
              {renderUsers()}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            {album.id ? 'Atualizar' : 'Criar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AlbumForm;
