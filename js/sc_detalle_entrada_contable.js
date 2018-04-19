
function iniciar_detalle_entrada_contable(valido){
	if(valido){

		
		agregarEvento("btnMostradaEntardaContable","click",function(){
			consultarDatos(_URL+"detalle_entrada_contable/"+document.getElementById("dtFechaBusquedaEntrada").value+" "+horaCliente().split(" ")[1]+"&"+_IdSede,{},function(rs){
				if(rs.respuesta==true){
					dibujar_entradas_diaria(rs.datos);
				}else{
					mostrarMensaje(rs);
				}
				
			});
		});
		agregarEvento("btnCancelarEntradaContable","click",function(){
			$("#txtCodigoProducto").focus();	
		})
	

		agregarEvento("btnRegistroEntradaCon","click",function(e){
			e.preventDefault();	
	 		var vf=obtener_valores_formulario("formEntrada");
	 		console.log(vf);
				if(vf!=false && vf.Texto[0]!="" && isNaN(vf.Texto[0])==false){
					var datos={
						fk_id_entrada_contable:vf.Select[0],
						fk_id_usuario:_usuario.id_usuario,
						fk_id_sede:_IdSede,
						valor_entrada:vf.Texto[0],
						tipo_entrada:vf.Select[0]
					};
					registrarDato(_URL+"detalle_entrada_contable",datos,function(rs){
						
						if(rs.respuesta){
							mostrarMensaje(rs);
							
							document.getElementById("pEntrada").innerHTML="Registro de Entradas de Efectivo";
							document.getElementById("h2TlEntrad").innerHTML="ENTRADAS DE EFECTIVO";
							document.getElementById("pMsnEntrada").innerHTML="Escriba la cantidad a ingresar en caja";
							document.getElementById("tblRegistroEntrada").style.display='block';
							document.getElementById("txt_valor").value="";
						}else{
							mostrarMensaje(rs);
						}
						$('.mascara').fadeOut('fast');		
						
					},"formEntrada");

				}else{
					mostrarMensaje("Por favor ingresa valores");
				}
		});	
	}else{
		
	}	
}

function dibujar_entradas_diaria(datos){
	document.getElementById("tblRegistroEntrada").style.display='block';
	var tbl=document.getElementById("tblEntradasDia");
	tbl.innerHTML="";
	for(var i in datos){
		var tr=document.createElement("tr");
		var td=document.createElement("td");
		td.innerHTML=datos[i].fecha_entrada;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[i].nombre_entrada+" ";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=" ";
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML="$ "+formato_numero(datos[i].valor_entrada,"2",",",".");
		tr.appendChild(td);


		tbl.appendChild(tr);

	}

}
