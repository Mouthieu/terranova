import React, { useState } from 'react';
import axios from 'axios';

const AddCollectionPoint = () => {
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        address: '',
        capacity: '',
        hours: '',
        photo: null
    });

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };

    const handleAddCollectionPoint = async () => {
        if (!formData.address) {
            setError('Veuillez entrer une adresse');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Utiliser l'API de géocodage d'OpenStreetMap
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
            );
            const data = await response.json();

            if (data && data.length > 0) {
                const coordinates = {
                    latitude: parseFloat(data[0].lat),
                    longitude: parseFloat(data[0].lon)
                };

                // Sauvegarder dans la base de données
                const saveResponse = await axios.post('http://localhost:8000/api/add-collection-point/', {
                    address: formData.address,
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                    public: 0,
                    capacity: formData.capacity,
                    horaires: formData.horaires,
                    photo: formData.photo
                });

                if (saveResponse.data) {
                    alert('Point de collecte ajouté avec succès !');
                    setAddress(''); // Réinitialiser le champ
                }
            } else {
                setError('Adresse non trouvée');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setError('Erreur lors de l\'ajout du point de collecte');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'column', width: '200px'}}>
                <input 
                    type="text" 
                    name="address"
                    placeholder="Entrez une adresse" 
                    value={formData.address}
                    onChange={handleChange}
                    disabled={loading}
                />
                <input
                    type="number"
                    name="capacity"
                    placeholder="Capacité"
                    value={formData.capacity}
                    onChange={handleChange}
                    disabled={loading}
                />
                <input
                    type="text"
                    name="horaires"
                    placeholder="Horaires"
                    value={formData.horaires}
                    onChange={handleChange}
                    disabled={loading}
                />
                <input
                    type="file"
                    name="photo"
                    placeholder="Photo"
                    value={formData.photo}
                    onChange={handleChange}
                    disabled={loading}
                />
                <button 
                    onClick={handleAddCollectionPoint}
                    disabled={loading}
                >
                    {loading ? 'En cours...' : 'Ajouter'}
                </button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default AddCollectionPoint;
