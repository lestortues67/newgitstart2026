"""
Source : 
Date : 17/05/2026
Auteur : Ch Doriath
Fichier : __init__.py
qui marque un répertoire comme un paquet (package) Python régulier 
Description : Pour indiquer à python que le dossier /app est 
un package qui vous permet d'importer ses modules.

"""

# coding: utf-8

import mimetypes
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

# Flask-Alembic
from flask_alembic import Alembic

from flask_login import LoginManager

from app.de_bp_routes import de
from app.fr_bp_routes import fr
from app.en_bp_routes import en
from app.it_bp_routes import it
from app.base_bp_routes import base
from app.main import main



# Initialize SQLAlchemy instance (outside create_app for import access)
db = SQLAlchemy()

def create_app():
    # app = Flask(__name__)
    app = Flask(__name__, template_folder='blueprints/routes_blueprints/routes_templates')

    # Configuration
    app.config.from_object("app.config.Config")

    # Initialize extensions with app
    db.init_app(app)

    # Configure Flask-Login
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    # Import models
    from app.models.user import User
    print("Voici 'User': ")
    print("dir(User) : ")
    print(dir(User))
    print("type(User) : ")
    print(type(User))
    print("User : ")
    print(User)
    print(" ")

    # Create DB tables
    with app.app_context():
        db.create_all()

    # User loader function for Flask-Login
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))


    # Register the BLUEPRINTS to use 

    from .blueprints.git_blueprint.git_blueprint import bp_git as git_blueprint
    app.register_blueprint(git_blueprint)

    from .blueprints.auth_blueprint.auth_blueprint import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    from .blueprints.routes_blueprint.routes_blueprint import routes_bp as routes_blueprint 
    app.register_blueprint(routes_blueprint)

    # from .main import main as main_blueprint
    # app.register_blueprint(main_blueprint) 

    # app.register_blueprint(base, url_prefix="/")
    # pour le blueprint 'base' toutes les URL débutent par http://localhost:5000/ 

    app.register_blueprint(fr, url_prefix="/fr")
    # pour le blueprint 'fr' toutes les URL débutent par http://localhost:5000/fr

    app.register_blueprint(de, url_prefix="/de")
    # pour le blueprint 'de' toutes les URL débutent par http://localhost:5000/de

    app.register_blueprint(en, url_prefix="/en")
    # pour le blueprint 'en' toutes les URL débutent par http://localhost:5000/en

    app.register_blueprint(it, url_prefix="/it")
    # pour le blueprint 'it' toutes les URL débutent par http://localhost:5000/it

    # The error PAGES
    @app.errorhandler(404)
    def page_not_found(e):
        return render_template('404.html'), 404
        return ('<h1>Page introuvable</h1>')


    @app.errorhandler(500)
    def internal_server_error(e):
        return render_template('500.html'), 500
        return ('<h1>Erreur serveur</h1>')

    return app

    