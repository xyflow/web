import { spawn } from 'child_process';
import http from 'http';

// Wait until the server is up
function waitForServer(urls) {
  urls.forEach((url) => {
    const tryConnect = () => {
      http
        .get(`http://localhost:3002/${url}`, (res) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log(`\n### precompiled route /${url} is ready`);
          }
        })
        .on('error', () => {
          setTimeout(tryConnect, 1000);
        });
    };
    tryConnect();
  });
}

spawn('pnpm', ['dev'], {
  stdio: 'inherit',
  shell: true,
});

waitForServer(['learn', 'examples', "showcase"]);
