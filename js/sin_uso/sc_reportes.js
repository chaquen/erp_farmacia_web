agregarEventoLoad(function(){
	agregarEvento("btnGenerarReporteInventario","click",function(){
		var div=document.getElementById("reporte");
		var datos={
			tipo:"GENERAL",

		};
		registrarDato(_URL+"reporte_inventario",datos,function(rs){
			consola(rs);	
		});
	});	
	agregarEvento("btnGenerarReporteInventarioSede","click",function(){
		var div=document.getElementById("reporte");
		var datos={
			tipo:"SEDE",
			sede:2,

		};
		registrarDato(_URL+"reporte_inventario",datos,function(rs){
			consola(rs);	
		});
	});

	agregarEvento("btnGenerarReporteBajoInventario","click",function(){
		var div=document.getElementById("reporte");
		var datos={
			tipo:"GENERAL",
			

		};
		registrarDato(_URL+"reporte_bajo_inventario",datos,function(rs){
			consola(rs);	
		});
	});

	agregarEvento("btnGenerarReporteBajoInventarioSede","click",function(){
		var div=document.getElementById("reporte");
		var datos={
			tipo:"SEDE",
			sede:2,

			

		};
		registrarDato(_URL+"reporte_bajo_inventario",datos,function(rs){
			consola(rs);	
		});
	});

	agregarEvento("btnGenerarReporteMovimientosInventario","click",function(){
		var div=document.getElementById("reporte");
		var fil;
		if(document.getElementById("selTipoMovimiento").value!="TODOS"){
			fil=["tipo","=",document.getElementById("selTipoMovimiento").value];	
		}
		
		var datos={
			tipo:"GENERAL",
			filtro:[fil]
			

		};
		registrarDato(_URL+"reporte_movimientos_inventario",datos,function(rs){
			consola(rs);	
		});


	});
	agregarEvento("btnGenerarReporteMovimientosInventarioSede","click",function(){
		var div=document.getElementById("reporte");
		var fil;
		if(document.getElementById("selTipoMovimiento").value!="TODOS"){
			fil=["tipo","=",document.getElementById("selTipoMovimiento").value];	
		}
		
		var datos={
			tipo:"SEDE",
			filtro:[fil],
			sede:2,
			

		};
		registrarDato(_URL+"reporte_movimientos_inventario",datos,function(rs){
			consola(rs);	
		});


	});

	agregarEvento("btnGenerarReporteSaldosCreditos","click",function(){
		var div=document.getElementById("reporte");
		var fil=[];
		var datos={
			tipo:"GENERAL",
			filtro:fil
		};
		registrarDato(_URL+"reporte_saldos",datos,function(rs){
			consola(rs);
		});
	});
	agregarEvento("btnGenerarReporteSaldosCreditosSede","click",function(){
		var div=document.getElementById("reporte");
		var fil=[];
		var datos={
			tipo:"SEDE",
			sede:1,
			filtro:fil
		};
		registrarDato(_URL+"reporte_saldos",datos,function(rs){
			consola(rs);
		});
	});

	agregarEvento("selPeriodo","change",function(){
		if(this.value=="periodo"){
			document.getElementById("divFechas").style.display='';
		}else{
			document.getElementById("divFechas").style.display='none';
		}
	});
	agregarEvento("btnGenerarReporteVentasPorPeriodo","click",function(){
		var div=document.getElementById("reporte");
		var selPeriodo=document.getElementById("selPeriodo");
		var fil=[];
		switch(selPeriodo.value){
			case "hoy":
				consola(horaCliente().split(" ")[0]);
				break;
			case "ayer":
				consola(ayer());
				break;
			case "estemes":
				consola(este_mes());
				break;	
			case "periodo":
				 var fil=[];
				 var fini=document.getElementById("inicio");	
				 var ffin=document.getElementById("fin");	
				 if(fini.value!=""){
				 	if(ffin.value!=""){
				 		fli[0]=["facturas.created_at",">=",fini.value+" %"];
				 		fli[1]=["facturas.created_at","<=",ffin.value+" %"];

				 	}else{
				 		fil[0]=["facturas.created_at",">=",fini.value+" %"];
				 		fil[1]=["facturas.created_at","<=",horaCliente().split(" ")[0]+" %"];;

				 	}


				 }else{
				 	mostrarMensaje("Por favor ingresa una fecha de busqueda");
				 }
				break;		

		}	
		
		var datos={
			tipo:"GENERAL",
			filtro:fil
		};
		registrarDato(_URL+"reporte_ventas_por_periodo",datos,function(rs){
			consola(rs);
		});	
	});
	agregarEvento("btnGenerarReporteVentasPorPeriodoSede","click",function(){
		var div=document.getElementById("reporte");
		var selPeriodo=document.getElementById("selPeriodo");
		var fil=[];
		switch(selPeriodo.value){
			case "hoy":
				consola(horaCliente().split(" ")[0]);
				break;
			case "ayer":
				consola(ayer());
				break;
			case "estemes":
				consola(este_mes());
				break;	
			case "periodo":
				 var fil=[];
				 var fini=document.getElementById("inicio");	
				 var ffin=document.getElementById("fin");	
				 if(fini.value!=""){
				 	if(ffin.value!=""){
				 		fli[0]=["facturas.created_at",">=",fini.value+" %"];
				 		fli[1]=["facturas.created_at","<=",ffin.value+" %"];

				 	}else{
				 		fil[0]=["facturas.created_at",">=",fini.value+" %"];
				 		fil[1]=["facturas.created_at","<=",horaCliente().split(" ")[0]+" %"];;

				 	}


				 }else{
				 	mostrarMensaje("Por favor ingresa una fecha de busqueda");
				 }
				break;		

		}	
		
		var datos={
			tipo:"SEDE",
			filtro:fil,
			sede:1,
		};
		registrarDato(_URL+"reporte_ventas_por_periodo",datos,function(rs){
			consola(rs);
		});	
	});

	agregarEvento("btnReporteCorteCajaDiario","click",function(){


		var datos={
			tipo:"GENERAL",
			filtro:[
					["detalle_entrada_contables.fecha_entrada",'>=',horaCliente().split(" ")[0]+" 00:00:00"],
					["detalle_entrada_contables.fecha_entrada",'<=',horaCliente()]
				   ],
		}
		registrarDato(_URL+"reporte_corte_diario",datos,function(rs){
			consola(rs);

		});
	});
});