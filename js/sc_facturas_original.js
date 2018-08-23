//numero de ticket actual
var _numero_ticket=1;
var mi_ticket=[];
var mis_ticket_off=[];
var txt_codigo="";
function iniciar_factura(){

	document.getElementById("dtFechaFactura").value=horaCliente().split(" ")[0];
	if(obtener_local_storage("btn_tk_"+_usuario.id_usuario+"_"+_IdSede)==false){
		agregar_local_storage("btn_tk_"+_usuario.id_usuario+"_"+_IdSede,1);	
	}
	


	mostrar_venta_inicial();
	
	agregarEvento("liNuevoTicketPendiente","click",function(){
		agregar_boton_ticket(1);
	});
	agregarEvento("liEliminarTicketPendiente","click",function(){
		eliminar_ticket(_numero_ticket);
	});

	//BUSQUEDA PRODUCTO
	agregarEvento("txtCodigoProducto","keypress",function(e){
		
			if(e.keyCode!=13){
				if(this.value.length > 2 && this.value != "" && this.value != "  "){
					if(this.value.trim().length>0){
						registrarDato(_URL+"traer_productos_para_factura/"+this.value.trim()+"/"+_IdSede,{},function(rs){	
						
					

							
							if(rs.respuesta){
							
									var listaProductos=document.getElementById("listaProductos");
									listaProductos.innerHTML="";
									for(var e in rs.datos){
										
											var opt=document.createElement("option");
											opt.innerHTML=rs.datos[e].nombre_producto;
											opt.value=rs.datos[e].codigo_producto;
											listaProductos.appendChild(opt);
										
										
									}
								
								
					
							}else{
								_producto_seleccionado=false;
							}	
						},"");

				
					}	
				}
			}else{
				console.log(document.getElementById("selTipoVentaFactura").value);
				if( this.value != "" && this.value != "  " ){
					if(this.value.trim().length>0){
						registrarDato(_URL+"traer_productos_para_factura/"+this.value.trim()+"/"+_IdSede,{},function(rs){	
						
							if(rs.respuesta){
							
									var listaProductos=document.getElementById("listaProductos");
									listaProductos.innerHTML="";
									
								console.log(rs.datos);
								if(rs.datos.length==1){
									_producto_seleccionado=rs.datos[0];
									document.getElementById("numCantidad").value=1;
									document.getElementById("txtCodigoProducto").style.backgroundColor="#ffffff";
									document.getElementById("h4NombreProductoInv").innerHTML=_producto_seleccionado.nombre_producto;


									if(e.keyCode==13 && _producto_seleccionado!=false){
										
										if(_producto_seleccionado!=false){
											agregar_producto_mi_ticket(_producto_seleccionado);
											//	dibujar_factura(mi_ticket[_numero_ticket-1]);	
											//document.getElementById("span").scrollTop='99999999999999999999999999';
											//nuevo 04-10-17	
											var sel=document.getElementById("selTipoVentaFactura");
											sel.innerHTML="";
											var o =document.createElement("option");
											o.innerHTML="Selecciona el tipo de venta";
											o.value="0";
											sel.appendChild(o);	
											//FINnuevo 04-10-17		
										}else{
											document.getElementById("numCantidad").value=0;
											document.getElementById("txtCodigoProducto").value="";
												
										}
											



									}


								var sel=document.getElementById("selTipoVentaFactura");	
								console.log(sel);
								sel.innerHTML="";

								if(rs.datos[0].tipo_venta_producto=="Caja"){
										
									

										

										var opt=document.createElement("option");
										opt.innerHTML="Unidad";
										opt.value="unidad";
										sel.appendChild(opt);

										var opt=document.createElement("option");
										opt.innerHTML="Caja";
										opt.value="caja";
										sel.appendChild(opt);

								}else if(rs.datos[0].tipo_venta_producto=="PorUnidad"){
									

										var opt=document.createElement("option");
										opt.innerHTML="Unidad";
										opt.value="unidad";
										sel.appendChild(opt);											
								}else if(rs.datos[0].tipo_venta_producto=="CajaBlister"){
									

										var opt=document.createElement("option");
										opt.innerHTML="Unidad";
										opt.value="unidad";
										sel.appendChild(opt);

										var opt=document.createElement("option");
										opt.innerHTML="Blister";
										opt.value="blister";
										sel.appendChild(opt);


										var opt=document.createElement("option");
										opt.innerHTML="Caja";
										opt.value="caja";
										sel.appendChild(opt);

										
										
								}
								}else{
									document.getElementById("txtCodigoProducto").style.backgroundColor="#ff9998";
									document.getElementById("txtCodigoProducto").value="";
								}
								
								
					
							}else{
								_producto_seleccionado=false;
								document.getElementById("txtCodigoProducto").style.backgroundColor="#ff9998";
								document.getElementById("txtCodigoProducto").value="";
							}	
						},"");
						//consultar_mi_bodega(this.id);
					}	
				}else{
					document.getElementById("numCantidad").value=0;
					//document.getElementById("txtCodigoProducto").value="";	
				}
				e.preventDefault();
			}
		
	});

	agregarEvento("txtCodigoProducto","keypress",function(e){
		if(e.keyCode!=13){
			console.log(e.key);
		}else{
			
			console.log(e.key);
			if(e.key=="Enter"){
				registrarDato(_URL+"traer_productos_para_factura/"+this.value.trim()+"/"+_IdSede,{},function(rs){	
						
							if(rs.respuesta){
							
									var listaProductos=document.getElementById("listaProductos");
									listaProductos.innerHTML="";
									
								console.log(rs.datos);
								if(rs.datos.length==1){
									_producto_seleccionado=rs.datos[0];
									document.getElementById("numCantidad").value=1;
									document.getElementById("txtCodigoProducto").style.backgroundColor="#ffffff";
									document.getElementById("h4NombreProductoInv").innerHTML=_producto_seleccionado.nombre_producto;


									if(e.keyCode==13 && _producto_seleccionado!=false){
										
										if(_producto_seleccionado!=false){
											agregar_producto_mi_ticket(_producto_seleccionado);
											//	dibujar_factura(mi_ticket[_numero_ticket-1]);	
											//document.getElementById("span").scrollTop='99999999999999999999999999';
											//nuevo 04-10-17	
											var sel=document.getElementById("selTipoVentaFactura");
											sel.innerHTML="";
											var o =document.createElement("option");
											o.innerHTML="Selecciona el tipo de venta";
											o.value="0";
											sel.appendChild(o);	
											//FINnuevo 04-10-17		
										}else{
											document.getElementById("numCantidad").value=0;
											document.getElementById("txtCodigoProducto").value="";
												
										}
											



									}


								var sel=document.getElementById("selTipoVentaFactura");	
								console.log(sel);
								sel.innerHTML="";

								if(rs.datos[0].tipo_venta_producto=="Caja"){
										
									

										

										var opt=document.createElement("option");
										opt.innerHTML="Unidad";
										opt.value="unidad";
										sel.appendChild(opt);

										var opt=document.createElement("option");
										opt.innerHTML="Caja";
										opt.value="caja";
										sel.appendChild(opt);

								}else if(rs.datos[0].tipo_venta_producto=="PorUnidad"){
									

										var opt=document.createElement("option");
										opt.innerHTML="Unidad";
										opt.value="unidad";
										sel.appendChild(opt);											
								}else if(rs.datos[0].tipo_venta_producto=="CajaBlister"){
									

										var opt=document.createElement("option");
										opt.innerHTML="Unidad";
										opt.value="unidad";
										sel.appendChild(opt);

										var opt=document.createElement("option");
										opt.innerHTML="Blister";
										opt.value="blister";
										sel.appendChild(opt);


										var opt=document.createElement("option");
										opt.innerHTML="Caja";
										opt.value="caja";
										sel.appendChild(opt);

										
										
								}
								}else{
									document.getElementById("txtCodigoProducto").style.backgroundColor="#ff9998";
									document.getElementById("txtCodigoProducto").value="";
								}
								
								
					
							}else{
								_producto_seleccionado=false;
								document.getElementById("txtCodigoProducto").style.backgroundColor="#ff9998";
								document.getElementById("txtCodigoProducto").value="";
							}	
						},"");
			}
		}
	});

	agregarEvento("txtCodigoProducto","change",function(){
		console.log(this);
			if( this.value != "" || this.value != "  "){
				if(this.value.trim().length>0){
					registrarDato(_URL+"traer_productos_para_factura/"+this.value.trim()+"/"+_IdSede,{},function(rs){	
					
					

						
						if(rs.respuesta){
						
								var listaProductos=document.getElementById("listaProductos");
								listaProductos.innerHTML="";
								
							console.log(rs.datos);
							if(rs.datos.length >= 1){
								for(var f in rs.datos){
									if(rs.datos[f].codigo_producto==document.getElementById("txtCodigoProducto").value){
										_producto_seleccionado=rs.datos[f];
									}
								}
								
								document.getElementById("numCantidad").value=1;
								document.getElementById("txtCodigoProducto").style.backgroundColor="#ffffff";
								document.getElementById("h4NombreProductoInv").innerHTML=_producto_seleccionado.nombre_producto;
								var sel=document.getElementById("selTipoVentaFactura");
								sel.innerHTML="";
								if(_producto_seleccionado.tipo_venta_producto=="Caja"){
										
										

										var opt=document.createElement("option");
										opt.innerHTML="Unidad";
										opt.value="unidad";
										sel.appendChild(opt);

										var opt=document.createElement("option");
										opt.innerHTML="Caja";
										opt.value="caja";
										sel.appendChild(opt);

										
								}else if(_producto_seleccionado.tipo_venta_producto=="PorUnidad"){
										
										

										var opt=document.createElement("option");
										opt.innerHTML="Unidad";
										opt.value="unidad";
										sel.appendChild(opt);											
								}else if(_producto_seleccionado.tipo_venta_producto=="CajaBlister"){
										

										var opt=document.createElement("option");
										opt.innerHTML="Unidad";
										opt.value="unidad";
										sel.appendChild(opt);

										var opt=document.createElement("option");
										opt.innerHTML="Blister";
										opt.value="blister";
										sel.appendChild(opt);

										var opt=document.createElement("option");
										opt.innerHTML="Caja";
										opt.value="caja";
										sel.appendChild(opt);

										

										
								}
							}else{
								document.getElementById("txtCodigoProducto").style.backgroundColor="#ff9998";
								document.getElementById("txtCodigoProducto").value="";
								$("#txtCodigoProducto").focus();
							}
							
							
				
						}else{
							_producto_seleccionado=false;
							document.getElementById("txtCodigoProducto").style.backgroundColor="#ff9998";
							document.getElementById("txtCodigoProducto").value="";
							$("#txtCodigoProducto").focus();
						}	
					},"");
					//consultar_mi_bodega(this.id);
				}	
			}else{
				document.getElementById("numCantidad").value=0;
				document.getElementById("txtCodigoProducto").value="";	
				document.getElementById("h4NombreProductoInv").innerHTML="Nombre producto";	
			}

			
		
	});
	
	//AGREGAR PRODUCTO A LA VENTA
	agregarEvento("numCantidad","keypress",function(e){
		if(e.keyCode==13 && _producto_seleccionado!=false){
			console.log("precioné enter");
			if(_producto_seleccionado!=false){
				agregar_producto_mi_ticket(_producto_seleccionado);
				//	dibujar_factura(mi_ticket[_numero_ticket-1]);		
				//document.getElementById("span").scrollIntoView();	
			}else{
				document.getElementById("numCantidad").value=0;
				document.getElementById("txtCodigoProducto").value="";
				document.getElementById("h4NombreProductoInv").innerHTML="Nombre producto";		
			}
				



		}
	});
	agregarEvento("btnAgregarProducto","click",function(){
		if(_producto_seleccionado!=false){
			agregar_producto_mi_ticket(_producto_seleccionado);
			//dibujar_factura(mi_ticket[_numero_ticket-1]);	
			//document.getElementById("span").scrollIntoView();		
		}else{
			document.getElementById("numCantidad").value=0;
			document.getElementById("txtCodigoProducto").value="";
			document.getElementById("h4NombreProductoInv").innerHTML="Nombre producto";	
    	}
			

	});

	
	agregarEvento("txtMisCajeros","keypress",function(e){
		if(e.keyCode==13){
			var esta=false;
			for(var i in cajeros){
				if(cajeros[i].codigo_venta==this.value){
					esta=true;
					break;
				}
			}
			if(esta){
				e.preventDefault();

				crear_factura();		
			}else{
				mostrarMensaje("Este codigo no esta registrado ");
			}
		}
	});

	agregarEvento("h4RegistrarVenta","click",function(e){
		if(document.getElementById("txtMisCajeros").value!=""){
			var esta=false;
			for(var i in cajeros){
				if(cajeros[i].codigo_venta==document.getElementById("txtMisCajeros").value){
					esta=true;
					break;
				}
			}
			if(esta){
				e.preventDefault();

				crear_factura();		
			}else{
				mostrarMensaje("Este codigo no esta registrado ");
			}
		}else{
			mostrarMensaje("Por favor ingresa tu codigo de venta");
		}
	});
	agregarEvento(_btnConsultarFactura,"click",function(){
		var vf=obtener_valores_formulario("");
		if(vf!=false){
		
			var datos={};
			var valor_consulta="";
			consultarDatos(_URL+"/"+valor_consulta,datos,function(rs){
				console.log(rs);		
			},"formulario");
		}else{
			mostrarMensaje("Por favor ingresa valores");
		}
	});

	agregarEvento("txtPagaCon","change",function(){
		h3Cambio.value=this.value-Number(document.getElementById("h1Total").value);
		h3Cambio.innerHTML="$ "+formato_numero(this.value-Number(document.getElementById("h1Total").value),"0",",",".");
	});

	agregarEvento("liMayoreo","click",function(){
		if(confirm("¿Desea aplicar precio de mayoreo para este producto?")){
			console.log(_producto_seleccionado);
			if(_producto_seleccionado!=false){
				_producto_seleccionado.precio_mayoreo_sede=_producto_seleccionado.precio_mayoreo_sede;
			}else{
				mostrarMensaje("Por favor selecciona un producto");
			}
			
		}
	});
	agregarEvento("txtMisClientes","keypress",function(){
		if(this.value!="" && this.value!=" " && this.value!="  " && this.value.length > 3){
			consultarDatos(_URL+"clientes/"+this.value,{},function(rs){
				console.log(rs);
				if(rs.respuesta){
					crear_data_list_clientes("list_mis_clientes",rs.datos);
				}
			});
		}
	});

	agregarEvento("btnAceptarSalida","click",function(){
		var vf=obtener_valores_formulario("formSalidaContable");
		if(vf!=false){
			var datos={
				fk_id_salida_contable:vf.Select[0],
				fk_id_usuario:_usuario.id_usuario,
				fk_id_sede:_IdSede,
				valor_salida:vf.Texto[0],


			};
			registrarDato(_URL+"detalle_salida_contable",datos,function(rs){
					mostrarMensaje(rs);
			},"formSalidaContable");
		}
	});

	agregarEvento("txtBuscarProducto","keypress",function(e){
		console.log(this.value);	
					if(e.keyCode!=13){
						if(this.value!=""){
							registrarDato(_URL+"traer_productos/"+this.value+"/"+_IdSede,{},function(rs){
								if(rs.respuesta==true){
									crear_data_list_producto("list_buscar_producto",rs.datos);
								}
							});	
						}
					}else{
						if(this.value!=""){
							e.preventDefault();
							registrarDato(_URL+"traer_productos/"+this.value+"/"+_IdSede,{},function(rs){
								dibujar_producto_busqueda(rs.datos);				
							});	
						}
					}
					
	});	

	agregarEvento("selSedesFacturacion","change",function(){
		if(this.value!="0" || this.value!=undefined){
			if(document.getElementById("selSedesFacturacion").value==0){
				mostrarMensaje("Por favor selecciona una sede");
				return false;
			}
			if(document.getElementById("dtFechaFactura").value==""){
				mostrarMensaje("Por favor selecciona una fecha");
				return false;
			}

			registrarDato(_URL+"facturas_del_dia",{
				dia:document.getElementById("dtFechaFactura").value,
				sede:document.getElementById("selSedesFacturacion").value,
			},function(rs){
				if(rs.respuesta){
					crear_select_facturas("selFacturasDelDia",rs.datos);
				}else{
					mostrarMensaje(rs);
				}
				
			});
		}
	});

	agregarEvento("btnBuscarFactura","click",function(){
		if(document.getElementById("selFacturasDelDia").value!="0" && document.getElementById("selFacturasDelDia").value!= undefined){
			consultarDatos(_URL+"facturas/"+document.getElementById("selFacturasDelDia").value,{},function(rs){
				if(rs.respuesta){
					dibujar_facturas_del_dia_consultado(rs.datos);

				}

			});
		}
	});
}

function dibujar_facturas_del_dia_consultado(datos){
	var div=document.getElementById("divTablaFacturasDelDia");
	div.innerHTML="";
	var tbl=document.createElement("table");
			
			var tr=document.createElement("tr");			
			
			var td=document.createElement("td");
			td.innerHTML="CODIGO PRODUCTO"
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="NOMBRE PRODUCTO"
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="TIPO VENTA PRODUCTO"
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="EMBALAJE DE PRESENTACION"
			tr.appendChild(td);			

			var td=document.createElement("td");
			td.innerHTML="CANTIDAD VENTA FACTURA"
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="VALOR PRODUCTO  FACTURA"
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="TOTAL PRODUCTO FACTURA"
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="QUITAR"
			tr.appendChild(td);



			tbl.appendChild(tr);
			div.appendChild(tbl);	
    
	for(var d in datos){
		console.log(datos[d]);
		var k=Object.keys(datos[d].detalle_factura).length;
		for(var dd in datos[d].detalle_factura){
			var tr=document.createElement("tr");
			
			var td=document.createElement("td");
			td.innerHTML="   "+datos[d].detalle_factura[dd].codigo_producto;
			tr.appendChild(td);


			var td=document.createElement("td");
			td.innerHTML="   "+datos[d].detalle_factura[dd].nombre_producto;
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="   "+datos[d].detalle_factura[dd].tipo_venta;
			tr.appendChild(td);


			var td=document.createElement("td");
			
			if(datos[d].detalle_factura[dd].tipo_venta=="caja"){
				td.innerHTML="   "+datos[d].detalle_factura[dd].unidades_por_caja;
			}else if(datos[d].detalle_factura[dd].tipo_venta=="blister"){
				td.innerHTML="   "+datos[d].detalle_factura[dd].unidades_por_blister;
			}else{
				td.innerHTML="    1";
			}

			tr.appendChild(td);
			var td=document.createElement("td");
			td.innerHTML="                "+datos[d].detalle_factura[dd].cantidad_producto;
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="$  "+formato_numero(datos[d].detalle_factura[dd].valor_item,"0",",",".");
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="$ "+formato_numero(Number(datos[d].detalle_factura[dd].valor_item)*Number(datos[d].detalle_factura[dd].cantidad_producto),"0",",",".");
			tr.appendChild(td);

			var td=document.createElement("td");
			var inp=document.createElement("input");
			inp.setAttribute("onclick","quitar_de_factura("+datos[d].detalle_factura[dd].id_detalle+","+k+")");
			inp.setAttribute("value","Devolver");
			inp.setAttribute("type","button");
			td.appendChild(inp);
			tr.appendChild(td);
			tbl.appendChild(tr);
			div.appendChild(tbl);	
		}
		


	}
}
function quitar_de_factura(id,k){
	var ms="";
	
	
	if(Number(k)==1){
		ms="Recuerde que de eliminar este producto se eliminara esta factura";
	
	}

	if(confirm("¿Desea quitar este producto de la factura?"+ms)){
		eliminarDato(_URL+"detalle_factura/"+id,{
				
			},function(rs){
			mostrarMensaje(rs);
			if(rs.respuesta){
				var div=document.getElementById("divTablaFacturasDelDia");
				div.innerHTML="";
			}
		})
	}
}
function dibujar_producto_busqueda(datos){
	console.log(datos);

	var tbl=document.getElementById("tblBusPro");

	tbl.innerHTML="";
	for(var d in datos){
		var tr=document.createElement("tr");

		var td=document.createElement("td");
		td.innerHTML+="   "+datos[d].codigo_producto;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML+="   "+datos[d].nombre_producto;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML+="   $ "+formato_numero(datos[d].precio_venta_sede,"0",",",".");
		tr.appendChild(td);
		
		var td=document.createElement("td");
		if(datos[d].tipo_venta_producto=="CajaBlister"){
			td.innerHTML+="  $ "+formato_numero(datos[d].precio_venta_blister_sede,"0",",",".");	
		}else{
			td.innerHTML+="  N/A  ";
		}
		
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML+="   $ "+formato_numero(datos[d].precio_mayoreo_sede,"0",",",".");
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML+="   "+datos[d].cantidad_existencias;
		tr.appendChild(td);

		var td=document.createElement("td");
		if(datos[d].tipo_venta_producto=="CajaBlister"){
			td.innerHTML+="   "+datos[d].cantidad_existencias_blister;
		}else{
			td.innerHTML+="  N/A ";
		}
		
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML+="   "+datos[d].cantidad_existencias_unidades;
		tr.appendChild(td);
		tbl.appendChild(tr);
	}
}

function mostrar_venta_inicial(){
	 document.getElementById("tbCuerpoFactura").innerHTML="";
	if(obtener_local_storage("mis_tickets_"+_usuario.id_usuario+"_"+_IdSede)!=false){
		mi_ticket=obtener_local_storage("mis_tickets_"+_usuario.id_usuario+"_"+_IdSede);
		if(mi_ticket!=false){
			dibujar_factura(mi_ticket[0],0);	
			document.getElementById("span").scrollIntoView();
			var cuantos=obtener_local_storage("btn_tk_"+_usuario.id_usuario+"_"+_IdSede);
			console.log(cuantos);
			var ulTickets=document.getElementById("ulTickets");
			ulTickets.innerHTML="";
			for(var f=1; f <= cuantos;f++){
				var li=document.createElement("li");
				var inp=document.createElement("input");
				inp.setAttribute("type","button");
				inp.setAttribute("name","tk");
				inp.setAttribute("id","btn_"+(f ));
				inp.setAttribute("value","TICKET "+(f));
				inp.setAttribute("onclick","cambio_mi_ticket('"+(f )+"')");
				if(f==1){
					inp.setAttribute("style","background:#ff9998");
				}
				li.appendChild(inp);
				ulTickets.appendChild(li);

			}
		

			agregar_boton_ticket();
		}
		
	}else{

		mi_ticket.push({
			numero_ticket:_numero_ticket,
			productos:[]
		});

	}
}

//funcion para agregar producto al tikect seleccionado
function agregar_producto_mi_ticket(ps){
	// validar que el producto no exista en el ticket seleccionado 
	// y de ser asu amrle las cantidades necesarias
	console.log(ps);
	var agregar=true;
	var pos=0;

	
	console.log(document.getElementById("selTipoVentaFactura").value);

	if(document.getElementById("selTipoVentaFactura").value!="0"){
			ps.tipo_venta_tienda=document.getElementById("selTipoVentaFactura").value;
			
			if(mi_ticket.length==0){
				mi_ticket.push({
					numero_ticket:_numero_ticket,
					productos:[]
				});
			}
			if(mi_ticket.length>0){

			for(var f in mi_ticket[_numero_ticket-1].productos){
				if(mi_ticket[_numero_ticket-1].productos[f].id==ps.id){
					var tip=document.getElementsByName("tipo");
					var tipo_seleccionado;
					

					if(ps.tipo_venta_tienda==mi_ticket[_numero_ticket-1].productos[f].tipo_venta_tienda){
						agregar=false;
						pos=f;
						//console.log(tipo_seleccionado);
						//console.log(mi_ticket[_numero_ticket-1].productos[f].tipo_venta_tienda);
						break;
					}else{
						//console.log(tipo_seleccionado);
						//console.log(mi_ticket[_numero_ticket-1].productos[f].tipo_venta_tienda);
						agregar=true;
					}
					
				}
			}
			
			//console.log("agregar");
			//console.log(agregar);
			//if(agregar!=false){
				ps.cantidad_para_venta=document.getElementById("numCantidad").value;
				//console.log(ps.tipo_venta_tienda);
				//PILAS ACA
				if(ps.tipo_venta_tienda=="unidad"){
					if(ps.tipo_venta_producto=="PorUnidad"){

						
						ps.precio_producto=ps.precio_venta_sede;

					}else if(ps.tipo_venta_producto=="Caja"){

						
						ps.precio_producto=ps.precio_mayoreo_sede;
						

					}else if(ps.tipo_venta_producto=="CajaBlister"){
						ps.precio_producto=ps.precio_mayoreo_sede;
					}

				}else if(ps.tipo_venta_tienda=="caja"){
					ps.nombre_producto+=" (CAJA)";
					ps.precio_producto=ps.precio_venta_sede;
				}
				else if(ps.tipo_venta_tienda=="blister"){
					ps.nombre_producto+=" (BLISTER)";
					ps.precio_producto=ps.precio_venta_blister_sede;

				}
				mi_ticket[_numero_ticket-1].productos.push(ps);
				actualizar_unidades_reservadas(ps);
				dibujar_factura(mi_ticket[_numero_ticket-1]);
				document.getElementById("span").scrollIntoView();	
			/*}else{



				console.log("Este producto ya existe");
				console.log(document.getElementById("numCant_"+mi_ticket[_numero_ticket-1].productos[pos].id+"_"+_numero_ticket+"_"+pos));
				console.log(document.getElementById("numCant_"+mi_ticket[_numero_ticket-1].productos[pos].id+"_"+_numero_ticket+"_"+pos).value);
				console.log(_producto_seleccionado.precio_venta_sede);
				console.log(ps.tipo_venta_tienda.toUpperCase());
				//valido que el precio se el mismo
				if(ps.tipo_venta_tienda=="caja"){
						if(document.getElementById("valor_venta_"+mi_ticket[_numero_ticket-1].productos[pos].id+"_"+_numero_ticket+"_"+pos).value==ps.precio_venta_sede){
							document.getElementById("numCant_"+mi_ticket[_numero_ticket-1].productos[pos].id+"_"+_numero_ticket+"_"+pos).value=Number(mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta)+Number(document.getElementById("numCantidad").value);
						
							mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta=Number(mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta)+Number(document.getElementById("numCantidad").value);
							
							console.log(mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta);
							calcular_precio(mi_ticket[_numero_ticket-1].productos[pos].id,pos);
							document.getElementById("numCantidad").value=0;
							document.getElementById("txtCodigoProducto").value="";
							_producto_seleccionado=false;
						}else{
							//AQUI SE DA PRECIO A LAS UNIDADES
							if(confirm("Parece que el precio del producto a cambiado en la base de datos\n¿Desea actualizar este precio a la factura? ")){
								document.getElementById("numCant_"+mi_ticket[_numero_ticket-1].productos[pos].id+"_"+_numero_ticket+"_"+pos).value=Number(mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta)+Number(document.getElementById("numCantidad").value);
						
								mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta=Number(mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta)+Number(document.getElementById("numCantidad").value);
								
								console.log(mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta);
								calcular_precio(mi_ticket[_numero_ticket-1].productos[pos].id,pos);
								document.getElementById("numCantidad").value=0;
								document.getElementById("txtCodigoProducto").value="";
								mi_ticket[_numero_ticket-1].productos[pos].precio_venta_sede=ps.precio_mayoreo_sede;
								document.getElementById("valor_venta_"+mi_ticket[_numero_ticket-1].productos[pos].id+"_"+_numero_ticket+"_"+pos).value=ps.precio_mayoreo_sede;
								console.log(_producto_seleccionado.precio_venta_sede);

								console.log(document.getElementById("valor_venta_"+mi_ticket[_numero_ticket-1].productos[pos].id+"_"+_numero_ticket+"_"+pos));
								console.log(document.getElementById("valor_venta_"+mi_ticket[_numero_ticket-1].productos[pos].id+"_"+_numero_ticket+"_"+pos).value);

								_producto_seleccionado=false;
								dibujar_factura(mi_ticket[_numero_ticket-1],_numero_ticket-1);
								document.getElementById("span").scrollIntoView();
							}else{
								document.getElementById("numCant_"+mi_ticket[_numero_ticket-1].productos[pos].id+"_"+_numero_ticket+"_"+pos).value=Number(mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta)+Number(document.getElementById("numCantidad").value);
						
								mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta=Number(mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta)+Number(document.getElementById("numCantidad").value);
								
								console.log(mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta);
								calcular_precio(mi_ticket[_numero_ticket-1].productos[pos].id,pos);
								document.getElementById("numCantidad").value=0;
								document.getElementById("txtCodigoProducto").value="";
								_producto_seleccionado=false;
							}
						}	
				}else if(ps.tipo_venta_tienda=="unidad"){
						if(document.getElementById("valor_venta_"+mi_ticket[_numero_ticket-1].productos[pos].id+"_"+_numero_ticket+"_"+pos).value==ps.precio_venta_sede){
							document.getElementById("numCant_"+mi_ticket[_numero_ticket-1].productos[pos].id+"_"+_numero_ticket+"_"+pos).value=Number(mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta)+Number(document.getElementById("numCantidad").value);
						
							mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta=Number(mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta)+Number(document.getElementById("numCantidad").value);
							
							
							calcular_precio(mi_ticket[_numero_ticket-1].productos[pos].id,pos);
							document.getElementById("numCantidad").value=0;
							document.getElementById("txtCodigoProducto").value="";
							_producto_seleccionado=false;
						}else{
							if(confirm("Parece que el precio del producto a cambiado en la base de datos\n¿Desea actualizar este precio a la factura? ")){
								document.getElementById("numCant_"+mi_ticket[_numero_ticket-1].productos[pos].id+"_"+_numero_ticket+"_"+pos).value=Number(mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta)+Number(document.getElementById("numCantidad").value);
						
								mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta=Number(mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta)+Number(document.getElementById("numCantidad").value);
								
								console.log(mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta);
								calcular_precio(mi_ticket[_numero_ticket-1].productos[pos].id,pos);
								document.getElementById("numCantidad").value=0;
								document.getElementById("txtCodigoProducto").value="";
								mi_ticket[_numero_ticket-1].productos[pos].precio_mayoreo_sede=_producto_seleccionado.precio_venta_sede;
								document.getElementById("valor_venta_"+mi_ticket[_numero_ticket-1].productos[pos].id+"_"+_numero_ticket+"_"+pos).value=ps.precio_mayoreo_sede;
								_producto_seleccionado=false;
								dibujar_factura(mi_ticket[_numero_ticket-1],_numero_ticket-1);
								document.getElementById("span").scrollIntoView();
							}else{
								document.getElementById("numCant_"+mi_ticket[_numero_ticket-1].productos[pos].id+"_"+_numero_ticket+"_"+pos).value=Number(mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta)+Number(document.getElementById("numCantidad").value);
						
								mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta=Number(mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta)+Number(document.getElementById("numCantidad").value);
								
								
								calcular_precio(mi_ticket[_numero_ticket-1].productos[pos].id,pos);
								document.getElementById("numCantidad").value=0;
								document.getElementById("txtCodigoProducto").value="";
								_producto_seleccionado=false;
							}
						}
				}else if(ps.tipo_venta_tienda=="blister"){
					if(document.getElementById("valor_venta_"+mi_ticket[_numero_ticket-1].productos[pos].id+"_"+_numero_ticket+"_"+pos).value==ps.precio_venta_blister_sede){
							document.getElementById("numCant_"+mi_ticket[_numero_ticket-1].productos[pos].id+"_"+_numero_ticket+"_"+pos).value=Number(mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta)+Number(document.getElementById("numCantidad").value);
						
							mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta=Number(mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta)+Number(document.getElementById("numCantidad").value);
							
							
							calcular_precio(mi_ticket[_numero_ticket-1].productos[pos].id,pos);
							document.getElementById("numCantidad").value=0;
							document.getElementById("txtCodigoProducto").value="";
							_producto_seleccionado=false;
						}else{
							if(confirm("Parece que el precio del producto a cambiado en la base de datos\n¿Desea actualizar este precio a la factura? ")){
								document.getElementById("numCant_"+mi_ticket[_numero_ticket-1].productos[pos].id+"_"+_numero_ticket+"_"+pos).value=Number(mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta)+Number(document.getElementById("numCantidad").value);
						
								mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta=Number(mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta)+Number(document.getElementById("numCantidad").value);
								
								console.log(mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta);
								calcular_precio(mi_ticket[_numero_ticket-1].productos[pos].id,pos);
								document.getElementById("numCantidad").value=0;
								document.getElementById("txtCodigoProducto").value="";
								mi_ticket[_numero_ticket-1].productos[pos].precio_mayoreo_sede=_producto_seleccionado.precio_venta_blister_sede;
								document.getElementById("valor_venta_"+mi_ticket[_numero_ticket-1].productos[pos].id+"_"+_numero_ticket+"_"+pos).value=ps.precio_mayoreo_sede;
								_producto_seleccionado=false;
								dibujar_factura(mi_ticket[_numero_ticket-1],_numero_ticket-1);
								document.getElementById("span").scrollIntoView();
							}else{
								document.getElementById("numCant_"+mi_ticket[_numero_ticket-1].productos[pos].id+"_"+_numero_ticket+"_"+pos).value=Number(mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta)+Number(document.getElementById("numCantidad").value);
						
								mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta=Number(mi_ticket[_numero_ticket-1].productos[pos].cantidad_para_venta)+Number(document.getElementById("numCantidad").value);
								
								
								calcular_precio(mi_ticket[_numero_ticket-1].productos[pos].id,pos);
								document.getElementById("numCantidad").value=0;
								document.getElementById("txtCodigoProducto").value="";
								_producto_seleccionado=false;
							}
						}

				}
				

			}*/
			//document.getElementById("uni/caja").style.display='none';
			//document.getElementById("caja/blister").style.display='none';
			//document.getElementsByName("tipo")[0].checked=true;
			document.getElementById("selTipoVentaFactura").selectedIndex=0;
			document.getElementById("numCantidad").value=0;
			document.getElementById("txtCodigoProducto").style.backgroundColor='';
			document.getElementById("h4NombreProductoInv").innerHTML="Nombre producto";	
			$("#txtCodigoProducto").focus();
			agregar_local_storage("mis_tickets_"+_usuario.id_usuario+"_"+_IdSede,mi_ticket);
		}else{
			mi_ticket.push({
				numero_ticket:_numero_ticket,
				productos:[]
			});
		}
	}else{
		mostrarMensaje("Por favor selecciona un tipo de venta para el producto");
	}
	
	$("#txtCodigoProducto").focus();	

}




function quitar(id,pos){
	if(confirm("¿Desea quitar este producto?")){
		var fila = document.getElementById("fila_"+id+"_"+_numero_ticket+"_"+pos);
		console.log(fila);
		fila.parentNode.removeChild(fila);
		for(var f in mi_ticket[_numero_ticket-1].productos){
			if(mi_ticket[_numero_ticket-1].productos[f].id==id){
				actualizar_unidades_reservadas(mi_ticket[_numero_ticket-1].productos[f]);
				mi_ticket[_numero_ticket-1].productos.splice(f,1);

			}
		}

		dibujar_factura(mi_ticket[_numero_ticket-1],_numero_ticket-1);
		agregar_local_storage("mis_tickets_"+_usuario.id_usuario+"_"+_IdSede,mi_ticket);
	 	calcular_total(mi_ticket[_numero_ticket-1]);
	 	$("#txtCodigoProducto").focus();	
	}
	
}

function calcular_total(fac){

	if(fac!=undefined){
		var h1Total=document.getElementById("h1Total");
		var h1Total2=document.getElementById("h1Total2");
		var txtTotal=document.getElementById("txtValorReal");
		var total=0;
		var cuantos_prodcutos=0;
		for(var f in fac.productos){
			total+=Number(fac.productos[f].precio_producto)*Number(fac.productos[f].cantidad_para_venta);
			cuantos_prodcutos+=Number(fac.productos[f].cantidad_para_venta);
		}
		console.log(total);
		h1Total.innerHTML="$ "+formato_numero(total,"0",",",".");
		h1Total.value=total;
		h1Total2.innerHTML="$ "+formato_numero(total,"0",",",".");
		h1Total2.value=total;
		txtTotal.value=formato_numero(total,"0","","");
		document.getElementById("h3CuantosProductosTotal").innerHTML=Number(cuantos_prodcutos);
	}
}
function cambio_mi_ticket(num_tk){
	console.log("voy a cambiar de ticket");
	var mis_botones=document.getElementsByName("tk");
	for(var m in mis_botones){
			
		if(mis_botones[m].type=="button"){
			console.log(mis_botones[m].type);
			console.log(mis_botones[m].id);
			console.log(num_tk);
			if(mis_botones[m].id=="btn_"+num_tk){
		
				mis_botones[m].style.background="#ff9998";
			}else if(mis_botones[m].style!=undefined){
				mis_botones[m].style.background="";
			}	
		}
		
	}
	_numero_ticket=Number(num_tk);
	dibujar_factura(mi_ticket[num_tk-1],num_tk);	
	document.getElementById("span").scrollIntoView();
	calcular_total(mi_ticket[num_tk-1]);		
} 
function agregar_boton_ticket(num){

		console.log(num);
		var ulTickets=document.getElementById("ulTickets");
		ulTickets.innerHTML="";
		var cuantos=obtener_local_storage("btn_tk_"+_usuario.id_usuario+"_"+_IdSede);
		if(cuantos<1){
			cuantos=1;
		}
		
		var ulTickets=document.getElementById("ulTickets");
		if(num!=undefined){
			cuantos=cuantos+1;
		}
		console.log(cuantos);
		for (var i = 1;i<=cuantos;i++) {
			var li=document.createElement("li");
			var inp=document.createElement("input");
			inp.setAttribute("type","button");
			inp.setAttribute("name","tk");
			inp.setAttribute("style","float:left");
			inp.setAttribute("id","btn_"+(i));
			inp.setAttribute("value","TICKET "+(i ));
			inp.setAttribute("onclick","cambio_mi_ticket('"+(i )+"')");
			li.appendChild(inp);
			ulTickets.appendChild(li);
	
		}
		agregar_local_storage("btn_tk_"+_usuario.id_usuario+"_"+_IdSede,cuantos);
		

		if(num==undefined){
			//
					var i=1;
					for(var e in mi_ticket){
						console.log(mi_ticket[e]);
						mi_ticket[e].numero_ticket=i;
						i++;
					}

			

		}else{
			//es un nuevo objeto
			mi_ticket.push({
				numero_ticket:_numero_ticket+1,
				productos:[]
			});
					

		}
		console.log(cuantos);
		console.log("un nuevo boton agregado");
		agregar_local_storage("btn_tk_"+_usuario.id_usuario+"_"+_IdSede,cuantos);
		agregar_local_storage("mis_tickets_"+_usuario.id_usuario+"_"+_IdSede,mi_ticket);
}
function eliminar_ticket(num){
	if(confirm("¿Desea eliminar este ticket?")){
		var btn=document.getElementById("btn_"+num);
		btn.parentNode.removeChild(btn);
		console.log(num);
		for(var f in mi_ticket[num].productos){
			actualizar_unidades_reservadas(mi_ticket[num].productos[f]);
		}
		mi_ticket.splice((Number(num)-1),1);
		
		console.log(mi_ticket);
		console.log(Number(obtener_local_storage("btn_tk_"+_usuario.id_usuario+"_"+_IdSede)-1));

		agregar_local_storage("btn_tk_"+_usuario.id_usuario+"_"+_IdSede,obtener_local_storage("btn_tk_"+_usuario.id_usuario+"_"+_IdSede)-1);
		agregar_local_storage("mis_tickets_"+_usuario.id_usuario+"_"+_IdSede,mi_ticket);
		document.getElementById("tbCuerpoFactura").innerHTML="";
		agregar_boton_ticket();	
	}
	
}

var registro_factura=true;
function crear_factura(){
	
	if(registro_factura){	
		registro_factura=false;	
		if(mi_ticket[_numero_ticket-1]!=undefined){
			if(mi_ticket[_numero_ticket-1].productos.length>0){

				var tipo_venta=document.getElementsByName("tipo_venta");
				var tv;
				for(var t in tipo_venta){
					if(tipo_venta[t].checked==true){
						tv=tipo_venta[t].value;
					}
				}
				
				var registrar_fac=true;
				if(tv=="endeuda" && document.getElementById("txtMisClientes").value==""){
					registrar_fac=false;
				}

				if(registrar_fac){
					var num=horaCliente();
				var id_ven;
				if(document.getElementById("txtMisCajeros").value==""){
					id_ven=_usuario.codigo_venta;
				}else{
					id_ven=document.getElementById("txtMisCajeros").value;
				}
				var cli=_id_cliente;
				if(document.getElementById("txtMisClientes").value!=""){
					cli=document.getElementById("txtMisClientes").value.split("-")[1];
				}
				var datos={
					fk_id_vendedor:id_ven,
					id_usuario:_usuario.id_usuario,
					numero_factura:horaCliente().split(" ")[0].split("-")[0].substr(2)+horaCliente().split(" ")[0].split("-")[1]+horaCliente().split(" ")[0].split("-")[2]+"-"+horaCliente().split(" ")[1].split(":")[0]+horaCliente().split(" ")[1].split(":")[1]+horaCliente().split(" ")[1].split(":")[2]+"-"+_IdSede,
					fk_id_cliente:cli,
					estado_factura:"",
					fk_id_sede:_IdSede,
					observaciones:"",
					detalle_factura:mi_ticket[_numero_ticket-1],
					estado_factura:tv,
					valor_cobrado:document.getElementById("txtValorReal").value,

				};

				
						registrarDato(_URL+"facturas",datos,function(rs){
								console.log(rs);
								mostrarMensaje(rs);
								console.log(mi_ticket[_numero_ticket-1]);
								
								mi_ticket.splice(_numero_ticket-1,1);											
								
								console.log(mi_ticket);
								var tk=obtener_local_storage("btn_tk_"+_usuario.id_usuario+"_"+_IdSede);
								console.log(tk);
								agregar_local_storage("mis_tickets_"+_usuario.id_usuario+"_"+_IdSede,mi_ticket);
								agregar_local_storage("btn_tk_"+_usuario.id_usuario+"_"+_IdSede,Number(tk)-1);	
								agregar_boton_ticket();
								document.getElementById("tbCuerpoFactura").innerHTML="";
								document.getElementById("h1Total").innerHTML="$0.00";
								document.getElementById("h1Total2").innerHTML="$0.00";
								document.getElementById("h3Cambio").innerHTML="$0.00";
								document.getElementById("txtPagaCon").value="";
								document.getElementById("txtMisCajeros").value="";
								document.getElementById("txtMisClientes").value="";
								document.getElementById("tv_efe").checked=true;
								document.getElementById("txtValorReal").value="";
								document.getElementById("h3CuantosProductos").innerHTML="0";
								document.getElementById("h3CuantosProductosTotal").innerHTML="0";
								$("#txtCodigoProducto").focus();
								/*var sel=document.getElementById("selTipoVentaFactura");
								sel.innerHTML="";
								var o =document.createElement("option");
								o.innerHTML="Selecciona el tipo de venta";
								o.value="0";
								sel.appendChild(o);*/
								registro_factura=true;
								//iniciar_bodega_offline();

							},"formulario",function(jqXHR, textStatus, errorThrown){
							
							console.log("que hago si hay un error para la factura");
							registro_factura=true;
							

						});

				}else{
					mostrarMensaje("Por favor ingresa el numero de cedula del cliente");
					registro_factura=true;
				}

			
			}else{
				mostrarMensaje("Debes ingresar productos para registrar el ticket");
				registro_factura=true;
			}

		}else{
			mostrarMensaje("Debes ingresar productos para registrar el ticket");	
			registro_factura=true;
		}
	}else{
		mostrarMensaje("Registrando factura ...");
	}
		
}
function cambio_tipo_venta(tipo){
	console.log(_producto_seleccionado);
	if(tipo=="caja"){
			//document.getElementById("numCantidad").value=_producto_seleccionado.unidades_por_caja;
			document.getElementById("numCantidad").value=1;	
			_producto_seleccionado.tipo_venta_tienda="caja";

	}else if(tipo=="unidad"){
		_producto_seleccionado.tipo_venta_tienda="unidad";
		_producto_seleccionado.precio_producto=_producto_seleccionado.precio_mayoreo_sede;
		document.getElementById("numCantidad").value=1;
		_producto_seleccionado.cantidad_existencias=_producto_seleccionado.cantidad_existencias_unidades;

	}else if(tipo="blister"){
		_producto_seleccionado.tipo_venta_tienda="blister";
		_producto_seleccionado.precio_producto=_producto_seleccionado.precio_venta_blister_sede;
		document.getElementById("numCantidad").value=1;
		_producto_seleccionado.cantidad_existencias=_producto_seleccionado.cantidad_existencias_blister;

		
	}
}

//funcion para calcular el valor de una fila
function calcular_precio(id,pos){
	var cant=document.getElementById("numCant_"+id+"_"+_numero_ticket+"_"+pos);
	var i=Number(pos);
	if(cant!=null){
		console.log(cant);
		console.log(cant.value);
		console.log("numCant_"+id+"_"+_numero_ticket+"_"+pos);
		var prec=0;
		var valor_venta=document.getElementById("valor_venta_"+id+"_"+_numero_ticket+"_"+pos);
		var pre=document.getElementById("precio_"+id+"_"+_numero_ticket+"_"+pos);
		
		
		console.log(Number(cant.value));
		console.log(Number(valor_venta.value));
		//calculo el precio 
		var ps=mi_ticket[_numero_ticket-1].productos[i];
		console.log(ps);
		if((ps.promocion=="1" && ps.tipo_venta_promo=="unidad") && 
				(Number(cant.value)>=ps.promo_desde) && 
					(Number(cant.value)<=ps.promo_hasta)){
			
				valor_venta.value=ps.precio_promo_venta;
				valor_venta.innerHTML="$ "+formato_numero(ps.precio_promo_venta,"0",",",".");

		}else{
				valor_venta.value=ps.precio_producto;
				valor_venta.innerHTML="$ "+formato_numero(ps.precio_producto,"0",",",".");
		}

		
		
		//for(var i in mi_ticket[_numero_ticket-1].productos){
			
					if(mi_ticket[_numero_ticket-1].productos[i].id==id){
						console.log(mi_ticket[_numero_ticket-1].productos[i].cantidad_existencias<=cant.value);
						

							
						
						if(cambiar_cantidad(i,cant)==true){
							prec=Number(cant.value) * Number(valor_venta.value);
							pre.innerHTML="$ "+formato_numero(prec,"0",",",".");
							pre.value=prec;
							actualizar_unidades_reservadas(mi_ticket[_numero_ticket-1].productos[i]);
							calcular_total(mi_ticket[_numero_ticket-1]);
							agregar_local_storage("mis_tickets_"+_usuario.id_usuario+"_"+_IdSede,mi_ticket);	
						}else{
							document.getElementById("numCant_"+id+"_"+_numero_ticket+"_"+pos).value=mi_ticket[_numero_ticket-1].productos[i].cantidad_para_venta;
							console.log("Ha dicidico no pedir producto");
							
						}
						
						
						
					}else{
							console.log(mi_ticket[_numero_ticket-1].productos[i].id);
							console.log(id);
					}
		//}

	}

	
}

function cambiar_cantidad(i,cant){


	switch(mi_ticket[_numero_ticket-1].productos[i].tipo_venta_tienda){
		case "unidad":
				if(mi_ticket[_numero_ticket-1].productos[i].tipo_venta_producto=="PorUnidad"){
					if(Number(mi_ticket[_numero_ticket-1].productos[i].cantidad_existencias_unidades)<Number(cant.value)){
						//if(!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")){
							alert("Esta solicitando una cantidad superior a la existente, no puede realizar esta operacion ");
							console.log("cambio unidades false");
							//cant.value=mi_ticket[_numero_ticket-1].productos[i].cantidad_para_venta;
								return false;
						//}
						//console.log("cambio unidades true");
						//mi_ticket[_numero_ticket-1].productos[i].cantidad_para_venta=cant.value;

						//return true;
					}else{
						console.log("cambio unidades true");
						mi_ticket[_numero_ticket-1].productos[i].cantidad_para_venta=cant.value;
						return true;
					}
				}else if(mi_ticket[_numero_ticket-1].productos[i].tipo_venta_producto=="Caja"){
					if(Number(mi_ticket[_numero_ticket-1].productos[i].cantidad_existencias_unidades)<Number(cant.value)){
						//if(!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")){
							alert("Esta solicitando una cantidad superior a la existente, no puede realizar esta operacion ");
							console.log("cambio unidades false");
								return false;
						//}
						//console.log("cambio unidades true");
						//mi_ticket[_numero_ticket-1].productos[i].cantidad_para_venta=cant.value;

						//return true;
					}else{
						console.log("cambio unidades true");
						mi_ticket[_numero_ticket-1].productos[i].cantidad_para_venta=cant.value;
						return true;
					}
				}else if(mi_ticket[_numero_ticket-1].productos[i].tipo_venta_producto=="CajaBlister"){
					if(Number(mi_ticket[_numero_ticket-1].productos[i].cantidad_existencias_unidades)<Number(cant.value)){
						//if(!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")){
							alert("Esta solicitando una cantidad superior a la existente, no puede realizar esta operacion ");
							console.log("cambio unidades false");
								return false;
						//}
						//console.log("cambio unidades true");
						//mi_ticket[_numero_ticket-1].productos[i].cantidad_para_venta=cant.value;

						//return true;
					}else{
						console.log("cambio unidades true");
						mi_ticket[_numero_ticket-1].productos[i].cantidad_para_venta=cant.value;
						return true;
					}
				}
			
			break;
		case "caja":
				 	if(Number(mi_ticket[_numero_ticket-1].productos[i].cantidad_existencias)<Number(cant.value)){
						//if(!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")){
							alert("Esta solicitando una cantidad superior a la existente, no puede realizar esta operacion ");
							console.log("cambio unidades false");
								return false;
						//}
						//console.log("cambio unidades true");
						//mi_ticket[_numero_ticket-1].productos[i].cantidad_para_venta=cant.value;

						//return true;
					}else{
						console.log("cambio unidades true");
						mi_ticket[_numero_ticket-1].productos[i].cantidad_para_venta=cant.value;
						return true;
					}
			break;	
		case "blister":
					if(Number(mi_ticket[_numero_ticket-1].productos[i].cantidad_existencias_blister)<Number(cant.value)){
						//if(!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")){
						    alert("Esta solicitando una cantidad superior a la existente, no puede realizar esta operacion ");
							console.log("cambio unidades false");
								return false;
						//}
						//console.log("cambio unidades true");
						//mi_ticket[_numero_ticket-1].productos[i].cantidad_para_venta=cant.value;

						//return true;
					}else{
						console.log("cambio unidades true");
						mi_ticket[_numero_ticket-1].productos[i].cantidad_para_venta=cant.value;
						return true;
					}
			break;	
	}
	
}


function cambiar_tipo_venta(id,numero_ticket,posicion){
	console.log(document.getElementById("selCambioUnidad_"+id+"_"+numero_ticket+"_"+posicion).value);
	console.log(id);
	console.log(numero_ticket);
	console.log(posicion);
	console.log(mi_ticket[numero_ticket-1].productos[posicion]);
	var antes=mi_ticket[numero_ticket-1].productos[posicion].tipo_venta_tienda;
	switch(antes){
		case "unidad":
			antes=0;
			break;
		case "blister":
			antes=1;
			break;
		case "caja":
			antes=2;
			break;		
	}
	if(mi_ticket[numero_ticket-1].productos[posicion]!=undefined){

		
		
		if(mi_ticket[numero_ticket-1].productos[posicion].tipo_venta_tienda=="unidad"){

						if(mi_ticket[numero_ticket-1].productos[posicion].tipo_venta_producto=="PorUnidad"){
							mi_ticket[numero_ticket-1].productos[posicion].tipo_venta_tienda=document.getElementById("selCambioUnidad_"+id+"_"+numero_ticket+"_"+posicion).value;
							
							mi_ticket[numero_ticket-1].productos[posicion].precio_producto=mi_ticket[numero_ticket-1].productos[posicion].precio_venta_sede;

						}else if(mi_ticket[numero_ticket-1].productos[posicion].tipo_venta_producto=="Caja"){

							if(mi_ticket[numero_ticket-1].productos[posicion].cantidad_existencias >  mi_ticket[numero_ticket-1].productos[posicion].cantidad_para_venta){
								mi_ticket[numero_ticket-1].productos[posicion].tipo_venta_tienda=document.getElementById("selCambioUnidad_"+id+"_"+numero_ticket+"_"+posicion).value;
								mi_ticket[numero_ticket-1].productos[posicion].precio_producto=mi_ticket[numero_ticket-1].productos[posicion].precio_mayoreo_sede;
							}else{
								alert("No hay suficientes unidades para realizar la venta");

								document.getElementById("selCambioUnidad_"+id+"_"+numero_ticket+"_"+posicion).selectedIndex=antes;
								
								return false;
							}
							
							

						}else if(mi_ticket[numero_ticket-1].productos[posicion].tipo_venta_producto=="CajaBlister"){
							
							if(mi_ticket[numero_ticket-1].productos[posicion].cantidad_existencias_blister >  mi_ticket[numero_ticket-1].productos[posicion].cantidad_para_venta){
								mi_ticket[numero_ticket-1].productos[posicion].tipo_venta_tienda=document.getElementById("selCambioUnidad_"+id+"_"+numero_ticket+"_"+posicion).value;
								mi_ticket[numero_ticket-1].productos[posicion].precio_producto=mi_ticket[numero_ticket-1].productos[posicion].precio_mayoreo_sede;
							}else{
								alert("No hay suficientes unidades para realizar la venta");

								document.getElementById("selCambioUnidad_"+id+"_"+numero_ticket+"_"+posicion).selectedIndex=antes;
								
								return false;
							}
						}

		}else if(mi_ticket[numero_ticket-1].productos[posicion].tipo_venta_tienda=="caja"){
						
						if(mi_ticket[numero_ticket-1].productos[posicion].cantidad_existencias > mi_ticket[numero_ticket-1].productos[posicion].cantidad_para_venta){
							mi_ticket[numero_ticket-1].productos[posicion].tipo_venta_tienda=document.getElementById("selCambioUnidad_"+id+"_"+numero_ticket+"_"+posicion).value;
							mi_ticket[numero_ticket-1].productos[posicion].nombre_producto+=" (CAJA)";
							mi_ticket[numero_ticket-1].productos[posicion].precio_producto=mi_ticket[numero_ticket-1].productos[posicion].precio_venta_sede;
						}else{
							alert("No hay suficientes unidades para realizar la venta");

							document.getElementById("selCambioUnidad_"+id+"_"+numero_ticket+"_"+posicion).selectedIndex=antes;
						}
		}else if(mi_ticket[numero_ticket-1].productos[posicion].tipo_venta_tienda=="blister"){
						
						if(mi_ticket[numero_ticket-1].productos[posicion].cantidad_existencias > mi_ticket[numero_ticket-1].productos[posicion].cantidad_para_venta){
							mi_ticket[numero_ticket-1].productos[posicion].tipo_venta_tienda=document.getElementById("selCambioUnidad_"+id+"_"+numero_ticket+"_"+posicion).value;
							mi_ticket[numero_ticket-1].productos[posicion].nombre_producto+=" (BLISTER)";
							mi_ticket[numero_ticket-1].productos[posicion].precio_producto=mi_ticket[numero_ticket-1].productos[posicion].precio_venta_blister_sede;
						}else{
							alert("No hay suficientes unidades para realizar la venta");

							document.getElementById("selCambioUnidad_"+id+"_"+numero_ticket+"_"+posicion).selectedIndex=antes;
						}

		}

		agregar_local_storage("mis_tickets_"+_usuario.id_usuario+"_"+_IdSede,mi_ticket);			
		//calcular_precio(id,posicion);
		
		dibujar_factura(mi_ticket[_numero_ticket-1],_numero_ticket-1);
	}
}
function actualizar_unidades_reservadas(producto){
	registrarDato(_URL+"tikect",producto,function(rs){

	});
}
//fac=>datos de los productos
//tk=>numero de ticket
function dibujar_factura(fac,tk){
	console.log("function dibujar_factura");
	console.log(fac);
	
		var vf=obtener_valores_formulario("formVentaProductos");
		var tbCuerpoFactura=document.getElementById("tbCuerpoFactura");
		tbCuerpoFactura.innerHTML="";
		var numCantidad=document.getElementById("numCantidad");
		
		tbCuerpoFactura.innerHTML="";
	if(_producto_seleccionado!=false){
			
			var fila_head=document.createElement("tr");
			
			var td=document.createElement("td");
			td.innerHTML="#";
			fila_head.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="";
			fila_head.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="Codigo de barras";
			fila_head.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="Descripcion del producto";
			fila_head.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="Tipo venta";
			fila_head.appendChild(td);			

			var td=document.createElement("td");
			td.innerHTML="Precio Venta";
			fila_head.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="Cantidad";
			fila_head.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="Costo";
			fila_head.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="Existencias";
			fila_head.appendChild(td);
			
			tbCuerpoFactura.appendChild(fila_head);

			
			if(fac!=undefined){
				var indice=1;
				var fin=Object.keys(fac.productos).length;
				for(var i in fac.productos){



						if(fac.tipo_venta_tienda=="unidad"){
							
							if(Number(fac.productos[i].cantidad_existencias_unidades)<=Number(fac.productos[i].cantidad_para_venta)){
								if(!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")){
									break;
								}
							}	
						}else if(fac.tipo_venta_tienda=="caja"){
							if(Number(fac.productos[i].cantidad_existencias)<=Number(fac.productos[i].cantidad_para_venta)){
								if(!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")){
									break;
								}
							}	
						}else if(fac.tipo_venta_tienda=="blister"){
							if(Number(fac.productos[i].cantidad_existencias_blister)<=Number(fac.productos[i].cantidad_para_venta)){
								if(!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")){
									break;
								}
							}	
						}
						


						var fila=document.createElement("tr");
						fila.setAttribute("id","fila_"+fac.productos[i].id+"_"+_numero_ticket+"_"+i);	

						var td=document.createElement("td");
						td.innerHTML=indice++;						
						fila.appendChild(td);

						var td=document.createElement("td");
						td.innerHTML="X";
						td.setAttribute("onclick","quitar("+fac.productos[i].id+","+i+")");
						fila.appendChild(td);

						var td=document.createElement("td");
						td.innerHTML=fac.productos[i].codigo_producto;
						fila.appendChild(td);
						

						
						var td=document.createElement("td");
						var defi_uni="";
						console.log(fac.productos[i].tipo_venta_tienda);
						if(fac.productos[i].tipo_venta_tienda=="unidad"){
							if(fac.productos[i].tipo_venta_producto=="PorUnidad"){
								defi_uni="  X "+"1"+" Uni";
							}else if(fac.productos[i].tipo_venta_producto=="Caja"){
								defi_uni="  X "+"1"+" Uni";

							}else if(fac.productos[i].tipo_venta_producto=="CajaBlister"){
								defi_uni="  X "+"1"+" Uni";										
							}
						}else if(fac.productos[i].tipo_venta_tienda=="caja"){
							if(fac.productos[i].tipo_venta_producto=="Caja"){
								defi_uni="  X "+fac.productos[i].unidades_por_caja+" Uni";										
							}else if(fac.productos[i].tipo_venta_producto=="CajaBlister"){
								defi_uni="  X "+fac.productos[i].unidades_por_caja+" Uni";										
							}
						}else if(fac.productos[i].tipo_venta_tienda=="blister"){
							defi_uni="  X "+fac.productos[i].unidades_por_blister+" Uni";
						}
						
						td.innerHTML=fac.productos[i].nombre_producto+" "+defi_uni;
						fila.appendChild(td);

						//SELECT PARA EL IPO DE VENTA
						var td=document.createElement("td");
						var sel=document.createElement("select");
						sel.setAttribute("id","selCambioUnidad_"+fac.productos[i].id+"_"+_numero_ticket+"_"+i);
						sel.setAttribute("onchange","cambiar_tipo_venta("+fac.productos[i].id+","+_numero_ticket+","+i+")");

						var op=document.createElement("option");
						op.innerHTML="unidad";
						op.value="unidad";
						if(fac.productos[i].tipo_venta_tienda=="unidad"){
							op.setAttribute("selected",true);
						}
						sel.appendChild(op);

						var op=document.createElement("option");
						op.innerHTML="blister";
						op.value="blister";
						if(fac.productos[i].tipo_venta_tienda=="blister"){
							op.setAttribute("selected",true);
						}
						sel.appendChild(op);

						var op=document.createElement("option");
						op.innerHTML="caja";
						op.value="caja";
						if(fac.productos[i].tipo_venta_tienda=="caja"){
							op.setAttribute("selected",true);
						}
						sel.appendChild(op);
						td.appendChild(sel);						
						fila.appendChild(td);
						//FIN SELECT PARA EL IPO DE VENTA						

						var td=document.createElement("td");
						td.setAttribute("id","valor_venta_"+fac.productos[i].id+"_"+_numero_ticket+"_"+i);
						td.value=fac.productos[i].precio_producto;
						td.innerHTML="$ "+formato_numero(fac.productos[i].precio_producto,"0",",",".");
						fila.appendChild(td);

						var td=document.createElement("td");
						var ipn=document.createElement("input");
						ipn.setAttribute("type","number");
						ipn.setAttribute("id","numCant_"+fac.productos[i].id+"_"+_numero_ticket+"_"+i);
						console.log("cantidad_para_venta");
						console.log(fac.productos[i].cantidad_para_venta);
						
							
						ipn.setAttribute("value",(Number(fac.productos[i].cantidad_para_venta)));
								
					
							
						
						
						//ipn.setAttribute("onkeypress","calcular_precio("+fac.productos[i].id+","+i+")");
						ipn.setAttribute("onchange","calcular_precio("+fac.productos[i].id+","+i+")");
						ipn.setAttribute("onclick","calcular_precio("+fac.productos[i].id+","+i+")");
						
				  		td.appendChild(ipn);
						
						fila.appendChild(td);

						var precio=fac.productos[i].precio_producto;
						if((fac.productos[i].promocion=="1" && fac.productos[i].tipo_venta_promo=="unidad") && (Number(fac.productos[i].cantidad_para_venta)>=fac.productos[i].promo_desde) && (Number(fac.productos[i].cantidad_para_venta)<=fac.productos[i].promo_hasta)){
							//aplico promocion
								precio=fac.productos[i].precio_promo_venta;
								
						}

						var td=document.createElement("td");

						td.value=Number(precio)*Number(fac.productos[i].cantidad_para_venta);
						td.setAttribute("id","precio_"+fac.productos[i].id+"_"+_numero_ticket+"_"+i);
						td.innerHTML="$ "+formato_numero(Number(precio)*Number(fac.productos[i].cantidad_para_venta),"0",",",".");
						fila.appendChild(td);

						var td=document.createElement("td");
						if(fac.productos[i].tipo_venta_tienda=="unidad"){
							td.innerHTML=fac.productos[i].cantidad_existencias_unidades;
						}else if(fac.productos[i].tipo_venta_tienda=="blister"){
							td.innerHTML=fac.productos[i].cantidad_existencias_blister;
						}else{
							td.innerHTML=fac.productos[i].cantidad_existencias;
						}
						
						fila.appendChild(td);

						tbCuerpoFactura.appendChild(fila);
						fac.productos[i].precio_producto_total=Number(fac.productos[i].precio_producto)*Number(fac.productos[i].cantidad_para_venta);

						if(fin==i){
							fila.setAttribute("style","background:blue");														
						}


				}
					calcular_total(mi_ticket[_numero_ticket-1]);
				

				document.getElementById("numCantidad").value=0;
				document.getElementById("h4NombreProductoInv").innerHTML="Nombre producto";
				document.getElementById("txtCodigoProducto").value="";

				document.getElementById("h3CuantosProductos").innerHTML=mi_ticket[_numero_ticket-1].productos.length;



			}
		_producto_seleccionado=false;
	}
	/*else if(tk!=undefined){
			var fila_head=document.createElement("tr");
			fila_head.classname="tblTituloTabla1";
			
			var td=document.createElement("td");
			td.innerHTML="#";
			fila_head.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="";
			fila_head.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="Codigo de barras";
			fila_head.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="Descripcion del producto";
			fila_head.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="Tipo de venta";
			fila_head.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="Precio Venta";
			fila_head.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="Cantidad";
			fila_head.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="Costo";
			fila_head.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="Existencias";
			fila_head.appendChild(td);
			
			tbCuerpoFactura.appendChild(fila_head);

			if(fac!=undefined){
				var indice=1;
				var fin=Object.keys(fac.productos).length;
				for(var i in fac.productos){

						if(fac.tipo_venta_tienda=="unidad"){
							
							if(Number(fac.productos[i].cantidad_existencias_unidades)<=Number(fac.productos[i].cantidad_para_venta)){
								if(!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")){
									break;
								}
							}	
						}else if(fac.tipo_venta_tienda=="caja"){
							if(Number(fac.productos[i].cantidad_existencias)<=Number(fac.productos[i].cantidad_para_venta)){
								if(!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")){
									break;
								}
							}	
						}else if(fac.tipo_venta_tienda=="blister"){
							if(Number(fac.productos[i].cantidad_existencias_blister)<=Number(fac.productos[i].cantidad_para_venta)){
								if(!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")){
									break;
								}
							}	
						}


						var fila=document.createElement("tr");
						fila.setAttribute("id","fila_"+fac.productos[i].id+"_"+_numero_ticket+"_"+i);	

						var td=document.createElement("td");
						td.innerHTML=indice++;						
						fila.appendChild(td);

						var td=document.createElement("td");
						td.innerHTML="X";
						td.setAttribute("onclick","quitar("+fac.productos[i].id+","+i+")");
						fila.appendChild(td);

						var td=document.createElement("td");
						td.innerHTML=fac.productos[i].codigo_producto;
						fila.appendChild(td);
						
						var td=document.createElement("td");
						var defi_uni="";
						console.log(fac.productos[i].tipo_venta_producto);
						if(fac.productos[i].tipo_venta_tienda=="unidad"){
							if(fac.productos[i].tipo_venta_producto=="PorUnidad"){
								defi_uni="  X "+"1"+" Uni";
							}else if(fac.productos[i].tipo_venta_producto=="Caja"){
								defi_uni="  X "+"1"+" Uni";

							}else if(fac.productos[i].tipo_venta_producto=="CajaBlister"){
								defi_uni="  X "+"1"+" Uni";										
							}
						}else if(fac.productos[i].tipo_venta_tienda=="caja"){
							if(fac.productos[i].tipo_venta_producto=="Caja"){
								defi_uni="  X "+fac.productos[i].unidades_por_caja+" Uni";										
							}else if(fac.productos[i].tipo_venta_producto=="CajaBlister"){
								defi_uni="  X "+fac.productos[i].unidades_por_caja+" Uni";										
							}
						}else if(fac.productos[i].tipo_venta_tienda=="blister"){
							defi_uni="  X "+fac.productos[i].unidades_por_blister+" Uni";
						}
						td.innerHTML=fac.productos[i].nombre_producto+" "+defi_uni;
						fila.appendChild(td);

						
						//SELECT PARA EL IPO DE VENTA
						var td=document.createElement("td");
						var sel=document.createElement("select");
						sel.setAttribute("id","selCambioUnidad_"+fac.productos[i].id+"_"+_numero_ticket+"_"+i);
						sel.setAttribute("onchange","cambiar_tipo_venta("+fac.productos[i].id+","+_numero_ticket+","+i+")");

						var op=document.createElement("option");
						op.innerHTML="unidad";
						op.value="unidad";
						if(fac.productos[i].tipo_venta_tienda=="unidad"){
							op.setAttribute("selected",true);
						}
						sel.appendChild(op);

						var op=document.createElement("option");
						op.innerHTML="blister";
						op.value="blister";
						if(fac.productos[i].tipo_venta_tienda=="blister"){
							op.setAttribute("selected",true);
						}
						sel.appendChild(op);

						var op=document.createElement("option");
						op.innerHTML="caja";
						op.value="caja";
						if(fac.productos[i].tipo_venta_tienda=="caja"){
							op.setAttribute("selected",true);
						}
						sel.appendChild(op);
						td.appendChild(sel);						
						fila.appendChild(td);
						//FIN SELECT PARA EL IPO DE VENTA						
						
						var td=document.createElement("td");
						td.setAttribute("id","valor_venta_"+fac.productos[i].id+"_"+_numero_ticket+"_"+i);
						td.value=fac.productos[i].precio_producto;
						td.innerHTML="$ "+formato_numero(fac.productos[i].precio_producto,"0",",",".");
						fila.appendChild(td);

						var td=document.createElement("td");
						var ipn=document.createElement("input");
						ipn.setAttribute("type","number");
						ipn.setAttribute("id","numCant_"+fac.productos[i].id+"_"+_numero_ticket+"_"+i);
						console.log("cantidad_para_venta");
						console.log(fac.productos[i].cantidad_para_venta);
						
							
						ipn.setAttribute("value",(Number(fac.productos[i].cantidad_para_venta)));
								
					
							
						
						
						//ipn.setAttribute("onkeypress","calcular_precio("+fac.productos[i].id+","+i+")");
						ipn.setAttribute("onchange","calcular_precio("+fac.productos[i].id+","+i+")");
						ipn.setAttribute("onclick","calcular_precio("+fac.productos[i].id+","+i+")");
						
				  		td.appendChild(ipn);
						
						fila.appendChild(td);
						var precio=fac.productos[i].precio_producto;
						if((fac.productos[i].promocion=="1" && fac.productos[i].tipo_venta_promo=="unidad") && (Number(fac.productos[i].cantidad_para_venta)>=fac.productos[i].promo_desde) && (Number(fac.productos[i].cantidad_para_venta)<=fac.productos[i].promo_hasta)){
							//aplico promocion
								precio=fac.productos[i].precio_promo_venta;
								
						}
						var td=document.createElement("td");
						td.value=Number(precio)*Number(fac.productos[i].cantidad_para_venta);
						td.setAttribute("id","precio_"+fac.productos[i].id+"_"+_numero_ticket+"_"+i);
						td.innerHTML="$ "+formato_numero(Number(precio)*Number(fac.productos[i].cantidad_para_venta),"0",",",".");
						fila.appendChild(td);

						
						
						var td=document.createElement("td");
						if(fac.productos[i].tipo_venta_tienda=="unidad"){
							td.innerHTML=fac.productos[i].cantidad_existencias_unidades;
						}else if(fac.productos[i].tipo_venta_tienda=="caja"){
							td.innerHTML=fac.productos[i].cantidad_existencias;
						}else if(fac.productos[i].tipo_venta_tienda=="blister"){
							td.innerHTML=fac.productos[i].cantidad_existencias_blister;
						}
						fila.appendChild(td);

						tbCuerpoFactura.appendChild(fila);
						fac.productos[i].precio_producto_total=Number(fac.productos[i].precio_producto)*Number(fac.productos[i].cantidad_para_venta);
						if(fin==i){
							fila.setAttribute("style","background:blue");														
						}
			}
				calcular_total(mi_ticket[_numero_ticket-1]);
		

				document.getElementById("numCantidad").value=0;
				document.getElementById("txtCodigoProducto").value="";
				document.getElementById("h4NombreProductoInv").innerHTML="Nombre producto";
				document.getElementById("h3CuantosProductos").innerHTML=mi_ticket[_numero_ticket-1].productos.length;
			}
	}*/
	var span=document.createElement("span");
	span.innerHTML=" ";
	span.setAttribute("id","span");
	document.getElementById("divFactura").appendChild(span);	

	console.log("FIN function dibujar_factura");
					
}
