from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from ai_analysis import analyze_sentiment, extract_keywords
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/grievance_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Petition Model (Main Table)
class Petition(db.Model):
    __tablename__ = 'petitions'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    status = db.Column(db.Enum('Pending', 'In Progress', 'Resolved', 'Rejected'), default="Pending")
    importance = db.Column(db.Enum('Low', 'Medium', 'High'), default="Low")
    details = db.Column(db.Text, nullable=False)
    document = db.Column(db.String(255), default=None)
    upvotes = db.Column(db.Integer, default=0)
    comments = db.Column(db.Integer, default=0)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())

# Function to calculate user engagement
def calculate_user_engagement(upvotes, comments):
    """
    Calculate user engagement score.
    Returns:
        - engagement_score: Weighted sum of upvotes and comments
    """
    return (upvotes * 3) + (comments * 2)

# Function to calculate time sensitivity
def calculate_time_sensitivity(created_at):
    """
    Calculate time sensitivity score.
    Returns:
        - time_sensitivity: Decay over 30 days
    """
    now = datetime.now()
    delta = (now - created_at).days
    return max(0, 1 - (delta / 30))  # Decay over 30 days

# Function to calculate importance score
def calculate_importance_score(grievance):
    """
    Calculate the importance score of a grievance.
    Returns:
        - importance_score: Weighted sum of sentiment, keyword frequency, user engagement, and time sensitivity
    """
    # Sentiment analysis
    sentiment_label, sentiment_score = analyze_sentiment(grievance['details'])

    # Keyword extraction
    keywords = extract_keywords([grievance['details']])
    keyword_frequency = len(keywords)  # Simplified example

    # User engagement
    user_engagement = calculate_user_engagement(grievance['upvotes'], grievance['comments'])

    # Time sensitivity
    time_sensitivity = calculate_time_sensitivity(grievance['created_at'])

    # Weights
    w1, w2, w3, w4 = 0.4, 0.3, 0.2, 0.1

    # Importance score
    importance_score = (w1 * sentiment_score) + (w2 * keyword_frequency) + (w3 * user_engagement) + (w4 * time_sensitivity)
    return importance_score

# Route to submit a petition
@app.route('/submit_petition', methods=['POST'])
def submit_petition():
    data = request.json
    username = data.get('username')
    details = data.get('details')
    upvotes = data.get('upvotes', 0)
    comments = data.get('comments', 0)

    # Create a new petition
    new_petition = Petition(
        username=username,
        details=details,
        upvotes=upvotes,
        comments=comments,
        status="Pending"
    )

    # Calculate importance score
    importance_score = calculate_importance_score({
        "details": details,
        "upvotes": upvotes,
        "comments": comments,
        "created_at": datetime.now()
    })

    # Assign importance level
    if importance_score >= 0.7:
        new_petition.importance = "High"
    elif importance_score >= 0.4:
        new_petition.importance = "Medium"
    else:
        new_petition.importance = "Low"

    # Save to database
    db.session.add(new_petition)
    db.session.commit()

    return jsonify({
        "message": "Petition submitted successfully!",
        "importance": new_petition.importance,
        "importance_score": importance_score
    })

# Route to update petition importance
@app.route('/update_importance/<int:petition_id>', methods=['PUT'])
def update_importance(petition_id):
    petition = Petition.query.get(petition_id)
    if not petition:
        return jsonify({"error": "Petition not found"}), 404

    # Calculate importance score
    importance_score = calculate_importance_score({
        "details": petition.details,
        "upvotes": petition.upvotes,
        "comments": petition.comments,
        "created_at": petition.created_at
    })

    # Update importance level
    if importance_score >= 0.7:
        petition.importance = "High"
    elif importance_score >= 0.4:
        petition.importance = "Medium"
    else:
        petition.importance = "Low"

    # Save changes to database
    db.session.commit()

    return jsonify({
        "message": "Petition importance updated successfully!",
        "importance": petition.importance,
        "importance_score": importance_score
    })

# Route to get all petitions
@app.route('/get_petitions', methods=['GET'])
def get_petitions():
    petitions = Petition.query.all()
    petition_list = [
        {
            "id": p.id,
            "username": p.username,
            "details": p.details,
            "status": p.status,
            "importance": p.importance,
            "upvotes": p.upvotes,
            "comments": p.comments,
            "created_at": p.created_at
        }
        for p in petitions
    ]
    return jsonify(petition_list)

# Run Flask App
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)