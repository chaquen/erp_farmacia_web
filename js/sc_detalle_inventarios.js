var repo_inve;
var repo_inve_todo;
var repo_mov;
var repo_bajo;
var orden="ASC";
var datos_exportar_inv;
var datos_exportar_bajo_inv;
var datos_exportar_mov_inv;
function iniciar_inventario(valido){
	if(valido){
		ocultar();

			agregarEvento("txtBuscarProductoInventario","keypress",function(e){
					console.log(this.value);	
					if(e.keyCode!=13){
						if(this.value!=""){
							if(document.getElementById("selSedesAddInv").value!="0"){
								registrarDato(_URL+"traer_productos/"+this.value+"/"+document.getElementById("selSedesAddInv").value,{},function(rs){
									if(rs.respuesta==true){
										crear_data_list_producto("lista_buscar_inventario",rs.datos);
									}
								});
							}else{
								mostrarMensaje("Por favor selecciona una sede");		
							}
								
						}
							
					}else{
						if(this.value!=""){
							if(document.getElementById("selSedesAddInv").value!="0"){
								registrarDato(_URL+"traer_productos/"+this.value+"/"+document.getElementById("selSedesAddInv").value,{},function(rs){
									if(rs.respuesta==true){
										dibujar_producto_inventario(rs.datos[0]);
									}else{
										document.getElementById("hdIdProductoInventario").value="";
										document.getElementById("h4NombreProducto").innerHTML="Nombre producto";
										document.getElementById("h4ExistenciasActuales").innerHTML="0";
									}
								});
							}else{
								mostrarMensaje("Por favor selecciona una sede");
							}
								
						}
					}
					
				
			});
			agregarEvento("txtBuscarProductoInventario","change",function(e){
				console.log(this.value);	
				if(this.value!=""){
					if(document.getElementById("selSedesAddInv").value!="0"){
						registrarDato(_URL+"traer_productos/"+this.value+"/"+document.getElementById("selSedesAddInv").value,{},function(rs){
							if(rs.respuesta==true){
								for(var f in rs.datos){
									if(rs.datos[f].codigo_producto==document.getElementById("txtBuscarProductoInventario").value){
										dibujar_producto_inventario(rs.datos[f]);
									}
								}
								
							}else{
								document.getElementById("hdIdProductoInventario").value="";
								document.getElementById("h4NombreProducto").innerHTML="Nombre producto";
								document.getElementById("h4ExistenciasActuales").innerHTML="0";
							}
						});
					}else{
						mostrarMensaje("Por favor seleciona una sede");
					}
						
				}
				
			});
			agregarEvento("selSedesAddInv","change",function(e){
				console.log(document.getElementById("txtBuscarProductoInventario").value);	
				if(this.value!="--" && this.value!="0"  && document.getElementById("txtBuscarProductoInventario").value != ""){
					registrarDato(_URL+"traer_productos/"+document.getElementById("txtBuscarProductoInventario").value+"/"+document.getElementById("selSedesAddInv").value,{},function(rs){
						if(rs.respuesta==true){
							for(var f in rs.datos){
								if(rs.datos[f].codigo_producto==document.getElementById("txtBuscarProductoInventario").value){
									dibujar_producto_inventario(rs.datos[f]);		
								}
							}
							
						}else{
							document.getElementById("hdIdProductoInventario").value="";
							document.getElementById("h4NombreProducto").innerHTML="Nombre producto";
							document.getElementById("h4ExistenciasActuales").innerHTML="0";
						}
					});	
				}
				
			});

			agregarEvento("txtBuscarReporteInventario","keypress",function(e){
				console.log(this.value);	
				if(e.keyCode!=13){
					if(this.value!="" && document.getElementById("selSedesReporteInv").value==0){
						registrarDato(_URL+"traer_productos/"+this.value+"/"+document.getElementById("selSedesReporteInv").value,{},function(rs){
							if(rs.respuesta==true){
								crear_data_list_producto("lista_buscar_inventario",rs.datos);
							}
						});	
					}
				}else{

					if(document.getElementById("selSedesReporteInv").value==0 && this.value != ""){
						var datos={
							tipo:"GENERAL",
							fk_id_categoria:0,
							nombre_producto:this.value,
							fk_id_proveedor:document.getElementById("selProvReporteInv").value,

						};
					}else if(document.getElementById("selSedesReporteInv").value!=0 && document.getElementById("selSedesReporteInv").value!="--" && this.value != ""){
						var datos={
							tipo:"SEDE",
							sede:document.getElementById("selSedesReporteInv").value,
							fk_id_categoria:0,
							nombre_producto:this.value,
							fk_id_proveedor:document.getElementById("selProvReporteInv").value,
						};
					}	
						if(datos!=undefined){
							registrarDato(_URL+"reporte_inventario",datos,function(rs){
									//mostrarMensaje(rs);	
									if(rs.respuesta==true){
											dibujar_reporte_inventario(rs.datos);
											calcular_totales_inventario(rs.datos);
									}else{
										var tbl=document.getElementById("tblRepoInve");
										tbl.innerHTML="";
		
									}
							});
						}

						
				}
				
				
			});
			agregarEvento("txtBuscarReporteInventario","change",function(e){
				if(document.getElementById("selSedesReporteInv").value==0 && this.value != ""){
					var datos={
						tipo:"GENERAL",
						fk_id_categoria:0,
						nombre_producto:document.getElementById("txtBuscarReporteInventario").value,
						fk_id_proveedor:document.getElementById("selProvReporteInv").value,

					};
				}else if(document.getElementById("selSedesReporteInv").value==0 && document.getElementById("selSedesReporteInv").value=="--" && this.value != ""){
					var datos={
						tipo:"SEDE",
						sede:document.getElementById("selSedesReporteInv").value,
						fk_id_categoria:0,
						nombre_producto:document.getElementById("txtBuscarReporteInventario").value,
						fk_id_proveedor:document.getElementById("selProvReporteInv").value,
					};
				}	

				if(datos!=undefined){
					registrarDato(_URL+"reporte_inventario",datos,function(rs){
						consola(rs);	
						//mostrarMensaje(rs);
						if(rs.respuesta==true){
							dibujar_reporte_inventario(rs.datos);
							calcular_totales_inventario(rs.datos);
						}else{
								var tbl=document.getElementById("tblRepoInve");
								tbl.innerHTML="";
		
						}
					});
				}else{
					mostrarMensaje("debes seleccionar un valor para las sedes y agregar un valor al codigo");
				}
				
			});

			agregarEvento("btnAgregarCantidad","click",function(){
				var vf=obtener_valores_formulario("formAddInventario");
				var tipo;


				if(document.getElementById("selSedesAddInv").value!=""){
					if(vf.Radio.length>0){
					tipo=vf.Radio[0];
					}else{
						tipo:"PorUnidad";
					}

					if(tipo!=undefined){
						if(vf.Hidden[0]!="" && vf.Numero[0]!=""){
								var datos={
									fk_id_producto:vf.Hidden[0],
									fk_id_sede:_IdSede,
									unidades_por_caja:vf.Hidden[1],
									tipo_entrada_inventario:tipo,			
									cantidad_existencias:vf.Numero[0],
									tipo_entrada:"ENTRADA",
									fk_id_usuario:_usuario.id_usuario,

									
									
								};
								editarDato(_URL+"detalle_inventarios/"+vf.Hidden[0],datos,function(rs){
									consola(rs);
									mostrarMensaje(rs);
									if(rs.respuesta==true){
										document.getElementById("hdIdProductoInventario").value="";
										document.getElementById("h4NombreProducto").innerHTML="Nombre producto";
										document.getElementById("h4ExistenciasActuales").innerHTML="0";
										document.getElementById("liTipoUni").style.display="none";
											document.getElementById("liTipoBli").style.display="none";
											document.getElementById("liTipoCj").style.display="none";
											document.getElementById("h4Emabalaje").innerHTML="";
											document.getElementById("liEmbalaje").style.display="none";
										ocultar();

										document.getElementById("selSedesAddInv").value=_IdSede;
										document.getElementById("txtBuscarProductoInventario").value="";
										document.getElementById("catnIve").value="";

									}

									},"");

						}else{
							mostrarMensaje("Debes seleccionar un producto e ingresar una cantidad");
						}
					}else{
						mostrarMensaje("Debes seleccionar el tipo de entrada");
					}	
				}else{
					mostrarMensaje("No olvide seleccionar una sede");
				}
				
				document.getElementById("selSedesAddInv").value=_IdSede;
				
				
			});


			agregarEvento("dtBuscarFechaMovInv","change",function(){
			
				buscar_reporte_movimientos();
			});
			agregarEvento("selSedesMovInv","change",function(){
			
				buscar_reporte_movimientos();
			});

			

			agregarEvento("selMovInv","change",function(){
				
				buscar_reporte_movimientos();
			});
			agregarEvento("selMovInvCate","change",function(){
			
				buscar_reporte_movimientos();
			});
			agregarEvento("selMovInvCajeros","change",function(){
			
				buscar_reporte_movimientos();
			});
			
			


			agregarEvento("selCatReporteInv","change",function(){

			
				if(document.getElementById("selSedesReporteInv").value==0){
					var datos={
						tipo:"GENERAL",
						fk_id_categoria:this.value,
						nombre_producto:"",
						fk_id_proveedor:document.getElementById("selProvReporteInv").value,
					};
				}else{
					var datos={
						tipo:"SEDE",
						sede:document.getElementById("selSedesReporteInv").value,
						fk_id_categoria:this.value,
						nombre_producto:"",
						fk_id_proveedor:document.getElementById("selProvReporteInv").value,
					};
				}	
				registrarDato(_URL+"reporte_inventario",datos,function(rs){
					consola(rs);
					//mostrarMensaje(rs);	
					if(rs.respuesta==true){
						dibujar_reporte_inventario(rs.datos);
						calcular_totales_inventario(rs.datos);
					}else{
									var tbl=document.getElementById("tblRepoInve");
									tbl.innerHTML="";
	
					}
				});
			});
			agregarEvento("selProvReporteInv","change",function(){

			
				if(document.getElementById("selSedesReporteInv").value==0){
					var datos={
						tipo:"GENERAL",
						fk_id_categoria:this.value,
						nombre_producto:"",
						fk_id_proveedor:document.getElementById("selProvReporteInv").value,

					};
				}else{
					var datos={
						tipo:"SEDE",
						sede:document.getElementById("selSedesReporteInv").value,
						fk_id_categoria:document.getElementById("selCatReporteInv").value,
						nombre_producto:"",
						fk_id_proveedor:this.value,
					};
				}	
				registrarDato(_URL+"reporte_inventario",datos,function(rs){
					consola(rs);
					//mostrarMensaje(rs);	
					if(rs.respuesta==true){
						dibujar_reporte_inventario(rs.datos);
						calcular_totales_inventario(rs.datos);
					}else{
									var tbl=document.getElementById("tblRepoInve");
									tbl.innerHTML="";
	
								}
				});
			});
			agregarEvento("selSedesReporteInv","change",function(){
				if(this.value==0 && document.getElementById("txtBuscarReporteInventario").value!=""){
					var datos={
						tipo:"GENERAL",
						fk_id_categoria:document.getElementById("selCatReporteInv").value,
						nombre_producto:document.getElementById("txtBuscarReporteInventario").value,
						fk_id_proveedor:document.getElementById("selProvReporteInv").value,
						
					};
				}else if(this.value!="--" && this.value!="0" && document.getElementById("txtBuscarReporteInventario").value!=""){
					var datos={
						tipo:"SEDE",
						sede:this.value,
						fk_id_categoria:document.getElementById("selCatReporteInv").value,
						nombre_producto:document.getElementById("txtBuscarReporteInventario").value,
						fk_id_proveedor:document.getElementById("selProvReporteInv").value,
					};
				}
				if(datos!=undefined){
					registrarDato(_URL+"reporte_inventario",datos,function(rs){
							consola(rs);	
							mostrarMensaje(rs);
							if(rs.respuesta==true){
								//document.getElementById("txtBuscarReporteInventario").value="";
								dibujar_reporte_inventario(rs.datos);
								calcular_totales_inventario(rs.datos);

							}else{
											var tbl=document.getElementById("tblRepoInve");
											tbl.innerHTML="";
			
										}
					});	
				}
			});

			agregarEvento("agregarInv","click",function(){
				if(fila_seleccionada==false){

					if(document.getElementById("selSedesReporteInv").value==0){
						mostrarMensaje("Debes seleccionar primero un producto y una sede");
					}else{
						mostrarMensaje("Debes seleccionar primero un producto ");
					}
					
				}else{
					if(document.getElementById("selSedesReporteInv").value!=0){
						$('#agregarInvSel').fadeIn('slow');
						console.log(fila_seleccionada);
						document.getElementById("pNomProdSeleInv").innerHTML=fila_seleccionada.nombre_producto;
						document.getElementById("h4EmabalajeBlisterRepInv").innerHTML=fila_seleccionada.unidades_por_blister;
						document.getElementById("h4EmabalajeRepInv").innerHTML=fila_seleccionada.unidades_por_caja;
						document.getElementById("h4ExistenciasActualesRepInv").innerHTML=fila_seleccionada.existencias;
						document.getElementById("hdIdSedeRepoInv").value=document.getElementById("selSedesReporteInv").value;
						document.getElementById("hdIdProdRepoInv").value=fila_seleccionada.id;


					}else{
						mostrarMensaje("Debes seleccionar una sede");
					}
					
				}
				
			});


			agregarEvento("btnAgregarCantidadRepoInv","click",function(){
				var vf=obtener_valores_formulario("formAddRepoInv");
				console.log(vf);
				if(vf.Numero[0]!=""){


					if(vf.Radio.length>0){
							var datos={
								fk_id_producto:fila_seleccionada.id,
								fk_id_sede:_IdSede,			
								tipo_entrada_inventario:vf.Radio[0],		
								cantidad_existencias:vf.Numero[0],
								tipo_entrada:"ENTRADA",
								fk_id_usuario:_usuario.id_usuario,
								unidades_por_caja:fila_seleccionada.unidades_por_caja,

								
							};

							if(fila_seleccionada!=false){
								editarDato(_URL+"detalle_inventarios/"+fila_seleccionada.id,datos,function(rs){
										consola(rs);
										mostrarMensaje(rs);
										if(rs.respuesta==true){
											document.getElementById("hdIdSedeRepoInv").value="";
											document.getElementById("hdIdProdRepoInv").value="";
											document.getElementById("pNomProdSeleInv").innerHTML="Nombre producto";


										}

									},"");
							}else{
								mostrarMensaje("Por favor selecciona una fila");
							}
					}else{
						mostrarMensaje("selecciona un tipo de entrada");
					}	
			

				}
				
			});


			agregarEvento("selSedesBajoInve","change",function(){
				if(this.value!=0){
					var datos={
						tipo:"SEDE",
						sedes:this.value
						

					};
					registrarDato(_URL+"reporte_bajo_inventario",datos,function(rs){
						consola(rs);	
						if(rs.respuesta==true){
							dibujar_reporte_bajo_en_inventario(rs.datos);
						}else{
							mostrarMensaje(rs);
							var tbl=document.getElementById("tblRepoBajoInventario");
							tbl.innerHTML="";
						}
					});	
					
				}else{
					var datos={
						tipo:"GENERAL",
						sedes:false,
						

					};
					mostrarMensaje("Por favor selecciona una sede");
				}
			});

			agregarEvento("txtBuscarProdAjuste","keypress",function(e){
				if(document.getElementById("selSedeAjuste").value!=0){
						if(e.keyCode!=13){
							if(this.value!=""){
								registrarDato(_URL+"traer_productos/"+this.value+"/"+document.getElementById("selSedeAjuste").value,{},function(rs){
									if(rs.respuesta==true){
										crear_data_list_producto("lista_ajuste_producto",rs.datos);
									}
								});	
							}
						}else{
								if(this.value!=""){
									registrarDato(_URL+"traer_productos/"+this.value+"/"+document.getElementById("selSedeAjuste").value,{},function(rs){
										if(rs.respuesta==true){
											for(var f in rs.datos){
												if(rs.datos[f].codigo_producto==document.getElementById("txtBuscarProdAjuste").value){
													dibujar_producto_ajuste(rs.datos[f]);	
												}		
											}
											
											
										}
									});	
								}
							}
				}else{
					mostrarMensaje("Debes seleccionar una sede");
				}
			});
			agregarEvento("txtBuscarProdAjuste","change",function(e){
				if(document.getElementById("selSedeAjuste").value!=0){
						
								if(this.value!=""){
									registrarDato(_URL+"traer_productos/"+this.value+"/"+document.getElementById("selSedeAjuste").value,{},function(rs){
										if(rs.respuesta==true){
											for(var f in rs.datos){
												if(rs.datos[f].codigo_producto==document.getElementById("txtBuscarProdAjuste").value){
													dibujar_producto_ajuste(rs.datos[f]);

												}
											}		
											
										}
									});	
								}
							
				}else{
					mostrarMensaje("Debes seleccionar una sede");
				}
			});

			agregarEvento("btnAjustarCantidad","click",function(){
				var vf=obtener_valores_formulario("formAjuste");
				if(vf!=false){
					console.log(vf);
					if(vf.Select[0]!=0){
						
						if(vf.Numero[0]!=undefined){
							var c1=vf.Numero[0];
						}else{
							var c1=document.getElementById("h3CantidadAjusteCJ").value;
						}
						if(vf.Numero[1]!=undefined){
							var c2=vf.Numero[1];
						}else{
							var c2=document.getElementById("h3CantidadAjusteBL").value;
						}

						if(vf.Numero[2]!=undefined){
							var c3=vf.Numero[2];
						}else{
							var c3=document.getElementById("h3CantidadAjusteUN").value;
						}
						
						var datos={
							fk_id_producto:vf.Hidden[0],
							fk_id_sede:vf.Select[0],
							tipo_entrada:"AJUSTE",
							cantidad_existencias_unidades:c3,
							cantidad_existencias_blister:c2,
							cantidad_existencias:c1,
							fk_id_usuario:_usuario.id_usuario,
							unidades_por_caja:fila_seleccionada.unidades_por_caja,
							observaciones:vf.Texto[1]
						};
						
						editarDato(_URL+"detalle_inventarios_ajuste/"+vf.Hidden[0],datos,function(rs){
							console.log(rs);
							mostrarMensaje(rs);
						});
					}
				}
			});

			agregarEvento("liExportarInventarioRepo","click",function(){
				
				
				if(document.getElementById("txtBuscarReporteInventario").value!="" ){
					var datos={
						tipo:"GENERAL",
						fk_id_categoria:document.getElementById("selCatReporteInv").value,
						nombre_producto:document.getElementById("txtBuscarReporteInventario").value,
						fk_id_proveedor:document.getElementById("selProvReporteInv").value,

					};
				}else{
					var datos={
						tipo:"SEDE",
						sede:document.getElementById("selSedesReporteInv").value,
						fk_id_categoria:document.getElementById("selCatReporteInv").value,
						nombre_producto:document.getElementById("txtBuscarReporteInventario").value,
						fk_id_proveedor:document.getElementById("selProvReporteInv").value,
					};
				}	

				if(document.getElementById("selSedesReporteInv").value==0){
					var datos={
						tipo:"GENERAL",
						fk_id_categoria:document.getElementById("selCatReporteInv").value,
						nombre_producto:document.getElementById("txtBuscarReporteInventario").value,
						fk_id_proveedor:document.getElementById("selProvReporteInv").value,
					};
				}else{
					var datos={
						tipo:"SEDE",
						sede:document.getElementById("selSedesReporteInv").value,
						fk_id_categoria:document.getElementById("selCatReporteInv").value,
						nombre_producto:document.getElementById("txtBuscarReporteInventario").value,
						fk_id_proveedor:document.getElementById("selProvReporteInv").value,
					};
				}	

				datos_exportar_inv=datos;
				$('#mensaje_exportar_inv').fadeIn("fast");
			});
			agregarEvento("liExportarRepoBajoInv","click",function(){
				if(document.getElementById("selSedesBajoInve").value!=0){
					var datos={
						tipo:"SEDE",
						sedes:document.getElementById("selSedesBajoInve").value
						

					};	
					
					datos_exportar_bajo_inv=datos;
					$("#mensaje_exportar_bajo_inv").fadeIn('fast');	
				}else{
					mostrarMensaje("Por favor seleccione una sede")
				}
			});
			
			agregarEvento("txtBuscarCampInve","keypress",function(e){
				if(document.getElementById("selSedeAjuste").value!=""){
						if(e.keyCode!=13){
							console.log(this.value);
							if(this.value!=""){
								registrarDato(_URL+"traer_productos/"+this.value+"/"+document.getElementById("selSedesMovInv").value,{},function(rs){
									if(rs.respuesta==true){
										crear_data_list_producto("lista_productos_mov_inv",rs.datos);
									}
								});	
							}
						}else{
								if(this.value!=""){
									buscar_reporte_movimientos();
								}
						}
				}else{
					//mostrarMensaje("Debes seleccionar una sede");
				}
			});	
			agregarEvento("modificarInvReporte","click",function(){
				if(fila_seleccionada!=false){
					dibujar_producto_edicion(fila_seleccionada);
				}
			});

			agregarEvento("btnCrearProductoInventario","click",function(){
				if(document.getElementById("selSedesReporteInv").value!="--"){
					var vf=obtener_valores_formulario("formCrearProductoInventario");
					console.log(vf);
					//falta por arreglar los campos que van 
					var datos={
							codigo_distribuidor:vf.Texto[0],
							codigo_producto:vf.Texto[1],
							nombre_producto:vf.Texto[2],
							descripcion_producto:vf.Texto[2],
							laboratorio:vf.Texto[3],
							tipo_presentacion_producto:"UN",
							tipo_venta_producto:"CajaBlister",
							unidades_por_caja:vf.Numero[1],
							unidades_por_blister:vf.Numero[2],
							precio_compra:vf.Numero[0],
							precio_compra_blister:vf.Numero[3],
							precio_compra_unidad:vf.Numero[4],
							precio_venta:vf.Numero[5],
							precio_venta_blister:vf.Numero[6],
							precio_mayoreo:vf.Numero[7],
							minimo_inventario:vf.Numero[8],
							maximo_inventario:0,
							cantidad_existencias:0,
							fk_id_departamento:vf.Select[0],
							fk_id_sede:document.getElementById("selSedesReporteInv").value,
							fk_id_usuario:_usuario.id_usuario,
							fk_id_proveedor:vf.Select[1],
							inventario:"1"
							
						};

					registrarDato(_URL+"productos_inventario",datos,function(rs){
						console.log(rs);
						mostrarMensaje(rs);
					},"formCrearProductoInventario");		
				}else{
					mostrarMensaje("Debes selecciona un valor para la sede");
				}
				
			});

			agregarEvento("txt_pre_com","change",function(){
				calcular_precio_compra();
			});
			agregarEvento("txt_uni_cj","change",function(){
				calcular_precio_compra();
			});
			agregarEvento("txt_uni_bl","change",function(){
				calcular_precio_compra();
			});
			agregarEvento("accion_esperar_exportar_inv","click",exportar_inventario);
			agregarEvento("accion_continuar_exportar_inv","click",exportar_inventario);
			agregarEvento("accion_esperar_exportar_bajo_inv","click",exportar_bajo_inv);
			agregarEvento("accion_continuar_exportar_bajo_inv","click",exportar_bajo_inv);
			agregarEvento("btnInventario","click",function(){
				if(document.getElementById("selSedesReporteInv").value==0 ){
					var datos={
						tipo:"GENERAL",
						fk_id_categoria:document.getElementById("selCatReporteInv").value,
						nombre_producto:document.getElementById("txtBuscarReporteInventario").value,
						fk_id_proveedor:document.getElementById("selProvReporteInv").value,
						
					};
				}else if(document.getElementById("selSedesReporteInv").value!="--" && document.getElementById("selSedesReporteInv").value!="0" ){
					var datos={
						tipo:"SEDE",
						sede:document.getElementById("selSedesReporteInv").value,
						fk_id_categoria:document.getElementById("selCatReporteInv").value,
						nombre_producto:document.getElementById("txtBuscarReporteInventario").value,
						fk_id_proveedor:document.getElementById("selProvReporteInv").value,
					};
				}
				if(datos!=undefined){
					registrarDato(_URL+"reporte_inventario",datos,function(rs){
							consola(rs);	
							mostrarMensaje(rs);
							if(rs.respuesta==true){
								//document.getElementById("txtBuscarReporteInventario").value="";
								
								arr=chunkArray(rs.datos,200);
								console.log(arr);
								repo_inve_todo=arr;
								crear_sel_paginas(arr.length);
								dibujar_reporte_inventario(arr[0]);
								calcular_totales_inventario(arr[0]);

							}else{
								var tbl=document.getElementById("tblRepoInve");
								tbl.innerHTML="";
			
							}
					});	
				}
			});

			/*agregarEvento("cod_repo_inv","click",ordenar_codigo);
			agregarEvento("nom_repo_inv","click",ordenar_nombre);
			
			agregarEvento("cos_repo_inv","click",ordenar_costo);	
			
			agregarEvento("pre_repo_inv","click",ordenar_precio_venta);
			
			agregarEvento("exi_repo_inv","click",ordenar_existencias_inv);

			agregarEvento("exi_uni_repo_inv","click",ordenar_existencias_inv_uni);

			agregarEvento("hora_repo_mov","click",ordenar_hora_movimiento);
			
			agregarEvento("nom_repo_mov","click",ordenar_nombre_mov);

			agregarEvento("cod_repo_bajo","click",ordenar_codigo_bajo_inv);
			agregarEvento("nom_repo_bajo","click",ordenar_nombre_bajo_inv);
			agregarEvento("pre_repo_bajo","click",ordenar_precio_venta_bajo_inv);
			agregarEvento("inv_repo_bajo","click",ordenar_cj_bajo_inv);
			agregarEvento("inv_uni_repo_bajo","click",ordenar_un_bajo_inv);			
				
			agregarEvento("cat_repo_bajo","click",ordenar_categoria);*/

	}else{
		mostrarMensaje("No tiene permisos para usar esta seccion");
	}
}

function calcular_precio_compra(){
 var txt_pre_com=document.getElementById("txt_pre_com").value;
 var txt_pre_com_bli=document.getElementById("txt_pre_com_bli").value;
 var txt_pre_com_uni=document.getElementById("txt_pre_com_uni").value;
 var txt_uni_cj=document.getElementById("txt_uni_cj").value;
 var txt_uni_bl=document.getElementById("txt_uni_bl").value;

 document.getElementById("txt_pre_com_bli").value=txt_pre_com/txt_uni_cj;
 
 document.getElementById("txt_pre_com_uni").value=txt_pre_com/txt_uni_bl;



 
}

function dibujar_reporte_bajo_en_inventario(dt){
	var tbl=document.getElementById("tblRepoBajoInventario");
	repo_bajo=dt;
	tbl.innerHTML="";

	var tr=document.createElement("tr");
		
		var td=document.createElement("td");
		td.innerHTML="Código ↑↓	";
		td.setAttribute("id","cod_repo_bajo");
		td.setAttribute("onclick","ordenar_codigo_bajo_inv()");
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Descripción del producto ↑↓";
		td.setAttribute("id","nom_repo_bajo");
		td.setAttribute("onclick","ordenar_nombre_bajo_inv()");
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Precio Venta ↑↓";
		td.setAttribute("id","pre_repo_bajo");
		td.setAttribute("onclick","ordenar_precio_venta_bajo_inv()");
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Existencias cja ↑↓";
		td.setAttribute("id","inv_repo_bajo");
		td.setAttribute("onclick","ordenar_cj_bajo_inv()");
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Existencias Uni ↑↓";
		td.setAttribute("id","inv_uni_repo_bajo");
		td.setAttribute("onclick","ordenar_un_bajo_inv()");
		tr.appendChild(td);

		

		var td=document.createElement("td");
		td.innerHTML="Minimo de existencias";
		tr.appendChild(td);


		var td=document.createElement("td");
		td.innerHTML="Categoria ↑↓";
		td.setAttribute("id","cat_repo_bajo");
		td.setAttribute("onclick","ordenar_categoria()");
		tr.appendChild(td);


	tbl.appendChild(tr);	


	for(var f in dt){
		console.log(dt[f]);
		var tr=document.createElement("tr");
		

		var td=document.createElement("td");
		td.innerHTML=dt[f].codigo_producto;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=dt[f].nombre_producto;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="$ "+formato_numero(dt[f].precio_venta,"2",",",".");
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=dt[f].cantidad_existencias;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=dt[f].cantidad_existencias_unidades;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=dt[f].minimo_inventario;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=dt[f].nombre_departamento;
		tr.appendChild(td);
		tbl.appendChild(tr);
	}
}

function consultar_categorias(){
	consultarDatos(_URL+"departamentos",{},function(rs){
		console.log(rs);
		if(rs.respuesta==true){
			crear_select_categorias("selCatReporteInv",rs.datos);
			crear_select_categorias("selNuevaCatgorias",rs.datos);
		}
		
	});
}
function dibujar_producto_inventario(d){
	console.log(d);
	var tipo="";
	if(d.tipo_venta_producto=="PorUnidad"){
		tipo="Unidades.";
		document.getElementById("liEmbalaje").style.display="none";
		document.getElementById("h4Emabalaje").innerHTML=d.unidades_por_caja+" unidad";
		document.getElementById("liTipoBli").style.display="none";
		document.getElementById("liTipoCj").style.display="none";
		document.getElementById("liTipoUni").style.display="";
	}else if(d.tipo_venta_producto=="Caja"){

		document.getElementById("h4Emabalaje").innerHTML=d.unidades_por_caja+" unidades X CAJA";
		document.getElementById("liEmbalaje").style.display="none";
		document.getElementById("liTipoBli").style.display="none";
		document.getElementById("liTipoCj").style.display="";
		document.getElementById("liTipoUni").style.display="";
		tipo="Unidades";
	}else if(d.tipo_venta_producto=="CajaBlister"){
		document.getElementById("liEmbalaje").style.display="";
		document.getElementById("h4Emabalaje").innerHTML=d.unidades_por_caja+" blister X CAJA";
		document.getElementById("h4EmabalajeBlister").innerHTML=d.unidades_por_blister+" unidades X BLISTER";
		document.getElementById("liTipoBli").style.display="";
		document.getElementById("liTipoCj").style.display="";
		document.getElementById("liTipoUni").style.display="";
		tipo="Unidades";
	}
	

	
	document.getElementById("hdIdProductoInventario").value=d.id;
	document.getElementById("h4NombreProducto").innerHTML=d.nombre_producto;
	document.getElementById("h4ExistenciasActuales").innerHTML=d.cantidad_existencias_unidades+" "+tipo;
	document.getElementById("hdIdProductoUnidadesEntrada").value=d.unidades_por_caja;
	
	

}

function dibujar_reporte_movimiento(dt){
		
		var tbl=document.getElementById("tblMovimientos");
		repo_mov=dt;
		tbl.innerHTML="";
		var tr=document.createElement("tr");

		var td=document.createElement("td");
		td.innerHTML="Hora mv ↑↓";
		td.setAttribute("id","hora_repo_mov");
		td.setAttribute("onclick","ordenar_hora_movimiento()");
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Descripción producto ↑↓";
		td.setAttribute("id","nom_repo_mov");
		td.setAttribute("onclick","ordenar_nombre_mov()");
		tr.appendChild(td);
		
		var td=document.createElement("td");
		td.innerHTML="Habia";
		tr.appendChild(td);
		
		var td=document.createElement("td");
		td.innerHTML="Movimiento";
		tr.appendChild(td);
		
		var td=document.createElement("td");
		td.innerHTML="Tipo";
		tr.appendChild(td);
		
		var td=document.createElement("td");
		td.innerHTML="Cantidad";
		tr.appendChild(td);
		
		var td=document.createElement("td");
		td.innerHTML="Quedan";
		tr.appendChild(td);
		
		var td=document.createElement("td");
		td.innerHTML="Usuario";
		tr.appendChild(td);
		
		var td=document.createElement("td");
		td.innerHTML="Categoria";
		tr.appendChild(td);
		
		var td=document.createElement("td");
		td.innerHTML="Sede";
		tr.appendChild(td);
		
		var td=document.createElement("td");
		td.innerHTML="Observaciones";
		tr.appendChild(td);
		


		tbl.appendChild(tr);

		for(var f in dt){
			
			var tr=document.createElement("tr");

			var td=document.createElement("td");
			td.innerHTML=dt[f].created_at;
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML=dt[f].nombre_producto;
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML=dt[f].habia;
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML=dt[f].tipo;
			tr.appendChild(td);
			var td=document.createElement("td");
			td.innerHTML=dt[f].descripcion;
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML=dt[f].cantidad;
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML=dt[f].quedan;
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML=dt[f].nombres;
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML=dt[f].nombre_departamento;
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML=dt[f].nombre_sede;
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML=dt[f].observaciones;
			tr.appendChild(td);

			tbl.appendChild(tr);
			console.log(dt[f]);
		}
}

function dibujar_reporte_inventario(dt){

		

		var tbl=document.getElementById("tblRepoInve");
		tbl.innerHTML="";
		var tr=document.createElement("tr");
		
		var td=document.createElement("td");
		td.innerHTML="Código producto ↑↓";
		td.setAttribute("id","cod_repo_inv");
		td.setAttribute("onclick","ordenar_codigo()");
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Descripción producto ↑↓";
		td.setAttribute("id","nom_repo_inv");
		td.setAttribute("onclick","ordenar_nombre()");
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Costo ↑↓";
		td.setAttribute("id","cos_repo_inv");
		td.setAttribute("onclick","ordenar_costo()");
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Precio venta caja↑↓";
		td.setAttribute("id","pre_repo_inv");
		td.setAttribute("onclick","ordenar_precio_venta()");
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Precio venta blister";
		td.setAttribute("id","pre_repo_inv");
		//td.setAttribute("onclick","ordenar_precio_venta()");
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Precio venta unidad";
		td.setAttribute("id","pre_repo_inv");
		//td.setAttribute("onclick","ordenar_precio_venta()");
		tr.appendChild(td);



		var td=document.createElement("td");
		td.innerHTML="Uni X caja";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Uni X blister";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Existencias cj ↑↓";
		td.setAttribute("id","exi_repo_inv");
		td.setAttribute("onclick","ordenar_existencias_inv()");
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Existencias bl ↑↓";
		td.setAttribute("id","exi_uni_repo_inv");
		td.setAttribute("onclick","ordenar_existencias_inv_uni()");
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Existencias uni sueltas";
		//td.setAttribute("id","exi_uni_repo_inv");
		//td.setAttribute("onclick","ordenar_existencias_inv_uni()");
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="Minimo inventario";
		tr.appendChild(td);

		



		tbl.appendChild(tr);
	for(var f in dt){
		console.log(dt[f]);
		var tr=document.createElement("tr");
		tr.setAttribute("id","fila_inv_"+f);
		tr.setAttribute("name","fila_inv");
		tr.setAttribute("onclick","seleccionar_fila("+dt[f].codigo_producto+","+f+")");

		var td=document.createElement("td");
		

		if(document.getElementById("selSedesReporteInv").value=="0"){
			var inp=document.createElement("input");
			inp.setAttribute("type","text");		
			inp.setAttribute("id","codigo_producto_"+dt[f].id+"_"+dt[f].id_detalle_inventario);
			inp.setAttribute("onchange","editar_informacion('"+"codigo_producto"+"','"+dt[f].id+"','"+dt[f].id_detalle_inventario+"');");
			inp.setAttribute("value",dt[f].codigo_producto);
			td.appendChild(inp);
			

		}else{
			//inp.setAttribute("value",formato_numero(dt[f].precio_venta_sede,"0",",","."));
			td.innerHTML=dt[f].codigo_producto;
			
		}
		tr.appendChild(td);

		var td=document.createElement("td");
		
		if(document.getElementById("selSedesReporteInv").value=="0"){
			var inp=document.createElement("input");
			inp.setAttribute("type","text");
			inp.setAttribute("id","nombre_producto_"+dt[f].id+"_"+dt[f].id_detalle_inventario);
			inp.setAttribute("onchange","editar_informacion('"+"nombre_producto"+"','"+dt[f].id+"','"+dt[f].id_detalle_inventario+"');");
			inp.setAttribute("value",dt[f].nombre_producto);
			td.appendChild(inp);
			

		}else{
			td.innerHTML=dt[f].nombre_producto;
			
		}
		tr.appendChild(td);

		var td=document.createElement("td");
		
		if(document.getElementById("selSedesReporteInv").value=="0"){
			var inp=document.createElement("input");
			inp.setAttribute("type","text");
			inp.setAttribute("id","precio_compra_"+dt[f].id+"_"+dt[f].id_detalle_inventario);
			inp.setAttribute("onchange","editar_informacion('"+"precio_compra"+"','"+dt[f].id+"','"+dt[f].id_detalle_inventario+"');");
			inp.setAttribute("value",dt[f].precio_compra);
			td.appendChild(inp);
			

		}else{
			td.innerHTML=dt[f].precio_compra;	
			
		}
		tr.appendChild(td);

		var td=document.createElement("td");
		var inp=document.createElement("input");
		inp.setAttribute("type","text");
		inp.setAttribute("id","precio_venta_"+dt[f].id+"_"+dt[f].id_detalle_inventario);
		inp.setAttribute("onchange","editar_informacion('"+"precio_venta"+"','"+dt[f].id+"','"+dt[f].id_detalle_inventario+"');");
		
		if(document.getElementById("selSedesReporteInv").value=="0"){
			inp.setAttribute("value",dt[f].precio_venta);
			

		}else{
			//inp.setAttribute("value",formato_numero(dt[f].precio_venta_sede,"0",",","."));
			inp.setAttribute("value",dt[f].precio_venta_sede);
			
		}
		td.appendChild(inp);
		tr.appendChild(td);

		var td=document.createElement("td");
		var inp=document.createElement("input");
		inp.setAttribute("type","text");
		inp.setAttribute("id","precio_venta_blister_"+dt[f].id+"_"+dt[f].id_detalle_inventario);
		inp.setAttribute("onchange","editar_informacion('"+"precio_venta_blister"+"','"+dt[f].id+"','"+dt[f].id_detalle_inventario+"');");
		
		if(document.getElementById("selSedesReporteInv").value=="0"){
			inp.setAttribute("value",dt[f].precio_venta_blister);
			

		}else{
			inp.setAttribute("value",dt[f].precio_venta_blister_sede);
			
		}
		td.appendChild(inp);
		tr.appendChild(td);

		var td=document.createElement("td");
		var inp=document.createElement("input");
		inp.setAttribute("type","text");
		inp.setAttribute("id","precio_mayoreo_"+dt[f].id+"_"+dt[f].id_detalle_inventario);
		inp.setAttribute("onchange","editar_informacion('"+"precio_mayoreo"+"','"+dt[f].id+"','"+dt[f].id_detalle_inventario+"');");
		
		if(document.getElementById("selSedesReporteInv").value=="0"){
			inp.setAttribute("value",dt[f].precio_venta_unidad);
			

		}else{
			inp.setAttribute("value",dt[f].precio_mayoreo_sede);
			
		}
		td.appendChild(inp);
		tr.appendChild(td);

		
		var td=document.createElement("td");
			
		if(document.getElementById("selSedesReporteInv").value=="0"){
			var inp=document.createElement("input");
			inp.setAttribute("type","text");
			inp.setAttribute("id","unidades_por_caja_"+dt[f].id+"_"+dt[f].id_detalle_inventario);
			inp.setAttribute("onchange","editar_informacion('"+"unidades_por_caja"+"','"+dt[f].id+"','"+dt[f].id_detalle_inventario+"');");
			inp.setAttribute("value",dt[f].unidades_por_caja);	
			td.appendChild(inp);

		}else{
			td.innerHTML=dt[f].unidades_por_caja;
			
		}
		
		tr.appendChild(td);


		var td=document.createElement("td");
		
		if(document.getElementById("selSedesReporteInv").value=="0"){
			var inp=document.createElement("input");
			inp.setAttribute("type","text");
			inp.setAttribute("id","unidades_por_blister_"+dt[f].id+"_"+dt[f].id_detalle_inventario);
			inp.setAttribute("onchange","editar_informacion('"+"unidades_por_blister"+"','"+dt[f].id+"','"+dt[f].id_detalle_inventario+"');");
			inp.setAttribute("value",dt[f].unidades_por_blister);		
			td.appendChild(inp);
			

		}else{
			td.innerHTML=dt[f].unidades_por_blister;
			
		}
		tr.appendChild(td);




		var td=document.createElement("td");
		/*var inp=document.createElement("input");
		inp.setAttribute("type","text");
		inp.setAttribute("id","total_existencias_"+dt[f].id+"_"+dt[f].id_detalle_inventario);
		inp.setAttribute("onchange","editar_informacion('"+"total_existencias"+"','"+dt[f].id+"','"+dt[f].id_detalle_inventario+"');");
		inp.setAttribute("value",dt[f].total_existencias);		
		td.appendChild(inp);*/
		td.innerHTML=dt[f].total_existencias;
		tr.appendChild(td);	
		tr.appendChild(td);


		var td=document.createElement("td");
		/*var inp=document.createElement("input");
		inp.setAttribute("type","text");
		inp.setAttribute("id","total_existencias_blister_"+dt[f].id+"_"+dt[f].id_detalle_inventario);
		inp.setAttribute("onchange","editar_informacion('"+"total_existencias_blister"+"','"+dt[f].id+"','"+dt[f].id_detalle_inventario+"');");
		inp.setAttribute("value",dt[f].total_existencias_blister);		
		td.appendChild(inp);*/
		td.innerHTML=dt[f].total_existencias_blister;
		tr.appendChild(td);	
		tr.appendChild(td);

		
		var td=document.createElement("td");
		if(document.getElementById("selSedesReporteInv").value!="0"){
			var inp=document.createElement("input");
			inp.setAttribute("type","text");
			inp.setAttribute("id","cantidad_existencias_unidades_"+dt[f].id+"_"+dt[f].id_detalle_inventario);
			inp.setAttribute("onchange","editar_informacion('"+"cantidad_existencias_unidades"+"','"+dt[f].id+"','"+dt[f].id_detalle_inventario+"');");
			inp.setAttribute("value",dt[f].total_existencias_unidades);		
			td.appendChild(inp);
		}else{
			td.innerHTML=dt[f].total_existencias_unidades;
		}	
		tr.appendChild(td);
		tr.appendChild(td);

		

		var td=document.createElement("td");
		var inp=document.createElement("input");
		inp.setAttribute("type","text");
		inp.setAttribute("id","minimo_inventario_"+dt[f].id+"_"+dt[f].id_detalle_inventario);
		inp.setAttribute("onchange","editar_informacion('"+"minimo_inventario"+"','"+dt[f].id+"','"+dt[f].id_detalle_inventario+"');");
		if(document.getElementById("selSedesReporteInv").value=="0"){
			inp.setAttribute("value",dt[f].minimo_inventario);	
			

		}else{
			inp.setAttribute("value",dt[f].minimo_inventario_sede);	
			
		}
			
		td.appendChild(inp);
		tr.appendChild(td);
		tbl.appendChild(tr);
	}	
	fila_seleccionada=false;
}


var fila_seleccionada=false;
function seleccionar_fila(id,pos){
	console.log("fila_inv_"+pos)
	var ele=document.getElementById("fila_inv_"+pos);
	
	console.log(ele.childNodes);
	/*registrarDato(_URL+"traer_productos/"+id+"/"+document.getElementById("selSedesReporteInv").value,{},function(rs){
		if(rs.respuesta==true){
			dibujar_producto_edicion(rs.datos[0]);	
			fila_seleccionada=rs.datos[0];
		}
		
	});*/

	var filas=document.getElementsByName("fila_inv");
	for(var i in filas){
		console.log(filas[i].nodeType);
		if(filas[i].nodeType==1){
			if(filas[i].id=="fila_inv_"+pos){
				filas[i].style.background='blue';
			}else{
				filas[i].style.background='';
			}	
		}
		
	}


}

function calcular_totales_inventario(dt){
	var cuantos_productos=0;
	var total_inventario=0;
	var sub_total=0;
	for(var f in dt){
		cuantos_productos+=Number(dt[f].total_existencias_unidades);
		sub_total=Number(dt[f].precio_compra)*Number(dt[f].total_existencias);
		total_inventario+=sub_total;
		sub_total=0;
	}
	document.getElementById("h3CostoProdInv").innerHTML="$ "+formato_numero(total_inventario,"2",",",".");
	document.getElementById("h3TotalProductosInv").innerHTML=cuantos_productos;
}
function dibujar_producto_ajuste(d){
	document.getElementById("hdIdAjusteProd").value=d.id;
	document.getElementById("h4AjusteDesc").innerHTML=d.nombre_producto;
	document.getElementById("h3CantidadAjusteCJ").innerHTML=d.cantidad_existencias;	
	document.getElementById("h3CantidadAjusteUN").innerHTML=d.cantidad_existencias_unidades;	
	document.getElementById("h3CantidadAjusteBL").innerHTML=d.cantidad_existencias_blister;	
}


function buscar_reporte_movimientos(datos){
		var fil=[];
		var fil2=[];

			if(document.getElementById("dtBuscarFechaMovInv").value!=""){
				fil.push(["movimientos_inventario.created_at",
								">=",
							document.getElementById("dtBuscarFechaMovInv").value+" 00:00:00"]);	
				fil.push(["movimientos_inventario.created_at",
									"<=",
									document.getElementById("dtBuscarFechaMovInv").value+" 23:59:59"]);	
			}
			if(document.getElementById("selMovInvCajeros").value!=0){
				fil.push(["users.id","=",document.getElementById("selMovInvCajeros").value]);
			}	

			if(document.getElementById("txtBuscarCampInve").value!=""){
				fil.push(["productos.codigo_producto","LIKE",document.getElementById("txtBuscarCampInve").value]);
			}

			if(document.getElementById("selMovInvCate").value!=0){
				fil.push(["departamentos.id","=",document.getElementById("selMovInvCate").value]);
			}
			if(document.getElementById("selMovInv").value!="TODOS"){
				fil.push(["tipo","=",document.getElementById("selMovInv").value]);	
			}
			if(document.getElementById("selSedesMovInv").value!=0){
				fil.push(["sedes.id","=",document.getElementById("selSedesMovInv").value]);		
			}	


		
		if(document.getElementById("selSedesMovInv").value==0){
			var datos={
				tipo:"GENERAL",
				filtro:fil
				
				

			};	
		}else{
				
			var datos={
				tipo:"SEDE",
				sede:document.getElementById("selSedesMovInv").value,
				filtro:fil
			};
		}
		console.log(datos);
	registrarDato(_URL+"reporte_movimientos_inventario",datos,function(rs){
			consola(rs);	
			if(rs.respuesta==true){
				dibujar_reporte_movimiento(rs.datos);	
			}else{
				mostrarMensaje(rs);
			}
		});
	
}

function ocultar(){
	var ele=document.getElementsByName("tipo_entrada_rep_inv");
	for(var e in ele){
		console.log(ele[e]);
		//ele[e].style.display='none'
	}

}
function mostrar(valor){
	var ele=document.getElementsByName("tipo_entrada_rep_inv");
	for(var e in ele){
		if(valor!=ele[e].value){
			ele[e].style.display=''	
		}
		
	}

}
function ordenar_codigo(){
	if(orden=="ASC"){
						orden="DESC";
						repo_inve=repo_inve.sort(function (a, b){

						if ( a.codigo_producto < b.codigo_producto )
	  							return -1;
	    				if ( a.codigo_producto > b.codigo_producto )
	      						return 1;
	    						return 0;
					});
						

	
				}else{
					orden="ASC";
					repo_inve=repo_inve.sort(function (a, b){

						if ( a.codigo_producto > b.codigo_producto )
	  							return -1;
	    				if ( a.codigo_producto < b.codigo_producto )
	      						return 1;
	    						return 0;
					});	
				}	
				

				dibujar_reporte_inventario(repo_inve);
}
function ordenar_nombre(){

				if(orden=="ASC"){
						orden="DESC";
						repo_inve=repo_inve.sort(function (a, b){

						if ( a.nombre_producto < b.nombre_producto )
	  							return -1;
	    				if ( a.nombre_producto > b.nombre_producto )
	      						return 1;
	    						return 0;
					});
						

	
				}else{
					orden="ASC";
					repo_inve=repo_inve.sort(function (a, b){

						if ( a.nombre_producto > b.nombre_producto )
	  							return -1;
	    				if ( a.nombre_producto < b.nombre_producto )
	      						return 1;
	    						return 0;
					});	
				}	
				

				dibujar_reporte_inventario(repo_inve);
			}
function ordenar_costo(){

				if(orden=="ASC"){
						orden="DESC";
						repo_inve=repo_inve.sort(function (a, b){

						return (  b.precio_compra - a.precio_compra )
	  							 
	    				
					});
						

	
				}else{
					orden="ASC";
					repo_inve=repo_inve.sort(function (a, b){

						return ( a.precio_compra - b.precio_compra )
	  					
					});	
				}	
				

				dibujar_reporte_inventario(repo_inve);
			}			

function ordenar_precio_venta(){

				if(orden=="ASC"){
						orden="DESC";
						repo_inve=repo_inve.sort(function (a, b){

						return (  b.precio_venta - a.precio_venta )
	  							 
	    				
					});
						

	
				}else{
					orden="ASC";
					repo_inve=repo_inve.sort(function (a, b){

						return ( a.precio_venta - b.precio_venta )
	  					
					});	
				}	
				

				dibujar_reporte_inventario(repo_inve);
			}
function ordenar_existencias_inv(){

				if(orden=="ASC"){
						orden="DESC";
						repo_inve=repo_inve.sort(function (a, b){

						return (  b.total_existencias - a.total_existencias )
	  							 
	    				
					});
						

	
				}else{
					orden="ASC";
					repo_inve=repo_inve.sort(function (a, b){

						return ( a.total_existencias - b.total_existencias )
	  					
					});	
				}	
				

				dibujar_reporte_inventario(repo_inve);
			}			
function ordenar_existencias_inv_uni(){

				if(orden=="ASC"){
						orden="DESC";
						repo_inve=repo_inve.sort(function (a, b){

						return (  b.total_existencias_unidades - a.total_existencias_unidades )
	  							 
	    				
					});
						

	
				}else{
					orden="ASC";
					repo_inve=repo_inve.sort(function (a, b){

						return ( a.total_existencias_unidades - b.total_existencias_unidades )
	  					
					});	
				}	
				

				dibujar_reporte_inventario(repo_inve);
			}			
function ordenar_hora_movimiento(){
					if(orden=="ASC"){
						orden="DESC";
						repo_mov=repo_mov.sort(function (a, b){

								if ( a.created_at < b.created_at )
	  									return -1;
	    						if ( a.created_at > b.created_at )
	      								return 1;
	    								return 0;
								});
					}else{
						orden="ASC";
						repo_mov=repo_mov.sort(function (a, b){

								if ( a.created_at > b.created_at )
	  									return -1;
	    						if ( a.created_at < b.created_at )
	      								return 1;
	    								return 0;
								});
					}
						
					
					dibujar_reporte_movimiento(repo_mov);
			}			
function ordenar_nombre_mov(){
					if(orden=="ASC"){
						orden="DESC";
						repo_mov=repo_mov.sort(function (a, b){

								if ( a.nombre_producto < b.nombre_producto )
	  									return -1;
	    						if ( a.nombre_producto > b.nombre_producto )
	      								return 1;
	    								return 0;
								});
					}else{
						orden="ASC";
						repo_mov=repo_mov.sort(function (a, b){

								if ( a.nombre_producto > b.nombre_producto )
	  									return -1;
	    						if ( a.nombre_producto < b.nombre_producto )
	      								return 1;
	    								return 0;
								});
					}
						
					
					dibujar_reporte_movimiento(repo_mov);
			}			
function ordenar_codigo_bajo_inv(){
					if(orden=="ASC"){
						orden="DESC";
						repo_bajo=repo_bajo.sort(function (a, b){

								if ( a.codigo_producto < b.codigo_producto )
	  									return -1;
	    						if ( a.codigo_producto > b.codigo_producto )
	      								return 1;
	    								return 0;
								});
					}else{
						orden="ASC";
						repo_bajo=repo_bajo.sort(function (a, b){

								if ( a.codigo_producto > b.codigo_producto )
	  									return -1;
	    						if ( a.codigo_producto < b.codigo_producto )
	      								return 1;
	    								return 0;
								});
					}
				
					dibujar_reporte_bajo_en_inventario(repo_bajo);
			}			
function ordenar_nombre_bajo_inv(){
					if(orden=="ASC"){
						orden="DESC";
						repo_bajo=repo_bajo.sort(function (a, b){

								if ( a.nombre_producto < b.nombre_producto )
	  									return -1;
	    						if ( a.nombre_producto > b.nombre_producto )
	      								return 1;
	    								return 0;
								});
					}else{
						orden="ASC";
						repo_bajo=repo_bajo.sort(function (a, b){

								if ( a.nombre_producto > b.nombre_producto )
	  									return -1;
	    						if ( a.nombre_producto < b.nombre_producto )
	      								return 1;
	    								return 0;
								});
					}
				
					dibujar_reporte_bajo_en_inventario(repo_bajo);
			}			
function ordenar_precio_venta_bajo_inv(){
					if(orden=="ASC"){
						orden="DESC";
						repo_bajo=repo_bajo.sort(function (a, b){

								return ( a.precio_venta - b.precio_venta );
	  							
								});
					}else{
						orden="ASC";
						repo_bajo=repo_bajo.sort(function (a, b){

								return ( b.precio_venta - a.precio_venta );
							});
					}	
				
					dibujar_reporte_bajo_en_inventario(repo_bajo);
			}			
function ordenar_cj_bajo_inv(){
					if(orden=="ASC"){
						orden="DESC";
						repo_bajo=repo_bajo.sort(function (a, b){

								return ( a.cantidad_existencias - b.cantidad_existencias );
	  							
								});
					}else{
						orden="ASC";
						repo_bajo=repo_bajo.sort(function (a, b){

								return ( b.cantidad_existencias - a.cantidad_existencias );
							});
					}	
				
					dibujar_reporte_bajo_en_inventario(repo_bajo);
			}			
function ordenar_un_bajo_inv(){
					if(orden=="ASC"){
						orden="DESC";
						repo_bajo=repo_bajo.sort(function (a, b){

								return ( a.cantidad_existencias_unidades - b.cantidad_existencias_unidades );
	  							
								});
					}else{
						orden="ASC";
						repo_bajo=repo_bajo.sort(function (a, b){

								return ( b.cantidad_existencias_unidades - a.cantidad_existencias_unidades );
							});
					}	
					
					dibujar_reporte_bajo_en_inventario(repo_bajo);
			}			
function ordenar_categoria(){
					if(orden=="ASC"){
						orden="DESC";
						repo_bajo=repo_bajo.sort(function (a, b){

								if ( a.nombre_departamento < b.nombre_departamento )
	  									return -1;
	    						if ( a.nombre_departamento > b.nombre_departamento )
	      								return 1;
	    								return 0;
								});
					}else{
						orden="ASC";
						repo_bajo=repo_bajo.sort(function (a, b){

								if ( a.nombre_departamento > b.nombre_departamento )
	  									return -1;
	    						if ( a.nombre_departamento < b.nombre_departamento )
	      								return 1;
	    								return 0;
								});
					}
				
					dibujar_reporte_bajo_en_inventario(repo_bajo);
			}			
function exportar_inventario(){


 	if(this.id=="accion_continuar_exportar_inv"){
 		//aqui arego lo que tenga que agregar a variable datos
 		datos_exportar_inv.email_usuario=_usuario.email;
 		$('.mascara, #mensaje_exportar_inv').fadeOut("fast");
 	}else{
 		datos_exportar_inv.email_usuario=false;
 	}

	registrarDato(_URL+"exportar/reporte_inventario",datos_exportar_inv,function(rs){
		consola(rs);	
		if(rs.respuesta==true){
			$('#mensaje_exportar_inv').fadeOut("fast");
			var li=document.getElementById("aDirExportacionRepoInv");
			var a=document.createElement("a");
			a.innerHTML=rs.direccion;
			a.href=_URL+"archivos/exportacion/excel/"+rs.direccion;
			a.target="_blank";
			li.appendChild(a);
			mostrarMensaje(rs);
		}
	});
	
}			
function exportar_bajo_inv(){
	if(this.id=="accion_continuar_exportar_bajo_inv"){
 		//aqui arego lo que tenga que agregar a variable datos
 		datos_exportar_bajo_inv.email_usuario=_usuario.email;
 		$('.mascara, #mensaje_exportar_bajo_inv').fadeOut("fast");
 	}else{
 		datos_exportar_bajo_inv.email_usuario=false;
 	}

	registrarDato(_URL+"exportar/reporte_bajo_inventario",datos_exportar_bajo_inv,function(rs){
						consola(rs);	
						if(rs.respuesta==true){
							console.log(rs);
							$('.mascara, #mensaje_exportar_bajo_inv').fadeOut("fast");
							mostrarMensaje(rs);
							var liExpoBajoInv=document.getElementById("aExpoBajoInv");
											
							liExpoBajoInv.innerHTML="";

							var li=document.createElement("li");			
							var aExpoBajoInv=document.createElement("a");
							aExpoBajoInv.setAttribute("target","_blank");
							aExpoBajoInv.setAttribute("href",_URL+"archivos/exportacion/excel/"+rs.direccion);
							aExpoBajoInv.innerHTML=" 1 "+rs.direccion;
							li.appendChild(aExpoBajoInv);
							liExpoBajoInv.appendChild(li);

							var li=document.createElement("li");							
							var aExpoBajoInvtxt=document.createElement("a");
							aExpoBajoInvtxt.setAttribute("target","_blank");
							aExpoBajoInvtxt.setAttribute("href",_URL+"archivos/pedidos/txt/"+rs.archivo_plano);
							aExpoBajoInvtxt.innerHTML=" 2 "+rs.archivo_plano;
							li.appendChild(aExpoBajoInvtxt);
							liExpoBajoInv.appendChild(li);

						}
					});
}
function editar_informacion(campo,id_producto,id_producto_inventario){
	
	var sel=document.getElementById("selSedesReporteInv").value;
	console.log(sel);

	console.log(document.getElementById(campo+"_"+id_producto+"_"+id_producto_inventario));
	console.log(document.getElementById(campo+"_"+id_producto+"_"+id_producto_inventario).value);
	if(document.getElementById(campo+"_"+id_producto+"_"+id_producto_inventario).value!=""){
		registrarDato(_URL+"editar_informacion",{campo:campo,
											  valor:document.getElementById(campo+"_"+id_producto+"_"+id_producto_inventario).value,
											  sede:sel,
											  id_producto:id_producto,
											  id_producto_inventario:id_producto_inventario,
											  usuario:_usuario.id_usuario
											},function(rs){
												console.log(rs);
												if(rs.respuesta==false){
													mostrarMensaje(rs);
												}
											});	
	}else{
		mostrarMensaje("El campo no puede estar vacio");
	}
	
}
function crear_sel_paginas(dat){
		  var cta=document.getElementById("selPaginas");
          cta.innerHTML="";
          
          cta.setAttribute("onchange","cargar_hoja()");
        
        for(var d=0; d<=dat;d++){
          var li=document.createElement("option");
        
          li.innerHTML="pagina "+(d+1);
          
          li.value=d;
          
          cta.appendChild(li);

        }
}
function cargar_hoja(){
	dibujar_reporte_inventario(repo_inve_todo[document.getElementById("selPaginas").value]);
	calcular_totales_inventario(repo_inve_todo[document.getElementById("selPaginas").value]);	
	repo_inve=repo_inve_todo[document.getElementById("selPaginas").value];
}