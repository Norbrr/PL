///////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------
// Esta libreria se encarga de modelar la comunicacion mediante ajax.
// @author conejo/guzman
//-----------------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////

var xmlHttp;// instancia global de XMLHttpRequest
///////////////////////////////////////////////////////////////////////////////
function createXmlHttpRequest() {
    if(window.ActiveXObject) {
        xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
    } else if(window.XMLHttpRequest) {
        xmlHttp=new XMLHttpRequest();
    }
}
///////////////////////////////////////////////////////////////////////////////
/**
 * Metodo que se le pasa como parametro la consulta y la funcion javascript que
 * recibira la respuesta.
 */
function jsStartAjaxRequest(url, listener) {
    createXmlHttpRequest();
    xmlHttp.open("GET",url ,true);
    xmlHttp.onreadystatechange=listener;
    xmlHttp.send(null);
}
//////////////////////////////////////////////////////////////////////////////
/**
 * Metodo que se le pasa como parametro la consulta y la funcion javascript que
 * recibira la respuesta.
 */
function jsStartAjaxPostRequest(url, param, listener, modeSync) {
	if (modeSync==null) {
		modeSync = true;
	}
    createXmlHttpRequest();
    xmlHttp.open("POST",url ,modeSync);
    xmlHttp.onreadystatechange=listener;
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.send(param);
}
///////////////////////////////////////////////////////////////////////////////
/**
 * Funcion que devuelve el objeto xmlHttpRequest
 */
function jsGetXmlHttpRequest () {
    return xmlHttp;
}
///////////////////////////////////////////////////////////////////////////////
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

///////////////////////////////////////////////////////////////////////////////
function jsUploadFileRequest(url, path, filename, content, listener, modeSync, jsessionid) {
	if (modeSync==null) {
		modeSync = true;
	}
    createXmlHttpRequest();
    xmlHttp.open("POST", url ,modeSync);
    var boundary=Math.random().toString().substr(2);
    xmlHttp.setRequestHeader("content-type", "multipart/form-data; charset=utf-8; boundary=" + boundary);
    if (listener!=null) {
        xmlHttp.onreadystatechange=listener;
    } else {
        xmlHttp.onreadystatechange=defaultListener;
    }
    if (jsessionid!=null) {
        xml.setRequestHeader('Cookie', jsessionid);
    }
    var multipart = "";
    multipart += '--' + boundary + '\r\nContent-Disposition: form-data; name="PATH"'
                + '\r\n\r\n' + path + '\r\n';
    multipart += '--' + boundary + '\r\nContent-Disposition: form-data; name="FILE1" filename="'+filename+'"'
                + '\r\nContent-type: text/plain'
                + '\r\n' + content + '\r\n';
    multipart += '--'+boundary+'--\r\n';
    xmlHttp.send(multipart);
}

///////////////////////////////////////////////////////////////////////////////
function jsDownloadFileRequest(url, path, filename, listener, modeSync, jsessionid) {
	var file = url + path + '/' + filename;
	if (modeSync==null) {
		modeSync = true;
	}
    createXmlHttpRequest();
    xmlHttp.open("GET", file ,modeSync);
    if (listener!=null) {
        xmlHttp.onreadystatechange=listener;
    } else {
        xmlHttp.onreadystatechange=defaultListener;
    }
    if (jsessionid!=null) {
        xml.setRequestHeader('Cookie', jsessionid);
    }
    xmlHttp.send();
    return;
}

///////////////////////////////////////////////////////////////////////////////
function defaultListener () {
    try {
        var req = jsGetXmlHttpRequest();
        if(req.readyState==4 && req.status==200) {
            var texto = req.responseText;
            // alert(texto);
        } else if (req.statusText!= '' && xmlHttp.status!=200) {
            alert("Error loading page: " + req.statusText);
        }
    } catch (err) {}
}

///////////////////////////////////////////////////////////////////////////////
function includeHTML() {
	  var z, i, elmnt, file, xhttp;
	  /* Loop through a collection of all HTML elements: */
	  z = document.getElementsByTagName("*");
	  for (i = 0; i < z.length; i++) {
	    elmnt = z[i];
	    /*search for elements with a certain atrribute:*/
	    file = elmnt.getAttribute("w3-include-html");
	    if (file) {
	      /* Make an HTTP request using the attribute value as the file name: */
	      xhttp = new XMLHttpRequest();
	      xhttp.onreadystatechange = function() {
	        if (this.readyState == 4) {
	          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
	          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
	          /* Remove the attribute, and call this function once more: */
	          elmnt.removeAttribute("w3-include-html");
	          includeHTML();
	        }
	      }
	      xhttp.open("GET", file, true);
	      xhttp.send();
	      /* Exit the function: */
	      return;
	    }
	  }
}

///////////////////////////////////////////////////////////////////////////////
//funcion para comprobar si es correcto el script
var scriptError;
function checkScripts(scripts) {
	checkScripts(scripts, true);
}
function checkScripts(scripts, noReturn){
	// LOs script se mandan todos juntos para ahorrar comunicaciones
	var listener = function () {
		try {
			var req;
			req = jsGetXmlHttpRequest();
			if(req.readyState==4 && req.status==200) {
				var texto = req.responseText;
				if (texto.startsWith("OK")) {
					// console.log("OK");
					scriptError = '';
				} else {
					// console.log('texto='+texto);
					texto = texto.replace("\n","");
					scriptError = texto;
				}
			} else if (req.statusText!= '' && xmlHttp.status!=200) {
		        alert("Error loading page: " + req.statusText);
			}
		} catch (err) {}
	}
	var param= "scripts="+encodeURIComponent(scripts)+"&noReturn="+noReturn ;
	jsStartAjaxPostRequest(SERVLETCHECKSCRIPT, param, listener, false); // llamada sincrona
}

///////////////////////////////////////////////////////////////////////////////
// funcion para insertar en Siette variables de sesion
var scriptVarError;
function setVar(name, value){
	setSietteScriptVar(name, value);
}
function setSietteScriptVar(name, value){
	var listener = function () {
		try {
			var req;
			req = jsGetXmlHttpRequest();
			if(req.readyState==4 && req.status==200) {
				var texto = req.responseText;
				if (texto.startsWith("OK")) {
					// console.log("OK");
					scriptVarError = '';
				} else {
					// console.log('texto='+texto);
					texto = texto.replace("\n","");
					scriptVarError = texto;
				}
			} else if (req.statusText!= '' && xmlHttp.status!=200) {
		        alert("Error loading page: " + req.statusText);
			}
		} catch (err) {}
	}
	var param= encodeURIComponent(name) + "="+encodeURIComponent(value);
	jsStartAjaxPostRequest(SERVLETSESSIONVAR, param, listener, false); // llamada sincrona
}

/* Obtiene el elemnto a partir del id si es posible, o bien se trata del propio elemento */
function getElement(elmtid) {
	var element = null;
	try {
		element = document.getElementById(elmtid);
	} catch(error) {
	}
	if (element==null) {
		element = elmtid;
	}
	return element;
}


