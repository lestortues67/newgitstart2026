/*
Fichier : createButton.js
Date : 17/04/2026
Rôle : créer un <button> composé d'autres éléments comme icône, ...

*/


function createButton01(p_lineId, p_arr_classes, p_icon, p_eventManager) {
  const tpl = document.getElementById("tpl-button");
  const myButton = tpl.content.firstElementChild.cloneNode(true);
  myButton.classList.add(...p_arr_classes);
  myButton.setAttribute('id', p_lineId)
  myButton.appendChild(p_icon);
  myButton.addEventListener('click', p_eventManager, false); 
  return myButton;
}


function createButton02(p_lineId, p_arr_classes, p_icon, p_eventManager) {
	// p_arr_classes = ['btn', 'btn-primary']
	const myButton = document.createElement("button");
	myButton.classList.add(...p_arr_classes);
	myButton.setAttribute('id', p_lineId)
	myButton.appendChild(p_icon);
	myButton.addEventListener('click', p_eventManager, false); 
	return myButton;
}
