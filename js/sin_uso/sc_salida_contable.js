agregarEvento(_btnCrearSalidaContable,"click",function(){
	var vf=obtener_valores_formulario("");
	if(vf!=false){
		var datos={
			nombre_salida:vf.Texo[0],
			descripcion_salida:vf.Texo[1],
			maximo_valor_salida:vf.Texo[2],

		};
		registrarDato(_URL,datos,function(rs){
			consola(rs);
		},"formulario");

	}else{
		mostrarMensaje("Por favor ingresa valores");
	}
});

agregarEvento(_btnConsultarSalidaContable,"click",function(){
	
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
agregarEvento(_btnEditarSalidaContable,"click",function(){
	var datos={
			nombre_salida:vf.Texo[0],
			descripcion_salida:vf.Texo[1],
			maximo_valor_salida:vf.Texo[2],
	};
	var id="";
	editarDatos(_URL+"/"+id,datos,function(rs){
		consola(rs);
	});
});

agregarEvento(_btnEliminarSalidaContable,"click",function(){
	var datos={};
	var id="";
	eliminarDato(_URL+"/"+id,datos,function(rs){
		consola(rs);
	});
});