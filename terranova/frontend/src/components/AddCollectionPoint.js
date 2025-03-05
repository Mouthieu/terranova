import React, { useState } from 'react';
import axios from 'axios';

const AddCollectionPoint = () => {
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAddCollectionPoint = async () => {
        if (!address) {
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
                    name: "Point de collecte",
                    address: address,
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                    subscribable: 0
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
            <div>
                <input 
                    type="text" 
                    placeholder="Entrez une adresse" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
