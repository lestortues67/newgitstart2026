from flask import Flask, render_template
from de_bp_routes import de
from fr_bp_routes import fr
from en_bp_routes import en
from it_bp_routes import it
from base_bp_routes import base

app = Flask(__name__)  

app.register_blueprint(base, url_prefix="/")
# pour le blueprint 'base' toutes les URL débutent par http://localhost:5000/

app.register_blueprint(fr, url_prefix="/fr")
# pour le blueprint 'fr' toutes les URL débutent par http://localhost:5000/fr

app.register_blueprint(de, url_prefix="/de")
# pour le blueprint 'de' toutes les URL débutent par http://localhost:5000/de

app.register_blueprint(en, url_prefix="/en")
# pour le blueprint 'en' toutes les URL débutent par http://localhost:5000/en

app.register_blueprint(it, url_prefix="/it")
# pour le blueprint 'it' toutes les URL débutent par http://localhost:5000/it


@app.errorhandler(404)
def page_not_found(e):
	return ('<h1>Page introuvable</h1>')
	return render_template('404.html'), 404


@app.errorhandler(500)
def internal_server_error(e):
	return ('<h1>Erreur serveur</h1>')
	return render_template('500.html'), 500

if __name__ == "__main__":
	app.run(debug=True)