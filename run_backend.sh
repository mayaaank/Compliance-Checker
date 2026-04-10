#!/bin/zsh
# Starts Ollama + FastAPI backend
# Run from project root

echo "Starting Ollama..."
ollama serve &
OLLAMA_PID=$!
sleep 2

echo "Activating venv..."
source venv/bin/activate

echo "Starting FastAPI on port 8000..."
uvicorn backend.main:app --reload --port 8000

# Cleanup on exit
trap "kill $OLLAMA_PID 2>/dev/null" EXIT
