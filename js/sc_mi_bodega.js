

function iniciar_bodega_offline(sede){
	consultarDatos(_URL+"traer_productos_para_factura/*/"+_IdSede,{},function(rs){
		//mostrarMensaje(rs);
		if(rs.respuesta==true){
			agregar_local_storage("mi_bodega_"+_IdSede+"_"+_usuario.id_usuario,rs.datos);

		}else{
			mostrarMensaje("Opps no se ha podidco crear la bodega offline");
		}
		
	});
}

function consultar_mi_bodega(id){
		console.log("consultando");
		console.log(id);
		
		var listaProductos=document.getElementById("listaProductos");
									listaProductos.innerHTML="";
								var datos=obtener_local_storage("mi_bodega_"+_IdSede+"_"+_usuario.id_usuario);	
								//console.log(datos);
								if(datos.length>1){

									for(var d in datos){
										if(document.getElementById(id).value.length > 2){
											console.log("==");
											console.log(datos[d].codigo_distribuidor);
											console.log(datos[d].codigo_producto);
											console.log(document.getElementById(id).value);
											console.log("===");
											if(datos[d].codigo_distribuidor==document.getElementById(id).value || datos[d].codigo_producto==document.getElementById(id).value ){
											//AQUI INICIO LA BUSQUEDA OFFLINE
													var listaProductos=document.getElementById("listaProductos");
													listaProductos.innerHTML="";
														
													
												
														console.log(datos[d]);
														_producto_seleccionado=datos[d];
														document.getElementById("numCantidad").value=1;
														document.getElementById("txtCodigoProducto").style.backgroundColor="#ffffff";
														document.getElementById("h4NombreProductoInv").innerHTML=_producto_seleccionado.nombre_producto;


														if( _producto_seleccionado!=false){
															
															if(_producto_seleccionado!=false){
																agregar_producto_mi_ticket(_producto_seleccionado);
																//	dibujar_factura(mis_ticket[_numero_ticket-1]);	
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

													if(datos[d].tipo_venta_producto=="Caja"){
															
														

															

															var opt=document.createElement("option");
															opt.innerHTML="Unidad";
															opt.value="unidad";
															sel.appendChild(opt);

															var opt=document.createElement("option");
															opt.innerHTML="Caja";
															opt.value="caja";
															sel.appendChild(opt);

													}else if(datos[d].tipo_venta_producto=="PorUnidad"){
														

															var opt=document.createElement("option");
															opt.innerHTML="Unidad";
															opt.value="unidad";
															sel.appendChild(opt);											
													}else if(datos[d].tipo_venta_producto=="CajaBlister"){
														

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

											//AQUI FINALIZO BUSQIEDA OFFLINE
											break;
										}//fin if	
										}
										
									}//fin ford
									




								}//fin if

}//fin funcion

							