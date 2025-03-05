import { useState } from 'react';

const AddressForm = ({ map, view }) => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  
  const saveCollectionPoint = async (coordinates) => {
    try {
      const response = await fetch('http://localhost:8000/api/add-collection-point/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Ajoutez ici votre token d'authentification si nécessaire
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          address: address,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  };

  const addPointToMap = (coordinates) => {
    // Créer une nouvelle couche graphique si elle n'existe pas déjà
    let graphicsLayer = map.findLayerById("pointsLayer");
    if (!graphicsLayer) {
      graphicsLayer = new GraphicsLayer({
        id: "pointsLayer"
      });
      map.add(graphicsLayer);
    }

    // Créer le point
    const point = {
      type: "point",
      longitude: coordinates.longitude,
      latitude: coordinates.latitude
    };

    // Créer le graphique
    const pointGraphic = new Graphic({
      geometry: point,
      symbol: {
        type: "simple-marker",
        color: [226, 119, 40],
        outline: {
          color: [255, 255, 255],
          width: 2
        }
      }
    });

    // Ajouter le point à la carte
    graphicsLayer.add(pointGraphic);

    // Centrer la carte sur le nouveau point
    view.goTo({
      target: point,
      zoom: 15
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Utiliser OpenStreetMap pour le géocodage
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
        await saveCollectionPoint(coordinates);

        // Ajouter le point sur la carte
        addPointToMap(coordinates);

        // Réinitialiser le formulaire
        setAddress("");
        alert("Point de collecte ajouté avec succès !");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de l'ajout du point de collecte");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="address-form">
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Entrez une adresse"
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "En cours..." : "Convertir et Ajouter"}
      </button>
    </form>
  );
};

export default AddressForm;