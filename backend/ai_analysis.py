import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from sklearn.feature_extraction.text import TfidfVectorizer

# Download the VADER lexicon for sentiment analysis
nltk.download("vader_lexicon")

# Initialize the sentiment analyzer
sia = SentimentIntensityAnalyzer()

def analyze_sentiment(text):
    """
    Analyze the sentiment of a petition text.
    Returns:
        - sentiment_label: "Positive", "Negative", or "Neutral"
        - sentiment_score: Compound score from -1 (negative) to 1 (positive)
    """
    sentiment = sia.polarity_scores(text)
    compound_score = sentiment["compound"]

    if compound_score >= 0.05:
        sentiment_label = "Positive"
    elif compound_score <= -0.05:
        sentiment_label = "Negative"
    else:
        sentiment_label = "Neutral"

    return sentiment_label, compound_score

def extract_keywords(texts):
    """
    Extract keywords from a list of texts using TF-IDF.
    Returns:
        - keywords: List of top keywords
    """
    vectorizer = TfidfVectorizer(stop_words='english', max_features=10)
    tfidf_matrix = vectorizer.fit_transform(texts)
    feature_names = vectorizer.get_feature_names_out()
    return feature_names