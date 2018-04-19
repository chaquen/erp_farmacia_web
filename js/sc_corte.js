function iniciar_corte(valido){
	if(valido){
				agregarEvento("liCorteHoy","click",function(){




				var datos={
					tipo:"GENERAL",
					fecha:horaCliente().split(" ")[0],
					filtro:[
							["detalle_entrada_contables.fecha_entrada",'>=',horaCliente().split(" ")[0]+" 00:00:00"],
							["detalle_entrada_contables.fecha_entrada",'<=',horaCliente()]
						   ],
				}
				registrarDato(_URL+"reporte_corte_diario",datos,function(rs){
					
					if(rs.respuesta==true){
						dibujar_entradas_en_efectivo(rs);
						dibujar_dinero_en_caja(rs);
						pagos_de_contado(rs);
						vemtas_por_departamento(rs);
						ganancia_dia(rs);
						calcular_total_ventas_corte();
						
					}

				});
			});
			agregarEvento("dtFechaCorte","change",function(){

				var fecha=horaCliente().split(" ")[0];
				if(this.value!=""){
					fecha=this.value;
				}
				var datos={
					tipo:"SEDE",
					sede:document.getElementById("selSedeCorte").value,
					fecha:fecha,
					filtro:[
							
							["detalle_entrada_contables.fecha_entrada",'>=',fecha+" 00:00:00"],
							["detalle_entrada_contables.fecha_entrada",'<=',fecha+" 23:59:59"]
						   ],
				};

				registrarDato(_URL+"reporte_corte_diario",datos,function(rs){
					
					if(rs.respuesta==true){
						dibujar_entradas_en_efectivo(rs);
						dibujar_dinero_en_caja(rs);
						pagos_de_contado(rs);
						vemtas_por_departamento(rs);
						ganancia_dia(rs);
						calcular_total_ventas_corte();
					}

				});

			});


			agregarEvento("selSedeCorte","change",function(){
				var fecha=horaCliente().split(" ")[0];
				if(document.getElementById("dtFechaCorte").value!=""){
					fecha=document.getElementById("dtFechaCorte").value;
				}
				if(this.value==0){
					var datos={
					tipo:"GENERAL",
					fecha:fecha,
					filtro:[
							["detalle_entrada_contables.fecha_entrada",'>=',fecha+" 00:00:00"],
							["detalle_entrada_contables.fecha_entrada",'<=',fecha+" 23:59:59"]
						   ],
					}	
				}else{
					var datos={
						tipo:"SEDE",
						sede:this.value,
						fecha:fecha,
						filtro:[
								
								["detalle_entrada_contables.fecha_entrada",'>=',fecha+" 00:00:00"],
								["detalle_entrada_contables.fecha_entrada",'<=',fecha+" 23:59:59"]
							   ],
					};
				}

				registrarDato(_URL+"reporte_corte_diario",datos,function(rs){
					
					if(rs.respuesta==true){
						dibujar_entradas_en_efectivo(rs);
						dibujar_dinero_en_caja(rs);
						pagos_de_contado(rs);
						vemtas_por_departamento(rs);
						calcular_total_ventas_corte();
						ganancia_dia(rs);
					}

				});
			});	 
	}else{
		mostrarMensaje("No tiene permisos para usar esta seccion");
	}
}


function dibujar_entradas_en_efectivo(datos){
	var h3_entrada_dinero_venta=document.getElementById("h3_entrada_dinero_venta");
	var h3_dinero_inicial_caja=document.getElementById("h3_dinero_inicial_caja");
	var h3_total_entrada_de_dinero=document.getElementById("h3_total_entrada_de_dinero");
	
	if(datos.entradas_en_efectivo[0].total_entradas_corte!=null){
		h3_entrada_dinero_venta.innerHTML="$ "+formato_numero(datos.entradas_en_efectivo[0].total_entradas_corte,"2",",",".");
		h3_entrada_dinero_venta.value=datos.entradas_en_efectivo[0].total_entradas_corte;
	}else{
		h3_entrada_dinero_venta.innerHTML="$ 0.00";
		h3_entrada_dinero_venta.value=0;
	}

	if(datos.dinero_caja_inicial[0]!=undefined){
		h3_dinero_inicial_caja.innerHTML="$ "+formato_numero(datos.dinero_caja_inicial[0].total_entrada_inicial_caja,"2",",",".");	
		h3_dinero_inicial_caja.value=datos.dinero_caja_inicial[0].total_entrada_inicial_caja;	
	}else{
		h3_dinero_inicial_caja.innerHTML="$ 0.00";	
		h3_dinero_inicial_caja.value=0;	
	}

	h3_total_entrada_de_dinero.innerHTML="$ "+formato_numero(Number(h3_entrada_dinero_venta.value)+Number(h3_dinero_inicial_caja.value),"2",",",".");
	h3_total_entrada_de_dinero.value=Number(h3_entrada_dinero_venta.value)+Number(h3_dinero_inicial_caja.value);
	
}

function dibujar_dinero_en_caja(datos){
	var h3_ventas_en_efectivo=document.getElementById("h3_ventas_en_efectivo");
	var h3_entrada_dinero=document.getElementById("h3_entrada_dinero");
	var h3_salidas_de_dinero=document.getElementById("h3_salidas_de_dinero");
	var h3_total_entradas=document.getElementById("h3_total_entradas");
	var h3_prestamos_dinero=document.getElementById("h3_prestamos_dinero");
	var h3_salidas_facturaso=document.getElementById("h3_salidas_facturaso");
	var h3_salidas_otros=document.getElementById("h3_salidas_otros");


	console.log(datos.pagos_de_contado[0]);
	if(datos.pagos_de_contado[0].total_factura!=undefined){
		h3_ventas_en_efectivo.innerHTML="$ "+formato_numero(datos.pagos_de_contado[0].total_factura,"2",",",".")+" + ";
		h3_ventas_en_efectivo.value=datos.pagos_de_contado[0].total_factura;
	}else{
		h3_ventas_en_efectivo.innerHTML="$ 0.00";
		h3_ventas_en_efectivo.value=0;
	}
	console.log(document.getElementById("h3_total_entrada_de_dinero").innerHTML);
	h3_entrada_dinero.innerHTML=document.getElementById("h3_total_entrada_de_dinero").innerHTML+" + ";
	h3_entrada_dinero.value=document.getElementById("h3_total_entrada_de_dinero").value;

	console.log(datos.salidas_dinero_caja[0].total_salida);
	if(datos.salidas_dinero_caja[0].total_salida!=null){
		h3_salidas_de_dinero.innerHTML="$ "+formato_numero(datos.salidas_dinero_caja[0].total_salida,"2",",",".")+" - ";
		h3_salidas_de_dinero.value=Number(datos.salidas_dinero_caja[0].total_salida);
	}else{
		h3_salidas_de_dinero.innerHTML="$ 0.00";
		h3_salidas_de_dinero.value=0;
	}

	if(datos.prestamos[0].total_salida_prestamo!=null){
		h3_prestamos_dinero.innerHTML="$ "+formato_numero(datos.prestamos[0].total_salida_prestamo,"2",",",".")+" - ";
		h3_prestamos_dinero.value=datos.prestamos[0].total_salida_prestamo;
	}else{
		h3_prestamos_dinero.innerHTML="$ 0.00";
		h3_prestamos_dinero.value="0";
	}

	if(datos.salida_facturas[0].total_salida_pago_facturas!=null){
		h3_salidas_facturaso.innerHTML="$ "+formato_numero(datos.salida_facturas[0].total_salida_pago_facturas,"2",",",".")+" - ";
		h3_salidas_facturaso.value=datos.salida_facturas[0].total_salida_pago_facturas;
	}else{
		h3_salidas_facturaso.innerHTML="$ 0.00";
		h3_salidas_facturaso.value="0";
	}

	if(datos.salida_otros[0].total_salida_pago_otros!=null){
		h3_salidas_otros.innerHTML="$ "+formato_numero(datos.salida_otros[0].total_salida_pago_otros,"2",",",".")+" - ";
		h3_salidas_otros.value=datos.salida_otros[0].total_salida_pago_otros;
	}else{
		h3_salidas_otros.innerHTML="$ 0.00";
		h3_salidas_otros.value="0";
	}
	console.log(h3_salidas_de_dinero.value);
	var total=Number(h3_ventas_en_efectivo.value)+Number(h3_entrada_dinero.value)-Number(h3_salidas_de_dinero.value)-Number(h3_prestamos_dinero.value)-Number(h3_salidas_facturaso.value)-Number(h3_salidas_otros.value);

	h3_total_entradas.innerHTML="$ "+formato_numero(total,"2",",",".");
	h3_total_entradas.value=total;




}

function pagos_de_contado(datos){
	var h3AbonoCliente=document.getElementById("h3AbonoCliente");
	var h3_efectivo=document.getElementById("h3_efectivo");
	var h3_total_pagos_de_contado=document.getElementById("h3_total_pagos_de_contado");
	console.log(datos.pagos_de_contado[0]);
	if(datos.pagos_de_contado[0].total_factura!=undefined){
		h3_efectivo.innerHTML="$ "+formato_numero(datos.pagos_de_contado[0].total_factura,"2",",",".");
		h3_efectivo.value=datos.pagos_de_contado[0].total_factura;
	}else{
		h3_efectivo.innerHTML="$ 0.00";
		h3_efectivo.value=0;
	}
	console.log(datos.pago_de_clientes[0].total_abonos);
	if(datos.pago_de_clientes[0].total_abonos!=null){
		h3AbonoCliente.innerHTML="$ "+formato_numero(datos.pago_de_clientes[0].total_abonos,"2",",",".");
		h3AbonoCliente.value=datos.pago_de_clientes[0].total_abonos;	
	}else{
		h3AbonoCliente.innerHTML="$ 0.00";
		h3AbonoCliente.value=0;
	}

	h3_total_pagos_de_contado.innerHTML="$ "+formato_numero(Number(h3_efectivo.value)+Number(h3AbonoCliente.value),"2",",",".");
	h3_total_pagos_de_contado.value=Number(h3_efectivo.value)+Number(h3AbonoCliente.value);	
}

function vemtas_por_departamento(dat){
	console.log(datos);
		var tbl=document.getElementById("tbl_ventas_por_categoria");
		tbl.innerHTML="";
		var tr=document.createElement("tr");

		var td=document.createElement("td");
		td.setAttribute("colspan","2");
		var h=document.createElement("h2");
		h.innerHTML="Ventas por categoria";
		td.appendChild(h);
		tr.appendChild(td);
		tbl.appendChild(tr);
	var datos=dat.ventas_por_departamento;	
	for(var v in datos){
		var tr=document.createElement("tr");

		var td=document.createElement("td");
		td.innerHTML=datos[v].nombre_departamento;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="$ "+formato_numero(datos[v].total_venta_por_departamento,"2",",",".");
		tr.appendChild(td);

		tbl.appendChild(tr);

	}
}
function calcular_total_ventas_corte(){
	document.getElementById("h1_ventas_totales").value=Number(document.getElementById("h3_efectivo").value);
	document.getElementById("h1_ventas_totales").innerHTML="$ "+formato_numero(document.getElementById("h3_efectivo").value,"2",",",".");
}
function ganancia_dia(dat){
  console.log(dat.ganancias_venta_dia);
  var dt=dat.ganancias_venta_dia;
  var total_ganancia=0;
  var imp=0;
  var difercnia=0;
  for(var f in dt){
  	var pre_compra=0;
  	switch(dt[f].tipo_venta){
  		case "unidad":
  			pre_compra=dt[f].precio_compra_unidad;
  		 break;
  		case "blister":
  		   pre_compra=dt[f].precio_compra_blister;
  		 break;
  		case "caja":
  		  pre_compra=dt[f].precio_compra; 
  		 break;  
  	}
	imp=(pre_compra*(Number(dt[f].impuesto)/100));
    difercnia=dt[f].valor_item-pre_compra-imp;  	
  	total_ganancia+=(difercnia)*dt[f].cantidad_producto;
  	console.log("===============");
  	console.log(dt[f].codigo_producto);
  	console.log(dt[f].tipo_venta);
  	console.log(pre_compra);
  	console.log(dt[f].impuesto);
  	console.log(imp);
  	console.log(dt[f].valor_item);
  	console.log(difercnia);
  	console.log(dt[f].cantidad_producto);
  	console.log(total_ganancia);
  	console.log("===============");

  }
  console.log(total_ganancia);
  document.getElementById("h1_ganancia_dia").innerHTML="$ "+formato_numero(total_ganancia,"2",",",".");

}