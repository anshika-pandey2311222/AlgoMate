from flask import Blueprint, request, jsonify
import requests
import os

chat_bp = Blueprint("chat_bp", __name__)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

@chat_bp.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    if not GEMINI_API_KEY:
        return jsonify({"error": "GEMINI_API_KEY not set"}), 500

    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

    payload = {
        "contents": [
            {"parts": [{"text": user_message}]}
        ]
    }

    try:
        response = requests.post(
            url,
            params={"key": GEMINI_API_KEY},
            json=payload,
            timeout=30
        )

        result = response.json()

        if "candidates" not in result:
            return jsonify({"error_from_gemini": result}), 500

        reply = result["candidates"][0]["content"]["parts"][0]["text"]

        return jsonify({"response": reply}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
