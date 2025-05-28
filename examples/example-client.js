import fetch from 'node-fetch';

const listTools = async () => {
  const response = await fetch('http://localhost:3000/api/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', method: 'tools/list', id: 1 })
  });
  const data = await response.json();
  console.log(data);
};

const callShelterLocator = async (location, radius) => {
  const response = await fetch('http://localhost:3000/api/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', method: 'tools/call', params: { location, radius }, id: 2 })
  });
  const data = await response.json();
  console.log(data);
};

listTools();
callShelterLocator('San Francisco', 5);