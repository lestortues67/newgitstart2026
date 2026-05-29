/*
Fichier : main.js
Date : 17/04/2026
Rôle : le point d'entrée du projet : j'importe ce dont j'ai besoin.
Règle d'or :

    Un module = une classe (ou un groupe de fonctions très liées)

    Un fichier = un module

    Un dossier = un domaine fonctionnel

Struture des dossiers : 

static/
	js/
		main.js
		modules/
		├── dataClasses/           # Classes de données, models
		├──────User.js
		├──────Product.js
		├───── Order.js
		├── logiqueMetier/         # Logique métier, business logic
		├──────	AuthService.js
		├────── PaymentService.js
		├── utilitaires/            # Fonctions utilitaires
		│   ├── formatters.js
		│   └── validators.js
		└── ui_composants/       # Composants UI
		    ├── Header.js
		    └── Button.js	

*/

import * as createIcon from './modules/ui_composants/createIcon.js';
// import {  createIcone01, createIcone02  } from './modules/ui_composants/createIcon.js';

const icc = createIcon.createIcone02(101, ['bi', 'bi-chevron-right']) 

import * as createButton from './modules/ui_composants/createButton.js';
import * as createLine from './modules/ui_composants/createLine.js';
import * as createPopover from './modules/ui_composants/createPopover.js';
import * as createTable from './modules/ui_composants/createTable.js';


// window.nom du module pour rendre le module disponible dans la CONSOLE
window.createIcon = createIcon;
window.createButton = createButton;
window.createLine = createLine;
window.createPopover = createPopover;
window.createTable = createTable;

// window.createIcone01 = createIcon.createIcone01;
// window.createIcone02 = createIcon.createIcone02;
