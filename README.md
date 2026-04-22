# TiMiPlanner

A lightweight task planner for kids and parents with a browser UI and a small Node.js backend for Webcal syncing.

## Features

- Login with username/password (stored locally)
- Parent (owner) and child roles
- Tasks can be created by parents and assigned to children
- Daily / weekly calendar views
- Shared and per-child Webcal sync
- Read-only lock indicator for imported Webcal appointments
- English and German UI

## Requirements

To run TiMiPlanner on your own server, you need:

- Node.js 20.x
- npm 10.x or newer
- A Linux server, macOS server, or Windows server with shell access
- Write permission in the project directory for the SQLite database file
- Open TCP port for the app, or a reverse proxy such as Nginx/Caddy in front of it

Project runtime dependencies:

- express
- sqlite3
- cors
- body-parser

Optional but recommended for production:

- Nginx or Caddy as reverse proxy
- systemd, pm2, or another process manager
- TLS certificate for HTTPS
- Regular backup of `timiplanner.db`

## Install Requirements On Debian

The following example installs the required runtime on Debian 12.

### 1. Update package lists

```bash
sudo apt update
sudo apt upgrade -y
```

### 2. Install base packages

```bash
sudo apt install -y curl ca-certificates gnupg git build-essential sqlite3
```

### 3. Install Node.js 20.x

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

### 4. Verify installation

```bash
node -v
npm -v
sqlite3 --version
```

Optional for production with reverse proxy:

```bash
sudo apt install -y nginx
```

Optional for TLS with Let's Encrypt:

```bash
sudo apt install -y certbot python3-certbot-nginx
```

## Local start

1. Install dependencies:
   - `npm install`
2. Start the app server:
   - `npm run dev`
3. Open `http://localhost:5500`
4. Log in with one of the demo users:
   - **Parent:** `parent` / `parent`
   - **Child (Lina):** `lina` / `lina`
   - **Child (Max):** `max` / `max`

## Installation On Your Own Server

### 1. Prepare the server

Install Node.js 20 and npm.

For Debian, you can use the commands from the section above.

Check versions:

```bash
node -v
npm -v
```

Clone or copy the project to the server, for example to `/opt/timiplanner`.

### 2. Install the application

```bash
cd /opt/timiplanner
npm install
```

### 3. Start the server manually

```bash
cd /opt/timiplanner
PORT=5500 npm start
```

The application will then be reachable at:

- `http://<server-ip>:5500`

### 4. Persistent application data

TiMiPlanner stores its live data in:

- `timiplanner.db`

Important:

- The SQLite file is created and updated in the project directory.
- The application user must have read/write permissions for this file.
- Back up `timiplanner.db` regularly if you want to preserve tasks, bonuses, users, and calendar sync state.

### 5. Run behind a reverse proxy

Recommended setup:

- TiMiPlanner runs locally on port `5500`
- Nginx or Caddy exposes the app on port `80`/`443`

Example Nginx config:

```nginx
server {
    listen 80;
    server_name your-domain.example;

    location / {
        proxy_pass http://127.0.0.1:5500;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 6. Run as a service

Example `systemd` unit:

```ini
[Unit]
Description=TiMiPlanner
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/timiplanner
ExecStart=/usr/bin/npm start
Environment=PORT=5500
Restart=always
RestartSec=5
User=timiplanner
Group=timiplanner

[Install]
WantedBy=multi-user.target
```

Then:

```bash
sudo systemctl daemon-reload
sudo systemctl enable timiplanner
sudo systemctl start timiplanner
sudo systemctl status timiplanner
```

## Production Notes

- Default demo users are active until you replace them in the application.
- Authentication is simple username/password storage in the application state and is not hardened for internet-facing production use.
- If the app is exposed publicly, place it behind HTTPS.
- Webcal imports are fetched by the backend server, so the server must have outbound HTTP/HTTPS access.
- Port is controlled by the `PORT` environment variable. Default is `5500`.

## Update Process

To update the application on your server:

```bash
cd /opt/timiplanner
git pull
npm install
sudo systemctl restart timiplanner
```

Before updates, back up:

- `timiplanner.db`

## Notes

- Live data is stored in SQLite in `timiplanner.db`.
- Webcal fetches are proxied through the backend endpoint at /api/webcal/fetch.
- Imported Webcal events are read-only tasks.
- Settings show a Webcal connection light:
   - Green = working
   - Red = not working
   - Gray = no source configured

## Extending the project

- Replace localStorage with a real backend (e.g., Node/Express, Supabase, Firebase).
- Add proper authentication and password hashing.
- Add permission rules so children cannot access other children's tasks.
- Enhance calendar view with drag & drop and recurring task support.

---

Powered by your local browser (no build step required).
