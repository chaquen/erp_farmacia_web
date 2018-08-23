var _pro_pedido=false;
var _lista_pedidos=[];
function iniciar_pedidos(valido){
	agregarEvento("selTipoExpor","change",function(){
		console.log(this.obtener_valores_formulario);
		if(this.value=="txt"){
			document.getElementById("tipo_separacion").style.display="";
		}else{
			document.getElementById("tipo_separacion").style.display="none";
		}

	});
	agregarEvento("btnCrearPedido","click",function(){
		console.log(_lista_pedidos);
		var vf =obtener_valores_formulario("formPedidos");
		if(vf!=false){
			var datos={
				proveedor:"",
				productos_pedido:_lista_pedidos,
				fk_id_usuario:_usuario.id_usuario,
				fk_id_proveedor:vf.Select[0],
				email:document.getElementById("email_pedido").value,
				tipo_exportacion:document.getElementById("selTipoExpor").value,
				tipo_separacion_archivo_plano:document.getElementById("txt_tipo").value,
			};
			registrarDato(_URL+"pedidos",datos,function(rs){
					mostrarMensaje(rs);
				if(rs.respuesta){
				
				}

			});	
		}
		
	});
	agregarEvento("btnCancelarPedido","click",function(){
		
	});
	agregarEvento("txtCodPredido","keypress",function(e){
		console.log(e.keyCode);
		if(e.keyCode!=13){
                        if(this.value.length > 0 && this.value != "" && this.value != "  "){
					if(this.value.trim().length>0){
						consultarDatos(_URL+"traer_productos_por_proveedor/"+this.value.trim()
									+"/"+
									document.getElementById("selPredidoProveedor").value
									+"/"+
									+document.getElementById("selPredidoSedes").value,{},function(rs){	
						
								if(rs.respuesta){
										console.log("TE ENCONTRE");
										var listaProductos=document.getElementById("lista_prod_pedido");
										listaProductos.innerHTML="";
										for(var e in rs.datos){
											
												var opt=document.createElement("option");
												opt.innerHTML=rs.datos[e].nombre_producto;
												opt.value=rs.datos[e].codigo_distribuidor;
												listaProductos.appendChild(opt);
											
											
										}
									
									
						
								}	
                                                },"");
					}else{
						console.log(this.value);
					}	
				}
			}else{
				if(this.value.length > 0 && this.value != "" && this.value != "  "){
					if(this.value.trim().length>0 && this.value!="*"){
						consultarDatos(_URL+"traer_productos_por_proveedor/"+this.value.trim()
									+"/"+
									document.getElementById("selPredidoProveedor").value
									+"/"+document.getElementById("selPredidoSedes").value,{},function(rs){	
						
						

							
							if(rs.respuesta){
								

									
								console.log(rs.datos);

								_pro_pedido=rs.datos[0];
								document.getElementById("txtCodPredido").value="";
									
								}else{
									_pro_pedido=false;
								}
								
								
					
								
						},"");
					}else{

						consultarDatos(_URL+"traer_productos_por_proveedor/"+this.value.trim()
									+"/"+
									document.getElementById("selPredidoProveedor").value
									+"/"+
									+document.getElementById("selPredidoSedes").value,{},function(rs){	
						
								if(rs.respuesta){
										console.log("TE ENCONTRE");
										var listaProductos=document.getElementById("lista_prod_pedido");
										listaProductos.innerHTML="";
										for(var e in rs.datos){
											
												var opt=document.createElement("option");
												opt.innerHTML=rs.datos[e].nombre_producto;
												opt.value=rs.datos[e].codigo_producto;
												listaProductos.appendChild(opt);
											
											
										}
									
									
						
								}	
                                                },"");


					}	
				}
                                
			}
               });        
		
	agregarEvento("txtCodPredido","change",function(e){
		console.log(this.value);
		
				if(this.value.length > 1 && this.value != "" && this.value != "  "){
					if(this.value.trim().length>0){
						consultarDatos(_URL+"traer_productos_por_proveedor/"+this.value.trim()
									+"/"+
									document.getElementById("selPredidoProveedor").value
									+"/"+document.getElementById("selPredidoSedes").value,{},function(rs){	
						
						

							
							if(rs.respuesta){
							
									
								console.log(rs.datos);

								_pro_pedido=rs.datos[0];
								document.getElementById("h4Nombre").innerHTML=_pro_pedido.nombre_producto+" "+_pro_pedido.tipo_presentacion;
								document.getElementById("h4Existencias").innerHTML="Existencias: "+_pro_pedido.cantidad_existencias;
								if( Number(_pro_pedido.unidades_por_blister) > 1){
									document.getElementById("h4EmbalajeCaja").innerHTML="Embalaje: "+_pro_pedido.unidades_por_caja+" X "+_pro_pedido.unidades_por_caja+"Blister x caja";
								}else{
									document.getElementById("h4EmbalajeCaja").innerHTML="Embalaje: "+_pro_pedido.unidades_por_caja;
								}

								
								document.getElementById("h4PrecioCompra").innerHTML="Precio compra: $ "+formato_numero(_pro_pedido.precio_compra,"2",",",".");
								if(_pro_pedido.tipo_venta_producto=="Caja"){
									document.getElementById("h4ExistenciasUnidades").innerHTML_pro_pedido.cantidad_existencias_unidades;	
								}
								
								
								
									
								}else{
									_pro_pedido=false;
								}
								
								
					
								
						},"");
					}	
				}else{
					
				}
			
		
	});
	agregarEvento("btnAddProdPedido","click",function(){
			if(_pro_pedido!=false && document.getElementById("numCantPedido").value>=1){

				_pro_pedido.cantidad_solicitada=document.getElementById("numCantPedido").value;
				dibujar_pedido(_pro_pedido);
				document.getElementById("txtCodPredido").value="";
				_pro_pedido=false;
			}else{
				mostrarMensaje("Selecciona un producto y agrega una cantidad");
			}
	});

	agregarEvento("selPredidoProveedor_ap","change",function(){
		//CONSULTAR TODOS LOS PEDIDOS ORDENADOS POR FECHA DE MANERA DESC

		consultarDatos(_URL+"pedido_por_proveedor/"+this.value,{},function(rs){
			if(rs.respuesta==true){
				var datos=rs.datos;
				var selFechapedido=document.getElementById("selFechapedido");
				selFechapedido.innerHTML="";
					var op=document.createElement("option");
					op.innerHTML="--SELECCIONA UNA FECHA--";
					op.value=0;
					selFechapedido.appendChild(op);
				for(var r in datos){
					var op=document.createElement("option");
					op.innerHTML=datos[r].fecha_pedido+" ("+datos[r].estado_pedido+")";
					op.value=datos[r].id;
					selFechapedido.appendChild(op);
				}	
			}else{
				mostrarMensaje(rs);
			}
			
		});
	});

	agregarEvento("selFechapedido","change",function(){
		if(this.value!=0){
			consultarDatos(_URL+"pedidos/"+this.value,{},function(rs){
				if(rs.respuesta==true){
					dibujar_pedido_admin(rs.datos);
						
				}else{
					mostrarMensaje(rs);
				}
				
			});	
		}
		
	});
	agregarEvento("btnCancelarPedidoRegistrado","click",function(){
		if(confirm("¿?¿Desea elimiar este pedido")){}
			elimiarDato(_URL+"pedidos/"+document.getElementById("selFechapedido").value,{},function(rs){
				mostrarMensaje(rs);
			});
	});

	agregarEvento("btnGenerarPedido","click",function(){
		registrarDato(_URL+"volver_a_generar_pedido/"+document.getElementById("selFechapedido").value,{fk_id_usuario:_usuario.id_usuario},function(rs){

		});
	});

	agregarEvento("btnCargarPedidoInventario","click",function(){
		if(document.getElementById("selFechapedido").value!="" || document.getElementById("selFechapedido").value!="0"){
			var datos={};
			registrarDato(_URL+"asociar_pedido_inventario/"+document.getElementById("selFechapedido").value,datos,function(rs){});
		}
		
	});

	//Evento para subir archivo plano para el pedido
	   agregarEvento("btnSubirPedido","click",function(){
	   	if(document.getElementById("flvSubirPedido").value!=""){
	   		var url=_URL+"subir_pedido";
	   		registrarDatoArchivo(url,{},document.getElementById("flvSubirPedido"),"formSubirPedidosAp",function(rs){
	   			console.log(rs);
	   		});
	   	}else{
	   		mostrarMensaje("Debes seleccionar un archivo");
	   	}
	   });
	
}

function dibujar_pedido_admin(datos){
	var tblListaPedido=document.getElementById("tblListaAdminPedido");
		tblListaPedido.innerHTML="";

		var tr=document.createElement("tr");
		
		var td=document.createElement("td");
		td.innerHTML="";
		tr.appendChild(td);

		
		var td=document.createElement("td");
		td.innerHTML="Código del Producto";
		tr.appendChild(td);

		
		var td=document.createElement("td");
		td.innerHTML="Nombre del Producto";
		tr.appendChild(td);

		
		var td=document.createElement("td");
		td.innerHTML="Cantidad";
		tr.appendChild(td);

		
		var td=document.createElement("td");
		td.innerHTML="Precio compra";
		tr.appendChild(td);

		
		var td=document.createElement("td");
		td.innerHTML="Total";
		tr.appendChild(td);
		tblListaPedido.appendChild(tr);
	for(var c in datos){
		console.log(datos[c]);
		var tr=document.createElement("tr");
		//tr.setAttribute("id","fila_pedido_ad_"+c);
		
		//var td=document.createElement("td");
		//td.innerHTML="X";
		//td.setAttribute("onclick","quitar_fila_pedido("+c+")");
		//tr.appendChild(td);


		var td=document.createElement("td");
		td.innerHTML=datos[c].codigo_producto;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[c].nombre_producto;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="$"+formato_numero(datos[c].precio_compra,"2",",",".");
		td.value=datos[c].precio_compra;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[c].cantidad_pedido;
		tr.appendChild(td);
		

		var td=document.createElement("td");
		td.innerHTML="$ "+formato_numero(Number(datos[c].precio_compra)*Number(datos[c].cantidad_pedido),"2",",",".");
		tr.appendChild(td);
		tblListaPedido.appendChild(tr);
	}
}

function dibujar_pedido(datos){
	_lista_pedidos.push(datos);
	var tblListaPedido=document.getElementById("tblListaPedido");
	tblListaPedido.innerHTML="";
	var tr=document.createElement("tr");
		
		var td=document.createElement("td");
		td.innerHTML="";
		tr.appendChild(td);

		
		var td=document.createElement("td");
		td.innerHTML="Código del Producto";
		tr.appendChild(td);

		
		var td=document.createElement("td");
		td.innerHTML="Nombre del Producto";
		tr.appendChild(td);

	
		var td=document.createElement("td");
		td.innerHTML="Cantidad";
		tr.appendChild(td);

	
		var td=document.createElement("td");
		td.innerHTML="Precio compra";
		tr.appendChild(td);

		
		var td=document.createElement("td");
		td.innerHTML="Total";
		tr.appendChild(td);
		tblListaPedido.appendChild(tr);
	for(var c in _lista_pedidos){
		console.log(_lista_pedidos[c]);
		var tr=document.createElement("tr");
		tr.setAttribute("id","fila_pedido_"+c);
		
		var td=document.createElement("td");
		td.innerHTML="X";
		td.setAttribute("onclick","quitar_fila_pedido("+c+")");
		tr.appendChild(td);


		var td=document.createElement("td");
		td.innerHTML=_lista_pedidos[c].codigo_producto;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=_lista_pedidos[c].nombre_producto;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="$ "+formato_numero(_lista_pedidos[c].precio_compra,"2",",",".");
		td.value=_lista_pedidos[c].precio_compra;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=_lista_pedidos[c].cantidad_solicitada;
		tr.appendChild(td);
		

		var td=document.createElement("td");
		td.innerHTML="$ "+formato_numero(_lista_pedidos[c].precio_compra*datos.cantidad_solicitada,"2",",",".");
		td.value=_lista_pedidos[c].precio_compra*datos.cantidad_solicitada;
		tr.appendChild(td);
		tblListaPedido.appendChild(tr);
	}
		
	
}

function quitar_fila_pedido(pos){
	if(confirm("¿Desea quitar este producto?")){
		var fila = document.getElementById("fila_pedido_"+pos);
		console.log(fila);
		fila.parentNode.removeChild(fila);
		
				_lista_pedidos.splice(pos,1);
			
		}
		
	
	
}