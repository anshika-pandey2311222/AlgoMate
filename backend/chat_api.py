import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/chat": {"origins": "*"}})

API_KEY = "YOUR_API_KEY"
MODEL = "gemini-1.5-flash"
API_URL = f"https://generativelanguage.googleapis.com/v1/models/{MODEL}:generateContent?key={API_KEY}"


def ask_gemini(prompt):
    payload = {
        "contents": [{"parts": [{"text": prompt}]}]
    }

    try:
        response = requests.post(API_URL, json=payload, timeout=10)

        if response.status_code != 200:
            return "🤖 I'm currently being fixed by my developer. Please try again shortly."

        data = response.json()

        text = (
            data.get("candidates", [{}])[0]
            .get("content", {})
            .get("parts", [{}])[0]
            .get("text")
        )

        if not text:
            return "🤖 I'm temporarily unavailable and being improved. Please try again in a moment."

        return text

    except requests.exceptions.RequestException:
        return "🤖 I'm currently under maintenance. Please try again soon."


@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")

    if not user_input:
        return jsonify({"reply": "⚠️ No message provided"}), 400

    bot_response = ask_gemini(user_input)
    return jsonify({"reply": bot_response})


if __name__ == "__main__":
    app.run(port=5000, debug=True)
