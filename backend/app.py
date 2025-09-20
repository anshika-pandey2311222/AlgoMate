from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app, origins=["https://algomate-production.up.railway.app"], supports_credentials=True, allow_headers="*", methods=["GET", "POST", "OPTIONS"])

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
JUDGE0_API_KEY = os.getenv("JUDGE0_API_KEY")

@app.route("/chat", methods=["POST", "OPTIONS"])
def chat():
    if request.method == "OPTIONS":
        return jsonify({}), 200
    data = request.get_json()
    user_message = data.get("message", "")
    headers = {"Authorization": f"Bearer {GEMINI_API_KEY}"}
    payload = {"prompt": user_message}
    try:
        resp = requests.post("https://api.gemini.example/v1/generate", json=payload, headers=headers)
        result = resp.json()
        bot_response = result.get("text", "Sorry, I couldn't process that.")
    except Exception as e:
        bot_response = f"Error: {str(e)}"
    return jsonify({"response": bot_response})

@app.route("/compile", methods=["POST", "OPTIONS"])
def compile_code():
    if request.method == "OPTIONS":
        return jsonify({}), 200
    data = request.get_json()
    language_id = data.get("language_id")
    source_code = data.get("source_code")
    stdin = data.get("stdin", "")
    headers = {"X-RapidAPI-Key": JUDGE0_API_KEY}
    payload = {"language_id": language_id, "source_code": source_code, "stdin": stdin}
    try:
        resp = requests.post("https://judge0.p.rapidapi.com/submissions", json=payload, headers=headers)
        result = resp.json()
    except Exception as e:
        result = {"stderr": str(e)}
    return jsonify(result)

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
