import React, { useState } from 'react';
import '../styles/AddCollectionPoint.css';
import axios from 'axios';

const AddCollectionPoint = ({ setIsAddCollectionPoint }) => {
    const [formData, setFormData] = useState({
        address: '',
        code_postal: '',
        ville: '',
        capacity: '',
        horaires: '',
        photo: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddCollectionPoint = async () => {
        if (!localStorage.getItem('authenticated')) {
            setError('Vous devez être connecté pour ajouter un point de collecte');
            return;
        }

        if (!formData.address) {
            setError('Veuillez remplir tous les champs obligatoires');
            return;
        }

        // if (!formData.ville) {
        //     formData.ville = '...';
        // }

        // if (!formData.capacity) {
        //     formData.capacity = 3;
        // }

        // if (!formData.horaires) {
        //     formData.horaires = '...';
        // }

        // if (!formData.photo) {
        //     formData.photo = null;
        // }

        setLoading(true);
        setError(null);

        try {
            // Construire l'adresse complète pour le géocodage
            const fullAddress = `${formData.address}, ${formData.code_postal} ${formData.ville}, France`;
            console.log("Adresse complète pour le géocodage:", fullAddress);

            // Utiliser l'API de géocodage d'OpenStreetMap avec l'adresse complète
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}&limit=1`
            );
            const data = await response.json();
            console.log("Résultat du géocodage:", data);

            if (data && data.length > 0) {
                const coordinates = {
                    latitude: parseFloat(data[0].lat),
                    longitude: parseFloat(data[0].lon)
                };

                console.log("Coordonnées trouvées:", coordinates);

                const user = JSON.parse(localStorage.getItem('user_info')).user;

                // Sauvegarder dans la base de données
                const saveResponse = await axios.post('http://localhost:8000/api/add-collection-point/', {
                    address: formData.address,
                    code_postal: formData.code_postal,
                    ville: formData.ville,
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                    public: 0, 
                    capacity: parseInt(formData.capacity) || 0,
                    horaires: formData.horaires,
                    photo: formData.photo,
                    owner: parseInt(user.id)
                });

                console.log("Réponse du backend:", saveResponse.data);

                if (saveResponse.data) {
                    alert('Point de collecte ajouté avec succès !');
                    let composters = JSON.parse(localStorage.getItem('composters'))
                    composters.push(saveResponse.data)
                    localStorage.setItem('composters', JSON.stringify(composters))
                    setIsAddCollectionPoint(false);
                    setFormData({
                        address: '',
                        code_postal: '',
                        ville: '',
                        capacity: '',
                        horaires: '',
                        photo: null
                    });
                    window.location.reload();
                }
            } else {
                setError('Adresse non trouvée. Vérifiez que l\'adresse, le code postal et la ville sont corrects.');
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
                <label className="form-label">Adresse*</label>
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
                <label className="form-label">Ville</label>
                <input 
                    className="form-input"
                    type="text"
                    name="ville"
                    placeholder="Ville"
                    value={formData.ville}
                    onChange={handleChange}
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Code postal</label>
                <input 
                    className="form-input"
                    type="text"
                    name="code_postal"
                    placeholder="Code postal"
                    value={formData.code_postal}
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
