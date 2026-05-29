from flask import Blueprint, render_template
from app import db
from app.models.user import User

pays_deutschland = Blueprint('pays_de', __name__)

@pays_de.route("/users")
def my_user_list():
    users = db.session.execute(
        db.select(User).order_by(User.username)
    ).scalars()
    return render_template("user/list.html", users=users)


    