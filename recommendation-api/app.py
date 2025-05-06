from flask import Flask, jsonify, request
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

app = Flask(__name__)

# Sample articles
articles = [
    {"title": "Tech News", "content": "This is a news article about technology."},
    {"title": "Sports Update", "content": "This is an article about sports."},
    {"title": "Movie Review", "content": "This is a movie review."},
    # More articles here
]

df = pd.DataFrame(articles)

# TF-IDF Vectorizer
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(df['content'])

# Cosine Similarity
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

# Function to get recommendations
def get_recommendations(index):
    sim_scores = list(enumerate(cosine_sim[index]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:6]  # Top 5 recommendations

    article_indices = [i[0] for i in sim_scores]
    return df['title'].iloc[article_indices].tolist()

@app.route('/recommendations', methods=['GET'])
def recommendations():
    user_id = request.args.get('userId')  # Get the user ID from query parameter
    # Here, fetch user data and reading history logic will go
    # For now, we're just calling the recommendation function directly
    
    # Example: Get recommendations for the first article
    recommendations = get_recommendations(0)
    return jsonify({"recommendations": recommendations})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
