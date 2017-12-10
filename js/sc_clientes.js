function iniciar_clientes(valido){
	if(valido){

		agregarEvento(_btnCrearCliente,"click",function(){

			var vf=obtener_valores_formulario("formCrearCliente");
			console.log(vf);
			if(vf!=false){
				var datos={
					nombre_cliente:vf.Texto[0],
					documento:vf.Texto[1],
					email:vf.Texto[3],
					celular:vf.Texto[4],
					telefono:vf.Texto[4],
					direccion:vf.Texto[2],
					limite_de_credito:vf.Numero[0],
				};
				registrarDato(_URL+"clientes",datos,function(rs){
					mostrarMensaje(rs);

				},"formCrearCliente");

			}else{
				mostrarMensaje("Por favor ingresa valores");
			}
		});

		agregarEvento(_btnConsultarCliente,"click",function(){
			var vf=obtener_valores_formulario("");
			if(vf!=false){
			
				var datos={};
				var valor_consulta="";
				consultarDatos(_URL+"/"+valor_consulta,datos,function(rs){
					consola(rs);		
				},"formulario");
			}else{
				mostrarMensaje("Por favor ingresa valores");
			}
		});

		agregarEvento(_btnEditarCliente,"click",function(){
			var vf=obtener_valores_formulario("formEditarCliente");

			var datos={
					nombre_cliente:vf.Texto[0],
					documento:vf.Texto[1],
					email:vf.Texto[3],
					celular:vf.Texto[4],
					telefono:vf.Texto[4],
					direccion:vf.Texto[2],
					limite_de_credito:vf.Numero[0],
			};
			var id=vf.Hidden[0];
			editarDato(_URL+"clientes/"+id,datos,function(rs){
				mostrarMensaje(rs);
			});
		});

		agregarEvento(_btnEliminarCliente,"click",function(){
			if(confirm("¿Desea eliminar este cliente?")){
				var vf=obtener_valores_formulario("formEliminarCliente");
				if(vf.Texto[0]!=""){
					var datos={};
					var id=document.getElementById("hdIdClienteEliminar").value;

					eliminarDato(_URL+"clientes/"+id,datos,function(rs){
						consola(rs);
					});	
				}	
			}
			
			
		});

		agregarEvento("txtBuscarCliente","keypress",function(e){
			if(e.keyCode==13){
				e.preventDefault();
				var vf=obtener_valores_formulario("formBuscarCliente");
				if(vf!=false){
				
					var datos={};
					var valor_consulta=vf.Texto[0];
					consultarDatos(_URL+"clientes/"+valor_consulta,datos,function(rs){
						consola(rs);		
					},"formBuscarCliente");
				}else{
					mostrarMensaje("Por favor ingresa valores");
				}
			}else{
				var vf=obtener_valores_formulario("formBuscarCliente");
				if(vf.Texto[0]!=""){
				
					var datos={};
					var valor_consulta=vf.Texto[0];
					consultarDatos(_URL+"clientes/"+valor_consulta,datos,function(rs){
						crear_data_list_cliente("dt_mis_clientes",rs.datos);
					},"");
				}else{
					//mostrarMensaje("Por favor ingresa valores");
				}
			}
			
		});
		agregarEvento("txtBuscarClienteEliminar","change",function(){
			var vf=obtener_valores_formulario("formEliminarCliente");
				if(vf.Texto[0]!=""){
				
					var datos={};
					var valor_consulta=vf.Texto[0];
					consultarDatos(_URL+"clientes/"+valor_consulta,datos,function(rs){
						
						if(rs.respuesta){
							crear_data_list_cliente("lista_eliminar_cliente",rs.datos);
							if(rs.datos.length>0){
								document.getElementById("hdIdClienteEliminar").value=rs.datos[0].id;
							}	
						}
					},"");
				}else{
					//mostrarMensaje("Por favor ingresa valores");
				}
		})
		agregarEvento("btnEdicionCliente","click",function(){
				var vf=obtener_valores_formulario("formBuscarCliente");
				if(vf.Texto[0]!=""){
				
					var datos={};
					var valor_consulta=vf.Texto[0];
					consultarDatos(_URL+"clientes/"+valor_consulta,datos,function(rs){
						if(rs.respuesta){
							if(rs.datos.length==1){
								document.getElementById("hdIdCliente").value=rs.datos[0].id;
								document.getElementById('txtNuevoNombre').value=rs.datos[0].nombre_cliente;
								document.getElementById('txtNuevoDocumento').value=rs.datos[0].documento;
								document.getElementById('txtNuevaDireccion').value=rs.datos[0].direccion;
								document.getElementById('txtNuevoEmail').value=rs.datos[0].email;
								document.getElementById('txtNuevoTelefono').value=rs.datos[0].telefono;
								document.getElementById('txtNuevoLimiteCredito').value=rs.datos[0].limite_de_credito;
							}else{
								document.getElementById("hdIdCliente").value=rs.datos[0].id;
								document.getElementById('txtNuevoNombre').value=rs.datos[0].nombre_cliente;
								document.getElementById('txtNuevoDocumento').value=rs.datos[0].documento;
								document.getElementById('txtNuevaDireccion').value=rs.datos[0].direccion;
								document.getElementById('txtNuevoEmail').value=rs.datos[0].email;
								document.getElementById('txtNuevoTelefono').value=rs.datos[0].telefono;
								document.getElementById('txtNuevoLimiteCredito').value=rs.datos[0].limite_de_credito;
							}
						}
					},"");
				}
		});
		agregarEvento("btnCancelarEdicionCliente","click",function(){
			limpiarFormulario("formEditarCliente");
		});

		agregarEvento("txtNombreClienteEstadoCuenta","keypress",function(e){
			if(e.keyCode==13){
				e.preventDefault();
				var vf=obtener_valores_formulario("formEstadoCuenta");
				if(vf!=false){
				
					var datos={};
					var valor_consulta=vf.Texto[0];
					consultarDatos(_URL+"clientes/"+valor_consulta,datos,function(rs){
						if(rs.respuesta==true){
							cliente_seleccionado=rs.datos[0];
							document.getElementById("h4NombreCliente").innerHTML=rs.datos[0].nombre_cliente;
						}else{
							document.getElementById("h4NombreCliente").innerHTML="Nombre cliente";
						}	
					},"formBuscarCliente");
				}else{
					mostrarMensaje("Por favor ingresa valores");
				}
			}else{
				var vf=obtener_valores_formulario("formEstadoCuenta");
				if(vf.Texto[0]!=""){
				
					var datos={};
					var valor_consulta=vf.Texto[0];
					consultarDatos(_URL+"clientes/"+valor_consulta,datos,function(rs){
						crear_data_list_cliente("lista_cliente_estado",rs.datos);
					},"");
				}else{
					//mostrarMensaje("Por favor ingresa valores");
				}
			}
		});
		agregarEvento("txtNombreClienteEstadoCuenta","change",function(e){
			var vf=obtener_valores_formulario("formEstadoCuenta");
				if(vf!=false){
				
					var datos={};
					var valor_consulta=vf.Texto[0];
					consultarDatos(_URL+"clientes/"+valor_consulta,datos,function(rs){
						if(rs.respuesta==true){
							cliente_seleccionado=rs.datos[0];
							document.getElementById("h4NombreCliente").innerHTML=rs.datos[0].nombre_cliente;
						}else{
							document.getElementById("h4NombreCliente").innerHTML="Nombre cliente";
						}	
					},"formBuscarCliente");
				}else{
					mostrarMensaje("Por favor ingresa valores");
				}	
		});
		agregarEvento("estadoCu","click",function(){
			if(cliente_seleccionado!=false){
				dibujar_estado_cuenta(cliente_seleccionado);
			}else{
				mostrarMensaje("No hay creditos para este cliente");
			}
		});
		agregarEvento("btnAbonar","click",function(){
			var vf=obtener_valores_formulario("formAbono");
			if(vf!=false){
				var datos={
					valor_abono:vf.Numero[0],
					id_usuario:_usuario.id_usuario,
					id_sede:_IdSede,
				};

				editarDato(_URL+"creditos/"+vf.Hidden[0],datos,function(rs){
					mostrarMensaje(rs);
				},"formAbono");
			}else{
				mostrarMensaje("Por favor ingresa valores");
			}
		})
	}else{
		mostrarMensaje("No tiene permisos para usar esta seccion");
	}	
	/*agregarEvento("h4Liquidar","click",function(){
		if(confirm("¿Desea liquidar el saldo de este cliente?")){
			//falta funcionalidad liquidar
		}
	});*/
}
var cliente_seleccionado=false;
function dibujar_estado_cuenta(cs){
	console.log(cs);
	document.getElementById("h3NombreClienteEstadoCuenta").innerHTML=cs.nombre_cliente;
	document.getElementById("h2SaldoActualCliente").innerHTML="$ "+formato_numero(cs.valor_actual_credito,"0",",",".");
	document.getElementById("h2limiteSaldoCliente").innerHTML="$ "+formato_numero(cs.limite_de_credito,"0",",",".");
	document.getElementById("hdIdClienteAbono").value=cs.id;

	var tbl=document.getElementById("tblCreditos");
	tbl.innerHTML="";
	for(var c in cs.facturas){
		var detalle=cs.facturas[c];
		for(var dt in cs.facturas[c].detalle_factura){
			console.log(cs.facturas[c].detalle_factura[dt]);
			var tr=document.createElement("tr");
			
			var td=document.createElement("td");
			td.innerHTML=cs.facturas[c].registro_factura;
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML=cs.facturas[c].detalle_factura[dt].nombre_producto_venta;
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="$ "+formato_numero(cs.facturas[c].detalle_factura[dt].valor_item,"0",",",".");
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML=cs.facturas[c].detalle_factura[dt].cantidad_producto;
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="$ "+formato_numero(Number(cs.facturas[c].detalle_factura[dt].cantidad_producto)*Number(cs.facturas[c].detalle_factura[dt].valor_item),"0",",",".");
			tr.appendChild(td);

			tbl.appendChild(tr);	
		}
		
	}
}