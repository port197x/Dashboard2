# Dashboard2

---

## 🧭 How to Add Categories and Links to the Dashboard

This guide outlines how to update the dashboard by editing the `links.json` and `categories.json` files. It ensures consistency, clarity, and modularity across all tiles.

---

### 📁 1. Update `categories.json`

Add a new entry to map your category name to an icon path:

```json
{
  "Tools": "assets/icons/tools.svg",
  "Design": "assets/icons/design.svg",
  "Status": "assets/icons/status.svg"
}
```

- **Key**: Category name (must match the `category` field in `links.json`)
- **Value**: Relative path to the icon (SVG preferred for clarity)

> ✅ **Important:** Always keep `"Status"` as the **last category** to maintain visual consistency with live status tiles.

---

### 🔗 2. Update `links.json`

Add new link objects under the appropriate category:

```json
[
 {
    "title": "freeCodeCamp",
    "url": "https://www.freecodecamp.org/",
    "favicon": "https://www.google.com/s2/favicons?domain=freecodecamp.org",
    "alt": "freeCodeCamp",
    "category": "Learning"
  },
  {
    "title": "Canva",
    "url": "https://www.canva.com/",
    "favicon": "https://www.google.com/s2/favicons?domain=canva.com",
    "alt": "Canva",
    "category": "Tools"
  }
]
```

Each object should include:

- `title`: Display name
- `url`: Destination link
- `favicon`: Optional icon for the tile (can be external or local)
- `alt`: Optional alt text for accessibility
- `category`: Must match a key in `categories.json`

---

### 🧼 3. Best Practices

- Group links by category for editorial clarity
- Use consistent naming and icon sizing
- Keep `"Status"` last in both `categories.json` and rendered output
- Avoid duplicate titles or broken URLs
- Use SVGs or 24px favicons for visual consistency

---
