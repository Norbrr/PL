/*
http://isohunt.com Interface Javascript
by Gary Fung - email: gary{replace_with_at_sign}isohunt.com

Feel free to use / mod this to your heart's content,
but you must keep these lines to acknowledge where this code originated.
Comments, mods or additions you'd like add to this script? Post it here:
http://isohunt.com/forum/viewforum.php?f=1
*/


var smooth_timer;

/**
* El valor de stepH debe ser un multiplo exacto de targetH sino la visualizacion
* falla (se queda como bajando / subiendo el frame)
**/
function smoothHeight(id, curH, targetH, stepH, mode)
{
  diff = targetH - curH;
  if (diff != 0) {
    newH = (diff > 0) ? curH + stepH : curH - stepH;
    ((document.getElementById) ? document.getElementById(id) : eval("document.all['" + id + "']")).style.height = newH + "px";
    if (smooth_timer) window.clearTimeout(smooth_timer);
    smooth_timer = window.setTimeout( "smoothHeight('" + id + "'," + newH + "," + targetH + "," + stepH + ",'" + mode + "')", 20 );
  }
  else if (mode != "o") ((document.getElementById) ? document.getElementById(mode) : eval("document.all['" + mode + "']")).style.display="none";
}


function rowOver(i, nColor, tdId) {
  var nameObj = (document.getElementsByName) ? document.getElementsByName(tdId + i) : eval("document.all['" + tdId + i + "']");
  if (nameObj != null) {
	  for(var i=0; i<nameObj.length; i++) {
		  nameObj[i].style.background=nColor;
	  }  
  }
}


function rowOut(i, nColor, tdId, trId) {
	  var nameObj = (document.getElementsByName) ? document.getElementsByName(tdId + i) : eval("document.all['" + tdId + i + "']");
	  if (nameObj != null) {
		  for(var i=0; i<nameObj.length; i++) {
			  nameObj[i].style.background=nColor;
		  }  
	  }
}


function servOC(i, href, nColorIn, nColorOut, hMax, trId, tdId, iframeId)
{
  var trObj = (document.getElementById) ? document.getElementById(trId + i) : eval("document.all['" + trId + i + "']");
  var nameObj = (document.getElementById) ? document.getElementById(tdId + i) : eval("document.all['" + tdId + i + "']");
  var ifObj = (document.getElementById) ? document.getElementById(iframeId + i) : eval("document.all['" + iframeId + i + "']");

  if (trObj != null){

    if (trObj.style.display=="none") {

      parent.document.getElementById("frameSesionesPregunta").style.height= 250 + document.body.scrollHeight;

      trObj.style.display="";
      nameObj.style.background=nColorIn;
      if (!ifObj.src) ifObj.src = href;
      smoothHeight(iframeId + i, 0, hMax, 42, 'o');
    }
    else {
      //Calculamos el height antes de invocar a la funcion smoothHeight
      var newHeight = document.body.scrollHeight - 250;
      nameObj.style.background=nColorOut;
      smoothHeight(iframeId + i, hMax, 0, 42, trId + i);

      parent.document.getElementById("frameSesionesPregunta").style.height = newHeight;

    }
  }
}

function servOC2(i, href, nColorIn, nColorOut, hMax, trId, tdId, iframeId)
{
  var trObj = (document.getElementById) ? document.getElementById(trId + i) : eval("document.all['" + trId + i + "']");
  var nameObj = (document.getElementById) ? document.getElementById(tdId + i) : eval("document.all['" + tdId + i + "']");
//  var ifObj = (document.getElementById) ? document.getElementById(iframeId + i) : eval("document.all['" + iframeId + i + "']");

  if (trObj != null){
    if (trObj.style.display=="none") {

      parent.document.getElementById("frameDatosPregunta").style.height= 140 + document.body.scrollHeight;

      trObj.style.display="";
      nameObj.style.background=nColorIn;
      // if (!ifObj.src) ifObj.src = href;
      // smoothHeight(iframeId + i, 0, hMax, 42, 'o');
    }  else {
      //Calculamos el height antes de invocar a la funcion smoothHeight
      trObj.style.display="none";
      var newHeight = document.body.scrollHeight - 140;
      nameObj.style.background=nColorOut;
      // smoothHeight(iframeId + i, hMax, 0, 42, trId + i);

      parent.document.getElementById("frameDatosPregunta").style.height = newHeight;

    }
  }
}

function servOC3(i, href, nColorIn, nColorOut, hMax, trId, tdId, iframeId, frameSesionesName)
{
	var frameSesiones = 'frameSesionesTest';
	if (frameSesionesName != 'undefined'){
		frameSesiones = frameSesionesName;
	}
	var trObj = (document.getElementById) ? document.getElementById(trId + i) : eval("document.all['" + trId + i + "']");
	var nameObj = (document.getElementById) ? document.getElementById(tdId + i) : eval("document.all['" + tdId + i + "']");
	var ifObj = (document.getElementById) ? document.getElementById(iframeId + i) : eval("document.all['" + iframeId + i + "']");
	if (trObj != null){
		var step = hMax/5;
		if (trObj.style.display=="none") {
			if (document.getElementById(frameSesiones) != null){
				document.getElementById(frameSesiones).style.height= hMax + document.body.scrollHeight;
			} else {
				try {
					if (parent.document.getElementById(frameSesiones) != null){
						parent.document.getElementById(frameSesiones).style.height= hMax + document.body.scrollHeight;
					}
				} catch(error) {}
			}
			trObj.style.display="";  
			nameObj.style.background=nColorIn;
			if (!ifObj.src || ifObj.src.indexOf(href, ifObj.src.length - href.length) == -1 ) {
			     ifObj.src = href;
			}
			smoothHeight(iframeId + i, 0, hMax, step, 'o');
		} else {	
			//Calculamos el height antes de invocar a la funcion smoothHeight
			//var newHeight = document.body.scrollHeight - 250;
			var newHeight = document.body.scrollHeight - hMax;
			nameObj.style.background=nColorOut;
			smoothHeight(iframeId + i, hMax, 0, step, trId + i);
			if (document.getElementById(frameSesiones) !=null ) {
			      document.getElementById(frameSesiones).style.height = newHeight;
			} else {
				try {
					if (parent.document.getElementById(frameSesiones) !=null ) {
						parent.document.getElementById(frameSesiones).style.height = newHeight;
					}
				} catch (error) {}
			}
		}
	}
}


function servOC3SubItems(i, href, nColorIn, nColorOut, hMax, trId, tdId, iframeId)
{
  var trObj = (document.getElementById) ? document.getElementById(trId + i) : eval("document.all['" + trId + i + "']");
  var nameObj = (document.getElementById) ? document.getElementById(tdId + i) : eval("document.all['" + tdId + i + "']");
  var ifObj = (document.getElementById) ? document.getElementById(iframeId + i) : eval("document.all['" + iframeId + i + "']");

  var altura = parseInt(hMax);
	
  if (trObj != null){
  	var step = altura/5;
  	var elemento = parent.document.getElementById("FramePresentacionSubItems");
	if (trObj.style.display=="none") {
      var nuevoHeight = altura + document.body.scrollHeight;
      elemento.style.height = nuevoHeight;
      trObj.style.display="";
      nameObj.style.background=nColorIn;
      smoothHeight(iframeId + i, 0, altura, step, 'o');
    }
    else {
      //Calculamos el height antes de invocar a la funcion smoothHeight
      var nuevoHeight = document.body.scrollHeight - altura;
      nameObj.style.background=nColorOut;
      smoothHeight(iframeId + i, altura, 0, step, trId + i);
      elemento.style.height= nuevoHeight;
    }
    parent.recalcularPosicionBotonGuardar();
  }
}

function redimensionarSubFrame(frameId){
	var elemento = parent.document.getElementById(frameId);
	var nuevoHeight = document.body.scrollHeight
	elemento.style.height= nuevoHeight;
}

function servOC3Ramas(i, href, nColorIn, nColorOut, hMax, trId, tdId, iframeId)
{
  var trObj = (document.getElementById) ? document.getElementById(trId + i) : eval("document.all['" + trId + i + "']");
  var nameObj = (document.getElementById) ? document.getElementById(tdId + i) : eval("document.all['" + tdId + i + "']");
  var ifObj = (document.getElementById) ? document.getElementById(iframeId + i) : eval("document.all['" + iframeId + i + "']");

  var altura = parseInt(hMax);
	
  if (trObj != null){
  	var step = altura/5;
	if (trObj.style.display=="none") {
      var nuevoHeight = altura + document.body.scrollHeight;
      var elemento = parent.document.getElementById("FramePresentacionRamasTest");
      elemento.style.height = nuevoHeight;
      trObj.style.display="";
      nameObj.style.background=nColorIn;
      smoothHeight(iframeId + i, 0, altura, step, 'o');
    }
    else {
      //Calculamos el height antes de invocar a la funcion smoothHeight
      var nuevoHeight = document.body.scrollHeight - altura;
      nameObj.style.background=nColorOut;
      smoothHeight(iframeId + i, altura, 0, step, trId + i);
      var elemento = parent.document.getElementById("FramePresentacionRamasTest");
      elemento.style.height= nuevoHeight;
    }
    parent.recalcularPosicionBotonGuardar();
  }
}
