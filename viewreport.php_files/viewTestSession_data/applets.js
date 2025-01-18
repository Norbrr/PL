///////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------
// Esta libreria recoge las funciones javascript relacionadas con el paso de valores
// a los applets
// Ambito de uso: 
//     'solucion.jsp' y demas parte de esta pagina
//     'itemPrevisualizar.jsp'
// Requiere de la implementacion adicional de la funcion jsIdentificarRespuesta(respuesta) 
// @author conejo
//-----------------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
		function ResolverApplet(idenunciado, respuestaAlumno, correccionAlumno) { 
			ok = false;
			try {
				var applet = eval('document.applets.'+idenunciado);
				if (applet == null) {
					applet = eval('document.'+idenunciado);
				}
		        if (applet != null)  {
					var evalFunction = eval("applet.resolver");
					if (typeof evalFunction !== "function") {
						evalFunction = eval("applet.Resolver");
					} 
					if (typeof evalFunction === "function") {
						ok  = evalFunction(respuestaAlumno, correccionAlumno);
					}
				} else { // applet == null, intentar con javascript
					var evalFunction = eval(idenunciado);
					if (typeof evalFunction !== "function") {
						evalFunction = eval("resolver");
					} 
					if (typeof evalFunction === "function") {
						ok = evalFunction(respuestaAlumno, correccionAlumno);
					}					
				}
			} catch(error) {}
		    return ok;
		}
///////////////////////////////////////////////////////////////////////////////
		function SolucionApplet(idenunciado, respuestaCorrecta) { 
			ok = false;
			try {
				var applet = eval('document.applets.'+idenunciado);
				if (applet == null) {
					applet = eval('document.'+idenunciado);
				}
		        if (applet != null)  {
					var evalFunction = eval("applet.solucion");
					if (typeof evalFunction !== "function") {
						evalFunction = eval("applet.Solucion");
					} 
					if (typeof evalFunction === "function") {
						ok  = evalFunction(respuestaCorrecta);
					}
				} else { // applet == null, intentar con javascript
					var evalFunction = eval(idenunciado);
					if (typeof evalFunction !== "function") {
						evalFunction = eval("solucion");
					} 
					if (typeof evalFunction === "function") {
						ok = evalFunction(respuestaCorrecta);
					}					
				}
			} catch(error) {};
	        return ok;
		}

// conejo: Para posible compatibilidad hacia atras....	
// Se podian llamar igual, pero no se porque el javascript no lo hace bien.
///////////////////////////////////////////////////////////////////////////////
		function Resolver(respuestaAlumno) { 
			// alert('Resolver respuestaAlumno='+respuestaAlumno);
			return ResolverApplet('enunciado', respuestaAlumno, null);
		}
///////////////////////////////////////////////////////////////////////////////
		function Solucion(respuestaCorrecta) { 
			// alert('Solucion respuestaCorrecta='+respuestaCorrecta);
			return SolucionApplet('enunciado', respuestaCorrecta);
		}