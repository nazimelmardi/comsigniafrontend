import React from 'react';

const VehicleTable = ({ vehicles, onUpdateVehicle, onUpdateMessage, onRegisterVehicle }) => {
  return (
    <div>
      <table>
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
            <td>
              <input
                type="text"
                value={vehicle.message}
                onChange={(e) => onUpdateMessage(vehicle.id, e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={vehicle.longitude}
                onChange={(e) => onUpdateVehicle(vehicle.id, e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={vehicle.latitude}
                onChange={(e) => onUpdateVehicle(vehicle.id, e.target.value)}
              />
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable;
