"""
créer app factory
"""

# from app import create_app
from app import db, create_app

app = create_app() # Si vous utilisez une factory
with app.app_context():
    db.create_all()

if __name__ == "__main__":
	app.run(debug=True)

	