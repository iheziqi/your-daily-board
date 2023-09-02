#!/bin/bash

# Get the current hour and minute
current_hour=$(date +%H)
current_minute=$(date +%M)

# Set the default TASK_TYPE
TASK_TYPE="FETCH_DATA"

# Check if the cron job is already set up
if ! crontab -l | grep -q "run_scheduled_task.sh"; then
  # Add the cron job to run the script every workday at 10:00 AM and 10:30 PM
  (crontab -l ; echo "0 10 * * 1-5 /path/to/run_scheduled_task.sh") | crontab -
  (crontab -l ; echo "30 10 * * 1-5 /path/to/run_scheduled_task.sh") | crontab -
fi


# Check if it's 10:30 AM, and if so, set TASK_TYPE to "SEND_EMAIL"
if [ $current_hour -eq 10 ] && [ $current_minute -eq 30 ]; then
  TASK_TYPE="SEND_EMAIL"
fi

export TASK_TYPE

# Specify the path to Node.js script
node /path/to/node_script.js