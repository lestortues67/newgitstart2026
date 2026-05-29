
:: /Fichier/Enregistrer sous 'encodage' -> choisir "UTF-8"


@echo.
@echo 31/12/2025, bientôt 2026
@echo.
@echo Flask Framework - Tentative de démarrage du serveur
@echo.





:: ==============================================
:: NOUVEAU 2026 : Environnement Virtuel (VENV)

:: Création de l'Environnement Virtuel (VENV)
python -m venv venv


:: Activation de l'Environnement Virtuel (VENV)
@echo Activation du VENV...
call .\venv\Scripts\activate.bat
@echo VENV est actif !!
@echo.
:: ==============================================


:: NOUVEAU Fichier :  "requirements.txt"
@echo création d'un nouveau fichier "requirements.txt" avec les dépendances actuellement installées.
@echo Sauvegarde des dépendances dans "requirements.txt"
call pip freeze > requirements.txt
@echo pip freeze > requirements.txt
:: ==============================================



   
@echo Choisir le fichier Python parmi les suivants : 
@echo.   
dir *.py
@echo.   


@echo off

set myPort=5000
set /p PythonFile=Saisir le nom du fichier Python :  

set /p myPort=Saisir le numéro de port (5000 ou suivant):
if exist %myPort% (
	@echo Le numéro de port est %myPort%
)
else(set myPort=5000
	)

if exist %PythonFile% (
	@echo Le fichier %PythonFile% existe
	@echo.   	
	echo Démarrage du serveur avec le fichier %PythonFile% en mode DEBUG
	@echo.   
	set FLASK_APP=%PythonFile%
	set FLASK_ENV=development
	flask run --host=0.0.0.0 --port=%myPort% --debug

) else (
	@echo Le fichier %PythonFile% n'existe PAS ! 
)



D:\Python39\MesDEv\Flask\Flask_codebase2026>flask --app app.py run --host=0.0.0.0 --debug





