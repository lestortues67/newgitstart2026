/*
Fichier : createIcon.js
Date : 17/04/2026
Rôle : créer une icone 

*/


function createIcone01(p_lineId, p_arr_classes) {
	// p_arr_classes = ['bi', 'bi-chevron-right']
	const tpl = document.getElementById("tpl-icone");
	const icone = tpl.content.firstElementChild.cloneNode(true);
	icone.classList.add(...p_arr_classes);
	return icone;
}

function createIcone02(p_lineId, p_arr_classes) {
	// p_arr_classes = ['bi', 'bi-chevron-right']
	const icone = document.createElement("i");
	icone.classList.add(...p_arr_classes);
	return icone;
}

export { createIcone01, createIcone02 };