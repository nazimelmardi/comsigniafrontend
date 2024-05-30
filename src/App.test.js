import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import VehicleTable from './VehicleTable';

// Mock the fetch function globally
global.fetch = jest.fn();

const mockVehicles = [
  { id: '1', longitude: '123.45', latitude: '54.321', message: 'Test Message 1' },
  { id: '2', longitude: '67.89', latitude: '12.345', message: 'Test Message 2' },
];

// Reset fetch mock before each test
beforeEach(() => {
  fetch.mockClear();
});

// Mock VehicleTable component to avoid rendering its children
jest.mock('./VehicleTable', () => jest.fn(() => <div>Mocked VehicleTable</div>));

test('fetchDataFromBackend fetches and sets vehicles', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockVehicles,
  });

  render(<App />);

  // Verify fetch is called with the correct URL
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith('/api/vehicles/refresh');
  });

  // Wait for the data to be fetched and state updated
  await waitFor(() => {
    expect(VehicleTable).toHaveBeenCalledWith(
      expect.objectContaining({ vehicles: mockVehicles }),
      expect.anything()
    );
  });
});

test('handleUpdateVehicle updates vehicle', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockVehicles,
  });

  render(<App />);

  // Wait for initial data fetch
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith('/api/vehicles/refresh');
  });

  fetch.mockResolvedValueOnce({ ok: true });

  // Call handleUpdateVehicle directly
  const { onUpdateVehicle } = VehicleTable.mock.calls[0][0];
  await onUpdateVehicle('1', '678.90', '98.765');

  // Verify the fetch call to update vehicle
  expect(fetch).toHaveBeenCalledWith('http://localhost:8080/vehicles/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: '1', longitude: '678.90', latitude: '98.765' }),
  });
});

test('handleUpdateMessage updates vehicle message', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockVehicles,
  });

  render(<App />);

  // Wait for initial data fetch
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith('/api/vehicles/refresh');
  });

  fetch.mockResolvedValueOnce({ ok: true });

  // Call handleUpdateMessage directly
  const { onUpdateMessage } = VehicleTable.mock.calls[0][0];
  await onUpdateMessage('1', 'New Test Message');

  // Verify the fetch call to update message
  expect(fetch).toHaveBeenCalledWith('http://localhost:8080/notifications/ui', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: '1', message: 'New Test Message' }),
  });
});

test('handles fetch error in fetchDataFromBackend', async () => {
  fetch.mockRejectedValueOnce(new Error('Fetch failed'));

  // Mock console.error to avoid cluttering the test output
  const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

  render(<App />);

  // Wait for the error to be logged
  await waitFor(() => {
    expect(console.error).toHaveBeenCalledWith('Error fetching data:', new Error('Fetch failed'));
  });

  // Restore console.error
  consoleErrorMock.mockRestore();
});

