# How to run

## Local Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Copy `.env.example` to `.env` and set the API keys.
4. Run `npm start` to start the server.

## Docker Setup
1. Build the Docker image: `docker build -t sf-dog-shelter-finder .`
2. Run the Docker container: `docker run -p 3000:3000 sf-dog-shelter-finder`

## Example API Calls
- List tools:
  ```bash
  curl -X POST http://localhost:3000/api/mcp -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"tools/list","id":1}'
  ```
- Call shelter locator tool:
  ```bash
  curl -X POST http://localhost:3000/api/mcp -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"tools/call","params":{"location":"San Francisco","radius":5},"id":2}'
  ```