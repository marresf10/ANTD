import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAdmisiones = () => useContext(AuthContext);