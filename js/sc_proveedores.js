var _proveedores;
function iniciar_proveedores(valido){
	agregarEvento(_btnCrearProveedor,"click",function(){
	var vf=obtener_valores_formulario("formCrearProveedor");
	if(vf!=false){
		var datos={
			nombre_proveedor:vf.Texto[0],
			
			nombre_contacto_proveedor:vf.Texto[1],
			telefono_contacto_proveedor:vf.Texto[2],
			
			email_contacto_proveedor:vf.Texto[3],
		};
		registrarDato(_URL+"proveedores",datos,function(rs){
			consola(rs);
			mostrarMensaje(rs);
		},"formCrearProveedor");

	}else{
		mostrarMensaje("Por favor ingresa valores");
	}
});

agregarEvento(_btnConsultarProveedor,"click",function(){
	
	
	
		var datos={};
		var valor_consulta=document.getElementById("txtBuscarProveedor").value;
		if(valor_consulta!=""){
			consultarDatos(_URL+"proveedores/"+valor_consulta,datos,function(rs){
					_proveedores=rs.datos;
					var cta=document.getElementById("msProveedores");
					cta.innerHTML="";
					for(var d in rs.datos){
						var li=document.createElement("li");
						li.className="prov";
						li.innerHTML=rs.datos[d].nombre_proveedor;
						li.setAttribute("onclick","seleccionar_proveedor("+rs.datos[d].id+")");
						cta.appendChild(li);

					}	
			},"formulario");	
		}else{
			consultarDatos(_URL+"proveedores",datos,function(rs){
					_proveedores=rs.datos;
					var cta=document.getElementById("msProveedores");
					cta.innerHTML="";
					for(var d in rs.datos){
						var li=document.createElement("li");
						li.className="prov";
						li.innerHTML=rs.datos[d].nombre_proveedor;
						li.setAttribute("onclick","seleccionar_proveedor("+rs.datos[d].id+")");
						cta.appendChild(li);

					}
			},"formulario");	
		}
		
	
});
agregarEvento(_btnEditarProveedor,"click",function(){
	var vf=obtener_valores_formulario("formEdicionProveedor");
	var datos={
			nombre_proveedor:vf.Texto[0],
			
			nombre_contacto_proveedor:vf.Texto[1],
			telefono_contacto_proveedor:vf.Texto[2],
			
			email_contacto_proveedor:vf.Texto[3],
		};
	var id=document.getElementById("hdIdProveedorEliminar").value;
	editarDato(_URL+"proveedores/"+id,datos,function(rs){
		consola(rs);
		mostrarMensaje(rs);
	},"formEdicionProveedor");
});

agregarEvento(_btnEliminarProveedor,"click",function(){
	var datos={};
	var id="";
	eliminarDato(_URL+"/"+id,datos,function(rs){
		consola(rs);
	});


});

	agregarEvento("proveedoresP","click",function(){
			consultarDatos(_URL+"proveedores",{},function(rs){
				if(rs.respuesta==true){
					_proveedores=rs.datos;
					var cta=document.getElementById("msProveedores");
					cta.innerHTML="";
					for(var d in rs.datos){
						var li=document.createElement("li");
						li.className="prov";
						li.innerHTML=rs.datos[d].nombre_proveedor;
						li.setAttribute("onclick","seleccionar_proveedor("+rs.datos[d].id+")");
						cta.appendChild(li);

					}
				}
			});
		})


}

function seleccionar_proveedor(id){
	for(var d in _proveedores){
		console.log(_proveedores[d].id);
		console.log(id);
		if(_proveedores[d].id==id){
			document.getElementById("txtProveedorSeleccionado").value=_proveedores[d].nombre_proveedor;
			document.getElementById("hdIdProveedorEliminar").value=_proveedores[d].id;
			document.getElementById("contacto_prov").value=_proveedores[d].nombre_contacto_proveedor;
			document.getElementById("telefono_prov").value=_proveedores[d].telefono_contacto_proveedor;
			document.getElementById("email_prov").value=_proveedores[d].email_contacto_proveedor;
			$('#nuevoProveedor').fadeOut('fast');
        	$('#resultadoSeleccionProv').fadeIn('slow');
			break;
		}
	}
}