function iniciar_sedes(valido){

if(valido){
		agregarEvento(_btnCrearSede,"click",function(){
		var vf=obtener_valores_formulario("formSedes");
		if(vf!=false){
			var hor=[];
			console.log(vf);
			if(document.getElementById("dia1").checked){
				hor.push(["LUNES",document.getElementById("horA1").value,document.getElementById("horC1").value]);
			}

			if(document.getElementById("dia2").checked){
				hor.push(["MARTES",document.getElementById("horA2").value,document.getElementById("horC2").value]);
			}

			if(document.getElementById("dia3").checked){
				hor.push(["MIERCOLES",document.getElementById("horA3").value,document.getElementById("horC3").value],);
			}
			if(document.getElementById("dia4").checked){
				hor.push(["JUEVES",document.getElementById("horA4").value,document.getElementById("horC4").value]);
			}
			if(document.getElementById("dia5").checked){
				hor.push(["VIERNES",document.getElementById("horA5").value,document.getElementById("horC5").value]);
			}
			if(document.getElementById("dia6").checked){
				hor.push(["SABADO",document.getElementById("horA6").value,document.getElementById("horC6").value]);
			}
			if(document.getElementById("dia7").checked){
				hor.push(["DOMINGO",document.getElementById("horA7").value,document.getElementById("horC7").value]);
			}
				var inv=false;
			if(vf.Checkbox[7]!=null){
				inv=true;
			}

			var datos={
				nombre_sede:vf.Texto[0],
				direccion_sede:vf.Texto[1],
				telefono_sede:vf.Texto[2],
				horario:hor,
				codigo_sede:vf.Texto[3],
				fk_id_administrador:vf.Select[0],
				inventario:inv,
			};
			registrarDato(_URL+"sedes",datos,function(rs){
				consola(rs);
				mostrarMensaje(rs);
			},"formSedes");

		}else{
			mostrarMensaje("Por favor ingresa valores");
		}
	});


	agregarEvento("selEditarSede","change",function(){
		
			console.log(document.getElementById("selEditarSede").value);
		
			var datos={};
			var valor_consulta=document.getElementById("selEditarSede").value;
			consultarDatos(_URL+"sedes/"+valor_consulta,datos,function(rs){
				consola(rs);	
				if(rs.respuesta){
					dibujar_sede_edicion(rs);
				}	
			},"formulario");
		
	});
	agregarEvento("btnEditarSede","click",function(){
		var vf=obtener_valores_formulario("formEdiSedeFin");
		if(vf!=false){
			 var hora=[["LUNES",document.getElementById("horEDA1").value,document.getElementById("horEDC1").value],
					["MARTES",document.getElementById("horEDA2").value,document.getElementById("horEDC2").value],
					["MIERCOLES",document.getElementById("horEDA3").value,document.getElementById("horEDC3").value],
					["JUEVES",document.getElementById("horEDA4").value,document.getElementById("horEDC4").value],
					["VIERNES",document.getElementById("horEDA5").value,document.getElementById("horEDC5").value],
					["SABADO",document.getElementById("horEDA6").value,document.getElementById("horEDC6").value],
					["DOMINGO",document.getElementById("horEDA7").value,document.getElementById("horEDC7").value],];
			var datos={
					nombre_sede:vf.Texto[0],
					direccion_sede:vf.Texto[1],
					telefono_sede:vf.Texto[2],
					codigo_sede:vf.Texto[3],
					horario:hora,
					fk_id_administrador:vf.Select[0],
				};				
			var id=document.getElementById("selEditarSede").value;
			editarDato(_URL+"sedes/"+id,datos,function(rs){
				mostrarMensaje(rs);
			},"formEdiSedeFin");
		}
	});

	agregarEvento("blEliminarSede","click",function(){
		var datos={};
		var id=document.getElementById("selEliminarSede").value;
		eliminarDato(_URL+"sedes/"+id,datos,function(rs){
			consola(rs);
			mostrarMensaje(rs);
		});
	});

}else{
	mostrarMensaje("No tiene permisos para usar esta seccion");
}
}


function dibujar_sede_edicion(rs){

	document.getElementById("nom_sede").value=rs.datos[0].nombre_sede;
	
	var sel1=document.getElementById("selAdminSedeEdi");
	for(var o in sel1){
		if(sel1[o] != null){
			if(sel1[o].value==rs.datos[0].fk_id_administrador){
				sel1[o].selected=true;
				//document.getElementById("selNuevoProdTipoVenta").value=d.tipo_venta_producto;		
			}
		}
		
	}
	document.getElementById("dir_sede").value=rs.datos[0].direccion_sede;
	document.getElementById("tel_sede").value=rs.datos[0].telefono_sede;
	document.getElementById("cod_sede").value=rs.datos[0].codigo_sede;

	var horario=eval(rs.datos[0].horario);
	console.log(horario);
	var pos;
	for(var e in horario){
		console.log(Number(e)+1);
		pos=Number(e)+1;
		console.log(horario[e]);
		console.log(document.getElementById("horEDA"+pos));
		console.log(document.getElementById("horEDC"+pos));
		document.getElementById("horEDA"+pos).value=horario[e][1];
		document.getElementById("horEDC"+pos).value=horario[e][2]
	}

}