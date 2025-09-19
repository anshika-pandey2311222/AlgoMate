import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/chat": {"origins": "*"}})

API_KEY = "AIzaSyB8ibVNgT9AztTQ_TzuSCzHsGEAeF5QkUE" 
MODEL = "gemini-1.5-flash"
API_URL = f"https://generativelanguage.googleapis.com/v1/models/{MODEL}:generateContent?key={API_KEY}"

def ask_gemini(prompt):
    payload = {
        "contents": [{"parts": [{"text": prompt}]}]
    }

    try:
        response = requests.post(API_URL, json=payload)
        if response.status_code == 200:
            data = response.json()
            return (
                data.get("candidates", [{}])[0]
                .get("content", {})
                .get("parts", [{}])[0]
                .get("text", "⚠️ Empty response from Gemini.")
            )
        else:
            return f"⚠️ Error {response.status_code}: {response.text}"
    except Exception as e:
        return f"⚠️ Request failed: {str(e)}"

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")
    if not user_input:
        return jsonify({"reply": "⚠️ No message provided"}), 400

    bot_response = ask_gemini(user_input)
    return jsonify({"reply": bot_response})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
