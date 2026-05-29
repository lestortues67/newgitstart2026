"""
ça fonctionne avec la nouvelle branche ? 

"""


from flask import Blueprint, jsonify, render_template
import logging

import os

"""
Toute la partie de code pour le record des logs n'est pas disponible en raison des différences 
du dossier des logs entre un PC W10 et le RPi 4
"""

# # Récupère les variables d'environnement
# env_vars = os.environ

# print("code principal")

# # Affichage trié pour plus de clarté
# for cle, valeur in sorted(env_vars.items()):
#     print(f"{cle} = {valeur}")

# logFileName = ""

# if env_vars['HOME']=="/home/pi":
#     print("exécution sur RPi 4 **********************************************************************")
#     logFileName = '/var/log/dev.invoiceeuro.eu/dev.invoiceeuro.eu.log'
# else:
#     # dossier = "C:\\Users\\Admin\\Desktop\\mon_dossier"
#     logFileName = ".\\app\\logs\\dev.invoiceeuro.eu.log"


# # filename='/var/log/dev.invoiceeuro.eu/dev.invoiceeuro.eu.log',

# logging.basicConfig(
#     filename=logFileName,
#     level=logging.INFO,
#     format='%(asctime)s %(levelname)s %(message)s'
# )


# def loggingSetup(p_filename, p_filemode, p_levelMini="debug"):
    
#     # vérifier que p_filename est un string 
#     if not(isinstance(p_filename,str)):
#         return False

#     # vérifier que p_filemode est contenu dans ce string 'rwxa' 
#     if not(p_filemode.lower().strip() in 'rwxa'):
#         return False

#     # vérifier que p_levelMini est contenu dans cette liste ['debug', 'info', 'warning', 'error', 'critical']
#     if not(p_levelMini.lower().strip() in ['debug', 'info', 'warning', 'error', 'critical'] ):
#         return False

#     if(p_levelMini.lower().strip() == 'debug'):
#         logging.basicConfig(filename = p_filename, filemode = p_filemode,format = "%(levelname)s %(asctime)s - %(message)s",level =logging.DEBUG )

#     if(p_levelMini.lower().strip() == 'info'):
#         logging.basicConfig(filename = p_filename, filemode = p_filemode,format = "%(levelname)s %(asctime)s - %(message)s",level =logging.INFO )

#     if(p_levelMini.lower().strip() == 'warning'):
#         logging.basicConfig(filename = p_filename, filemode = p_filemode,format = "%(levelname)s %(asctime)s - %(message)s",level =logging.WARNING )

#     if(p_levelMini.lower().strip() == 'error'):
#         logging.basicConfig(filename = p_filename, filemode = p_filemode,format = "%(levelname)s %(asctime)s - %(message)s",level =logging.ERROR )

#     if(p_levelMini.lower().strip() == 'critical'):
#         logging.basicConfig(filename = p_filename, filemode = p_filemode,format = "%(levelname)s %(asctime)s - %(message)s",level =logging.CRITICAL )

# loggingSetup("dev.invoiceeuro.eu.log", "w", "INFO")


# def ecrireUnLog(p_level, p_text):
#     logger = logging.getLogger()
#     if(p_level.lower() =='debug') :
#         logger.debug(p_text + " "+p_level)

#     if(p_level.lower() =='info') :
#         logger.info(p_text + " "+p_level)

#     if(p_level.lower() =='warning') :
#         logger.warning(p_text + " "+p_level)

#     if(p_level.lower() =='error') :
#         logger.error(p_text + " "+p_level)

#     if(p_level.lower() =='critical') :
#         logger.critical(p_text + " "+p_level)

# ecrireUnLog('warning','essai')

main_blueprint = Blueprint("main", __name__)

@main_blueprint.route("/")
def myindex():
    # return "invoiceeuro.eu depuis le RPi4 avec github DESKTOP V3!! "
    return render_template("index.html")

@main_blueprint.route("/maman")
def mymaman():
    return render_template("maman.html")

@main_blueprint.route("/claire")
def myclaire():
    return render_template("claire.html")

@main_blueprint.route("/papa")
def mypapa():
    return render_template("papa.html")

@main_blueprint.route("/health")
def myhealth():
    return jsonify(status="ok")

@main_blueprint.route("/sante")
def mysante():
    return jsonify(status="ok")

@main_blueprint.app_errorhandler(404)
def mypage_not_found(e):
    #ecrireUnLog('warning', 'passage dans : @main_blueprint.app_errorhandler(404)') 
    return render_template('404.html'), 404

@main_blueprint.app_errorhandler(500)
def my_serverError(e):
    #ecrireUnLog('warning', 'passage dans : @main_blueprint.app_errorhandler(500)')
    return render_template('500.html'), 500