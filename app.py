from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5500"])

def fetch_links():
    conn = sqlite3.connect('dashboard.db')
    cur = conn.cursor()
    cur.execute('SELECT title, url, category, favicon, alt FROM links ORDER BY category, title')
    rows = cur.fetchall()
    conn.close()
    return [
        {'title': r[0], 'url': r[1], 'category': r[2], 'favicon': r[3], 'alt': r[4]}
        for r in rows
    ]

@app.route('/api/links')
def get_links():
    return jsonify(fetch_links())

if __name__ == '__main__':
    app.run(debug=True)