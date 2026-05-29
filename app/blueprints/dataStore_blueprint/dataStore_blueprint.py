from flask import Blueprint, render_template
from app import db
from app.models.user import User

bp_datas = Blueprint('dataStore', __name__)

@bp_datas.route("/users")
def user_list():
    users = db.session.execute(
        db.select(User).order_by(User.username)
    ).scalars()
    return render_template("user/list.html", users=users)


    