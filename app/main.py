# Handles public routes (home, profile)

from flask import Blueprint, render_template, session
from flask_login import login_required, current_user

from itsdangerous import URLSafeTimedSerializer
from flask.sessions import SecureCookieSessionInterface
import hashlib
from markupsafe import escape
from flask import current_app

main = Blueprint('main', __name__)

@main.route('/')
def index():
    dev = current_app.config['NAME_AUTHOR_CODE']
    print("Le nom du développeur est :",dev)
    if 'username' in session:
        print('Connecté en tant que %s' % escape(session['username']))
    else:
        print("Vous n'êtes pas connecté")
    print("Voici 'SESSION'")
    print(session)

    print("type(session)")
    print(type(session))

    print("dir(session)")
    print(dir(session))

    print("session.keys() : ")
    print(session.keys())

    print("session.items() : ")
    print(session.items())
    
    # print("session['_fresh'] : ")
    # print(session["_fresh"])

    # print("session['_id'] : ")
    # print(session["_id"])

    # print("session['_user_id'] : ")
    # print(session["_user_id"])
    

    return render_template('index.html',comment="nothing to say ...")

# 07/05/2026
@main.route('/decode/<p_data>')
def my_decode(p_data):
    """ 
    p_data : valeur pour la clé 'session' du cookie 'session'
    Je ne réussis pas à faire fonctionner cette fonction. 
    Erreur : BadTimeSignature

    itsdangerous.exc.BadTimeSignature: Signature b'iSdilQZ-9iIF2B3nBJRMLAIUqag' does not match


    """
    secretKey = current_app.config['SECRET_KEY']
    print("Voici la secret key :",secretKey)
    s = URLSafeTimedSerializer(secretKey)
    # print("URLSafeTimedSerializer(secretKey) : ")
    # print("dir(s) : ")
    # print(dir(s))
    # print("type(s) : ")
    # print(type(s))
    dataClear = s.loads(p_data)
    print("Voici le texte du COOKIE décodé : ")
    print(dataClear)
    return render_template('index.html')


# 07/05/2026
@main.route('/profile')
@login_required
def profile():
    if 'username' in session:
        print('Connecté en tant que %s' % escape(current_user.name))
    else:
        print("Vous n'êtes pas connecté")


    print("Voici 'SESSION'")
    print(session)

    print("type(session)")
    print(type(session))

    print("dir(session)")
    print(dir(session))

    print("session.keys() : ")
    print(session.keys())

    print("session.items() : ")
    print(session.items())
    
    print("session['_fresh'] : ")
    print(session["_fresh"])

    print("session['_id'] : ")
    print(session["_id"])

    print("session['_user_id'] : ")
    print(session["_user_id"])
    return render_template('profile.html', name=current_user.name)