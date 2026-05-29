from flask import Blueprint, render_template
from app import db
from app.models.user import User

bp_index = Blueprint('myindex', __name__)

@myindex.route("/users")
def myindexuser_list():
    users = db.session.execute(
        db.select(User).order_by(User.username)
    ).scalars()
    return render_template("index_templates/index.html", users=users)


    