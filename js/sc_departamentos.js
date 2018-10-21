var _categorias;
function iniciar_departamento(valido){

	if(valido){
		agregarEvento(_btnCrearDepartamento,"click",function(){
			var vf=obtener_valores_formulario("formCrearCategoria");
			if(vf!=false){
				var datos={
					nombre_departamento:vf.Texto[0],
				};
				registrarDato(_URL+"departamentos",datos,function(rs){
					mostrarMensaje(rs);
				},"formCrearCategoria");

			}else{
				mostrarMensaje("Por favor ingresa valores al formulario");
			}

		});

		agregarEvento(_btnConsultarDepartamento,"click",function(){
			var vf=document.getElementById("txtBuscarCategoria");
			if(vf.value!=""){
			
					consultarDatos(_URL+"departamentos/"+vf.value,{},function(rs){
					if(rs.respuesta==true){
						_categorias=rs.datos;
						var cta=document.getElementById("msCategorias");
						cta.innerHTML="";
						for(var d in rs.datos){
							var li=document.createElement("li");
							li.className="cat";
							li.innerHTML=rs.datos[d].nombre_departamento;
							li.setAttribute("onclick","seleccionar_categoria("+rs.datos[d].id+")");
							cta.appendChild(li);

						}
					}
				});
			}else{
				mostrarMensaje("Por favor ingresa valores");
			}


		});

		agregarEvento(_btnEditarDepartamento,"click",function(){
			var vf=obtener_valores_formulario("formEdicionDepartamento");
			var datos={
					nombre_departamento:vf.Texto[0],
				};
			var id=document.getElementById("hdIdDepartamentoEliminar").value;
			editarDato(_URL+"departamentos/"+id,datos,function(rs){
				mostrarMensaje(rs);
			});
		});

		agregarEvento(_btnEliminarDepartamento,"click",function(){
			if(confirm("¿Desea eliminar esta categoria?")){

			}
			var datos={};
			var id=document.getElementById("hdIdDepartamentoEliminar").value;
			eliminarDato(_URL+"departamentos/"+id,datos,function(rs){
				consola(rs);
				mostrarMensaje(rs);
			});
		});
		agregarEvento("categoriaP","click",function(){
			consultarDatos(_URL+"departamentos",{},function(rs){
				if(rs.respuesta==true){
					_categorias=rs.datos;
					var cta=document.getElementById("msCategorias");
					cta.innerHTML="";
					for(var d in rs.datos){
						var li=document.createElement("li");
						li.className="cat";
						li.innerHTML=rs.datos[d].nombre_departamento;
						li.setAttribute("onclick","seleccionar_categoria("+rs.datos[d].id+")");
						cta.appendChild(li);

					}
				}
			});
		})
	 	agregarEvento("txtBuscarCategoria","keypress",function(){
	 		var vf=document.getElementById("txtBuscarCategoria");
			if(vf.value!=""){
			
				var datos={};
				var valor_consulta=vf.value;
				consultarDatos(_URL+"departamentos/"+valor_consulta,datos,function(rs){
					consola(rs);	
					if(rs.respuesta==true){
						crear_data_list_categoria("lista_categorias",rs.datos);
					}	
				},"formulario");
			}
	 	});

	}else{
		mostrarMensaje("No tiene permisos para usar esta seccion");
	}
	
}

function seleccionar_categoria(id){
	for(var d in _categorias){
		//console.log(_categorias[d].id);
		//console.log(id);
		if(_categorias[d].id==id){
			document.getElementById("txtCategoriaSeleccionada").value=_categorias[d].nombre_departamento;
			document.getElementById("hdIdDepartamentoEliminar").value=_categorias[d].id;
			$('#nuevaCategoria').fadeOut('fast');
        	$('#resultadoSeleccionCat').fadeIn('slow');
			break;
		}
	}
}