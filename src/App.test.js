import React from 'react';
import { render, waitFor } from '@testing-library/react';
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

test('fetchDataFromBackend fetches and sets vehicles on mount and every 10 seconds', async () => {
  jest.useFakeTimers();

  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockVehicles,
  });

  render(<App />);

  // Verify fetch is called with the correct URL on mount
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/vehicles/refresh');
  });

  // Wait for the data to be fetched and state updated
  await waitFor(() => {
    expect(VehicleTable).toHaveBeenCalledWith(
      expect.objectContaining({ vehicles: mockVehicles }),
      expect.anything()
    );
  });

  // Mock fetch again for the interval call
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockVehicles,
  });

  // Fast forward 10 seconds
  jest.advanceTimersByTime(10000);

  // Verify fetch is called again after 10 seconds
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/vehicles/refresh');
  });

  jest.useRealTimers();
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
