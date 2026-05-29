from flask import Blueprint, render_template

it = Blueprint("it", __name__, static_folder="static/it", template_folder = "templates/it")


@it.route('/')
def it_index():
	return render_template ("it_index.html")
	
@it.route('/home')
def it_home():
	return ' <h1> Ti trovi nella pagina HOME in italiano</h1>' 

@it.route('/page1')
def it_page1():
	return render_template("it_page1.html")