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
agregarEvento(_btnEditarProveedor,"click",function(){
	var datos={
			nombre_proveedor:vf.Texto[0],
			nit:vf.Texto[1],
			nombre_contacto_proveedor:vf.Texto[2],
			telefono_contacto_proveedor:vf.Texto[3],
			direccion_contacto_proveedor:vf.Texto[4],
			email_contacto_proveedor:vf.Texto[5],
	};
	var id="";
	editarDatos(_URL+"/"+id,datos,function(rs){
		consola(rs);
	});
});

agregarEvento(_btnEliminarProveedor,"click",function(){
	var datos={};
	var id="";
	eliminarDato(_URL+"/"+id,datos,function(rs){
		consola(rs);
	});
});