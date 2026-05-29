/*
Fichier : createTable.js
Date : 17/04/2026
Rôle : créer un 'popover' qui est composé de plusieurs <button> avec <icon>

*/


function createPopover(p_lineId, p_icons_array) {
	// p_icons_array = une liste ARRAY qui contient les icônes à utiliser
	// p_lineId = l'ID de la page/ligne dans la table mySQL

	const tpl = document.getElementById("tpl-popover");
	const popover = tpl.content.firstElementChild.cloneNode(true);

	popover.addEventListener('click', (event) => {
	const btn = event.target.closest('.evt');
	if (!btn) return;

	console.log("click sur .evt", p_lineId, btn);
	});

	return popover;
}
