agregarEvento(_btnCrearImpuesto,"click",function(){
	var vf=obtener_valores_formulario("");
	if(vf!=false){
		var datos={
			nombre_impuesto:vf.Texto[0],
			valor_impuesto:vf.Texto[1],
		};
		registrarDato(_URL,datos,function(rs){
			consola(rs);
		},"formulario");

	}else{
		mostrarMensaje("Por favor ingresa valores");
	}
	
});

agregarEvento(_btnConsultarImpuesto,"click",function(){
	
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

agregarEvento(_btnEditarImpuesto,"click",function(){
	var datos={
			nombre_impuesto:vf.Texto[0],
			valor_impuesto:vf.Texto[1],
	};
	var id="";
	editarDatos(_URL+"/"+id,datos,function(rs){
		consola(rs);
	});
});

agregarEvento(_btnEliminarImpuesto,"click",function(){
	var datos={};
	var id="";
	eliminarDato(_URL+"/"+id,datos,function(rs){
		consola(rs);
	});
});