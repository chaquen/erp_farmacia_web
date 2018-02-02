function config_inicial(){
	
	if(_usuario!=false){


		
		$('#divInicio, #formLogueo, #recuperarUsuario').fadeOut('fast');
		$('#menuGeneral, #ventas').fadeIn('slow');
		document.getElementById("titulo").innerHTML=_usuario.nombre_sede.toUpperCase()+" - "+_donde_estoy.toUpperCase()+" - "+_usuario.nombres.toUpperCase()+" "+_usuario.apellidos.toUpperCase();
		document.getElementById("h4NombreUsuario").innerHTML="Bienvenido, "+_usuario.nombres.toUpperCase()+" "+_usuario.apellidos.toUpperCase();
		consultar_hora();
		consulta_inicial();
		mostrar_perfil();
		
		//consultar_sedes();		
		//cargar_lista_cajeros();
		//cargar_lista_administradores();
		agregarEvento("menuSalir","click",salir);	
		//control_de_teclas();
		//cargar_roles();
		//consultar_categorias();
		//consultar_proveedores()
		


		//iniciar todo




	}else{
		//$('.formularioCentral, .formulario').fadeOut('fast');
		mostrarMensaje("Por favor inicial sesion");
	}
	



	agregarEvento("menuVenta","click",function(){
		_donde_estoy="Ventas";
		cambiar_titulo();
	});
	agregarEvento("menuCliente","click",function(){

		_donde_estoy="Clientes";
		cambiar_titulo();
	});
	agregarEvento("menuProducto","click",function(){
		_donde_estoy="Productos";
		cambiar_titulo();
	});
	agregarEvento("menuInventario","click",function(){
		_donde_estoy="Inventario";
		cambiar_titulo();
	});
	agregarEvento("menuConfiguracion","click",function(){
		_donde_estoy="Configuracion";
		cambiar_titulo();
	});
	agregarEvento("menuCorte","click",function(){
		_donde_estoy="Corte";
		cambiar_titulo();
		var bFecha=document.getElementById("bFecha");
		var fecha=horaClientePersonlizada();
		bFecha.innerHTML=fecha;
	});

	agregarEvento("btnEdiMisNotificaciones","click",function(){
		var vf=obtener_valores_formulario("formMisNotificaciones");
		var datos={
			bajoInv:vf.Texto[0],
			corteDia:vf.Texto[1],
			pedidoDia:vf.Texto[2],
			sede:document.getElementById("selSedeNot").value
		};
		registrarDato(_URL+"notificaciones",datos,function(rs){
			mostrarMensaje(rs);
		});
	});
	agregarEvento("selRolesPermisos","change",function(){
		if(this.value!=0){
			consultarDatos(_URL+"roles/"+this.value,{},function(rs){
				if(rs.respuesta){
					dibujar_tabla_permisos(rs.datos);
				}
			});
		}
	});

	agregarEvento("btnEditarPerfil","click",function(){
		var vf=obtener_valores_formulario("formPerfil");
		if(vf!=false){
			var cl=false;
			if(document.getElementById("txtClave1").value!="" &&
					 document.getElementById("txtClave2").value!="" && 
					 document.getElementById("txtClave1").value == document.getElementById("txtClave1").value &&
					 document.getElementById("txtClave1").value!=" " &&
					  document.getElementById("txtClave2").value!=" " && 
					  document.getElementById("txtClave1").value.length>4 &&
					   document.getElementById("txtClave2").value.length>4){
				cl=document.getElementById("txtClave1").value;
			}
			var datos={
				nombres:vf.Texto[0],
				apellidos:vf.Texto[1],
				usuario:vf.Texto[2],
				email:vf.Texto[3],
				codigo_venta:vf.Texto[4],
				clave:cl,

			};
			editarDato(_URL+"editar_perfil/"+_usuario.id_usuario,datos,function(rs){
				_usuario.nombres=datos.nombres;
				_usuario.apellidos=datos.apellidos;
				_usuario.usuario=datos.usuario;
				_usuario.email=_usuario.email;
				mostrarMensaje(rs);

			});

			
		}
	});

	agregarEvento("selSedeNot","click",function(){
		if(this.value!="0"){
			consultarDatos(_URL+"notificaciones/"+this.value,{},function(rs){
				document.getElementById("notCorteDiario").value="";
				document.getElementById("notBajoInve").value="";	
				document.getElementById("notPedidoDiario").value="";	
				for(var e in rs.datos){

					switch(rs.datos[e].trabajo){
						case "CorteDiario":
							
							document.getElementById("notCorteDiario").value=rs.datos[e].correos;	
						break;
						case "BajoInventario":
							
							document.getElementById("notBajoInve").value=rs.datos[e].correos;	
						break;
						case "PedidoDiario":
							document.getElementById("notPedidoDiario").value=rs.datos[e].correos;	
						break;
					}
				}
				
				
				
				
			});
		}
	});
	
	agregarEvento("txtCodigoVenta","change",function(){

	});

	document.getElementById("dtFechaFactura").value=horaCliente().split(" ")[0];
}

function mostrar_perfil(){
	document.getElementById("txtNombre").value=_usuario.nombres;
	document.getElementById("txtApellido").value=_usuario.apellidos;
	document.getElementById("txtUsuario").value=_usuario.usuario;
	document.getElementById("txtEmail").value=_usuario.email;
	document.getElementById("txtCodigoVenta").value=_usuario.codigo_venta;
}
/*FUNCION QUE DIBUJA LOS PERMISOS DE EL ROL SELECCIONADO*/
function dibujar_tabla_permisos(datos){
	var divTablasPermisos=document.getElementById("divTablasPermisos");
	divTablasPermisos.innerHTML="";
	for(var p in datos){
		console.log(datos[p]);
		var tabla=document.createElement("table");
		tabla.className="tblPermisos";
		
		var tr=document.createElement("tr");
		
		var td=document.createElement("td");
		td.setAttribute("colspan","2");
		td.innerHTML=datos[p].nombre_permiso.toUpperCase();
		tr.appendChild(td);

		tabla.appendChild(tr);
		
		for(var dp in datos[p].permisos){
			console.log(datos[p].permisos[dp]);
			var tr=document.createElement("tr");
			
			var td=document.createElement("td");
			td.setAttribute("colspan","2");
			var inp=document.createElement("input");
			inp.setAttribute("type","checkbox");
			if(datos[p].permisos[dp].estado_accion=="1"){
				inp.setAttribute("checked",true);
			}
			inp.setAttribute("value",datos[p].permisos[dp].id);
			inp.setAttribute("onchange","cambiar_permiso("+datos[p].permisos[dp].id+","+datos[p].permisos[dp].estado_accion+")");
			td.appendChild(inp);
			tr.appendChild(td);

			var td=document.createElement("td");
			td.setAttribute("colspan","2");
			td.innerHTML=datos[p].permisos[dp].accion;
			tr.appendChild(td);

			tabla.appendChild(tr);
		}
		divTablasPermisos.appendChild(tabla);
	}
}
/*FUNCION PARA HABILITAR O DESHABILITAR EL PERMISO DE UNA ENTIDAD*/
function cambiar_permiso(id_permiso){
	eliminarDato(_URL+"detalle_permisos/"+id_permiso,{},function(rs){
										mostrarMensaje(rs);
									});
}
function cerrarventana(){
	event.returnValue = "\n Desea cerrar el sistema? \n"; 
}
/*FUNCION QUE CONSULTA LOS PARAMETROS Y DATOS DE CONFIGURACION INICIAL*/
function consulta_inicial(){
	consultarDatos(_URL+"consulta_inicial/"+_IdSede+"/"+_usuario.fk_id_rol+"/"+horaCliente().split(" ")[0],{},function(rs){

			if(_usuario.fk_id_rol==7){
				for(var s  in rs.sedes){
					console.log(rs.sedes[s]);
					if(rs.sedes[s].id==_IdSede){

						rs.sedes=rs.sedes[s];
						break;
					}
				}
			}
			crear_select_sedes("selSedesMovInv",rs.sedes);
			crear_select_sedes("selSedesReporteInv",rs.sedes);	
			crear_select_sedes("selSedes1",rs.sedes);	
			crear_select_sedes("selSedes2",rs.sedes);	
			crear_select_sedes("selSedesBajoInve",rs.sedes);
			crear_select_sedes("selSedeAjuste",rs.sedes);
			crear_select_sedes("selPromoSede",rs.sedes);
			crear_select_sedes("selSedeNot",rs.sedes);
			//sede en reporte ventas peridod
			crear_select_sedes("selSedesImportar",rs.sedes);
			crear_select_sedes("selSedesRepoVenta",rs.sedes);
			crear_select_sedes("selSedesAddInv",rs.sedes);
			crear_select_sedes("selCajeroSede",rs.sedes);
			crear_select_sedes("selSedeCorte",rs.sedes);
			crear_select_sedes("selPredidoSedes",rs.sedes)
			crear_select_sedes("selEditarSede",rs.sedes);
			crear_select_sedes("selEliminarSede",rs.sedes);
			crear_select_sedes("selSedeEdiCajero",rs.sedes);
			crear_select_sedes("selSedesFacturacion",rs.sedes);

			//CAJEROS
			cajeros=rs.cajeros;
			crear_select_roles("selMovInvCajeros",rs.cajeros);
			crear_select_roles("selCajerosCorte",rs.cajeros);
			crear_select_roles("selCajerosEdi",rs.cajeros);
			crear_select_roles("selEliCajero",rs.cajeros);
			crear_select_roles("selVenCajero",rs.cajeros);
			//ADMINISTRADORES
			crear_select_roles("selAdminSede",rs.administradores);
			crear_select_roles("selAdminSedeEdi",rs.administradores);
			//ROLES
			crear_select_ver_roles("selRoles",rs.roles);
			crear_select_ver_roles("selRolesEdiCajeo",rs.roles);
			crear_select_ver_roles("selRolesPermisos",rs.roles);
			//DEPARTAMENTOS
			crear_select_categorias("selMovInvCate",rs.departamentos);
			crear_select_categorias("selNuevaCategoria",rs.departamentos);
			crear_select_categorias("selCatReporteInv",rs.departamentos);
			crear_select_categorias("selCategoria",rs.departamentos);	
			crear_select_categorias("selCategoriaNuevoProd",rs.departamentos);	
			//PRPVEEDORES
			crear_select_proveedores("selPredidoProveedor",rs.proveedores);
			crear_select_proveedores("selProveedorNuevoProd",rs.proveedores);
			crear_select_proveedores("selProveedorEdiProd",rs.proveedores);
			crear_select_proveedores("selProvReporteInv",rs.proveedores);
			crear_select_proveedores("selPredidoProveedor_ap",rs.proveedores);	
			crear_select_proveedores("selProveedorNuevoProd2",rs.proveedores);	
			//SALIDA
			crear_select_salida_contable("selSalida",rs.salidas);
			//ENTRADAS
			crear_select_entrada_contable("selEntrada",rs.entradas);
			
			//PERMISOS
			validar_permiso(rs.permisos);
			//ENTRADA INICIAL
			if(rs.caja_inicial.length == 0){
				$('#entradaDinero').fadeIn('slow');
				document.getElementById("pEntrada").innerHTML="Registro dinero caja inicial";
				document.getElementById("h2TlEntrad").innerHTML="DINERO EN CAJA";
				document.getElementById("pMsnEntrada").innerHTML="Escriba la cantidad de dinero inical en la caja";
				document.getElementById("tblRegistroEntrada").style.display='none';

				var selEntrada=document.getElementById("selEntrada");
				for(var f in selEntrada.childNodes){
					console.log(selEntrada.childNodes[f]);
					if(selEntrada.childNodes[f].innerHTML=="CajaInicial"){
						selEntrada.childNodes[f].selected=true;
					}
				}
				$("#txt_valor").focus();	
			}else{
				$("#txtCodigoProducto").focus();	
			}

			
	});
}
function validar_permiso(datos){
	console.log(datos);
	for(var p in datos){
		if(datos[p].estado_accion==0){
			var elementos=datos[p].elementos.split(",");
			if(elementos!=null){
				console.log(elementos);
				for(var e in elementos){
					console.log(elementos[e]);
					document.getElementById(elementos[e]).style.display="none";
				}
			}
		}
	}
}
function cambiar_titulo(){
	document.getElementById("titulo").innerHTML=_usuario.nombre_sede.toUpperCase()+" - "+_donde_estoy.toUpperCase()+" - "+_usuario.nombres.toUpperCase()+" "+_usuario.apellidos.toUpperCase();
}


function consultar_hora(){
	setTimeout("consultar_hora()",1); 
	var hora=horaCliente();
	document.getElementById("hora").innerHTML=hora;
}
function consultar_sedes(){

	consultarDatos(_URL+"sedes",{},function(rs){
		console.log(rs);
		if(rs.respuesta==true){
			crear_select_sedes("selSedesMovInv",rs.datos);
			crear_select_sedes("selSedesReporteInv",rs.datos);	
			crear_select_sedes("selSedes1",rs.datos);	
			crear_select_sedes("selSedes2",rs.datos);	
			crear_select_sedes("selSedesBajoInve",rs.datos);
			crear_select_sedes("selSedeAjuste",rs.datos);
			crear_select_sedes("selPromoSede",rs.datos);
			//sede en reporte ventas peridod
			crear_select_sedes("selSedesImportar",rs.datos);
			crear_select_sedes("selSedesRepoVenta",rs.datos);
			crear_select_sedes("selSedesAddInv",rs.datos);
			crear_select_sedes("selCajeroSede",rs.datos);
			crear_select_sedes("selSedeCorte",rs.datos);
			crear_select_sedes("selPredidoSedes",rs.datos)
			crear_select_sedes("selEditarSede",rs.datos);
			crear_select_sedes("selEliminarSede",rs.datos);
			crear_select_sedes("selSedeEdiCajero",rs.datos);
		}
		
	});
}
function cargar_lista_cajeros(){
	console.log(_URL);
	consultarDatos(_URL+"mostrar_cajeros/"+_IdSede,{},function(rs){
		if(rs.respuesta==true){
			cajeros=rs.datos;
			crear_select_roles("selMovInvCajeros",rs.datos);
			crear_select_roles("selCajerosCorte",rs.datos);
			crear_select_roles("selCajerosEdi",rs.datos);
			
		}
		
	});
}
function cargar_lista_administradores(){
	console.log(_URL);
	consultarDatos(_URL+"mostrar_administradores",{},function(rs){
		if(rs.respuesta==true){
			crear_select_roles("selAdminSede",rs.datos);
			crear_select_roles("selAdminSedeEdi",rs.datos);
		}else{
			mostrarMensaje("no hay administradores");
		}
		
	});
}
function cargar_roles(){
	console.log(_URL);
	consultarDatos(_URL+"roles",{},function(rs){
		if(rs.respuesta==true){
			crear_select_ver_roles("selRoles",rs.datos);
			crear_select_ver_roles("selRolesEdiCajeo",rs.datos);
		}else{
			mostrarMensaje("no hay administradores");
		}
		
	});	
}
function consultar_categorias(){
	consultarDatos(_URL+"departamentos",{},function(rs){
			if(rs.respuesta==true){


				crear_select_categorias("selMovInvCate",rs.datos);
				crear_select_categorias("selNuevaCatgorias",rs.datos);
				crear_select_categorias("selCatReporteInv",rs.datos);
				crear_select_categorias("selCategoria",rs.datos);
			}
		});
}

function consultar_proveedores(){
	console.log(_URL);
	consultarDatos(_URL+"proveedores",{},function(rs){
		if(rs.respuesta==true){
			crear_select_proveedores("selPredidoProveedor",rs.datos);
			crear_select_proveedores("selProveedorNuevoProd",rs.datos);
			crear_select_proveedores("selProveedorEdiProd",rs.datos);
			crear_select_proveedores("selProvReporteInv",rs.datos);
			crear_select_proveedores("selPredidoProveedor_ap",rs.datos);
		}else{
			mostrarMensaje("no hay administradores");
		}
		
	});	
}
function novolver(){
	
   window.location.hash="no-back-button";
	
   window.location.hash="Again-No-back-button" //chrome
	
   window.onhashchange=function(){window.location.hash="no-back-button";}
	
}
