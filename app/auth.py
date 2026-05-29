# Manages authentication (login, signup, logout)

from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from flask_login import login_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
# from .models import User
from app.models.user import User
from . import db
from app.main import *

print("app.main : ")
print(main)


auth = Blueprint('auth', __name__)

@auth.route('/login')
def login():
    return render_template('login.html')

@auth.route('/login', methods=['POST'])
def login_post():
    print("request.form : ")
    print(request.form)


    email = request.form.get('email')
    password = request.form.get('password')
    remember = True if request.form.get('remember') else False

    print("email : ",email)
    print("password : ",password)
    print("remember : ",remember)

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        flash('user non reconnu...')
        flash('Please check your login details and try again.')
        return redirect(url_for('auth.login'))

    login_user(user, remember=remember)
    session['username'] = 'alice'
    return redirect(url_for('main.profile'))
    # return redirect(url_for('profile'))

@auth.route('/signup')
def signup():
    return render_template('signup.html')

@auth.route('/signup', methods=['POST'])
def signup_post():
    email = request.form.get('email')
    name = request.form.get('name')
    password = request.form.get('password')

    user = User.query.filter_by(email=email).first()

    if user:
        flash('Email address already exists')
        return redirect(url_for('auth.signup'))

    new_user = User(email=email, name=name, password=generate_password_hash(password))
    db.session.add(new_user)
    db.session.commit()

    return redirect(url_for('auth.login'))

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    print("Dans 'def logout()' ")
    return redirect(url_for('main.index'))

@auth.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404
    return ('<h1>Page introuvable</h1>')


@auth.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500
    return ('<h1>Erreur serveur</h1>')