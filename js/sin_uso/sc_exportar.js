agregarEventoLoad(function(){
	agregarEvento("btnExportarProductos","click",function(){

		var datos={};
		consultarDatos(_URL+"exportar",datos,function(rs){
			consola(rs);
		});	
	});
});