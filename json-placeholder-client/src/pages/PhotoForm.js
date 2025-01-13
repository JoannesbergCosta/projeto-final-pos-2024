import React, { useState, useEffect } from 'react';
import api from '../api/api';

const initialState = {
  title: '',
  url: '',
  thumbnail_url: '',
  album: '',
};

const PhotoForm = ({ photoToEdit, onSave }) => {
  const [photo, setPhoto] = useState(initialState);
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (photoToEdit?.id) {
      setPhoto(photoToEdit);
    } else {
      setPhoto(initialState);
    }

    api.get('/albums/')
      .then(response => {
        setAlbums(response.data);
        setIsLoading(false);  
      })
      .catch(error => {
        console.error('Erro ao buscar álbuns:', error);
        setIsLoading(false);  
      });
  }, [photoToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPhoto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiCall = photo.id ? api.put(`/photos/${photo.id}/`, photo) : api.post('/photos/', photo);
    apiCall
      .then(() => {
        setPhoto(initialState); 
        onSave();  
      })
      .catch(error => console.error('Erro ao salvar a foto:', error));
  };

  const renderAlbums = () => {
    if (isLoading) {
      return <option>Carregando álbuns...</option>;
    }

    return albums.map(album => (
      <option key={album.id} value={album.id}>
        {album.title}
      </option>
    ));
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">{photo.id ? 'Editar Foto' : 'Criar Foto'}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={photo.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="url" className="form-label">URL</label>
            <input
              type="url"
              id="url"
              name="url"
              className="form-control"
              value={photo.url}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="thumbnail_url" className="form-label">URL da Miniatura</label>
            <input
              type="url"
              id="thumbnail_url"
              name="thumbnail_url"
              className="form-control"
              value={photo.thumbnail_url}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="album" className="form-label">Álbum</label>
            <select
              id="album"
              name="album"
              className="form-select"
              value={photo.album}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um álbum</option>
              {renderAlbums()}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            {photo.id ? 'Atualizar Foto' : 'Criar Foto'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PhotoForm;
