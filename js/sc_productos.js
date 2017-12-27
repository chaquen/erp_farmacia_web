
var datos_reporte_ventas;
var editando=false;

function iniciar_producto(valido){

	if(valido){
		agregarEvento(_btnCrearProducto,"click",function(){
			var vf=obtener_valores_formulario("formCrearProducto");
			if(vf!=false){
				console.log(vf);
				var sede=false;
				var correcto=true;
				if(vf.Select.length==4){
					correcto=true;
						
					if(vf.Select[0]!="0"){correcto=true;}else{correcto=false;mostrarMensaje("Por favor selecciona un tipo de venta");}

					if(vf.Select[1]!="0"){correcto=true;}else{correcto=false;mostrarMensaje("Por favor selecciona una categoria");}
					
					if(vf.Select[2]!="0"){correcto=true;}else{correcto=false;mostrarMensaje("Por favor selecciona un proveedor");}
					
					if(vf.Select[3]!="--"){correcto=true;}else{correcto=false;mostrarMensaje("por favor selecciona una sede")}
					
				}else{
					correcto=false;
				}
				if(vf.Numero.length<7){
					correcto=false;
				}
				if(vf.Texto.length<2){
					correcto=false;
				}

				if(correcto){
					if(document.getElementById("selSedes1").value!="0"){
						sede=vf.Select[3];
					}
					var precio_venta;
					var precio_venta_blister;
					var precio_venta_mayoreo;

					if(vf.Select[0]=="PorUnidad"){
						precio_venta=vf.Numero[12];
						precio_venta_blister=vf.Numero[12];
						precio_venta_mayoreo=vf.Numero[12];
					}else if(vf.Select[0]=="Caja"){
						precio_venta=vf.Numero[12];
						precio_venta_blister=vf.Numero[12];
						precio_venta_mayoreo=vf.Numero[14];
					}else if(vf.Select[0]=="CajaBlister"){
						precio_venta=vf.Numero[12];
						precio_venta_blister=vf.Numero[14];
						precio_venta_mayoreo=vf.Numero[13];
					}
					
					var inve="0";
					if(document.getElementById("chInventario").checked){
						inve="1";
					}

					var datos={
						codigo_distribuidor:vf.Texto[0],
						codigo_producto:vf.Texto[1],
						nombre_producto:vf.Texto[2],
						descripcion_producto:vf.Texto[2],
						laboratorio:vf.Texto[3],
						tipo_presentacion_producto:"UN",
						tipo_venta_producto:vf.Select[0],
						unidades_por_caja:vf.Numero[0],
						unidades_por_blister:vf.Numero[1],
						precio_compra:vf.Numero[2],
						precio_compra_blister:vf.Numero[3],
						precio_compra_unidad:vf.Numero[4],
						precio_venta:precio_venta,
						precio_venta_blister:precio_venta_blister,
						precio_mayoreo:precio_venta_mayoreo,
						porcentaje_ganancia:vf.Numero[9] ,
						porcentaje_ganancia_blister:vf.Numero[10] ,
						porcentaje_ganancia_unidad:vf.Numero[11],
						minimo_inventario:vf.Numero[16],
						maximo_inventario:0,
						cantidad_existencias:vf.Numero[15],
						fk_id_departamento:vf.Select[1],
						impuestos:vf.Numero[5],
						fk_id_sede:sede,
						fk_id_usuario:_usuario.id_usuario,
						fk_id_proveedor:vf.Select[2],
						inventario:inve
						
					};
					registrarDato(_URL+"productos",datos,function(rs){
						mostrarMensaje(rs);
						
					},"formCrearProducto");
					document.getElementById("numPorcGanaUni").value="20";
					
				}else{
					mostrarMensaje("Por favor ingresa todos los datos");
				}

			}else{
				mostrarMensaje("Por favor ingresa valores");
			}
			
		});

	agregarEvento(_btnConsultarProducto,"click",function(){
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

	agregarEvento(_btnEditarProducto,"click",function(){

		var vf=obtener_valores_formulario("formModificarProducto");
		console.log(vf);
		if(vf!=false){
				console.log(vf);
				var sede=false;
				var correcto=true;
				if(vf.Select.length==4){
					correcto=true;
					if(vf.Select[0]!=0){correcto=true;}else{correcto=false;}
					if(vf.Select[1]!=0){correcto=true;}else{correcto=false;}
					if(vf.Select[2]!=0){correcto=true;}else{correcto=false;}
					if(vf.Select[3]!="--"){correcto=true;}else{correcto=false;}
					
				}else{
					correcto=false;
				}
				if(vf.Numero.length<7){
					correcto=false;
				}
				if(vf.Texto.length<2){
					correcto=false;
				}

				if(correcto){
					if(document.getElementById("selSedes1").value!=0){
						sede=vf.Select[3];
					}
					var precio_venta;
					var precio_venta_blister;
					var precio_venta_mayoreo;


						precio_venta=vf.Numero[12];
						precio_venta_blister=vf.Numero[13];
						precio_venta_mayoreo=vf.Numero[14];

					var inv="0";
					if(document.getElementById("chInventarioEdi").checked){
						inv="1";
					}


					
					var datos={
						codigo_distribuidor:vf.Texto[0],
						codigo_producto:vf.Texto[1],
						nombre_producto:vf.Texto[2],
						laboratorio:vf.Texto[3],
						descripcion_producto:vf.Texto[2],
						tipo_venta_producto:vf.Select[0],
						
						unidades_por_caja:vf.Numero[0],
						unidades_por_blister:vf.Numero[1],
						precio_compra:vf.Numero[2],
						precio_compra_blister:vf.Numero[3],
						precio_compra_unidad:vf.Numero[4],
						precio_venta:precio_venta,
						precio_venta_blister:precio_venta_blister,
						precio_mayoreo:precio_venta_mayoreo,
						porcentaje_ganancia:vf.Numero[9] ,
						porcentaje_ganancia_blister:vf.Numero[10],
						porcentaje_ganancia_unidad:vf.Numero[11],
						minimo_inventario:vf.Numero[16],
						maximo_inventario:0,
						
						fk_id_departamento:vf.Select[1],
						impuestos:vf.Numero[5],
						fk_id_sede:sede,
						fk_id_usuario:_usuario.id_usuario,
						fk_id_proveedor:vf.Select[2],
						inventario:inv
						
					};
					editarDato(_URL+"productos/"+vf.Hidden[0],datos,function(rs){
						mostrarMensaje(rs);
						//iniciar_bodega_offline(_IdSede)
					},"formModificarProducto");
					document.getElementById("numPorcGanaBlisterEdi").value="20";
					document.getElementById("numPorcGanaUni").value="20";
					editando=false;

				}else{
					mostrarMensaje("Por favor ingresa todos los datos");
				}

			}else{
				mostrarMensaje("Por favor ingresa valores");
			}
		
	});

	agregarEvento(_btnEliminarProducto,"click",function(){
		if(confirm("¿Desea eliminar este producto?")){
			var datos={};
			var id=document.getElementById("hdIdProductoEliminar").value;
			eliminarDato(_URL+"productos/"+id,datos,function(rs){
				mostrarMensaje(rs);
			},"formBuscarEliminarProd");
		}
	});

	agregarEvento("txtCodigoCrearProducto","change",function(){
			var datos={};
			var valor_consulta=this.value;
			consultarDatos(_URL+"productos/"+valor_consulta,datos,function(rs){
				if(rs.respuesta==true){
					mostrarMensaje("Este CODIGO ya existe");			
					document.getElementById("txtCodigoCrearProducto").value="";
				}
				
			},"");
	});
	//calcular precio al cambiar precio costo
	agregarEvento("numPreCos","change",function(){
		
		calcular_valores_nuevo_producto();
		
	});
	agregarEvento("numImpuesto","change",function(){
		calcular_valores_nuevo_producto();
	});
	//calcular precio al cambiar porcentaje
	agregarEvento("numPorcGana","change",function(){
		calcular_valores_nuevo_producto();
	});
	agregarEvento("numPorcGanaBliUni","change",function(){
		calcular_valores_nuevo_producto();
	});
	agregarEvento("numPorcGanaUni","change",function(){
		calcular_valores_nuevo_producto();
	});
	//calcular precio al cambiar precio venta
	/*agregarEvento("numValVen","change",function(){
		var por=(Number(document.getElementById("numPreCos").value)*Number(document.getElementById("numPorcGana").value))/100;
		console.log(Number(document.getElementById("numPreCos").value));
		console.log(Number(document.getElementById("numPorcGana").value));
		console.log(por);

		console.log(por+Number(document.getElementById("numPreCos").value));
		document.getElementById("numValVen").value=por+Number(document.getElementById("numPreCos").value);
	});*/
//cambio precio EDICION
	//calcular precio al cambiar precio costo
	agregarEvento("numNuevoProdPreCosto","change",function(){
		calcular_valores_editar_producto();
	});
	//calcular precio al cambiar porcentaje
	agregarEvento("numPorcGanaEdi","change",function(){
		calcular_valores_editar_producto();
	});
	agregarEvento("numNuevoUniCaja","change",function(){
		calcular_valores_editar_producto();
	});
	agregarEvento("numNuevoUniCajaBlister","change",function(){
		calcular_valores_editar_producto();
	});
	
	agregarEvento("numValVenEdi","change",function(){
		calcular_valores_editar_producto_porcentaje();
	});
	agregarEvento("numValVenBliUniEdi","change",function(){
		calcular_valores_editar_producto_porcentaje();
	});
	agregarEvento("numValVenUniEdi","change",function(){
		calcular_valores_editar_producto_porcentaje();
	});
	//calcular precio al cambiar precio venta

	agregarEvento("selTipoVenta","change",function(){
		if(this.value=="Caja"){
			document.getElementById("liUniCaja").style.display="";
			document.getElementById("liUniCajaBlister").style.display="none";
			document.getElementById("liPreUniCaja").style.display="";
			document.getElementById("liPreCosUni").style.display="";
			document.getElementById("liPorGanUni").style.display="";
			document.getElementById("liPorGanBliUni").style.display="none";
			document.getElementById("liPreCostoUniImp").style.display="";
			document.getElementById("liPreCosBli").style.display="none";
			document.getElementById("liPreUniBli").style.display="none";
			document.getElementById("liPreCostoBliImp").style.display="none";
			document.getElementById("numUniCajaBlister").value="1";
			document.getElementById("numPreCostoBliImpu").value="0";
			document.getElementById("numValVenBliUni").value="0";
			document.getElementById("numPorcGanaBliUni").value="0";
			
			
		}else if(this.value=="PorUnidad"){
			document.getElementById("liUniCaja").style.display="none";
			document.getElementById("liUniCajaBlister").style.display="none";
			document.getElementById("liPreUniCaja").style.display="none";
			document.getElementById("liPreCosUni").style.display="none";
			document.getElementById("liPorGanUni").style.display="none";
			document.getElementById("liPorGanBliUni").style.display="none";
			document.getElementById("liPreCostoUniImp").style.display="none";
			document.getElementById("liPreCosBli").style.display="none";
			document.getElementById("liPreUniBli").style.display="none";
			document.getElementById("liPreCostoBliImp").style.display="none";
			document.getElementById("numUniCajaBlister").value="1";
			document.getElementById("numUniCaja").value="1";
			document.getElementById("numImpuesto").value="0";
			document.getElementById("numPreCostoBliImpu").value="0";
			document.getElementById("numValVenBliUni").value="0";
			document.getElementById("numPorcGanaBliUni").value="0";
			
		}else{
			document.getElementById("liUniCaja").style.display="";
			document.getElementById("liUniCajaBlister").style.display="";
			document.getElementById("liPreUniCaja").style.display="";
			document.getElementById("liPreCosUni").style.display="";
			document.getElementById("liPorGanUni").style.display="";
			document.getElementById("liPorGanBliUni").style.display="";
			document.getElementById("liPreCostoUniImp").style.display="";
			document.getElementById("liPreCosBli").style.display="";
			document.getElementById("liPreUniBli").style.display="";
			document.getElementById("liPreCostoBliImp").style.display="";
		}
	});
	//cambio de porcentaje de impuesto
	agregarEvento("numNuevoImpuesto","change",function(){
		calcular_valores_editar_producto();
	});
	agregarEvento("numPorcGanaUniEdi","change",function(){
		calcular_valores_editar_producto();
	});
	agregarEvento("selNuevoProdTipoVenta","change",function(){
		if(this.value=="Caja"){
			document.getElementById("liUniCajaEdi").style.display="";
			document.getElementById("liPreUniCajaEdi").style.display="";
			document.getElementById("liPorGanUniEdi").style.display="";
			document.getElementById("liPreUniCajBlisterEdi").style.display="none";;
			
			document.getElementById("liPorGanBliUni").style.display="none";
		}else if (this.value=="PorUnidad"){
			document.getElementById("liUniCajaEdi").style.display="none";
			document.getElementById("liPreUniCajaEdi").style.display="none";
			document.getElementById("liPorGanUniEdi").style.display="none";
			document.getElementById("liPorGanBliUni").style.display="none";
			document.getElementById("liPreUniCajBlisterEdi").style.display="none";;

		}else{
			document.getElementById("liUniCajaEdi").style.display="";
			document.getElementById("liPreUniCajaEdi").style.display="";
			document.getElementById("liUniCajaBlisterEdi").style.display="";
			document.getElementById("liPreUniCajBlisterEdi").style.display="";
			document.getElementById("liPorGanUniEdi").style.display="";
			document.getElementById("liPorGanBliUni").style.display="";
			document.getElementById("liPorGanUniEdi").style.display="";
			
		}
	});
	agregarEvento("numUniCaja","change",function(){
		calcular_valores_nuevo_producto();
	});
	agregarEvento("numUniCajaBlister","change",function(){
		calcular_valores_nuevo_producto();
	});

	agregarEvento("btnCancelraCrearProducto","click",function(){
		limpiarFormulario("formCrearProducto");
	});

	
	agregarEvento("btnEditarProducto","click",function(){
		if(editando){
			document.getElementById("txtBuscarEditarProducto").value="";	
		}else{
			mostrarMensaje("no se ha seleccionado ningun producto");
		}
		

	})
	agregarEvento("txtBuscarEditarProducto","keypress",function(e){
		
		if(e.keyCode!=13){
			var vf=obtener_valores_formulario("formEditarProducto");
			if(vf!=false){

			
				var datos={};
				if(vf.Texto[0]!=""){
					var valor_consulta=vf.Texto[0];
					consultarDatos(_URL+"productos/"+valor_consulta,datos,function(rs){
						consola(rs);
						if(rs.respuesta==true){
							
									crear_data_list_producto("lista_editar_producto",rs.datos);			
									
						}
							
						//e.preventDefault();	
					},"formulario");	
				}
				
			}else{
				mostrarMensaje("Por favor ingresa valores");
			}
			
		}else{
			e.preventDefault();	
			
		}
		
		
	});
	agregarEvento("txtBuscarEliminarProducto","change",function(e){

		if(e.keyCode!=13){
			var vf=obtener_valores_formulario("formBuscarEliminarProd");
			console
			if(vf!=false){

			
				var datos={};
				if(vf.Texto[0]!=""){
					var valor_consulta=vf.Texto[0];
					consultarDatos(_URL+"productos/"+valor_consulta,datos,function(rs){
						consola(rs);
						if(rs.respuesta==true){
							for(var f in rs.datos){
								if(rs.datos[f].codigo_producto == document.getElementById("txtBuscarEliminarProducto").value){
										dibujar_producto_eliminar(rs.datos[0]);
								}
							}
							
						}
						
					},"formulario");	
				}
				
			}else{
				mostrarMensaje("Por favor ingresa valores");
			}
			
		}else{
			//e.preventDefault();	
			//agregar_session_storage("que paso",horaCliente());
		}
		
		
	});
	agregarEvento("txtBuscarEliminarProducto","keypress",function(e){

		if(e.keyCode!=13){
			var vf=obtener_valores_formulario("formBuscarEliminarProd");
			console
			if(vf!=false){

			
				var datos={};
				if(vf.Texto[0]!=""){
					var valor_consulta=vf.Texto[0];
					consultarDatos(_URL+"productos/"+valor_consulta,datos,function(rs){
						consola(rs);
						if(rs.respuesta==true){
							crear_data_list_producto("lista_eliminar_producto",rs.datos);		
						}else{

						}
						
						//e.preventDefault();	
					},"formulario");	
				}
				
			}else{
				mostrarMensaje("Por favor ingresa valores");
			}
			
		}else{
			//e.preventDefault();	
			//agregar_session_storage("que paso",horaCliente());
		}
		
		
	});
	agregarEvento("txtBuscarEditarProducto","change",function(){
		var vf=obtener_valores_formulario("formEditarProducto");
		if(vf!=false){
		
			var datos={};
			if(vf.Texto[0]!=""){
				var valor_consulta=vf.Texto[0];
				consultarDatos(_URL+"productos/"+valor_consulta,datos,function(rs){
					document.getElementById("selSedes2").value="0";
					consola(rs);
					if(rs.respuesta==true){
						for(var f in rs.datos){
								if(rs.datos[f].codigo_producto == document.getElementById("txtBuscarEditarProducto").value){
										dibujar_producto_edicion(rs.datos[f]);
										 $('#nuevoProducto, #eliminarProducto, #editarProducto, #categoriaProducto, #ventasPeriodo, #promo').fadeOut('fast');
        								 $('#resultadoEdicionP').fadeIn('slow');
        								 editando=true;
								}
						}
						
					}
					
				},"formulario");	
			}
			
		}else{
			mostrarMensaje("Por favor ingresa valores");
		}
	});
	agregarEvento("selSedes2","change",function(){
		//BUSCAR INFORMACION DEL PRODUCTO POR SEDE
		if(this.value!=0){
			registrarDato(_URL+"traer_productos/"+document.getElementById("txtNuevoProdCod").value+"/"+this.value,{},function(rs){
				console.log(rs);
				if(rs.respuesta==true){
					//mostrar informacion
					//cargar informacion en formulario edicion
					var no_sel=false;
					for(var f in rs.datos){
						if(document.getElementById("txtNuevoProdCod").value==rs.datos[f].codigo_producto){

							dibujar_producto_edicion(rs.datos[f]);	
							no_sel=true;
							break;
						}
						
					}
					
					if(!no_sel){
						document.getElementById("numExistencias").value=0;
						mostrarMensaje("Este producto actualmente no existe en esta sede");
					}
				}else{
					document.getElementById("numExistencias").value=0;
					mostrarMensaje("Este producto actualmente no existe en esta sede");
				}
			});	
		}else{
			var vf=obtener_valores_formulario("formEditarProducto");
			if(vf!=false){
			
				var datos={};
				if(vf.Texto[0]!=""){
					var valor_consulta=vf.Texto[0];
					consultarDatos(_URL+"productos/"+valor_consulta,datos,function(rs){
						consola(rs);
						if(rs.respuesta==true){
								dibujar_producto_edicion(rs.datos[0]);
						}
						
					},"formulario");	
				}
				
			}else{
				mostrarMensaje("Por favor ingresa valores");
			}
		}
			
	});
	agregarEvento("ventaPer","click",function(){
		
		 var fli=[];

			switch(this.value){
				case "hoy":
						document.getElementById("liFechas").style.display='none';
						fli[0]=["facturas.registro_factura",">=",horaCliente().split(" ")[0]+" 00:00:00"];
						fli[1]=["facturas.registro_factura","<=",horaCliente().split(" ")[0]+" 23:59:59"];
					
					break;
				case "ayer":
						document.getElementById("liFechas").style.display='none';
					
						fli[0]=["facturas.registro_factura",">=",ayer()+" 00:00:00"];
						fli[1]=["facturas.registro_factura","<=",ayer()+" 23:59:59"];
					break;
				case "estemes":
					document.getElementById("liFechas").style.display='none';
						este_mes();
						fli[0]=["facturas.registro_factura",">=",este_mes()[0]+" 00:00:00"];
						fli[1]=["facturas.registro_factura","<=",este_mes()[1]+" 23:59:59"];

					break;
				case "periodo":
					document.getElementById("liFechas").style.display='';
						var tbl=document.getElementById("tblReporteVentaPeriodo");
						tbl.innerHTML="";
						
					return false;
					break;		
			}
			if(document.getElementById("selSedesRepoVenta").value!=0){
				fli.push(["sedes.id","=",document.getElementById("selSedesRepoVenta").value]);
				var datos={
					tipo:"SEDE",
					filtro:fli,
					
				};
			}else{
				var datos={
					tipo:"GENERAL",
					filtro:fli
				};
			}
				registrarDato(_URL+"reporte_ventas_por_periodo",datos,function(rs){
					consola(rs);
					if(rs.respuesta==true){
						var tbl=document.getElementById("tblReporteVentaPeriodo");
						tbl.innerHTML="";
						dibujar_reporte_venta_por_periodo(rs.datos);	
					}else{
						var tbl=document.getElementById("tblReporteVentaPeriodo");
						tbl.innerHTML="";
						mostrarMensaje(rs);
					}
				});

	});

	agregarEvento("selPeridoReporte","change",function(){
		
		 var fli=[];

			switch(this.value){
				case "hoy":
						document.getElementById("liFechas").style.display='none';
						fli[0]=["facturas.registro_factura",">=",horaCliente().split(" ")[0]+" 00:00:00"];
						fli[1]=["facturas.registro_factura","<=",horaCliente().split(" ")[0]+" 23:59:59"];
					
					break;
				case "ayer":
						document.getElementById("liFechas").style.display='none';
					
						fli[0]=["facturas.registro_factura",">=",ayer()+" 00:00:00"];
						fli[1]=["facturas.registro_factura","<=",ayer()+" 23:59:59"];
					break;
				case "estemes":
					document.getElementById("liFechas").style.display='none';
						este_mes();
						fli[0]=["facturas.registro_factura",">=",este_mes()[0]+" 00:00:00"];
						fli[1]=["facturas.registro_factura","<=",este_mes()[1]+" 23:59:59"];

					break;
				case "periodo":
					document.getElementById("liFechas").style.display='';
						var tbl=document.getElementById("tblReporteVentaPeriodo");
						tbl.innerHTML="";
						
					return false;
					break;		
			}
			if(document.getElementById("selSedesRepoVenta").value!=0){
				fli.push(["sedes.id","=",document.getElementById("selSedesRepoVenta").value]);
				var datos={
					tipo:"SEDE",
					filtro:fli,
					
				};
			}else{
				var datos={
					tipo:"GENERAL",
					filtro:fli
				};
			}
				registrarDato(_URL+"reporte_ventas_por_periodo",datos,function(rs){
					consola(rs);
					if(rs.respuesta==true){
						var tbl=document.getElementById("tblReporteVentaPeriodo");
						tbl.innerHTML="";
						dibujar_reporte_venta_por_periodo(rs.datos);	
					}else{
						var tbl=document.getElementById("tblReporteVentaPeriodo");
						tbl.innerHTML="";
						mostrarMensaje(rs);
					}
				});

	});

	agregarEvento("fin","change",function(){
			var fil=[];
			if(document.getElementById("selSedesRepoVenta").value!=0){
				fli.push(["sedes.id","=",document.getElementById("selSedesRepoVenta").value]);
				var datos={
					tipo:"SEDE",
					filtro:fil,
					
				};
			}else{
				var datos={
					tipo:"GENERAL",
					filtro:fil
				};
			}

			var fini=document.getElementById("inicio");	
			var ffin=document.getElementById("fin");	
			if(fini.value!=""){
			 	if(ffin.value!=""){
					fli[0]=["facturas.registro_factura",">=",fini.value+" 00:00:00"];
			 		fli[1]=["facturas.registro_factura","<=",ffin.value+" 23:59:59"];
			 	}else{
			 		fil[0]=["facturas.registro_factura",">=",fini.value+" 00:00:00"];
			 		fil[1]=["facturas.registro_factura","<=",horaCliente().split(" ")[0]+" 23:59:59"];;
			 	}

			 	registrarDato(_URL+"reporte_ventas_por_periodo",datos,function(rs){
					if(rs.respuesta==true){
						dibujar_reporte_venta_por_periodo(rs.datos);	
					}else{
						var tbl=document.getElementById("tblReporteVentaPeriodo");
						tbl.innerHTML="";
						mostrarMensaje(rs);
					}
				});

			}else{
				var tbl=document.getElementById("tblReporteVentaPeriodo");
						tbl.innerHTML="";
				mostrarMensaje("Por favor selecciona la fecha para la primer casilla");
			} 	

	});

	agregarEvento("selSedesRepoVenta","change",function(){
		var fli=[];
		switch(selPeridoReporte.value){
			case "hoy":
					document.getElementById("liFechas").style.display='none';
					fli[0]=["facturas.registro_factura",">=",horaCliente().split(" ")[0]+" 00:00:00"];
					fli[1]=["facturas.registro_factura","<=",horaCliente().split(" ")[0]+" 23:59:59"];
				
				break;
			case "ayer":
					document.getElementById("liFechas").style.display='none';
				
					fli[0]=["facturas.registro_factura",">=",ayer()+" 00:00:00"];
					fli[1]=["facturas.registro_factura","<=",ayer()+" 23:59:59"];
				break;
			case "estemes":
				document.getElementById("liFechas").style.display='none';
					este_mes();
					fli[0]=["facturas.registro_factura",">=",este_mes()[0]+" 00:00:00"];
					fli[1]=["facturas.registro_factura","<=",este_mes()[1]+" 23:59:59"];

				break;
			case "periodo":
				document.getElementById("liFechas").style.display='';
				var fini=document.getElementById("inicio");	
				var ffin=document.getElementById("fin");	
				if(fini.value!=""){
				 	if(ffin.value!=""){
						fli[0]=["facturas.registro_factura",">=",fini.value+" 00:00:00"];
				 		fli[1]=["facturas.registro_factura","<=",ffin.value+" 23:59:59"];
				 	}else{
				 		fli[0]=["facturas.registro_factura",">=",fini.value+" 00:00:00"];
				 		fli[1]=["facturas.registro_factura","<=",horaCliente().split(" ")[0]+" 23:59:59"];;
				 	}

				 	
				}else{
					mostrarMensaje("Por favor selecciona la fecha para la primer casilla");
				} 	
				break;		
		}

		if(document.getElementById("selSedesRepoVenta").value!=0){
			fli.push(["sedes.id","=",document.getElementById("selSedesRepoVenta").value]);
			var datos={
				tipo:"SEDE",
				filtro:fli,
				
			};
		}else{
			var datos={
				tipo:"GENERAL",
				filtro:fli
			};
		}
			registrarDato(_URL+"reporte_ventas_por_periodo",datos,function(rs){
				consola(rs);
				if(rs.respuesta==true){
					dibujar_reporte_venta_por_periodo(rs.datos);	
				}else{
					var tbl=document.getElementById("tblReporteVentaPeriodo");
					tbl.innerHTML="";
					mostrarMensaje(rs);
				}
				
			});	
	});	
	agregarEvento("txtCodPromo","keypress",function(){
		if(document.getElementById("selPromoSede").value==0){
			if(document.getElementById("txtCodPromo").value!=""){

			consultarDatos(_URL+"productos/"+document.getElementById("txtCodPromo").value,{},function(rs){
				console.log(rs);
				if(rs.respuesta==true){
					crear_data_list_producto("lista_prod_promo",rs.datos);
				}
			});
			}
		}else{
			registrarDato(_URL+"traer_productos/"+document.getElementById("txtCodPromo").value+"/"+document.getElementById("selPromoSede").value,{},function(rs){
				console.log(rs);
				if(rs.respuesta==true){
					crear_data_list_producto("lista_prod_promo",rs.datos);
				}
			});
		}
		
			
	});
	agregarEvento("txtCodPromo","change",function(){
		if(document.getElementById("selPromoSede").value==0){
			if(document.getElementById("txtCodPromo").value!=""){

			consultarDatos(_URL+"productos/"+document.getElementById("txtCodPromo").value,{},function(rs){
				console.log(rs);
				if(rs.respuesta==true){
					document.getElementById("hdIdProdPromo").value=rs.datos[0].id;
				}
			});
			}
		}else{
			registrarDato(_URL+"traer_productos/"+document.getElementById("txtCodPromo").value+"/"+document.getElementById("selPromoSede").value,{},function(rs){
				console.log(rs);
				if(rs.respuesta==true){
					document.getElementById("hdIdProdPromo").value=rs.datos[0].fk_id_producto;
				}
			});
		}
	});
	agregarEvento("btnCrearPromo","click",function(){
		var vf=obtener_valores_formulario("formPromocion");
		console.log(vf);
		if(vf!=false){
			var datos={
				nombre_promocion:vf.Texto[0],
				promo_desde:vf.Numero[0],
				promo_hasta:vf.Numero[1],
				precio_promo_venta:vf.Numero[2],
				tipo_promo:vf.Select[1]
			};
			registrarDato(_URL+"registrar_promo/"+vf.Hidden[0]+"/"+document.getElementById("selPromoSede").value,datos,function(rs){
				mostrarMensaje(rs);
			},"formPromocion");
		}else{
			mostrarMensaje("por favor ingresa valores");
		}
	});

	agregarEvento("promocionP","click",function(){
		//consulytar promociones
		consultarDatos(_URL+"consultar_promociones",{},function(rs){
			if(rs.respuesta==true){
				dibujar_promociones(rs.datos);
			}else{
				var tbl=document.getElementById("tblListaPromo");
				tbl.innerHTML="";
			}
		});
	});

	//Exportar reporte productos vendidos
	agregarEvento("liExportarRepoProdVendido","click",function(){
		var fli=[];
		switch(document.getElementById("selPeridoReporte").value){
			case "hoy":
					document.getElementById("liFechas").style.display='none';
					fli[0]=["facturas.registro_factura",">=",horaCliente().split(" ")[0]+" 00:00:00"];
					fli[1]=["facturas.registro_factura","<=",horaCliente().split(" ")[0]+" 23:59:59"];
				
				break;
			case "ayer":
					document.getElementById("liFechas").style.display='none';
				
					fli[0]=["facturas.registro_factura",">=",ayer()+" 00:00:00"];
					fli[1]=["facturas.registro_factura","<=",ayer()+" 23:59:59"];
				break;
			case "estemes":
				document.getElementById("liFechas").style.display='none';
					este_mes();
					fli[0]=["facturas.registro_factura",">=",este_mes()[0]+" 00:00:00"];
					fli[1]=["facturas.registro_factura","<=",este_mes()[1]+" 23:59:59"];

				break;
			case "periodo":
				document.getElementById("liFechas").style.display='';
					var tbl=document.getElementById("tblReporteVentaPeriodo");
					tbl.innerHTML="";
					fli[0]=["facturas.registro_factura",">=",document.getElementById("inicio").value+" 00:00:00"];
					fli[1]=["facturas.registro_factura","<=",document.getElementById("fin").value+" 23:59:59"];
					
				
				break;		
		}
		if(document.getElementById("selSedesRepoVenta").value!=0){
			fli.push(["sedes.id","=",document.getElementById("selSedesRepoVenta").value]);
			var datos={
				tipo:"SEDE",
				filtro:fli,
				
			};
		}else{
			var datos={
				tipo:"GENERAL",
				filtro:fli
			};
		}
		datos_reporte_ventas=datos;
	    $('#mensaje_exportar_ventas').fadeIn("fast");
	});

	   agregarEvento("accion_esperar_exportar_ventas","click",exportar_ventas);
	   agregarEvento("accion_continuar_exportar_ventas","click",exportar_ventas);

	   
	}else{
			mostrarMensaje("No tiene permisos para usar esta seccion");
	}	
		



}
function dibujar_promociones(dt){
	var tbl=document.getElementById("tblListaPromo");
	tbl.innerHTML="";
	for(var f in dt){
		console.log(dt[f]);
		var tr=document.createElement("tr");
		tr.setAttribute("id","fila_promo_"+dt[f].id)

		var td=document.createElement("td");
		td.innerHTML=dt[f].nombre_promocion;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=dt[f].codigo_producto;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=dt[f].nombre_producto;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=dt[f].promo_desde;
		tr.appendChild(td);


		var td=document.createElement("td");
		td.innerHTML=dt[f].promo_hasta;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="$ "+formato_numero(dt[f].precio_promo_venta,"2",",",".");
		tr.appendChild(td);

		
		tbl.appendChild(tr);
	}
}
function dibujar_reporte_venta_por_periodo(dt){
	var tbl=document.getElementById("tblReporteVentaPeriodo");
	tbl.innerHTML="";
	
	var tr=document.createElement("tr");
	
	var td=document.createElement("td");
	td.innerHTML="FECHA";
	tr.appendChild(td);

	var td=document.createElement("td");
	td.innerHTML="CODIGO";
	tr.appendChild(td);
	
	var td=document.createElement("td");
	td.innerHTML="DESCRIPCION PRODUCTO";
	tr.appendChild(td);
	
	var td=document.createElement("td");
	td.innerHTML="CANTIDAD";
	tr.appendChild(td);
	

	var td=document.createElement("td");
	td.innerHTML="TIPO VENTA";
	tr.appendChild(td);

	
	var td=document.createElement("td");
	td.innerHTML="PRECIO COMPRA";
	tr.appendChild(td);
	
	var td=document.createElement("td");
	td.innerHTML="PRECIO VENTA";
	tr.appendChild(td);

	var td=document.createElement("td");
	td.innerHTML="PORCENTAJE GANANCIA";
	tr.appendChild(td);

	var td=document.createElement("td");
	td.innerHTML="VALOR TOTAL VENTA";
	tr.appendChild(td);

	var td=document.createElement("td");
	td.innerHTML="VALOR GANANCIA VENTA";
	tr.appendChild(td);
	
	var td=document.createElement("td");
	td.innerHTML="DEPARTAMENTO";
	tr.appendChild(td);
	
	tbl.appendChild(tr);

	for(var f in dt){
		console.log(dt[f]);
		var tr=document.createElement("tr");
		

		var td=document.createElement("td");
		td.innerHTML=dt[f].registro_factura;
		tr.appendChild(td);
			
		var td=document.createElement("td");
		td.innerHTML=dt[f].codigo_producto;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=dt[f].nombre_producto;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=dt[f].cantidad_vendida;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=dt[f].tipo_venta;
		tr.appendChild(td);

		var td=document.createElement("td");
		var pre_compra=0;
		var ttcompra=0;
		switch(dt[f].tipo_venta){
			case "unidad":
				pre_compra=dt[f].precio_compra_unidad;
				ttcompra=Number(dt[f].precio_compra_unidad)*Number(dt[f].cantidad_vendida);
				break;
			case "blister":
				pre_compra=dt[f].precio_compra_blister;
				ttcompra=Number(dt[f].precio_compra_blister)*Number(dt[f].cantidad_vendida);
				break;
			case "caja":

			    pre_compra=dt[f].precio_compra;
			    ttcompra=Number(dt[f].precio_compra)*Number(dt[f].cantidad_vendida);
				break;	
		}
		td.innerHTML="$ "+formato_numero(pre_compra,"2",",",".");
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="$ "+formato_numero(dt[f].valor_item,"2",",",".");
		tr.appendChild(td);


		var pg=0;
		switch(dt[f].tipo_venta){
			case "unidad":
			pg = dt[f].porcentaje_ganancia_sede_unidad;
			  break;
			 case "caja":
			 pg = dt[f].porcentaje_ganancia_sede;
			  break;
			 case "blister":
			 pg = dt[f].porcentaje_ganancia_blister_sede;
			  break;
		}	
		console.log(dt[f].tipo_venta);
		console.log(pg);
		var td=document.createElement("td");
		td.innerHTML=formato_numero(pg,"2",",",".")+" %";
		tr.appendChild(td);

		var tt=Number(dt[f].valor_item)*Number(dt[f].cantidad_vendida);
		var imp=ttcompra*Number(dt[f].impuesto)/100;
		console.log(tt);
		var td=document.createElement("td");
		td.innerHTML="$ "+formato_numero(tt,"2",",",".");
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="$ "+formato_numero((Number(tt)-Number(ttcompra)-imp),"2",",",".");
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=dt[f].nombre_departamento;
		tr.appendChild(td);
		tbl.appendChild(tr);
	}
}
/*
	d=>datos enviados desde el servidor
*/
function dibujar_producto_edicion(d){

	console.log(d);

	if(document.getElementById("selSedes2").value=="0" || document.getElementById("selSedes2").value=="--" ){
		document.getElementById("liCantExistenciasEdi").style.display='none';
		document.getElementById("txtNuevoProdCod").value=d.codigo_producto;
		document.getElementById("txtNuevoProdCodDistribuidor").value=d.codigo_distribuidor;
		document.getElementById("numNuevoUniCajaBlister").value=d.unidades_por_blister;
		document.getElementById("numNuevoImpuesto").value=d.impuesto;
		document.getElementById("numPorcGanaEdi").value=d.porcentaje_ganancia;
		document.getElementById("numPorcGanaBlisterEdi").value=d.porcentaje_ganancia_blister;
		document.getElementById("numPorcGanaUniEdi").value=d.porcentaje_ganancia_unidad;
		document.getElementById("numNuevoPreCostoImpu").value=Number(d.precio_compra);
		document.getElementById("numNuevoPreCosUni").value=Number(d.precio_compra_unidad);
		document.getElementById("numNuevoPreCosBliUni").value=Number(d.precio_compra_blister)
		document.getElementById("liCantExistenciasEdi").style.display='';

		if(d.inventario=="1"){
			document.getElementById("chInventarioEdi").checked=true;
		}
		var id_p=0;
		if(d.fk_id_producto!=undefined){
			id_p=d.fk_id_producto;
		}else{
			id_p=d.id;
		}
		document.getElementById("hdIdProductoEditar").value=id_p;
		document.getElementById("txtNuevoProdDes").value=d.nombre_producto;
		var sel1=document.getElementById("selNuevoProdTipoVenta");
		for(var o in sel1){
			if(sel1[o] != null){
				if(sel1[o].value==d.tipo_venta_producto){
					sel1[o].selected=true;

					document.getElementById("selNuevoProdTipoVenta").value=d.tipo_venta_producto;		
					if(document.getElementById("selNuevoProdTipoVenta").value=="Caja"){
						document.getElementById("liUniCajaEdi").style.display="";
						document.getElementById("liPreUniCajaEdi").style.display="";
						document.getElementById("liPreCosUniEdi").style.display="";
					}else if(document.getElementById("selNuevoProdTipoVenta").value=="CajaBlister"){
						document.getElementById("liUniCajaEdi").style.display="";
						document.getElementById("liPreUniCajaEdi").style.display="";
						document.getElementById("liPreCosUniEdi").style.display="";
					}else{
						document.getElementById("liUniCajaEdi").style.display="none";
						document.getElementById("liPreUniCajaEdi").style.display="none";
						document.getElementById("liPreCosUniEdi").style.display="";
					}
				}
			}
			
		}
		
		document.getElementById("numNuevoUniCaja").value=d.unidades_por_caja;
		document.getElementById("numNuevoProdPreCosto").value=d.precio_compra;
		document.getElementById("numPorcGanaEdi").value=d.porcentaje_ganancia;
		document.getElementById("numValVenEdi").value=d.precio_venta;
		console.log(d.precio_venta);
		if(d.tipo_venta_producto=="PorUnidad"){
			document.getElementById("numValVenEdi").value=d.precio_venta;
			document.getElementById("numValVenBliUniEdi").value=d.precio_venta_blister;
			document.getElementById("numValVenUniEdi").value=d.precio_mayoreo;
			document.getElementById("liPorGanUniEdi").style.display="none";
			document.getElementById("liPreCosBlisterEdi").style.display="none";
			document.getElementById("liPreCosUniEdi").style.display="none";
			document.getElementById("liPreCostoBliImp").style.display="none";
			document.getElementById("liPreCostoUniImp").style.display="none";
			document.getElementById("liPorGanBliUniEdi").style.display="none";
			document.getElementById("liPorGanUniEdi").style.display="none";
			document.getElementById("liPreUniCajBlisterEdi").style.display="none";
			document.getElementById("liPreUniCajaEdi").style.display="none";
			document.getElementById("liCantExistenciasEdi").style.display="none";
			document.getElementById("liUniCajaEdi").style.display="none";
			document.getElementById("liUniCajaBlisterEdi").style.display="none";
			



		}else if(d.tipo_venta_producto=="Caja"){
			document.getElementById("numValVenEdi").value=d.precio_venta;
			document.getElementById("numValVenBliUniEdi").value=d.precio_venta_blister;
			document.getElementById("numValVenUniEdi").value=d.precio_mayoreo;
			
			document.getElementById("liPorGanUniEdi").style.display="";
			document.getElementById("liPreCosBlisterEdi").style.display="none";
			document.getElementById("liPreCosUniEdi").style.display="";
			document.getElementById("liPreCostoBliImp").style.display="none";
			document.getElementById("liPreCostoUniImp").style.display="";
			document.getElementById("liPorGanBliUniEdi").style.display="none";
			document.getElementById("liPorGanUniEdi").style.display="";
			document.getElementById("liPreUniCajBlisterEdi").style.display="none";
			document.getElementById("liPreUniCajaEdi").style.display="";
			document.getElementById("liCantExistenciasEdi").style.display="none";
			document.getElementById("liUniCajaEdi").style.display="";
			document.getElementById("liUniCajaBlisterEdi").style.display="none";
			
		}else{
			document.getElementById("numValVenEdi").value=d.precio_venta;
			document.getElementById("numValVenBliUniEdi").value=d.precio_venta_blister;
			document.getElementById("numValVenUniEdi").value=d.precio_mayoreo;
			document.getElementById("liPorGanUniEdi").style.display="";
			document.getElementById("liPreCosBlisterEdi").style.display="";
			document.getElementById("liPreCosUniEdi").style.display="";
			document.getElementById("liPreCostoBliImp").style.display="";
			document.getElementById("liPreCostoUniImp").style.display="";
			document.getElementById("liPorGanBliUniEdi").style.display="";
			document.getElementById("liPorGanUniEdi").style.display="";
			document.getElementById("liPreUniCajBlisterEdi").style.display="";
			document.getElementById("liPreUniCajaEdi").style.display="";
			document.getElementById("liCantExistenciasEdi").style.display="";
			document.getElementById("liUniCajaEdi").style.display="";
			document.getElementById("liUniCajaBlisterEdi").style.display="";


		}
		
		
		//document.getElementById("selNuevaCatgorias").value="";
		var sel1=document.getElementById("selNuevaCategoria");
		for(var o in sel1){
			if(sel1[o] != null){
				if(sel1[o].value==d.fk_id_departamento){
					sel1[o].selected=true;
					//document.getElementById("selNuevoProdTipoVenta").value=d.tipo_venta_producto;		
				}
			}
			
		}
		
		var sel1=document.getElementById("selProveedorEdiProd");
		for(var o in sel1){
			if(sel1[o] != null){
				if(sel1[o].value==d.fk_id_proveedor){
					sel1[o].selected=true;
					//document.getElementById("selNuevoProdTipoVenta").value=d.tipo_venta_producto;		
				}
			}
			
		}
		//document.getElementById("selSedes2").value="";
		var sel1=document.getElementById("selSedes2");
		for(var o in sel1){
			if(sel1[o] != null){
				if(sel1[o].value=="0"){
					sel1[o].selected=true;
					//document.getElementById("selNuevoProdTipoVenta").value=d.tipo_venta_producto;		
				}
			}
			
		}
		//document.getElementById("selSedes2")
		document.getElementById("numExistencias").value="0";
		document.getElementById("numMinimo").value=d.minimo_inventario;

	}else{
		//si la sede es diferente de 0
		document.getElementById("liCantExistenciasEdi").style.display='';
		document.getElementById("txtNuevoProdCod").value=d.codigo_producto;
		document.getElementById("txtNuevoProdCodDistribuidor").value=d.codigo_distribuidor;
		document.getElementById("numNuevoUniCajaBlister").value=d.unidades_por_blister;
		document.getElementById("numNuevoImpuesto").value=d.impuesto;
		document.getElementById("numPorcGanaEdi").value=d.porcentaje_ganancia_sede;
		document.getElementById("numPorcGanaBlisterEdi").value=d.porcentaje_ganancia_blister_sede;
		document.getElementById("numPorcGanaUniEdi").value=d.porcentaje_ganancia_sede_unidad;
		document.getElementById("numNuevoPreCostoImpu").value=Number(d.precio_compra);
		document.getElementById("numNuevoPreCosUni").value=Number(d.precio_compra_unidad);
		document.getElementById("numNuevoPreCosBliUni").value=Number(d.precio_compra_blister);
		var id_p=0;
		var inv="0";
		if(d.inventario=="1"){
			document.getElementById("chInventarioEdi").checked="1";
			inv="1";
		}
		if(d.fk_id_producto!=undefined){
			id_p=d.fk_id_producto;
		}else{
			id_p=d.id;
		}
		document.getElementById("hdIdProductoEditar").value=id_p;
		document.getElementById("txtNuevoProdDes").value=d.nombre_producto;
		document.getElementById("numExistencias").value=d.cantidad_existencias;
		console.log(document.getElementById("numExistencias").value);
		var sel1=document.getElementById("selNuevoProdTipoVenta");
		for(var o in sel1){
			if(sel1[o] != null){
				if(sel1[o].value==d.tipo_venta_producto){
					sel1[o].selected=true;
					document.getElementById("selNuevoProdTipoVenta").value=d.tipo_venta_producto;		
						if(document.getElementById("selNuevoProdTipoVenta").value=="Caja"){
							document.getElementById("liUniCajaEdi").style.display="";
							document.getElementById("liPreUniCajaEdi").style.display="";
							document.getElementById("liPreCosUniEdi").style.display="";
						}else{
							document.getElementById("liUniCajaEdi").style.display="none";
							document.getElementById("liPreUniCajaEdi").style.display="none";
							document.getElementById("liPreUniCajaEdi").style.display="";
							document.getElementById("liPreCosUniEdi").style.display="";
						}
				}
			}
			
		}

			document.getElementById("numNuevoUniCaja").value=d.unidades_por_caja;
			document.getElementById("numNuevoProdPreCosto").value=d.precio_compra;
			document.getElementById("numPorcGanaEdi").value=d.porcentaje_ganancia_sede;
			document.getElementById("numValVenEdi").value=d.precio_venta_sede;
			console.log(d.precio_venta);
			
			if(d.tipo_venta_producto=="PorUnidad"){
				document.getElementById("numValVenEdi").value=d.precio_venta_sede;
				document.getElementById("numValVenBliUniEdi").value=d.precio_venta_blister_sede;
				document.getElementById("numValVenUniEdi").value=d.precio_mayoreo_sede;
				document.getElementById("liPorGanUniEdi").style.display="none";
				document.getElementById("liPreCosBlisterEdi").style.display="none";
				document.getElementById("liPreCosUniEdi").style.display="none";
				document.getElementById("liPreCostoBliImp").style.display="none";
				document.getElementById("liPreCostoUniImp").style.display="none";
				document.getElementById("liPorGanBliUniEdi").style.display="none";
				document.getElementById("liPorGanUniEdi").style.display="none";
				document.getElementById("liPreUniCajBlisterEdi").style.display="none";
				document.getElementById("liPreUniCajaEdi").style.display="none";
				//document.getElementById("liCantExistenciasEdi").style.display="none";



			}else if(d.tipo_venta_producto=="Caja"){
				document.getElementById("numValVenEdi").value=d.precio_venta_sede;
				document.getElementById("numValVenBliUniEdi").value=d.precio_venta_blister_sede;
				document.getElementById("numValVenUniEdi").value=d.precio_mayoreo_sede;
				
				document.getElementById("liPorGanUniEdi").style.display="";
				document.getElementById("liPreCosBlisterEdi").style.display="none";
				document.getElementById("liPreCosUniEdi").style.display="";
				document.getElementById("liPreCostoBliImp").style.display="none";
				document.getElementById("liPreCostoUniImp").style.display="";
				document.getElementById("liPorGanBliUniEdi").style.display="none";
				document.getElementById("liPorGanUniEdi").style.display="";
				document.getElementById("liPreUniCajBlisterEdi").style.display="none";
				document.getElementById("liPreUniCajaEdi").style.display="";
				document.getElementById("liUniCajaEdi").style.display="";
				//document.getElementById("liCantExistenciasEdi").style.display="none";
			}else{
				document.getElementById("numValVenEdi").value=d.precio_venta_sede;
				document.getElementById("numValVenBliUniEdi").value=d.precio_venta_blister_sede;
				document.getElementById("numValVenUniEdi").value=d.precio_mayoreo_sede;
				document.getElementById("liPorGanUniEdi").style.display="";
				document.getElementById("liPreCosBlisterEdi").style.display="";
				document.getElementById("liPreCosUniEdi").style.display="";
				document.getElementById("liPreCostoBliImp").style.display="";
				document.getElementById("liPreCostoUniImp").style.display="";
				document.getElementById("liPorGanBliUniEdi").style.display="";
				document.getElementById("liPorGanUniEdi").style.display="";
				document.getElementById("liPreUniCajBlisterEdi").style.display="";
				document.getElementById("liPreUniCajaEdi").style.display="";
				document.getElementById("liUniCajaEdi").style.display="";
				//document.getElementById("liCantExistenciasEdi").style.display="";
			}

		//document.getElementById("selNuevaCatgorias").value="";
		var sel1=document.getElementById("selNuevaCategoria");
		for(var o in sel1){
			if(sel1[o] != null){
				if(sel1[o].value==d.fk_id_departamento){
					sel1[o].selected=true;
					//document.getElementById("selNuevoProdTipoVenta").value=d.tipo_venta_producto;		
				}
			}
			
		}
		//document.getElementById("selSedes2").value="";
		var sel1=document.getElementById("selSedes2");
		for(var o in sel1){
			if(sel1[o] != null){
				if(sel1[o].value==d.fk_id_sede){
					sel1[o].selected=true;
					//document.getElementById("selNuevoProdTipoVenta").value=d.tipo_venta_producto;		
				}
			}
			
		}
	
		document.getElementById("numMinimo").value=d.minimo_inventario;
	}
}
function dibujar_producto_eliminar(d){
	document.getElementById("hdIdProductoEliminar").value=d.id;
	
}

function exportar_ventas(){

	if(this.id=="accion_continuar_exportar_ventas"){
		datos_reporte_ventas.email_usuario=_usuario.email;
		$('#mensaje_exportar_ventas').fadeOut('fast');
	}else{	
		datos_reporte_ventas.email_usuario=false;
	}
	registrarDato(_URL+"exportar/"+"reporte_ventas_por_periodo",datos_reporte_ventas,function(rs){
			console.log(rs);
			if(rs.respuesta==true){
				$('#mensaje_exportar_ventas').fadeOut('fast');
				document.getElementById("aDirExportacion").innerHTML="DESCARGAR";
				document.getElementById("aDirExportacion").href=_URL+"/"+rs.direccion;
				document.getElementById("aDirExportacion").href=_URL+"archivos/exportacion/excel/"+rs.direccion;
				document.getElementById("aDirExportacion").target="_blank";
			}else{
				$('#mensaje_exportar_ventas').fadeOut('fast');
				mostrarMensaje(rs);
			}
		});    
}
function calcular_valores_nuevo_producto(){
	    var uni_caja=document.getElementById("numUniCaja").value;

		var uni_bli=document.getElementById("numUniCajaBlister").value

		var precio_compra=document.getElementById("numPreCos").value;
		console.log(precio_compra);
		var precio_compra_unidad=Number(precio_compra)/Number(uni_caja);
		console.log(Number(precio_compra)/Number(uni_caja));
		var precio_compra_blister=(Number(precio_compra)/Number(uni_caja))/Number(uni_bli);
		console.log((Number(precio_compra)/Number(uni_caja))/Number(uni_bli));
		var impuesto=document.getElementById("numImpuesto").value;

		var precio_impuesto=(Number(precio_compra)*Number(impuesto)/100)+Number(precio_compra);

		var precio_impuesto_blister=(Number(precio_compra_blister)*Number(impuesto)/100)+Number(precio_compra_blister);

		var precio_impuesto_unidad=(Number(precio_compra_unidad)*Number(impuesto)/100)+Number(precio_compra_unidad);
		document.getElementById("numPorcGana").value="25";
		var porcentaje=document.getElementById("numPorcGana").value;
		document.getElementById("numPorcGanaBliUni").value="25";
		var porcentaje_blister=document.getElementById("numPorcGanaBliUni").value;
		document.getElementById("numPorcGanaUni").value="25";
		var porcentaje_unidad=document.getElementById("numPorcGanaUni").value;

		var precio_venta=(Number(precio_impuesto)*Number(porcentaje)/100)+precio_impuesto;

		var precio_venta_blister=(Number(precio_impuesto_blister)*Number(porcentaje_blister)/100)+precio_impuesto_blister;

		var precio_venta_unidad=(Number(precio_impuesto_unidad)*Number(porcentaje_unidad)/100)+precio_impuesto_unidad;

		document.getElementById("numPreCostoImpu").value=precio_impuesto;

		document.getElementById("numPreCostoUniImpu").value=precio_impuesto_unidad;

		document.getElementById("numValVen").value=precio_venta;

		document.getElementById("numValVenBliUni").value=precio_venta_blister;

		document.getElementById("numValVenUni").value=precio_venta_unidad;
		
		document.getElementById("numPreCosUni").value=precio_compra_unidad;

		

		if(document.getElementById("selTipoVenta").value=="CajaBlister"){
			document.getElementById("numPreCosUni").value=precio_compra_blister;
			document.getElementById("numPreCosUniBli").value=precio_compra_unidad;
				
		}else{
			document.getElementById("numPreCosUni").value=precio_compra_unidad;
			document.getElementById("numPreCosUniBli").value=precio_compra_blister;
		}
}

function calcular_valores_editar_producto(){

		var uni_caja=document.getElementById("numNuevoUniCaja").value;

		var uni_bli=document.getElementById("numNuevoUniCajaBlister").value;

		var precio_compra=document.getElementById("numNuevoProdPreCosto").value;

		var precio_compra_blister=Number(precio_compra)/Number(uni_caja);

		var precio_compra_unidad=Number(precio_compra_blister)/Number(uni_bli);

		var impuesto=document.getElementById("numNuevoImpuesto").value;

		var precio_impuesto=(Number(precio_compra)*Number(impuesto)/100)+Number(precio_compra);

		var precio_impuesto_blister=(Number(precio_compra_unidad)*Number(impuesto)/100)+Number(precio_compra_unidad);

		var precio_impuesto_unidad=(Number(precio_compra_unidad)*Number(impuesto)/100)+Number(precio_compra_unidad);

		var porcentaje=document.getElementById("numPorcGanaEdi").value;

		var porcentaje_blister=document.getElementById("numPorcGanaBlisterEdi").value;

		var porcentaje_unidad=document.getElementById("numPorcGanaUniEdi").value;

		var precio_venta=(Number(precio_impuesto)*Number(porcentaje)/100)+precio_impuesto;

		var precio_venta_blister=(Number(precio_impuesto_blister)*Number(porcentaje_blister)/100)+precio_impuesto_blister;

		var precio_venta_unidad=(Number(precio_impuesto_unidad)*Number(porcentaje_unidad)/100)+precio_impuesto_unidad;

		document.getElementById("numNuevoPreCostoImpu").value=redondeo(precio_impuesto,"0");

		document.getElementById("numNuevoPreCostoUniImpu").value=redondeo(precio_impuesto_unidad,"0");

		document.getElementById("numValVenEdi").value=redondeo(precio_venta,"0");

		document.getElementById("numValVenUniEdi").value=redondeo(precio_venta_unidad,"0");
		
		document.getElementById("numValVenBliUniEdi").value=redondeo(precio_venta_blister,"0");

		document.getElementById("numNuevoPreCosBliUni").value=redondeo(precio_compra_blister,"0");

		document.getElementById("numNuevoPreCosUni").value=redondeo(precio_compra_unidad,"0");

}

function calcular_valores_editar_producto_porcentaje(){
		var uni_caja=document.getElementById("numNuevoUniCaja").value;

		var uni_bli=document.getElementById("numNuevoUniCajaBlister").value;

		var precio_compra=document.getElementById("numNuevoProdPreCosto").value;

		var precio_compra_blister=Number(precio_compra)/Number(uni_caja);

		var precio_compra_unidad=Number(precio_compra_blister)/Number(uni_bli);

		var impuesto=document.getElementById("numNuevoImpuesto").value;

		var precio_impuesto=(Number(precio_compra)*Number(impuesto)/100)+Number(precio_compra);

		var precio_impuesto_blister=(Number(precio_compra_unidad)*Number(impuesto)/100)+Number(precio_compra_unidad);

		var precio_impuesto_unidad=(Number(precio_compra_unidad)*Number(impuesto)/100)+Number(precio_compra_unidad);

		var dif=Number(document.getElementById("numValVenEdi").value)-Number(document.getElementById("numNuevoProdPreCosto").value);

		document.getElementById("numPorcGanaEdi").value=redondeo(dif*100/precio_impuesto,"0");
		var dif2=Number(document.getElementById("numValVenBliUniEdi").value)-Number(document.getElementById("numNuevoPreCosBliUni").value);
		document.getElementById("numPorcGanaBlisterEdi").value=redondeo(dif2*100/precio_impuesto_blister,"0");
		var dif3=Number(document.getElementById("numValVenUniEdi").value)-Number(document.getElementById("numNuevoPreCosUni").value);
		document.getElementById("numPorcGanaUniEdi").value=redondeo(dif3*100/precio_impuesto_unidad,"0");

		
}