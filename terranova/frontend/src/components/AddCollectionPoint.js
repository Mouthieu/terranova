import React from 'react';
import '../styles/AddCollectionPoint.css';
import axios from 'axios';

const AddCollectionPoint = () => {
    const [address, setAddress] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const [formData, setFormData] = React.useState({
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
        <div className="add-compost-container">
            <h1 className="add-compost-title">Ajouter un compost</h1>
            
            <div className="form-group">
                <label className="form-label">Adresse</label>
                <input 
                    className="form-input"
                    type="text" 
                    name="address"
                    placeholder="Entrez une adresse" 
                    value={formData.address}
                    onChange={handleChange}
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Capacité max</label>
                <input
                    className="form-input"
                    type="number"
                    name="capacity"
                    placeholder="Capacité"
                    value={formData.capacity}
                    onChange={handleChange}
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Horaires</label>
                <input
                    className="form-input"
                    type="text"
                    name="horaires"
                    placeholder="Horaires"
                    value={formData.horaires}
                    onChange={handleChange}
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Photo</label>
                <input
                    className="form-input"
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                    disabled={loading}
                />
            </div>

            <button 
                className="submit-button"
                onClick={handleAddCollectionPoint}
                disabled={loading}
            >
                {loading ? 'En cours...' : 'Valider'}
            </button>

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default AddCollectionPoint;
