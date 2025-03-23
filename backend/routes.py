from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:yourpassword@localhost/petition_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Main Petition Table (General)
class Petition(db.Model):
    __tablename__ = 'petitions'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255), nullable=False)
    details = db.Column(db.Text, nullable=False)
    importance = db.Column(db.Enum('Low', 'Medium', 'High'), default="Low")
    status = db.Column(db.Enum('Pending', 'In Progress', 'Resolved', 'Rejected'), default="Pending")
    document = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())

# Department-Specific Tables
class ElectricityPetition(db.Model):
    __tablename__ = 'electricity_petitions'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    petition_id = db.Column(db.Integer, db.ForeignKey('petitions.id', ondelete='CASCADE'), nullable=False)
    username = db.Column(db.String(255), nullable=False)
    details = db.Column(db.Text, nullable=False)
    importance = db.Column(db.Enum('Low', 'Medium', 'High'), default="Low")
    status = db.Column(db.Enum('Pending', 'In Progress', 'Resolved', 'Rejected'), default="Pending")
    document = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())

class TransportPetition(db.Model):
    __tablename__ = 'transport_petitions'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    petition_id = db.Column(db.Integer, db.ForeignKey('petitions.id', ondelete='CASCADE'), nullable=False)
    username = db.Column(db.String(255), nullable=False)
    details = db.Column(db.Text, nullable=False)
    importance = db.Column(db.Enum('Low', 'Medium', 'High'), default="Low")
    status = db.Column(db.Enum('Pending', 'In Progress', 'Resolved', 'Rejected'), default="Pending")
    document = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())

class EducationPetition(db.Model):
    __tablename__ = 'education_petitions'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    petition_id = db.Column(db.Integer, db.ForeignKey('petitions.id', ondelete='CASCADE'), nullable=False)
    username = db.Column(db.String(255), nullable=False)
    details = db.Column(db.Text, nullable=False)
    importance = db.Column(db.Enum('Low', 'Medium', 'High'), default="Low")
    status = db.Column(db.Enum('Pending', 'In Progress', 'Resolved', 'Rejected'), default="Pending")
    document = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())

# Submit Petition Route
@app.route('/submit_petition', methods=['POST'])
def submit_petition():
    try:
        data = request.get_json()

        username = data.get('username')
        department = data.get('department')  # Used for determining table
        details = data.get('details')

        if not username or not department or not details:
            return jsonify({"error": "All fields are required"}), 400

        # Create main petition
        new_petition = Petition(username=username, details=details)
        db.session.add(new_petition)
        db.session.commit()

        # Assign to department table
        if department == "Electricity":
            department_petition = ElectricityPetition(petition_id=new_petition.id, username=username, details=details)
        elif department == "Transport":
            department_petition = TransportPetition(petition_id=new_petition.id, username=username, details=details)
        elif department == "Education":
            department_petition = EducationPetition(petition_id=new_petition.id, username=username, details=details)
        else:
            return jsonify({"error": "Invalid department"}), 400

        db.session.add(department_petition)
        db.session.commit()

        return jsonify({"message": "Petition submitted successfully!", "importance": new_petition.importance}), 200

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "Server error", "details": str(e)}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Ensures tables are created
    app.run(debug=True)
