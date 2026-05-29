from flask import Blueprint, render_template, jsonify
from app import db
from app.models.user import User
import subprocess
import os
from pathlib import Path

# Configuration
REPO_PATH = os.path.dirname(os.path.abspath(__file__))  # Dossier actuel
# ou spécifier un chemin absolu : REPO_PATH = "/chemin/vers/votre/repo"



routes_bp = Blueprint('routes_bp', __name__, template_folder="routes_templates", static_folder="routes_static")

@routes_bp.route('/file01')
def my_file01():
    return render_template('file01.html')

@routes_bp.route("/")
def my_index():
    print("In index !!")
    return render_template('index.html')

@routes_bp.route("/action1b")
def my_action1b():
    return render_template('action1b.html')

@routes_bp.route("/action2b")
def my_action2b():
    return render_template('action2b.html')

@routes_bp.route("/action3b")
def my_action3b():
    users = db.session.execute(
        db.select(User).order_by(User.username)
    ).scalars()
    return render_template('action3b.html')

@routes_bp.route("/abc")
def my_abc():
    return render_template('action3b.html')
    return "999"
    # return 999render_template('index.html')

# 29/05/2026
@routes_bp.route("/gitpull", methods=['GET','POST'])
def my_gitpull():
    print("REPO_PATH = ",REPO_PATH)
    print("Je vais te faire un git pull !!")
    """
    Endpoint pour effectuer un git pull
    """
    try:
        # Exécuter git pull
        result = subprocess.run(
            ['git', 'pull'],
            cwd=REPO_PATH,
            capture_output=True,
            text=True,
            timeout=30
        )
        
        return jsonify({
            'success': result.returncode == 0,
            'output': result.stdout,
            'error': result.stderr,
            'return_code': result.returncode
        }), 200 if result.returncode == 0 else 500
        
    except subprocess.TimeoutExpired:
                return jsonify({
            'success': False,
            'error': 'Git pull a expiré après 30 secondes'
        }), 504
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# 29/05/2026
@routes_bp.route('/current_branch', methods=['GET'])
def my_current_branch():
    """
    Obtenir la branche courante
    """
    try:
        result = subprocess.run(
            ['git', 'branch', '--show-current'],
            cwd=REPO_PATH,
            capture_output=True,
            text=True
        )
        
        return jsonify({
            'branch': result.stdout.strip(),
            'success': True
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
