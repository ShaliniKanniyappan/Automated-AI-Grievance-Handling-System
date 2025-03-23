DB_CONFIG = {
    "DB_HOST": "localhost",     
    "DB_USER": "root",        
    "DB_PASSWORD": "",           
    "DB_NAME": "grievance_db"    
}

SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{DB_CONFIG['DB_USER']}:{DB_CONFIG['DB_PASSWORD']}@{DB_CONFIG['DB_HOST']}/{DB_CONFIG['DB_NAME']}"
SQLALCHEMY_TRACK_MODIFICATIONS = False
