agregarEventoLoad(function(){
	agregarEvento("btnRegistroPermisos","click",function(){
		var datos={
			fk_id_rol:"",
			fk_id_permiso:"",
			consultar:"",
			editar:"",
			crear:"",
			eliminar:"",
		};
		registrarDatos(+_URL"",datos,function(rs){
			consola(rs);
		});
	});
});