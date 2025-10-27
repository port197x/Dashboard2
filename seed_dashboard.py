import sqlite3
import json

# Load JSON data
with open('./assets/categories.json') as f:
    categories = json.load(f)

with open('./assets/links.json') as f:
    links = json.load(f)

# Connect to SQLite
conn = sqlite3.connect('dashboard.db')
cur = conn.cursor()

# Create tables
cur.execute('''
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    icon TEXT
)
''')

cur.execute('''
CREATE TABLE IF NOT EXISTS links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    category TEXT,
    favicon TEXT,
    alt TEXT
)
''')

# Insert categories
for name, icon in categories.items():
    cur.execute('INSERT INTO categories (name, icon) VALUES (?, ?)', (name, icon))

# Insert links
for link in links:
    cur.execute('''
        INSERT INTO links (title, url, category, favicon, alt)
        VALUES (?, ?, ?, ?, ?)
    ''', (
        link.get('title'),
        link.get('url'),
        link.get('category'),
        link.get('favicon'),
        link.get('alt')
    ))

# Commit and close
conn.commit()
conn.close()
print("✅ Seed complete: dashboard.db updated")