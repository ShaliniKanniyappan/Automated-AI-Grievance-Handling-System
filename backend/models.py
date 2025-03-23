from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Main Petition Table
class Petition(db.Model):
    __tablename__ = 'petitions'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255), nullable=False)
    details = db.Column(db.Text, nullable=False)
    importance = db.Column(db.Enum('Low', 'Medium', 'High'), default="Low")
    status = db.Column(db.Enum('Pending', 'In Progress', 'Resolved', 'Rejected'), default="Pending")
    document = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "details": self.details,
            "importance": self.importance,
            "status": self.status,
            "document": self.document,
            "created_at": self.created_at
        }

# Electricity Department Table
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

# Transport Department Table
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

# Education Department Table
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
