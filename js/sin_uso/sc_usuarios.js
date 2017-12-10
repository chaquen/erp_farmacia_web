agregarEvento(_btnCrearUsuario,"click",function(){
	var vf=obtener_valores_formulario("");
	if(vf!=false){
		var datos={
			nombres:vf.Texto[0],
			apellidos:vf.Texto[1],
			usuario:vf.Texto[2],
			documento:vf.Texto[3],
			email:vf.Texto[4],
			password:vf.Clave,
			fk_id_rol:vf.Select[0],
		};
		registrarDato(_URL,datos,function(rs){
			consola(rs);
		},"formulario");

	}else{
		mostrarMensaje("Por favor ingresa valores");
	}

});

agregarEvento(_btnConsultarUsuario,"click",function(){
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

agregarEvento(_btnEditarUsuario,"click",function(){
	var datos={
			nombres:vf.Texto[0],
			apellidos:vf.Texto[1],
			usuario:vf.Texto[2],
			documento:vf.Texto[3],
			email:vf.Texto[4],
			password:vf.Clave,
			fk_id_rol:vf.Select[0],
	};
	var id="";
	editarDatos(_URL+"/"+id,datos,function(rs){
		consola(rs);
	});
});

agregarEvento(_btnEliminarUsuario,"click",function(){
	var datos={};
	var id="";
	eliminarDato(_URL+"/"+id,datos,function(rs){
		consola(rs);
	});
});