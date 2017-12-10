function iniciar_creditos(valido){
 	if(valido){

			agregarEvento(_btnCrearCredito,"click",function(){
				var vf=obtener_valores_formulario("");
				if(vf!=false){
					var datos={
						fk_id_cliente:"",
						fk_id_factura:"",
						estado_credito:"",
						valor_credito:"",	
					};
					registrarDato(_URL,datos,function(rs){
						consola(rs);
					},"formulario");

				}else{
					mostrarMensaje("Por favor ingresa valores al formulario");
				}

			});

			agregarEvento(_btnConsultarCredito,"click",function(){
				
				
				
					var datos={};
					
					consultarDatos(_URL+"creditos",datos,function(rs){
						console.log(rs);
						if(rs.respuesta==true){
							dibujar_creditos(rs.datos);
						}else{
							var tbl=document.getElementById("tblCreditos");
							tbl.innerHTML="";
						}	
					});
				
			});

			agregarEvento(_btnEditarCredito,"click",function(){
				var vf=obtener_valores_formulario("");
				var datos={};
				var id="";
				editarDatos(_URL+"/"+id,datos,function(rs){
					consola(rs);
				});
			});

			agregarEvento(_btnEliminarCredito,"click",function(){
				var datos={};
				var id="";
				eliminarDato(_URL+"/"+id,datos,function(rs){
					consola(rs);
				});
			});
 	}else{
		mostrarMensaje("No tiene permisos para usar esta seccion");
	}
}

function dibujar_creditos(dt){
	var tbl=document.getElementById("tblSaldo");
	tbl.innerHTML="";
	var i=1;


	for(var f in dt){
		var tr=document.createElement("tr");
		
		var td=document.createElement("td");
		td.innerHTML=i;
		tr.appendChild(td);
		i++;
		var td=document.createElement("td");
		td.innerHTML=dt[f].nombre_cliente;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=dt[f].telefono;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=dt[f].limite_de_credito;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="$ "+formato_numero(dt[f].valor_actual_credito,"2",",",".");
		tr.appendChild(td);

		var td=document.createElement("td");
		if(dt[f].detalle_credito[0].abono!=""){
			td.innerHTML="$ "+formato_numero(dt[f].detalle_credito[0].abono,"2",",",".");	
		}else{
			td.innerHTML="$0.00";
		}
		
		tr.appendChild(td);


		tbl.appendChild(tr);
	}
	calcular_valor_total_credito(dt);
}
function calcular_valor_total_credito(dt){
	var total_pago=0;
	var total_deuda=0;
	for(var f in dt){
		console.log("valor_actual_credito");
		console.log(Number(dt[f].valor_actual_credito));
		console.log("valor_credito");
		console.log(Number(dt[f].valor_credito));

		total_pago+=Number(dt[f].valor_actual_credito);
		total_deuda+=Number(dt[f].valor_credito);
	}
	document.getElementById("h3TotalCredito").innerHTML="$ "+formato_numero(total_pago,"2",",",".");
}