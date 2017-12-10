

agregarEvento(_btnCrearEntradaContable,"click",function(){
	var vf=obtener_valores_formulario("");
	if(vf!=false){
		var datos={
			nombre_entrada:vf.Texto[0],
			descripcion_entrada:vf.Texto[1],
			maximo_valor_entrada:vf.Texto[2],
		};
		registrarDato(_URL,datos,function(rs){
			consola(rs);
		},"formulario");

	}else{
		mostrarMensaje("Por favor ingresa valores");
	}
});

agregarEvento(_btnConsultarEntradaContable,"click",function(){
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

agregarEvento(_btnEditarEntradaContable,"click",function(){
	var datos={
			nombre_entrada:vf.Texto[0],
			descripcion_entrada:vf.Texto[1],
			maximo_valor_entrada:vf.Texto[2],
	};
	var id="";
	editarDatos(_URL+"/"+id,datos,function(rs){
		consola(rs);
	});
});

agregarEvento(_btnEliminarEntradaContable,"click",function(){
	var datos={};
	var id="";
	eliminarDato(_URL+"/"+id,datos,function(rs){
		consola(rs);
	});
 

});