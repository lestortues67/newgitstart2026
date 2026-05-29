/**
 * 1. INITIALISATION DES COMPOSANTS BOOTSTRAP
 * Cette fonction recherche tous les éléments avec l'attribut 'data-bs-toggle="popover"'
 * et active le composant Popover de Bootstrap pour chacun d'eux.
 */
const initPopovers = () => {
	const popoverTriggerList = [].slice.call(
		document.querySelectorAll('[data-bs-toggle="popover"]'),
	);
	popoverTriggerList.map((el) => new bootstrap.Popover(el));
};

/**
 * 2. CLASSE PRINCIPALE DE GESTION DE L'INTERFACE
 * Cette classe centralise toute la logique : chargement des données,
 * gestion des événements et communication avec le serveur Flask.
 */
class mon_Popover {
	constructor() {
		// --- Sélecteurs d'éléments du DOM ---
		this.tableBody = document.getElementById("table-body"); // Là où on injecte les lignes du tableau
		this.modalElement = document.getElementById("exampleModal"); // La fenêtre surgissante (Renommer)

		// Si la modal existe sur la page, on initialise l'objet Bootstrap et les champs liés
		if (this.modalElement) {
			this.modal = new bootstrap.Modal(this.modalElement);
			this.input_modal = document.getElementById("input_renommer");
			this.input_id_cache = document.getElementById("input_id_cache"); // Input caché pour stocker l'ID
			this.btn_save = document.getElementById("btn_enregistrer_renommer");
		}

		// --- Lancement automatique au démarrage ---
		this.chargerDonnees(); // Appelle l'API et construit le tableau
		this.initGlobalEvents(); // Active les clics sur les boutons fixes (enregistrer, etc.)
		this.verifierPageModification(); // Si on est sur la page /modifier/, remplit les champs
	}

	/**
	 * RÉCUPÉRATION DES DONNÉES ET CONSTRUCTION DU TABLEAU
	 * Envoie une requête GET à Flask pour obtenir le JSON et génère le HTML dynamiquement.
	 */
	async chargerDonnees() {
		if (!this.tableBody) return; // Sécurité : ne fait rien si on n'est pas sur la page avec le tableau

		try {
			const response = await fetch("/api/all_data");
			const donnees = await response.json();

			this.tableBody.innerHTML = ""; // On vide le tableau avant de le reconstruire

			donnees.forEach((ligne) => {
				const tr = document.createElement("tr");
				tr.id = ligne.id;
				tr.className = "ligne-cliquable align-middle";
				tr.style.cursor = "pointer";

				// Structure HTML de chaque ligne avec le bouton Dropdown (Modifier, Supprimer...)
				tr.innerHTML = `
                    <td style="width: 80%">
                        <div class="d-flex align-items-center">
                            <i class="bi bi-layout-sidebar-inset me-2 text-primary"></i>
                            <span class="fw-normal">${ligne.titre}</span>
                        </div>
                    </td>
                    <td class="text-end">
                        <div class="d-flex justify-content-end align-items-center gap-1">
                            <button type="button" class="btn btn-sm btn-light text-muted border-0"><i class="bi bi-plus-lg"></i></button>
                            <div class="dropdown">
                                <button class="btn btn-sm btn-primary border-0" type="button" data-bs-toggle="dropdown">
                                    <i class="bi bi-three-dots"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end shadow border-0">
                                    <li><a class="dropdown-item item" href="#" data-action="modifier"><i class="bi bi-pencil me-2"></i>Modifier</a></li>
                                    <li><a class="dropdown-item item" href="#" data-action="renommer"><i class="bi bi-cursor-text me-2"></i>Renommer</a></li>
                                    <li><a class="dropdown-item item" href="#" data-action="copier"><i class="bi bi-copy me-2"></i>Copier</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item item text-danger" href="#" data-action="supprimer"><i class="bi bi-trash me-2"></i>Supprimer</a></li>
                                </ul>
                            </div>
                        </div>
                    </td>
                `;

				this.attacherEventsLigne(tr); // On ajoute les écouteurs de clics sur cette nouvelle ligne
				this.tableBody.appendChild(tr);
			});

			initPopovers(); // On ré-initialise les popovers sur les nouveaux éléments
		} catch (error) {
			console.error("Erreur chargement tableau:", error);
		}
	}

	/**
	 * ÉCOUTEURS D'ÉVÉNEMENTS POUR LES LIGNES DYNAMIQUES
	 * Empêche la propagation du clic et détecte quelle action du menu a été choisie.
	 */
	attacherEventsLigne(tr) {
		const dropdownBtn = tr.querySelector('[data-bs-toggle="dropdown"]');
		if (dropdownBtn) {
			// Empêche le clic sur le menu de déclencher un clic sur la ligne entière
			dropdownBtn.addEventListener("click", (e) => e.stopPropagation());
		}

		// Pour chaque option du menu (Modifier, Copier, etc.)
		tr.querySelectorAll(".item").forEach((item) => {
			item.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				const action = item.getAttribute("data-action");
				this.traiterAction(action, tr.id); // Redirige vers le dispatcher
			});
		});
	}

	/**
	 * INITIALISATION DES ÉVÉNEMENTS STATIQUES
	 * Gère les boutons qui sont toujours présents dans le HTML (comme le bouton Enregistrer de la modal).
	 */
	initGlobalEvents() {
		// Bouton 'Enregistrer' dans la modal de renommage
		if (this.btn_save) {
			this.btn_save.addEventListener("click", () =>
				this.enregistrerRenommage(),
			);
		}

		// Bouton 'Enregistrer' sur la page complète de modification
		const btnSaveEdit = document.getElementById("save");
		if (btnSaveEdit) {
			btnSaveEdit.addEventListener("click", () =>
				this.sauvegarderModificationFinale(),
			);
		}
	}

	/**
	 * PRÉ-REMPLISSAGE DU FORMULAIRE DE MODIFICATION
	 * Si l'utilisateur est sur /modifier/ID, va chercher les infos via l'API pour remplir les inputs.
	 */
	async verifierPageModification() {
		if (window.location.pathname.includes("/modifier/")) {
			const idLigne = window.location.pathname.split("/").pop(); // Extrait l'ID de l'URL
			try {
				const response = await fetch(`/api/details/${idLigne}`);
				const data = await response.json();
				if (!data.error) {
					const inputTitre = document.getElementById("input_titre");
					const inputContenu =
						document.getElementById("input_contenu");
					// On sépare bien le titre et le contenu dans leurs champs respectifs
					if (inputTitre) inputTitre.value = data.titre || "";
					if (inputContenu) inputContenu.value = data.contenu || "";
				}
			} catch (error) {
				console.error("Erreur chargement détails:", error);
			}
		}
	}

	/**
	 * SAUVEGARDE COMPLÈTE (Titre + Contenu)
	 * Envoie un objet JSON au serveur Flask pour mettre à jour le fichier data.json.
	 */
	async sauvegarderModificationFinale() {
		const idLigne = window.location.pathname.split("/").pop();
		const payload = {
			id: idLigne,
			titre: document.getElementById("input_titre").value,
			contenu: document.getElementById("input_contenu").value,
		};

		try {
			const response = await fetch("/sauvegarder_modification", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			const resData = await response.json();
			if (resData.status === "success") {
				window.location.href = "/"; // Retour à l'accueil après succès
			}
		} catch (error) {
			alert("Erreur lors de la sauvegarde.");
		}
	}

	/**
	 * DISPATCHER D'ACTIONS
	 * Selon l'action choisie (clic console log inclus), exécute la fonction appropriée.
	 */
	traiterAction(action, idLigne) {
		console.log(`${action} a été cliqué à la ligne id=${idLigne}`);

		switch (action) {
			case "modifier":
				window.location.href = `/modifier/${idLigne}`;
				break;
			case "copier":
				this.executerActionSimple(`/copier/${idLigne}`);
				break;
			case "supprimer":
				if (confirm(`Voulez-vous supprimer l'élément ${idLigne} ?`)) {
					this.executerActionSimple(`/supprimer/${idLigne}`);
				}
				break;
			case "renommer":
				// Prépare la modal avec les infos actuelles de la ligne
				const tr = document.getElementById(idLigne);
				const titreActuel = tr.querySelector("span").innerText;
				this.input_modal.value = titreActuel;
				this.input_id_cache.value = idLigne;
				this.modal.show();
				break;
		}
	}

	/**
	 * EXÉCUTE UNE ACTION SIMPLE (GET)
	 * Utilisé pour supprimer ou copier. Rafraîchit le tableau après l'action.
	 */
	async executerActionSimple(url) {
		try {
			const response = await fetch(url);
			if (response.ok) {
				this.chargerDonnees(); // Recharge le tableau dynamiquement
			}
		} catch (error) {
			console.error("Erreur action:", error);
		}
	}

	/**
	 * ENREGISTREMENT RAPIDE (RENOMMER)
	 * Envoie les données en format "form-urlencoded" vers Flask.
	 */
	async enregistrerRenommage() {
		const id = this.input_id_cache.value;
		const nouveauTitre = this.input_modal.value;

		try {
			const response = await fetch("/renommer", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: `id_ligne=${encodeURIComponent(id)}&nouveau_titre=${encodeURIComponent(nouveauTitre)}`,
			});

			if (response.ok) {
				this.modal.hide(); // Ferme la modal
				this.chargerDonnees(); // Rafraîchit le tableau
			}
		} catch (error) {
			console.error("Erreur renommage:", error);
		}
	}
}

/**
 * 3. LANCEMENT INITIAL
 * On attend que le HTML soit totalement chargé avant d'instancier la classe.
 */
document.addEventListener("DOMContentLoaded", () => {
	initPopovers();
	new mon_Popover();
});
