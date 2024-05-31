import React, { useState, useEffect } from 'react';
import './App.css';
import VehicleTable from './VehicleTable';

function App() {
  const [vehicles, setVehicles] = useState([]);

  const fetchDataFromBackend = async () => {
    try {
      const response = await fetch('http://localhost:8080/vehicles/refresh'); // Adjust the URL as needed
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      // Update state with fetched data
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataFromBackend();
    const interval = setInterval(fetchDataFromBackend, 10000); // Fetch data every 10 seconds
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div className="App">
      <h1>Vehicle Table</h1>
      <VehicleTable vehicles={vehicles} />
    </div>
  );
}

export default App;
