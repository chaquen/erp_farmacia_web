agregarEvento(_btnCrearRol,"click",function(){
	var vf=obtener_valores_formulario("");
	if(vf!=false){
		var datos={

			nombre_rol:vf.Texto[0],
			descripcion_rol:vf.Texto[1],
		};
		registrarDato(_URL,datos,function(rs){
			consola(rs);
		},"formulario");

	}else{
		mostrarMensaje("Por favor ingresa valores");
	}
});

agregarEvento(_btnConsultarRol,"click",function(){
	
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
agregarEvento(_btnEditarRol,"click",function(){
	var datos={
		nombre_rol:vf.Texto[0],
		descripcion_rol:vf.Texto[1],
	};
	var id="";
	editarDatos(_URL+"/"+id,datos,function(rs){
		consola(rs);
	});
});

agregarEvento(_btnEliminarRol,"click",function(){
	var datos={};
	var id="";
	eliminarDato(_URL+"/"+id,datos,function(rs){
		consola(rs);
	});
});