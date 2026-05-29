import os
import json
from flask import render_template, jsonify, request, abort
from app import app

# Chemin absolu vers le fichier JSON de stockage
JSON_FILE = os.path.join(app.root_path, "static", "data.json")

# --- FONCTIONS UTILITAIRES ---

def charger_donnees():
    """Charge les données du fichier JSON. Retourne une liste vide si le fichier n'existe pas."""
    if not os.path.exists(JSON_FILE):
        return []
    with open(JSON_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def sauvegarder_donnees(donnees):
    """Écrase le fichier JSON avec les nouvelles données fournies."""
    with open(JSON_FILE, "w", encoding="utf-8") as f:
        json.dump(donnees, f, indent=4, ensure_ascii=False)

# --- ROUTES DE PAGES ---

@app.route("/")
def myindex():
    """Affiche la page principale."""
    return render_template("index.html", title="Popover")

@app.route('/modifier/<id_ligne>')
def page_modifier(id_ligne):
    """Affiche la page de modification pour un élément spécifique."""
    mes_donnees = charger_donnees()
    element = next((item for item in mes_donnees if item["id"] == id_ligne), None)
    return render_template('modifier.html', data=element) if element else abort(404)

# --- API (ACTIONS SUR LES DONNÉES) ---

@app.route("/api/all_data")
def api_data():
    """Retourne l'intégralité des données JSON pour le tableau JS."""
    return jsonify(charger_donnees())

@app.route('/api/details/<id_ligne>')
def api_details(id_ligne):
    """Retourne les détails d'un seul élément (utilisé pour remplir les champs /modifier)."""
    mes_donnees = charger_donnees()
    element = next((item for item in mes_donnees if item["id"] == id_ligne), None)
    if element:
        return jsonify(element)
    return jsonify({"error": "non trouvé"}), 404

@app.route('/renommer', methods=['POST'])
def renommer():
    """Action rapide : modifie uniquement le titre (via la Modal)."""
    id_ligne = request.form.get('id_ligne')
    nouveau_titre = request.form.get('nouveau_titre')
    
    mes_donnees = charger_donnees()
    for item in mes_donnees:
        if item["id"] == id_ligne:
            item["titre"] = nouveau_titre
            break
            
    sauvegarder_donnees(mes_donnees)
    return "OK", 200

@app.route('/sauvegarder_modification', methods=['POST'])
def sauvegarder_modifs():
    """Action complète : modifie titre ET contenu (via la page modifier.html)."""
    data = request.json  # On récupère le JSON envoyé par le JS
    mes_donnees = charger_donnees()
    
    for item in mes_donnees:
        if item["id"] == data['id']:
            item['titre'] = data['titre']
            item['contenu'] = data['contenu']
            break
            
    sauvegarder_donnees(mes_donnees)
    return jsonify({"status": "success"})

@app.route('/copier/<id_ligne>')
def copier(id_ligne):
    """Duplique un élément avec un nouvel ID aléatoire."""
    mes_donnees = charger_donnees()
    original = next((item for item in mes_donnees if item["id"] == id_ligne), None)
    
    if original:
        nouvelle_copie = original.copy()
        nouvelle_copie["id"] = f"ligne_{os.urandom(2).hex()}"
        nouvelle_copie["titre"] = f"{original['titre']} (Copie)"
        mes_donnees.append(nouvelle_copie)
        sauvegarder_donnees(mes_donnees)
        return jsonify({"status": "success"})
    return jsonify({"error": "non trouvé"}), 404

@app.route('/supprimer/<id_ligne>')
def supprimer(id_ligne):
    """Supprime un élément de la liste."""
    mes_donnees = charger_donnees()
    mes_donnees = [item for item in mes_donnees if item["id"] != id_ligne]
    sauvegarder_donnees(mes_donnees)
    return jsonify({"status": "success"})