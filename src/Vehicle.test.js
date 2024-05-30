import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VehicleTable from './VehicleTable';

const mockVehicles = [
  { id: '1', longitude: '123.45', latitude: '54.321', message: 'Test Message 1' },
  { id: '2', longitude: '67.89', latitude: '12.345', message: 'Test Message 2' },
];

test('renders vehicle table with vehicles', () => {
  render(<VehicleTable vehicles={mockVehicles} onUpdateVehicle={jest.fn()} onUpdateMessage={jest.fn()} />);

  // Check if the table renders correctly
  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('123.45')).toBeInTheDocument();
  expect(screen.getByText('54.321')).toBeInTheDocument();
  expect(screen.getByDisplayValue('Test Message 1')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
});

test('calls onUpdateMessage when message is changed', () => {
  const mockOnUpdateMessage = jest.fn();
  render(<VehicleTable vehicles={mockVehicles} onUpdateVehicle={jest.fn()} onUpdateMessage={mockOnUpdateMessage} />);

  // Simulate changing the message
  fireEvent.change(screen.getByDisplayValue('Test Message 1'), { target: { value: 'New Message 1' } });
  expect(mockOnUpdateMessage).toHaveBeenCalledWith('1', 'New Message 1');
});

test('calls onUpdateVehicle when longitude is changed', () => {
  const mockOnUpdateVehicle = jest.fn();
  render(<VehicleTable vehicles={mockVehicles} onUpdateVehicle={mockOnUpdateVehicle} onUpdateMessage={jest.fn()} />);

  // Simulate changing the longitude
  fireEvent.change(screen.getByDisplayValue('123.45'), { target: { value: '678.90' } });
  expect(mockOnUpdateVehicle).toHaveBeenCalledWith('1', '678.90');
});

test('calls onUpdateVehicle when latitude is changed', () => {
  const mockOnUpdateVehicle = jest.fn();
  render(<VehicleTable vehicles={mockVehicles} onUpdateVehicle={mockOnUpdateVehicle} onUpdateMessage={jest.fn()} />);

  // Simulate changing the latitude
  fireEvent.change(screen.getByDisplayValue('54.321'), { target: { value: '98.765' } });
  expect(mockOnUpdateVehicle).toHaveBeenCalledWith('1', '98.765');
});
