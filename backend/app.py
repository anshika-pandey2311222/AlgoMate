from flask import Flask, request, jsonify
from flask_cors import CORS
from chat_api import chat_bp
import requests
import os

app = Flask(__name__)
CORS(app, origins="*")

app.register_blueprint(chat_bp)

# ---------------- ROOT ----------------
@app.route("/", methods=["GET"])
def home():
    return "AlgoMate Backend Running 🚀", 200

# ---------------- HEALTH ----------------
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200
