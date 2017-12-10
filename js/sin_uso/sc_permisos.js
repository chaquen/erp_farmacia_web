agregarEvento(_btnCrearPermiso,"click",function(){
	var vf=obtener_valores_formulario("");
	if(vf!=false){
		var datos={
			nombre_permiso:vf.Texto[0],
			descripcion_permiso:vf.Texto[1],
		};
		registrarDato(_URL,datos,function(rs){
			consola(rs);
		},"formulario");

	}else{
		mostrarMensaje("Por favor ingresa valores");
	}
});

agregarEvento(_btnConsultarPermiso,"click",function(){
	
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
agregarEvento(_btnEditarPermiso,"click",function(){
	var datos={
			nombre_permiso:vf.Texto[0],
			descripcion_permiso:vf.Texto[1],
	};
	var id="";
	editarDatos(_URL+"/"+id,datos,function(rs){
		consola(rs);
	});
});

agregarEvento(_btnEliminarPermiso,"click",function(){
	var datos={};
	var id="";
	eliminarDato(_URL+"/"+id,datos,function(rs){
		consola(rs);
	});
});	