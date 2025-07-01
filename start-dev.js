const { spawn } = require('child_process');
const path = require('path');

// Start backend server
const backend = spawn('node', ['run.js'], {
  stdio: 'inherit',
  cwd: __dirname
});

// Start frontend dev server
const frontend = spawn('npx', ['vite', '--host', '0.0.0.0'], {
  stdio: 'inherit',
  cwd: path.join(__dirname, 'client')
});

// Handle cleanup
process.on('SIGINT', () => {
  console.log('\nShutting down servers...');
  backend.kill();
  frontend.kill();
  process.exit();
});

process.on('SIGTERM', () => {
  backend.kill();
  frontend.kill();
  process.exit();
});

backend.on('exit', (code) => {
  console.log(`Backend exited with code ${code}`);
});

frontend.on('exit', (code) => {
  console.log(`Frontend exited with code ${code}`);
});