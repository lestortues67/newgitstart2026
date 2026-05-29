chcp 65001
@echo.
@echo utf-8 pour bien afficher les caractères avec accent
@echo.
@echo.
@echo 31/12/2025, bientôt 2026
@echo.
@echo Flask Framework - Tentative de démarrage du serveur
@echo.

@echo off

IF DEFINED VIRTUAL_ENV (
    echo Environnement virtuel detecte : %VIRTUAL_ENV%
) ELSE (
	:: 1. Vérifier si un VENV est actif
	    echo Aucun environnement virtuel n'est actif.
	    echo Creation de l'environnement virtuel...
	    python -m venv venv
    :: 2. Activer l'environnement (Utilisation de CALL obligatoire ici)
		echo Activation de l'environnement virtuel......
		call venv\Scripts\activate.bat
	:: 3. Vérifier que l'activation a réussi (via la variable vue précédemment)
		if defined VIRTUAL_ENV (
		    echo [OK] Environnement actif : %VIRTUAL_ENV%
		    :: Installer les dépendances si nécessaire
		    python -m pip install -r requirements.txt
		    rem pip install -r requirements.txt
		) else (
		    echo [ERREUR] L'activation a echoue.
		    pause
		    exit /b 1
		)
)

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
	set FLASK_DEBUG=1
	python -m flask run --host=0.0.0.0 --port=%myPort% --debug
	rem flask run --host=0.0.0.0 --port=%myPort% --debug

) else (
	@echo Le fichier %PythonFile% n'existe PAS ! 
)







