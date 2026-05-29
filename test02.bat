chcp 65001


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