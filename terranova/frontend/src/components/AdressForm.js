import { geocode } from "@arcgis/core/rest/locator";
import { useState } from "react";

const AddressForm = () => {
  const [address, setAddress] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // URL du service de géocodage ArcGIS
      const geocodeUrl = "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";
      
      const params = {
        address: {
          "singleLine": address
        },
        outFields: ["*"]
      };

      const results = await geocode(geocodeUrl, params);
      
      if (results.candidates && results.candidates.length > 0) {
        const location = results.candidates[0].location;
        console.log("Coordonnées :", {
          latitude: location.y,
          longitude: location.x
        });
      }
    } catch (error) {
      console.error("Erreur de géocodage :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Entrez une adresse"
      />
      <button type="submit">Convertir</button>
    </form>
  );
};

export default AddressForm;