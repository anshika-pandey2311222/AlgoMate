from flask import Flask, request, jsonify
from flask_cors import CORS
from chat_api import chat_bp
import requests
import os

app = Flask(__name__)

# Allow frontend requests
CORS(app, origins="*")

# Register chatbot blueprint
app.register_blueprint(chat_bp)

JUDGE0_API_KEY = os.getenv("JUDGE0_API_KEY")

# ---------------- COMPILER ----------------
@app.route("/compile", methods=["POST"])
def compile_code():
    data = request.get_json()

    if not JUDGE0_API_KEY:
        return jsonify({"error": "JUDGE0_API_KEY not set"}), 500

    url = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true"

    headers = {
        "content-type": "application/json",
        "X-RapidAPI-Key": JUDGE0_API_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
    }

    payload = {
        "language_id": data.get("language_id"),
        "source_code": data.get("source_code"),
        "stdin": data.get("stdin", "")
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        return jsonify(response.json())
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Required for gunicorn
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
