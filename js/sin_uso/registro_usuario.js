agregarEventoLoad(function(){
	agregarEvento("btnRegistroUsuario","click",function(){
		var vf=obtener_valores_formulario("formUsuario");
		if(vf!=false){
		 var datos={
		 	nombre:vf.Texto[0],
		 	apellido:vf.Texto[1],
		 	documento:vf.Texto[2],
		 	email:vf.Texto[3],
		 	password:vf.Clave,
		 	rol:vf.Select[0]
		 };
		 registrarDato(_URL+"usuarios",datos,function(rs){
		 	console.log(rs);
		 	mostrarMensaje(rs);
		 });

		}else{
			mostrarMensaje("Ingresa datos por favor");
		}	
	});
});