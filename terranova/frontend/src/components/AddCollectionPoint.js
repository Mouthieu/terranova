import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddCollectionPoint = () => {
    return (
        <div>
            <span><input type="text" placeholder="Adresse" /><button>Ajouter</button></span>
        </div>
    )
}

export default AddCollectionPoint;
