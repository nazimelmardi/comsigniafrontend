import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VehicleTable from './VehicleTable';

const mockVehicles = [
  { id: '1', longitude: '123.45', latitude: '54.321', message: 'Test Message 1' },
  { id: '2', longitude: '67.89', latitude: '12.345', message: 'Test Message 2' },
];

test('renders vehicle table with vehicles', () => {
  render(<VehicleTable vehicles={mockVehicles} />);

  // Check if the table renders correctly
  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('123.45')).toBeInTheDocument();
  expect(screen.getByText('54.321')).toBeInTheDocument();
  expect(screen.getByText('Test Message 1')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText('67.89')).toBeInTheDocument();
  expect(screen.getByText('12.345')).toBeInTheDocument();
  expect(screen.getByText('Test Message 2')).toBeInTheDocument();
});
