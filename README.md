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

## Getting started

1. Install dependencies:
   - npm install
2. Start the app server:
   - npm run dev
3. Open http://localhost:5500
4. Log in with one of the demo users:
   - **Parent:** `parent` / `parent`
   - **Child (Lina):** `lina` / `lina`
   - **Child (Max):** `max` / `max`

## Notes

- Data is stored in localStorage under the key timiplanner:data.
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
