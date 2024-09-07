import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/drugs';

export const generateBarcode = async (drugData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate-barcode`, drugData);
    return response.data;
  } catch (error) {
    console.error('Error generating barcode:', error);
    throw error;
  }
};

export const getAllDrugs = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error retrieving drugs:', error);
    throw error;
  }
};

export const getDrugLocation = async (data) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/qr/${data}`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving drug location:', error);
    throw error;
  }
};
