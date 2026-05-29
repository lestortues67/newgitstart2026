from flask import Blueprint, render_template

de = Blueprint("de", __name__, static_folder="static/de", template_folder = "templates/de")


@de.route('/')
def de_index():
	return render_template ("de_index.html")

@de.route('/home')
def de_home():
	return ' <h1> Sie sind on der Deutesche HOME seite</h1>'

@de.route('/page1')
def de_page1():
	return render_template("de_page1.html")
