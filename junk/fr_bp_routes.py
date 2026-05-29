from flask import Blueprint, render_template

fr = Blueprint("fr", __name__, static_folder="static/fr", template_folder = "templates/fr")


@fr.route('/')
def fr_index():
	return ' <h1> Vous êtes sur la page index en français</h1>'

@fr.route('/home')
def fr_home():
	return ' <h1> Vous êtes sur la page HOME en français</h1>'

@fr.route('/page1')
def fr_page1():
	return render_template("fr_page1.html")

