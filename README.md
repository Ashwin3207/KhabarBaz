# Khabarbaz: Personalized News Recommendation Web App

**Khabarbaz** is a personalized news recommendation web app built using the **MERN stack**. The app recommends news articles based on user preferences, reading history, and behavior. It leverages machine learning techniques such as **content-based filtering**, **collaborative filtering**, and **sentiment analysis** to deliver a personalized news experience.

## Features

- **News Feed**: Fetches real-time news articles from a news API.
- **Personalized Recommendations**: Recommends articles based on user behavior (clicks, likes, bookmarks).
- **Interactive UI**: A dynamic, responsive front-end.
- **User Profile**: Tracks user preferences and reading history.
- **Sentiment Analysis**: Analyzes article sentiment using models like DistilBERT.
- **Active Learning Pipeline**: Periodically retrains recommendation models using new user data.

## Tech Stack

### Frontend
- **React.js**: A JavaScript library for building the user interface.
- **Tailwind CSS**: A utility-first CSS framework for styling the app.
- **Axios**: A promise-based HTTP client for making API requests.

### Backend
- **Node.js** with **Express.js**: Server-side logic and API endpoints.
- **MongoDB**: A NoSQL database for storing user data, preferences, and history.

### Machine Learning
- **Content-Based Filtering**: Using TF-IDF or **BERT** for text analysis.
- **Collaborative Filtering**: Using matrix factorization or the **Surprise** library.
- **Sentiment Analysis**: Using **DistilBERT** for article sentiment analysis.

## Installation

### 1. Clone the repository
Clone this repo to your local machine:
```bash
git clone https://github.com/your-username/khabarbaz.git
cd khabarbaz
```

### 2. Install dependencies

**Backend (Node.js & Express)**
Navigate to the backend folder and install dependencies:
```bash
cd backend
npm install
```

**Frontend (React)**
Navigate to the frontend folder and install dependencies:
```bash
cd frontend
npm install
```

### 3. Configure environment variables
Create a `.env` file in both the frontend and backend directories and add the necessary environment variables, including API keys, MongoDB URI, and others.

### 4. Start the development servers

**Backend**
In the backend directory:
```bash
npm start
```

**Frontend**
In the frontend directory:
```bash
npm start
```

Now, visit http://localhost:3000 to view the application.

## Machine Learning Recommendation System

The recommendation system is under active development. Current efforts include:

- **Model Training**: Training content-based and collaborative filtering models using user data.
- **Sentiment Analysis**: Implementing sentiment analysis to assess article tone and improve relevance.
- **Active Learning Pipeline**: Retraining models periodically with updated user behavior data.

### Training the Model

- Models are periodically retrained with new data derived from user interaction (clicks, likes, etc.).
- Sentiment analysis helps filter out irrelevant articles based on sentiment scores.

## Future Improvements

- More advanced recommendation algorithms.
- Real-time updates to recommendations based on ongoing user interactions.
- Personalization using additional factors (e.g., location, time of day).

## Contributing

Feel free to contribute! You can open issues, create pull requests, or provide suggestions. Please ensure that your pull request follows the code style and is well-documented.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
