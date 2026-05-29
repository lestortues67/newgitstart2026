from flask import Blueprint, render_template, request, jsonify
from flask_login import login_required

base = Blueprint("base", __name__, static_folder="static/base", template_folder = "templates/base")

@base.route('/')
def my_index_codebase():
	# return render_template ("/base/index_codebase.html")
	return render_template ("index.html")

@base.route('/test01')
def my_test01():
	return render_template ("/base/test01.html")
	# return render_template ("/base/index_codebase.html")



@base.route('/save', methods=['POST'])
def my_save_index_codebase():
	h = request.headers
	print("Headers : ",h)
	data = request.get_json()# Récupérer les données JSON de la requête
	print(f"Données reçues : {data}")# Traitement des données
	return jsonify({
    	'message': 'Données reçues avec succès',
        'received_data': data
    }), 200
	
# 29/05/2026
@base.route('/file01')
def my_file01():
	return render_template ("index.html")


@base.errorhandler(404)
def page_not_found(e):
	return render_template('404.html'), 404
	return ('<h1>Page introuvable</h1>')


@base.errorhandler(500)
def internal_server_error(e):
	return render_template('500.html'), 500
	return ('<h1>Erreur serveur</h1>')