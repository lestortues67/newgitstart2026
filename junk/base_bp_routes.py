from flask import Blueprint, render_template

base = Blueprint("base", __name__, static_folder="static/base", template_folder = "templates/base")

@base.route('/')
def indexss8ss():
	return ' <h1> Vous êtes sur la page BASE index INTERNATIONALE</h1>'
