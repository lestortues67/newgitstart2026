/*
Fichier : createTable.js
Date : 17/04/2026
Rôle : créer un <table> 

*/

/* Dans HTML : 




		<template id="tpl-table">
			<table class="table">
			</table>
		</template>

		<template id="tpl-thead">
		</template>

		<template id="tpl-tbody">
		</template>

		<template id="tpl-tfoot">
		</template>

		<template id="tpl-tr">
			// ici avec des <th>
			<tr>
				<th scope="col">#</th>
				<th scope="col">First</th>
				<th scope="col">Last</th>
				<th scope="col">Handle</th>
			</tr>
			// ici avec des <td>
			<tr>
			   	<td scope="row">2</th>
			    <td>Jacob</td>
			    <td>Thornton</td>
			    <td>@fat</td>
			</tr>
		</template>
*/
		
			  

function createTd01(p_lineId, p_arr_classes, p_texte) {
	// p_arr_classes = ['bi', 'bi-chevron-right']
	const tpl = document.getElementById("tpl-td");
	const td = tpl.content.firstElementChild.cloneNode(true);
	td.innerHTML = p_texte;
	td.classList.add(...p_arr_classes);
	return td;
}

function createTd02(p_lineId, p_arr_classes) {
	// p_arr_classes = ['bi', 'bi-chevron-right']
	const td = document.createElement("td");
	td.innerHTML = p_texte;
	td.classList.add(...p_arr_classes);
	return td;
}

/* 


    
    	class ClasseCreateRow {
    		constructor(p_data_dict) {
    			//{id:123,name:'chris',icon:`<i class="bi-chevron-down"></i>`}
    			const row = document.createElement("div");

					const text = document.createElement("div");
					text.textContent = p_data_dict.name;

					const btn = document.createElement("button");

					const icone = document.createElement("i");
					// icone.classList.add('bi', 'bi-chevron-down');
					icone.classList.add('bi', 'bi-chevron-right');

					var sp = document.createElement("span");
					sp.textContent = p_data_dict.name;


				  btn.appendChild(icone);
				  btn.appendChild(sp);
				  // btn.textContent = " 88Clique";
				  // btn.textContent = `<i class="bi-chevron-down"></i>`
				  // btn.innerHTML = `<i class="bi bi-chevron-down"></i>`
				  // btn.innerHTML =  " Clique";
				  // btn.innerHTML = btn.innerHTML + " 88Clique";


				  btn.classList.add('btn','btn-secondary');
				  btn.onclick = () => alert(p_data_dict.id);

				  row.appendChild(text);
				  row.appendChild(btn);

				  return row;
				}
			};


        	class myButtonChevron extends HTMLElement {
				    constructor() {
				    	// Ceci doit être présent dans le HTML : 
				    	// <my-button-chevron divid="62"></my-button-chevron>
				      super();
				      this.innerHTML = `<button divid="888" class="btn btn-success"><i class="bi-chevron-down"></i> Clique-moi</button>`;
				      this.addEventListener('click', () => this.toggleState());
				      // this.addEventListener('click',this);// 'handleEvent()' est utilisé
				    }
				    toggleState(){
				    	const icon = this.querySelector('i');
				      if (icon) {
				        icon.classList.toggle('bi-chevron-down');
				        icon.classList.toggle('bi-chevron-right');
				      }
				    }
				    handleEvent (event) {
				        // Dans cette méthode 'this' accède à TOUT l'objet
				      const icon = this.querySelector('i');
				      let mydivid = this.getAttribute('divid')
				      console.log("this.divid : ",mydivid)
				      let editorDiv = document.getElementById('editor')
				      editorDiv.innerHTML=this.getAttribute('divid')
				      console.log(" editorDiv : ", editorDiv)
				      if (icon) {
				        icon.classList.toggle('bi-chevron-down');
				        icon.classList.toggle('bi-chevron-right');
				      }
    				}
  				}

  				customElements.define('my-button-chevron', myButtonChevron);

  				class myButtonDot extends HTMLElement {
				    constructor() {
				      super();
				      this.innerHTML = `<button divid="888" class="btn btn-success"><i <i class="bi bi-dot"></i></button>`;
				      // this.addEventListener('click', () => this.toggleState());
				      // this.addEventListener('click',this);// 'handleEvent()' est utilisé
				    }
				    connectedCallback() {
			        const p_text = this.getAttribute('text') || "Default";
			        this.innerHTML = `
			            <button divid="888" class="btn btn-success">
			                <i class="bi bi-dot"></i> ${p_text}
			            </button>
			        `;
			    	}
				    toggleState(){
				    	const icon = this.querySelector('i');
				      if (icon) {
				        icon.classList.toggle('bi-chevron-down');
				        icon.classList.toggle('bi-chevron-right');
				      }
				    }
				    handleEvent (event) {
				        // Dans cette méthode 'this' accède à TOUT l'objet
				      const icon = this.querySelector('i');
				      let mydivid = this.getAttribute('divid')
				      console.log("this.divid : ",mydivid)
				      let editorDiv = document.getElementById('editor')
				      editorDiv.innerHTML=this.getAttribute('divid')
				      console.log(" editorDiv : ", editorDiv)
				      if (icon) {
				        icon.classList.toggle('bi-chevron-down');
				        icon.classList.toggle('bi-chevron-right');
				      }
    				}
  				}

  				customElements.define('my-button-dot', myButtonDot);

    	class ClasseLigne {
    			constructor(p_titre, p_id) {
        		// this.emailService = new EmailService();// Utiliser la COMPOSITION 
        		this.template = document.getElementById("ligneTemplate");
  					this.clone = this.template.content.cloneNode(true);
  					this.ligne = this.clone.querySelector(".ligne");
  					this.ligne.id = p_id;
  					this.ligne.querySelector("#spanText").textContent = p_titre;
  					// this.clone.querySelector(".spanText").textContent = p_titre;
  					//this.clone.querySelector("button").onclick = () => alert(data.id);
  					this.buttonLeft = this.clone.querySelector("#buttonLeft");
  					this.buttonRight = this.clone.querySelector("#buttonRight");
  					// this.buttonLeft.addEventListener('click',this.buttonLeftAction("left"),false);
  					this.buttonLeft.addEventListener('click', () => this.buttonLeftAction("left"),false);
  					this.buttonRight.addEventListener('click', () => this.buttonRightAction("right"),false);
    			}

    			buttonLeftAction(p_texte) {
        			this.buttonLeft.innerHTML=p_texte;
        			console.log('action : ',event.target.getAttribute('action'))
    			}
    			buttonRightAction(p_texte) {
        			this.buttonRight.innerHTML=p_texte;
        			console.log('action : ',event.target.getAttribute('action'))
    			}
			}

			class ClasseGestionnaireLigne {
    			constructor() {
    				this.emplacementGestionnaireLigne = document.getElementById("GestionnaireLigne");
    				this.listLignes = [];
        		this.ClasseLigne = ClasseLigne;// Utiliser la COMPOSITION 
    			}

    			createLigne(p_titre) {
        			this.ligne = new ClasseLigne(p_titre);
    			}
    			ajouterLigne(p_ligne) {
    				// Afficher la ligne à l'écran
    				this.emplacementGestionnaireLigne.appendChild(p_ligne.ligne);
    				this.listLignes.push(p_ligne);
    			}
    			afficherLigne(p_ligne_id) {
    				// Cacher la ligne
    				var l = document.getElementById(p_ligne_id)
    				l.classList.remove("invisible")
    			}
    			cacherLigne(p_ligne_id) {
    				// Cacher la ligne
    				var l = document.getElementById(p_ligne_id) 
    				l.classList.add("invisible")
    			}
    			supprimerLigne(p_ligne) {
    				// Supprimer la ligne 
    				this.emplacementGestionnaireLigne.removeChild(p_ligne.ligne);
    				this.listLignes.splice(this.getLigneIndex(p_ligne), 1);
    			}
    			getLigneIndex(p_ligne){
    				// var ligneIndex = this.listLignes.indexOf(p_ligne.ligne);
    				return this.listLignes.indexOf(p_ligne.ligne);
    			}
			}

			let gestionnaireLigne = new ClasseGestionnaireLigne();
			let ligneA = new ClasseLigne ("A_papa",10);
			let ligneB = new ClasseLigne ("B_claire",20);
			let ligneC = new ClasseLigne ("C_robert",30);
			let ligneD = new ClasseLigne ("D_jean",40);

	    // gestionnaireLigne.ajouterLigne(ligneA);
	    
	    // gestionnaireLigne.ajouterLigne(ligneB);
	    
	    // gestionnaireLigne.ajouterLigne(ligneC);
	    // gestionnaireLigne.ajouterLigne(ligneD);
			
			setTimeout(() => {
				gestionnaireLigne.ajouterLigne(ligneA);
			}, 500); // 1000 ms = 1 seconde
			
			setTimeout(() => {
				gestionnaireLigne.ajouterLigne(ligneB);
			}, 1000); // 1000 ms = 1 seconde

			
			setTimeout(() => {
			    gestionnaireLigne.ajouterLigne(ligneC);
			}, 1500); // 1000 ms = 1 seconde

			setTimeout(() => {
			    gestionnaireLigne.ajouterLigne(ligneD);
			}, 2000); // 1000 ms = 1 seconde

			setTimeout(() => {
				gestionnaireLigne.supprimerLigne(ligneA);
			}, 2500); // 1000 ms = 1 seconde

			setTimeout(() => {
				gestionnaireLigne.ajouterLigne(ligneA);
			}, 3000); // 1000 ms = 1 seconde

			const btn = document.getElementById(9887);
			btn.setAttribute('text', 'Texte dynamique');

			var rr = new ClasseCreateRow({id:123,name:'jeanHoepfner',icon:`<i class="bi-chevron-down"></i>`})
			document.body.appendChild(rr);


    	class ClasseCreateIcone {
    		constructor(p_arr_classes) {
    			//p_arr_classes=['bi', 'bi-chevron-right']
					const icone = document.createElement("i");
					icone.classList.add(...p_arr_classes);
				  return icone;
				}
			}

			class ClasseButtonWithIcon {
    		constructor(p_icone, p_m_eventHandler) {
    			// créer et retourner un bouton avec icône
    			const btn = document.createElement("button");
    			btn.setAttribute("firstname", "chris")
    			btn.setAttribute("lastname", "doriath")
    			btn.classList.add("btn", "btn-primary");
    			btn.appendChild(p_icone)
    			btn.addEventListener('click',p_m_eventHandler, false)
				  return btn;
				}
			}

			function eventHandlerProvisoire(p_event){
				console.log("event reçu : ",p_event)
			}

			class ClassPurVanillaJS {
				constructor (p_data_dict) {
					// Dans cette classe du JS vanilla pur 
				  const row = document.createElement("div");

				  const text = document.createElement("div");
				  text.textContent = p_data_dict.name;

				  const btn = document.createElement("button");
				  btn.textContent = "Clique";
				  btn.onclick = () => alert(p_data_dict.id);

				  row.appendChild(text);
				  row.appendChild(btn);

				  return row;
				}
			}

			class ClassTemplates {
				constructor (p_data_dict) {
					// Dans cette classe un "template" présent sur la page HTML
					// est cloné
					// Ceci se trouve sur la page HTML : 
					// <template id="rowTemplate">
			  	// 	<div class="row">
			    // 		<div class="name"></div>
			    // 		<button>Action</button>
			  	// 	</div>
					// </template>

				  const template = document.getElementById("rowTemplate");
				  const clone = template.content.cloneNode(true);

				  clone.querySelector(".name").textContent = data.name;
				  clone.querySelector("button").onclick = () => alert(data.id);

				  return clone;
				}
			}

			class ClassWebComponent101 extends HTMLElement {
				constructor (p_data_dict) {
					// <my-wc101></my-wc101>
				  super();
				  this.innerHTML = `<div>${value.name}</div>
      		<button>Click</button>`;
  			}
			}

			customElements.define("my-wc101", ClassWebComponent101);
			
			var ic = new ClasseCreateIcone(['bi', 'bi-chevron-right'])

			var icon_chevron_right = new ClasseCreateIcone(['bi', 'bi-chevron-right'])
			var icon_chevron_down = new ClasseCreateIcone(['bi', 'bi-chevron-down'])
			var icon_dot = new ClasseCreateIcone(['bi', 'bi-dot'])
			var button_chevron_right = new ClasseButtonWithIcon (icon_chevron_right, eventHandlerProvisoire) 
			var button_chevron_down = new ClasseButtonWithIcon (icon_chevron_down, eventHandlerProvisoire) 
			var button_dot = new ClasseButtonWithIcon (icon_dot, eventHandlerProvisoire) 
    			


    	</script>
  </body>
</html>
*/