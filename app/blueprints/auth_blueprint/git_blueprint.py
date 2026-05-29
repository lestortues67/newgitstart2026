from flask import Blueprint, render_template
from app import db
from app.models.user import User

bp_git = Blueprint('git', __name__)

@bp_git.route("/gitpull")
def my_gitpull():
    # Ajouter le code ici
    return True


    