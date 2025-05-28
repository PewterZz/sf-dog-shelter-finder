const express = require('express');
const bodyParser = require('body-parser');
const Ajv = require('ajv');
const { fetchShelters } = require('./shelterService');

const app = express();
app.use(bodyParser.json());

const ajv = new Ajv();

/**
 * Handles MCP requests for tool execution.
 */
app.post('/api/mcp', (req, res) => {
  const { jsonrpc, method, params, id } = req.body;
  if (!jsonrpc || jsonrpc !== '2.0' || !method || !id) {
    return res.status(400).json({ jsonrpc: '2.0', error: { code: -32600, message: 'Invalid Request' }, id: null });
  }
  if (method === 'tools/list') {
    return res.json({ jsonrpc: '2.0', result: ['shelter_locator'], id });
  } else if (method === 'tools/call') {
    const validate = ajv.compile({ type: 'object', properties: { location: { type: 'string' }, radius: { type: 'integer' } }, required: ['location', 'radius'] });
    if (!validate(params)) {
      return res.status(400).json({ jsonrpc: '2.0', error: { code: -32602, message: 'Invalid params' }, id });
    }
    fetchShelters(params.location, params.radius)
      .then(result => {
        res.setHeader('Transfer-Encoding', 'chunked');
        res.flushHeaders();
        result.forEach(chunk => res.write(JSON.stringify({ jsonrpc: '2.0', result: chunk, id }) + '\n'));
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ jsonrpc: '2.0', error: { code: -32000, message: 'Server error' }, id });
      });
  } else {
    res.status(400).json({ jsonrpc: '2.0', error: { code: -32601, message: 'Method not found' }, id });
  }
});

app.listen(3000, () => console.log('MCP server running on port 3000'));