from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app, origins="*")

# ===============================
# Health Check
# ===============================
@app.route("/")
def home():
    return "AlgoMate Backend is running 🚀"


# ===============================
# Gemini Chat Route (Keep Yours)
# ===============================
@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        prompt = data.get("message")

        GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={GEMINI_API_KEY}"

        payload = {
            "contents": [
                {"parts": [{"text": prompt}]}
            ]
        }

        response = requests.post(url, json=payload)
        result = response.json()

        reply = result["candidates"][0]["content"]["parts"][0]["text"]

        return jsonify({"reply": reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ===============================
# Compiler Route (NEW)
# ===============================
@app.route("/compile", methods=["POST"])
def compile_code():
    try:
        data = request.get_json()

        language_id = data.get("language_id")
        source_code = data.get("source_code")
        stdin = data.get("stdin", "")

        if not language_id or not source_code:
            return jsonify({"error": "Missing language_id or source_code"}), 400

        url = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true"

        payload = {
            "language_id": language_id,
            "source_code": source_code,
            "stdin": stdin
        }

        headers = {
            "content-type": "application/json",
            "X-RapidAPI-Key": os.environ.get("RAPIDAPI_KEY"),
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        }

        response = requests.post(url, json=payload, headers=headers)
        return jsonify(response.json())

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
