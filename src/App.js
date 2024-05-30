import React, {useState, useEffect, useImperativeHandle} from 'react';
import './App.css';
import VehicleTable from './VehicleTable';

function App() {
  const [vehicles, setVehicles] = useState([]);

  const fetchDataFromBackend = async () => {
    try {
      const response = await fetch('/api/vehicles/refresh'); // Adjust the URL as needed
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
  }, []);

  const handleUpdateVehicle = async (id, longitude, latitude) => {
    try {
      const response = await fetch(`http://localhost:8080/vehicles/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, longitude, latitude }),
      });
      if (!response.ok) {
        throw new Error('Failed to update vehicle');
      }
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  };

  const handleUpdateMessage = async (id, message) => {
    try {
      const response = await fetch('http://localhost:8080/notifications/ui', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, message }),
      });
      if (!response.ok) {
        throw new Error('Failed to update message');
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };


  return (
    <div className="App">
      <h1>Vehicle Table</h1>
      <VehicleTable
        vehicles={vehicles}
        onUpdateVehicle={handleUpdateVehicle}
        onUpdateMessage={handleUpdateMessage}
      />
    </div>
  );
}

export default App;
