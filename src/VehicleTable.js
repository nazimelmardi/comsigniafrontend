import React from 'react';
import './index.css';

const VehicleTable = ({ vehicles }) => {
  return (
    <div>
      <table className="vehicle-table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Longitude</th>
          <th>Latitude</th>
          <th>Message</th>
        </tr>
        </thead>
        <tbody>
        {vehicles.map((vehicle) => (
          <tr key={vehicle.id}>
            <td>{vehicle.id}</td>
            <td>{vehicle.longitude}</td>
            <td>{vehicle.latitude}</td>
            <td>{vehicle.message}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable;
