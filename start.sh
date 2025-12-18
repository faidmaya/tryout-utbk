#!/bin/bash
# masuk ke backend
cd backend

# install dependencies
npm install

# compile TypeScript
npx tsc

# jalankan server
node dist/server.js
