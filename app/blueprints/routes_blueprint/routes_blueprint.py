from flask import Blueprint, render_template
from app import db
from app.models.user import User

routes_bp = Blueprint('routes_bp', __name__, template_folder="routes_templates", static_folder="routes_static")

@routes_bp.route('/rrr')
def rrr():
    return "Le nom du développeur est rrr"

@routes_bp.route("/")
def my_index():
    print("In index !!")
    return render_template('index.html')

@routes_bp.route("/action1b")
def my_action1b():
    return render_template('action1b.html')

@routes_bp.route("/action2b")
def my_action2b():
    return render_template('action2b.html')

@routes_bp.route("/action3b")
def my_action3b():
    users = db.session.execute(
        db.select(User).order_by(User.username)
    ).scalars()
    return render_template('action3b.html')

@routes_bp.route("/abc")
def my_abc():
    return render_template('action3b.html')
    return "999"
    # return 999render_template('index.html')
    