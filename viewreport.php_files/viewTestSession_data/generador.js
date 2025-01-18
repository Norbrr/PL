///////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------
// Esta libreria recoge las funciones javascript relativas a la visualizacion
// de items en el aula virtual.
// Ambito de uso: la JSP 'cuestion.jsp'.
// @author guzman
//-----------------------------------------------------------------------------
/**
 * Funcion que permite dotar a los radio button de la posibilidad de dejar 
 * ningun elemento sin seleccionar, aun habiendo seleccionado uno previamente.
 * @param radio El componente radio button
 * @param theHidden Componente hidden definido auxiliarmente para dotar al radio
 * 					button de la funcionalidad deseada.
 */
///////////////////////////////////////////////////////////////////////////////
function jsUnselectRadioButton(radio, theHidden){
	for (i=0; i< radio.length; i++) {
		if (radio[i].checked) {
			if (theHidden.value == "") {
				theHidden.value = radio[i].value;
			} else if (radio[i].value == theHidden.value){				
				radio[i].checked = false;
				theHidden.value = "";				
			} else {
				theHidden.value = radio[i].value;
			}					
		}
	}	
}

///////////////////////////////////////////////////////////////////////////////
function setCheckedValue(radioObj, newValue) {
	if(!radioObj)
		return;
	var radioLength = radioObj.length;
	if(radioLength == undefined) {
		radioObj.checked = (radioObj.value == newValue.toString());
		return;
	}
	for(var i = 0; i < radioLength; i++) {
		// radioObj[i].checked = false;
		if(radioObj[i].value == newValue.toString()) {
			// radioObj[i].checked = true;
			radioObj[i].checked = !radioObj[i].checked;
		}
	}
}

///////////////////////////////////////////////////////////////////////////////
function asignarRespuesta(tipo, boton, input, codigo) {
	if (input!=null && boton!=null) {
		setCheckedValue(input, codigo);
		if (boton.className=='input-btn') {
			boton.className='input-btn-clicked';
		} else {
			boton.className='input-btn';
		}
		if (tipo=='radio') {
			evaluar();
		} else {
			/*
			var l = boton.length;
			if(l != undefined) {
				for(var i = 0; i < l ; i++) {
					if(boton[i].value == codigo.toString()) {
						if (boton[i].className=='input-btn') {
							boton[i].className='input-btn-clicked';
						} else {
							boton[i].className='input-btn';
						}
					}
				}
			}
			*/
		}
	}
}

///////////////////////////////////////////////////////////////////////////////
function getVariable(nombre) {
	var input = document.getElementById(nombre);
	if (input!=null) {
		return input.value;
	} else {
		input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", nombre);
		input.setAttribute("id", nombre);
		// input.setAttribute("value", '');
		document.getElementById("form_siette").appendChild(input);
		return '';
	}
}


///////////////////////////////////////////////////////////////////////////////
function setVariable(nombre, valor) {
	var input = document.getElementById(nombre);
	if (input!=null) {
		input.value = valor;
	} else {
		input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", nombre);
		input.setAttribute("id", nombre);
		input.setAttribute("value", valor);
		document.getElementById("form_siette").appendChild(input);
	}
}


///////////////////////////////////////////////////////////////////////////////
function enableButtons() {
	disableButtons(false);
}

///////////////////////////////////////////////////////////////////////////////
function disableButtons() {
	disableButtons(true);
}

///////////////////////////////////////////////////////////////////////////////
function disableButtons(disable) {
	var clase = "btn"
	if (disable) {
		clase = "btnDisabled"
	}
	var enviar = document.getElementById('enviar');
	if (enviar != null) {
		enviar.disabled = disable;
		enviar.className = clase ;
   	}
	var atras = document.getElementById('atras');
	if (atras != null) {
   		atras.disabled = disable;
   		atras.className = clase ;
   	}
	var finalizarTest = document.getElementById('finalizarTest');
   	if (finalizarTest != null) {
   		finalizarTest.disabled = disable;
   		finalizarTest.className = clase ;
   	}
	var adelante = document.getElementById('adelante');
	if (adelante != null) {
   		adelante.disabled = disable;
   		adelante.className = clase ;
   	}
	var continuar = document.getElementById('continuar');
	if (continuar != null) {
		continuar.disabled = disable;
		continuar.className = clase ;
   	}
	var buttons = document.getElementsByTagName('button');
	for (var i = 0; i < buttons.length; i++) {
	    buttons[i].disabled = disable;
	    // buttons[i].onclick = function() { return false; }
	    buttons[i].className = clase ;
	}
}
