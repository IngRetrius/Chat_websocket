# Chat WebSocket

Simple WebSocket chat example using an Express + Socket.IO server and a React client (Vite).

**Repository layout:**
- `client/` — React + Vite frontend (uses `socket.io-client`).
- `server/` — Node/Express + `socket.io` server.

Prerequisites
- Node.js (v16+) and npm installed.

Installation
1. Clone the repository (if not already cloned).
2. Install server dependencies:

   ```powershell
   cd server
   npm install
   ```

3. Install client dependencies:

   ```powershell
   cd ..\client
   npm install
   ```

Running the project

1. Start the server (from `server/`):

   ```powershell
   cd server
   npm start
   ```

   The `server` package.json defines `start` as `node --watch index.js`, which restarts on file changes.

2. Start the client dev server (from `client/`):

   ```powershell
   cd client
   npm run dev
   ```

   Vite will start a development server (usually at `http://localhost:5173`).

Build for production

- Client production build:

  ```powershell
  cd client
  npm run build
  ```

- Server: there is no special build step; deploy the `server` folder as a Node app.

Project structure

- `client/` — frontend source files (`src/`, `index.html`, `package.json`).
- `server/` — backend entry `index.js`, `package.json`.

Notes
- The client connects to the server using `socket.io-client`; ensure the server URL/port matches if you change defaults.
- Environment files (e.g. `.env`) are ignored by `.gitignore` — use them for local configuration.

Contributing
- Feel free to open issues or submit pull requests. Keep changes focused and add documentation where helpful.

License
- Check repository settings or add a `LICENSE` file as appropriate.
