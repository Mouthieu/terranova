import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/GuidePratique.css';
import GuideImg1 from '../imgs/GuideImg1.jpeg';

const GuidePratique = () => {
  const [guideItems, setGuideItems] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/guide-items/', {})
      .then((response) => {
        setGuideItems(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des guides', error);
        // Données de fallback en cas d'erreur
        setGuideItems([
          {
            id: 1,
            title: "Que mettre dans son composteur ?",
            explanations: [
              "Les déchets verts, les épluchures de fruits et légumes, le marc de café, les coquilles d'œufs, les feuilles mortes...",
              "Les restes de repas (sans viande ni poisson), les serviettes en papier, le carton brun, les sachets de thé..."
            ],
            image: GuideImg1
          },
          {
            id: 2,
            title: "Que ne pas mettre dans son composteur ?",
            explanations: [
              "Les déchets plastiques, les métaux, les produits chimiques, les restes de viande et de poisson...",
              "Les matériaux non biodégradables, les agrumes en grande quantité, les produits laitiers..."
            ],
            image: GuideImg1
          }
        ]);
      });
  }, []);

  return (
    <div className="guide-container">
      <h1 className="guide-title">Guide de bonne pratique</h1>
      
      {guideItems.map((item, index) => (
        <div key={item.id} className={`guide-section ${index % 2 === 1 ? 'reverse' : ''}`}>
          <div className="guide-content">
            <h2 className="guide-subtitle">{item.title}</h2>
            <div className="guide-explanations">
              {item.explanations.map((explanation, i) => (
                <React.Fragment key={i}>
                  <h3>Explications</h3>
                  <p>{explanation}</p>
                </React.Fragment>
              ))}
            </div>
          </div>
          <img 
            src={GuideImg1}
            alt={`Guide de compostage ${index + 1}`}
            className="guide-image"
          />
        </div>
      ))}
    </div>
  );
};

export default GuidePratique; 