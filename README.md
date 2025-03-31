# URL Shortener

This project is a simple URL shortening API using **Node.js, Express, MongoDB, and Redis**.

## 🚀 Features

- **URL Shortening**: Converts a long URL into a short one.
- **Redirection**: Retrieves the long URL from a short link.
- **Caching with Redis**: Improves performance by temporarily storing shortened URLs.
- **URL Validation**: Ensures the provided URL is in a valid format before shortening.

## 🛠️ Installation

### 1️⃣ Prerequisites

- **Node.js** (v14+ recommended)
- **MongoDB** (ensure a MongoDB server is running)
- **Redis** (required for caching)

### 2️⃣ Clone the Project

```bash
git clone https://github.com/saurabh3569/url-shortner-api.git
cd url-shortener
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Configure Environment Variables

Create a `.env` file in the project root and add:

```env
MONGO_URI=mongodb://localhost:27017/url-shortener
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

## 🔥 Run the Project

```bash
npm start
```

The API will be available at `http://localhost:5000`.

## 📌 API Routes

### 🎯 1. Shorten a URL

**POST** `/url`

```json
{
  "url": "https://example.com"
}
```

**Response**:

```json
"https://tinyurl.com/abcd12"
```

### 🎯 2. Redirect to Original URL

**GET** `/url/:short`

If the shortened URL exists, the API will return the original URL.

## 🏗️ Project Structure

```
.
├── configs
│   ├── db.js         # MongoDB Connection
│   ├── redis.js      # Redis Connection
│
├── models
│   ├── url.model.js  # Mongoose Model for URLs
│
├── routes
│   ├── url.route.js  # Routes for URL handling
│
├── server.js         # Application Entry Point
└── .env.example      # Example Configuration
```

## 🛠️ Future Improvements

- 📊 Track usage statistics
- ⏳ Expire URLs after a certain period
- 🔑 Authentication to limit requests

## 📄 License

This project is licensed under **MIT**.

---

Developed with ❤️ by **Your Name**.
