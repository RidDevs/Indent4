# 🇮🇳 Indent4 — Indian Government Schemes Finder

A full-stack AI-powered web application that helps Indian citizens discover government schemes relevant to them based on their profile — state, occupation, age, income, and more.

---

## 📁 Project Structure

```
Indent4/
└── myapp/
    ├── model/                          # Flask backend + AI model
    │   ├── app_New.py                  # Main Flask server (all API endpoints)
    │   ├── search.py                   # Terminal search utility
    │   ├── schemes_env/                # Python virtual environment
    │   └── indian_schemes_model/       # Trained ML model files
    │       ├── schemes.faiss           # FAISS vector index (3400 schemes)
    │       ├── schemes_lookup.csv      # Scheme metadata CSV
    │       └── ...                     # SentenceTransformer model weights
    │
    └── src/                            # React frontend
        ├── pages/
        │   ├── Home.jsx                # Landing page
        │   ├── Login.jsx               # Login page
        │   ├── Register.jsx            # Registration page
        │   ├── Dashboard.jsx           # Main dashboard (For You + All Schemes)
        │   ├── Search.jsx              # Advanced AI search with filters
        │   ├── Profile.jsx             # User profile editor
        │   └── Wishlist.jsx            # Saved schemes
        └── components/
            ├── Sidebar.jsx             # Navigation sidebar
            ├── SchemeCard.jsx          # Scheme result card
            └── Filters.jsx             # State + occupation dropdowns
```

---

## 🧠 How the AI Model Works

The model uses **all-MiniLM-L6-v2** (a SentenceTransformer) fine-tuned on Indian Government Scheme data, combined with a **FAISS** vector index for fast semantic search.

```
User Input (keyword, state, occupation, age, income)
        ↓
Build semantic query string
  e.g. "housing scheme for farmer in Gujarat aged 35 low income"
        ↓
Encode query → 384-dimensional embedding vector
        ↓
FAISS searches 3400 scheme vectors for nearest neighbours
        ↓
Post-filter by: state, occupation, minAge, income
        ↓
Return top 12 ranked schemes
```

### Filter Logic

| Filter | Rule |
|--------|------|
| State | Shows schemes for user's state + All India (Central) schemes always included |
| Occupation | Matches canonical label (Farmer, Student, etc.) + General schemes always included |
| Age | Skips schemes where minAge > user's age |
| Income | For "Below 1L", excludes schemes meant for high income groups |
| Fallback | If filters return fewer than 3 results, returns top semantic matches without filters |

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Backend | Python Flask |
| AI Model | SentenceTransformers (all-MiniLM-L6-v2) |
| Vector Search | FAISS (Facebook AI Similarity Search) |
| Data | 3400 Indian Government Schemes (CSV) |
| Auth | localStorage (client-side) |
| Cross-Origin | flask-cors |

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js 18+
- Python 3.9+
- The `indian_schemes_model/` folder (model weights + FAISS index)

---

### Step 1 — Clone the repo

```bash
git clone https://github.com/RidDevs/Indent4.git
cd Indent4/myapp
```

---

### Step 2 — Set up the Python environment

```bash
cd model
python3 -m venv schemes_env
source schemes_env/bin/activate
```

---

### Step 3 — Install Python dependencies

```bash
pip install sentence-transformers faiss-cpu pandas numpy flask flask-cors
```

> On Apple Silicon (M1/M2) if faiss-cpu fails:
> ```bash
> pip install faiss-cpu --no-binary :all:
> ```

---

### Step 4 — Install frontend dependencies

```bash
cd ..       # back to myapp/
npm install
```

---

### Step 5 — Start the model server

```bash
cd model
source schemes_env/bin/activate
python3 app_New.py
```

You should see:
```
✅ Loaded 3400 schemes | 38 states | 10 occupations
🚀 Server running at http://localhost:5000
```

---

### Step 6 — Start the React app (new terminal)

```bash
cd Indent4/myapp
npm run dev
```

Open **http://localhost:5173** in your browser.

---

### Every time you come back

```bash
# Terminal 1 — model server
cd /path/to/Indent4/myapp/model
source schemes_env/bin/activate
python3 app_New.py

# Terminal 2 — React app
cd /path/to/Indent4/myapp
npm run dev
```

---

## 🔌 API Endpoints

All endpoints are served by `app_New.py` on `http://localhost:5000`.

---

### `POST /predict`

Used by **Search.jsx**. Accepts user inputs and returns matching schemes.

**Request body:**
```json
{
  "keyword":     "housing scheme",
  "age":         35,
  "state":       "Gujarat",
  "gender":      "Male",
  "occupation":  "Farmer",
  "incomeRange": "Below 1L"
}
```

**Response:**
```json
{
  "query":    "housing scheme for farmer in Gujarat for person aged 35",
  "count":    12,
  "filtered": true,
  "schemes": [
    {
      "scheme_name": "PM Awas Yojana Gramin",
      "category":    "Housing & Shelter",
      "level":       "Central",
      "state":       "All India",
      "occupation":  "Farmer",
      "minAge":      18,
      "benefits":    "Financial assistance of ₹1.2 lakh...",
      "eligibility": "...",
      "application": "...",
      "documents":   "...",
      "tags":        "Housing, Rural, BPL",
      "score":       0.847
    }
  ]
}
```

---

### `GET /api/for-you`

Used by **Dashboard.jsx**. Returns personalised schemes from user profile.

**Query params:**
```
state=Gujarat&occupation=farmer&age=35&k=12
```

**Response:**
```json
{
  "query":    "government schemes for farmer in Gujarat for person aged 35",
  "count":    12,
  "filtered": true,
  "results":  [ ...schemes ]
}
```

---

### `GET /api/search`

Used by **Dashboard.jsx** All Schemes tab. Keyword search with optional filters.

**Query params:**
```
q=education+scholarship&state=Tamil+Nadu&occupation=Student&k=6
```

---

### `GET /api/filters`

Returns all valid dropdown values for state and occupation filters.

**Response:**
```json
{
  "states":      ["All India", "Andhra Pradesh", "Assam", ...],
  "occupations": ["Disabled", "Entrepreneur", "Farmer", "General", ...]
}
```

---

### `GET /api/stats`

Returns dataset statistics shown in the UI header.

**Response:**
```json
{
  "total_schemes": 3400,
  "categories":    19
}
```

---

## 📄 Pages Overview

### Home (`/`)
Landing page with app introduction and links to login/register.

### Register (`/register`)
User creates account with: name, email, password, age, state, occupation, income range, caste, area type, district. Saved to localStorage.

### Login (`/login`)
Authenticates against localStorage users. Sets `currentUser` in localStorage.

### Dashboard (`/dashboard`)
Two tabs:

- **Schemes For You** — Automatically calls `/api/for-you` using the logged-in user's profile (state, occupation, age). Shows personalised AI results.
- **All Schemes** — Search bar + state/occupation dropdowns. Calls `/api/search`.

### Search (`/search`)
Advanced search page with:
- Keyword text input
- Age and State text inputs
- Gender toggle buttons (Male / Female / Other)
- Occupation toggle buttons (12 options)
- Income toggle buttons (Below 1L / 1-4L / 4-8L / Above 8L)

All inputs are combined into a semantic query sent to `POST /predict`.

### Profile (`/profile`)
Edit profile fields (name, age, gender, occupation, state, district, income, caste, area). Changes are saved to localStorage and used for personalised recommendations.

### Wishlist (`/wishlist`)
Displays schemes the user has saved/bookmarked.

---

## 🗂️ Occupation Mapping

The Search page uses plain English toggle labels. The model maps them internally:

| Search Toggle | Model Label |
|--------------|-------------|
| Farmer | Farmer |
| Student | Student |
| Entrepreneur | Entrepreneur |
| Self Employed | Entrepreneur |
| Daily Wage Worker | Labourer |
| Widow | Women |
| Homemaker | Women |
| Disabled | Disabled |
| Senior Citizen | Senior Citizen |
| Unemployed | General |
| Private Employee | General |
| Government Employee | General |

---

## 🐛 Troubleshooting

### `ModuleNotFoundError: No module named 'sentence_transformers'`
The virtual environment is not active. Run:
```bash
source /path/to/Indent4/myapp/model/schemes_env/bin/activate
python3 app_New.py
```

### `pip not found`
```bash
source schemes_env/bin/activate
pip3 install sentence-transformers faiss-cpu pandas numpy flask flask-cors
```

### Port 5000 already in use
```bash
lsof -i :5000
kill -9 <PID>
python3 app_New.py
```

### CORS error in browser console
Make sure `flask-cors` is installed:
```bash
pip install flask-cors
```
And that `CORS(app)` is present at the top of `app_New.py`.

### No results returned
- Check that `indian_schemes_model/` folder is inside `myapp/model/`
- Check that `schemes.faiss` and `schemes_lookup.csv` are present
- Try loosening filters (remove state or occupation)

### faiss-cpu install fails on Apple Silicon
```bash
pip install faiss-cpu --no-binary :all:
```

---

## 📊 Dataset

- **3,400** Indian Government Schemes
- Source: Kaggle — `jainamgada45/indian-government-schemes`
- Fields: scheme name, details, benefits, eligibility, application steps, required documents, level (Central/State), category, tags
- Derived fields (auto-computed at startup): state, occupation, minAge

---

## 🔐 Authentication

Authentication is currently client-side using **localStorage**:
- `users` — array of all registered users
- `currentUser` — currently logged-in user object
- `isLoggedIn` — boolean flag
- `wishlist` — array of saved scheme objects

> For production, replace with a proper backend auth system (JWT, sessions, etc.)

---

## 🛠️ Development Notes

- The model server must be running on port **5000** before the React app can fetch results
- React runs on port **5173** (Vite default)
- All API calls use `http://localhost:5000` as the base URL
- The model loads once at startup and stays in memory — do not restart unnecessarily as it takes ~10–15 seconds to load

---

## 👥 Team

Built for **Indent4 Hackathon** by Abhilekh | Nibbir | Rittam | Ritupal

---

## 📜 License

MIT License — free to use and modify.
