#!/bin/bash

# Run npm build
npm run build
if [ $? -ne 0 ]; then
  echo "Build failed. Exiting..."
  exit 1
fi

# Git commands
git add .
git commit -m "$1"  # Use $1 for the commit message passed from the command line
git push -u origin main

echo "All commands executed successfully."
