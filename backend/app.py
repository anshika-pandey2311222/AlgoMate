from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

def create_app():
    app = Flask(__name__)

    # Enable CORS
    CORS(app, origins="*")

    # =============================
    # Compiler Route
    # =============================
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
                "X-RapidAPI-Key": os.getenv("RAPIDAPI_KEY"),
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
            }

            response = requests.post(url, json=payload, headers=headers)
            result = response.json()

            return jsonify(result)

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return app


app = create_app()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
