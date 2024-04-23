#!/bin/bash

# Run the cron job script in the background
node "$(dirname "$0")/cron.js" &

# Start the Express.js app
node "$(dirname "$0")/app.js"
