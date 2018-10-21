function iniciar_cajeros(valido){
	if(valido){
			agregarEvento("btnCrearCajero","click",function(){
			var vf=obtener_valores_formulario("formCrearCajero");
			//console.log(vf);
			if(vf.Select[1]!=0){
				var datos={
					nombres:vf.Texto[0],
					apellidos:vf.Texto[1],
					documento:vf.Texto[2],
					email:vf.Email[0],
					codigo_venta:vf.Texto[3],
					password:vf.Clave,
					rol:vf.Select[1],
					sede:vf.Select[0]
				};
				registrarDato(_URL+"usuarios",datos,function(rs){
					mostrarMensaje(rs);
					cargar_lista_cajeros();
				},"formCrearCajero");
			}else{
				mostrarMensaje("Selecciona un rol");
			}
			
		});
		agregarEvento("cod_venta","change",function(){
			//console.log(this.value);
			if(this.value!=""){
				for(var c in cajeros){
					if(cajeros[c].codigo_venta==this.value){
						mostrarMensaje("Lo sentios pero este codigo ya esta en uso");
						break;
					}
				}
			}
		});
	}else{
		mostrarMensaje("No tiene permisos para usar esta seccion");
	}	

	agregarEvento("selCajerosEdi","change",function(){
		if(this.value!=0){
			consultarDatos(_URL+"mostrar_user_id/"+this.value,{},function(rs){
				//console.log(rs);
				if(rs.respuesta==true){
					dibujar_cajero_edicion(rs.datos,rs.datos_sede);
				}
			});
		}
	});

	agregarEvento("btnEditarCajero","click",function(){
		var vf=obtener_valores_formulario("formEditarCajero");
		//console.log(vf);
		if(vf!=false){
			//console.log(vf);
			var clave=false;
			var aso_sede=false;
			if(document.getElementById("passClave1").value != "" && document.getElementById("passClave2").value != ""  ){
				if(document.getElementById("passClave1").value == document.getElementById("passClave2").value){
					clave=document.getElementById("passClave1").value;	
				}else{
					mostrarMensaje("Las contraseñas no coinciden");
					return false;
				}
				
			}
			if(vf.Select[1] !=0 && vf.Select[2] ){
				aso_sede=[vf.Select[1],vf.Select[2]]
			}else if(vf.Select[1] ==0){
				aso_sede=[vf.Select[1],vf.Select[2]]
			}

			var datos={
					nombres:vf.Texto[0],
					apellidos:vf.Texto[1],
					documento:vf.Texto[2],
					email:vf.Texto[3],
					codigo_venta:vf.Texto[4],
					password:clave,
					rol:vf.Select[3],
					nueva_sede:aso_sede,
				
				};
			editarDato(_URL+"usuarios/"+vf.Select[0],datos,function(rs){
				mostrarMensaje(rs);
				if(rs.respuesta){
					document.getElementById("listaSedesDeUsuario").innerHTML="";
				}
			},"formEditarCajero");	
		}
	});
}

function dibujar_cajero_edicion(datos,sedes){
	document.getElementById("txtNombreCajero").value=datos[0].nombres;
	document.getElementById("txtApellidoCajero").value=datos[0].apellidos;
	document.getElementById("txtDocumentoCajero").value=datos[0].documento;
	document.getElementById("txtCorreoCajero").value=datos[0].email;
	
	var sel1=document.getElementById("selRolesEdiCajeo");
		for(var o in sel1){
			if(sel1[o] != null){
				if(sel1[o].value==datos[0].fk_id_rol){
					sel1[o].selected=true;
					//document.getElementById("selNuevoProdTipoVenta").value=d.tipo_venta_producto;		
				}
			}
			
		}
	document.getElementById("txtCodEdiVenta").value=datos[0].codigo_venta;

	var ul=document.getElementById("listaSedesDeUsuario");
	ul.innerHTML="";
	for(var e in sedes){
		var li=document.createElement("li");
		li.innerHTML=sedes[e].nombre_sede;
		ul.appendChild(li);
		var li=document.createElement("li");
		li.innerHTML=sedes[e].tipo;
		ul.appendChild(li);
		var li=document.createElement("li");
		var inp=document.createElement("input");
		inp.setAttribute("type","checkbox");
		inp.setAttribute("checked",true);
		inp.setAttribute("id","eli_"+sedes[e].id);
		inp.setAttribute("onchange","eliminar_detalle_cajero('"+sedes[e].id+"')");
		ul.appendChild(inp);
	}

}
function eliminar_detalle_cajero(id_detalle){
	if(confirm("¿Desea eliminar este usuario de esta sede?")){
		eliminarDato(_URL+"eliminar_detalle_cajero_sede/"+id_detalle,{},function(){
			mostrarMensaje(rs);
		});
	}else{
		document.getElementById("eli_"+id_detalle).checked=true;
	}
}