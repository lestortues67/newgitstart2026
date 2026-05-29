from flask import Blueprint, render_template

en = Blueprint("en", __name__, static_folder="static/en", template_folder = "templates/en")


@en.route('/')
def en_index():
	return ' <h1> You are on the ENGLISH index page</h1>'

@en.route('/home')
def en_home():
	return ' <h1> You are on the ENGLISH home page</h1>'

@en.route('/page1')
def en_page1():
	return render_template("en_page1.html")