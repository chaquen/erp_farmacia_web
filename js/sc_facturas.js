var _numero_ticket = 0;
var id_tk_activo = 0;
var mi_ticket = [];
var mis_ticket_off = [];
var txt_codigo = "";

function iniciar_factura() {
    //if(obtener_local_storage("btn_tk_"+_usuario.id_usuario+"_"+_IdSede)==false){
    //agregar_local_storage("btn_tk_"+_usuario.id_usuario+"_"+_IdSede,1);   
    //}
    obtener_tickets_pendientes();
    mostrar_venta_inicial();
    agregarEvento("liNuevoTicketPendiente", "click", function() {
        if (registro_factura) {
            registro_factura = false;
            var tipo_venta = document.getElementsByName("tipo_venta");
            var tv;
            for (var t in tipo_venta) {
                if (tipo_venta[t].checked == true) {
                    tv = tipo_venta[t].value;
                }
            }
            var registrar_fac = true;
            var num = horaCliente();
            var id_ven;
            if (document.getElementById("txtMisCajeros").value == "") {
                id_ven = _usuario.codigo_venta;
            } else {
                id_ven = document.getElementById("txtMisCajeros").value;
            }
            var cli = _id_cliente;
            if (document.getElementById("txtMisClientes").value != "") {
                cli = document.getElementById("txtMisClientes").value.split("-")[1];
            }
            var datos = {
                fk_id_vendedor: id_ven,
                id_usuario: _usuario.id_usuario,
                numero_factura: horaCliente().split(" ")[0].split("-")[0].substr(2) + horaCliente().split(" ")[0].split("-")[1] + horaCliente().split(" ")[0].split("-")[2] + "-" + horaCliente().split(" ")[1].split(":")[0] + horaCliente().split(" ")[1].split(":")[1] + horaCliente().split(" ")[1].split(":")[2] + "-" + _IdSede,
                fk_id_cliente: cli,
                estado_factura: "",
                fk_id_sede: _IdSede,
                observaciones: "",
                detalle_factura: mi_ticket[_numero_ticket],
                estado_factura: "pendiente",
                valor_cobrado: "0",
            };
            registrarDato(_URL + "facturas", datos, function(rs) {
                mi_ticket = rs.datos;
                $("#txtCodigoProducto").focus();
                registro_factura = true;
                //dibujar ticktes
                var ulTickets = document.getElementById("ulTickets");
                ulTickets.innerHTML = "";
                for (var i = 0; i <= rs.datos.length - 1; i++) {
                    var li = document.createElement("li");
                    var inp = document.createElement("input");
                    inp.setAttribute("type", "button");
                    inp.setAttribute("name", "tk");
                    inp.setAttribute("style", "float:left");
                    inp.setAttribute("id", "btn_" + (rs.datos[i].id));
                    inp.setAttribute("value", "TICKET " + ((i + 1)));
                    inp.setAttribute("onclick", "cambio_mi_ticket('" + (i) + "')");
                    if (i == 0) {
                        inp.setAttribute("style", "background:#ff9998");
                    }
                    li.appendChild(inp);
                    ulTickets.appendChild(li);
                }
            }, "formulario", function(jqXHR, textStatus, errorThrown) {
                console.log("que hago si hay un error para la factura");
                registro_factura = true;
            });
        } else {
            mostrarMensaje("Registrando factura ...");
        }
    });
    agregarEvento("liEliminarTicketPendiente", "click", function() {
        //eliminarDato(_URL+"facturas/"+id_tk_activo.split("_")[1],{},function(rs){});
        if (confirm("¿Desea eliminar este ticket?")) {
            eliminar_ticket(id_tk_activo.split("_")[1]);
        }
    });
    agregarEvento("txtCodigoProducto", "keypress", function(e) {
        if (e.keyCode != 13) {
            console.log(e.key);
        } else {
            console.log(e.key);
            if (e.key == "Enter" && this.value!="") {
                registrarDato(_URL + "traer_productos_para_factura/" + this.value.trim() + "/" + _IdSede, {}, function(rs) {
                    if (rs.respuesta) {
                        var listaProductos = document.getElementById("listaProductos");
                        listaProductos.innerHTML = "";
                        console.log(rs.datos);
                        if (rs.datos.length == 1) {
                            _producto_seleccionado = rs.datos[0];
                            document.getElementById("numCantidad").value = 1;
                            document.getElementById("txtCodigoProducto").style.backgroundColor = "red";
                            document.getElementById("h4NombreProductoInv").innerHTML = _producto_seleccionado.nombre_producto;
                            if (e.keyCode == 13 && _producto_seleccionado != false) {
                                if (_producto_seleccionado != false) {
                                    agregar_producto_mi_ticket(_producto_seleccionado);
                                } else {
                                    document.getElementById("numCantidad").value = 0;
                                    document.getElementById("txtCodigoProducto").value = "";
                                    document.getElementById("txtCodigoProducto").style.backgroundColor = "red";
                                }
                            }
                            var sel = document.getElementById("selTipoVentaFactura");
                            console.log(sel);
                            sel.innerHTML = "";
                            if (rs.datos[0].tipo_venta_producto == "Caja") {
                                var opt = document.createElement("option");
                                opt.innerHTML = "Unidad";
                                opt.value = "unidad";
                                sel.appendChild(opt);
                                var opt = document.createElement("option");
                                opt.innerHTML = "Caja";
                                opt.value = "caja";
                                sel.appendChild(opt);
                            } else if (rs.datos[0].tipo_venta_producto == "PorUnidad") {
                                var opt = document.createElement("option");
                                opt.innerHTML = "Unidad";
                                opt.value = "unidad";
                                sel.appendChild(opt);
                            } else if (rs.datos[0].tipo_venta_producto == "CajaBlister") {
                                var opt = document.createElement("option");
                                opt.innerHTML = "Unidad";
                                opt.value = "unidad";
                                sel.appendChild(opt);
                                var opt = document.createElement("option");
                                opt.innerHTML = "Blister";
                                opt.value = "blister";
                                sel.appendChild(opt);
                                var opt = document.createElement("option");
                                opt.innerHTML = "Caja";
                                opt.value = "caja";
                                sel.appendChild(opt);
                            }
                        }
                    } else {
                        _producto_seleccionado = false;
                        document.getElementById("txtCodigoProducto").style.backgroundColor = "red";
                        document.getElementById("txtCodigoProducto").value = "";
                    }
                }, "");
                e.preventDefault();
                this.value="";
                return false;
            }
        }
    });

    agregarEvento("btnAgregarProducto", "click", function() {
        if (document.getElementById("txtCodigoProducto").value != "") {
            registrarDato(_URL + "traer_productos_para_factura/" + document.getElementById("txtCodigoProducto").value.trim() + "/" + _IdSede, {}, function(rs) {
                if (rs.respuesta) {
                    var listaProductos = document.getElementById("listaProductos");
                    listaProductos.innerHTML = "";
                    console.log(rs.datos);
                    if (rs.datos.length == 1) {
                        _producto_seleccionado = rs.datos[0];
                        document.getElementById("numCantidad").value = 1;
                        document.getElementById("txtCodigoProducto").style.backgroundColor = "red";
                        document.getElementById("h4NombreProductoInv").innerHTML = _producto_seleccionado.nombre_producto;
                        agregar_producto_mi_ticket(_producto_seleccionado);
                        var sel = document.getElementById("selTipoVentaFactura");
                        console.log(sel);
                        sel.innerHTML = "";
                        if (rs.datos[0].tipo_venta_producto == "Caja") {
                            var opt = document.createElement("option");
                            opt.innerHTML = "Unidad";
                            opt.value = "unidad";
                            sel.appendChild(opt);
                            var opt = document.createElement("option");
                            opt.innerHTML = "Caja";
                            opt.value = "caja";
                            sel.appendChild(opt);
                        } else if (rs.datos[0].tipo_venta_producto == "PorUnidad") {
                            var opt = document.createElement("option");
                            opt.innerHTML = "Unidad";
                            opt.value = "unidad";
                            sel.appendChild(opt);
                        } else if (rs.datos[0].tipo_venta_producto == "CajaBlister") {
                            var opt = document.createElement("option");
                            opt.innerHTML = "Unidad";
                            opt.value = "unidad";
                            sel.appendChild(opt);
                            var opt = document.createElement("option");
                            opt.innerHTML = "Blister";
                            opt.value = "blister";
                            sel.appendChild(opt);
                            var opt = document.createElement("option");
                            opt.innerHTML = "Caja";
                            opt.value = "caja";
                            sel.appendChild(opt);
                        }
                    } else {
                        document.getElementById("txtCodigoProducto").style.backgroundColor = "red";
                        document.getElementById("txtCodigoProducto").value = "";
                    }
                } else {
                    _producto_seleccionado = false;
                    document.getElementById("txtCodigoProducto").style.backgroundColor = "red";
                    document.getElementById("txtCodigoProducto").value = "";
                }
            }, "");
        } else {
            document.getElementById("numCantidad").value = 0;
            document.getElementById("txtCodigoProducto").value = "";
            document.getElementById("h4NombreProductoInv").innerHTML = "Nombre producto";
        }
    });
    agregarEvento("txtMisCajeros", "keypress", function(e) {
        if (e.keyCode == 13) {
            var esta = false;
            for (var i in cajeros) {
                if (cajeros[i].codigo_venta == this.value) {
                    esta = true;
                    mi_ticket[_numero_ticket].fk_id_vendedor=cajeros[i].id;
                    break;
                }
            }
            if (esta) {
                e.preventDefault();
                crear_factura();
            } else {
                mostrarMensaje("Este codigo no esta registrado ");
            }
        }
    });
    agregarEvento("h4RegistrarVenta", "click", function(e) {
        if (document.getElementById("txtMisCajeros").value != "") {
            var esta = false;
            for (var i in cajeros) {
                if (cajeros[i].codigo_venta == document.getElementById("txtMisCajeros").value) {
                    esta = true;
                    break;
                }
            }
            if (esta) {
                e.preventDefault();
                crear_factura();
            } else {
                mostrarMensaje("Este codigo no esta registrado ");
            }
        } else {
            mostrarMensaje("Por favor ingresa tu codigo de venta");
        }
    });
    agregarEvento(_btnConsultarFactura, "click", function() {
        var vf = obtener_valores_formulario("");
        if (vf != false) {
            var datos = {};
            var valor_consulta = "";
            consultarDatos(_URL + "/" + valor_consulta, datos, function(rs) {
                console.log(rs);
            }, "formulario");
        } else {
            mostrarMensaje("Por favor ingresa valores");
        }
    });
    agregarEvento("txtPagaCon", "change", function() {
        h3Cambio.value = this.value - Number(document.getElementById("h1Total").value);
        h3Cambio.innerHTML = "$ " + formato_numero(this.value - Number(document.getElementById("h1Total").value), "0", ",", ".");
    });
    agregarEvento("liMayoreo", "click", function() {
        if (confirm("¿Desea aplicar precio de mayoreo para este producto?")) {
            console.log(_producto_seleccionado);
            if (_producto_seleccionado != false) {
                _producto_seleccionado.precio_mayoreo_sede = _producto_seleccionado.precio_mayoreo_sede;
            } else {
                mostrarMensaje("Por favor selecciona un producto");
            }
        }
    });
    agregarEvento("txtMisClientes", "keypress", function() {
        if (this.value != "" && this.value != " " && this.value != "  " && this.value.length > 3) {
            consultarDatos(_URL + "clientes/" + this.value, {}, function(rs) {
                console.log(rs);
                if (rs.respuesta) {
                    crear_data_list_clientes("list_mis_clientes", rs.datos);
                }
            });
        }
    });
    agregarEvento("btnAceptarSalida", "click", function() {
        var vf = obtener_valores_formulario("formSalidaContable");
        if (vf != false) {
            var datos = {
                fk_id_salida_contable: vf.Select[0],
                fk_id_usuario: _usuario.id_usuario,
                fk_id_sede: _IdSede,
                valor_salida: vf.Texto[0],
            };
            registrarDato(_URL + "detalle_salida_contable", datos, function(rs) {
                mostrarMensaje(rs);
            }, "formSalidaContable");
        }
    });
    agregarEvento("txtBuscarProducto", "keypress", function(e) {
        console.log(this.value);
        if (e.keyCode != 13) {
            if (this.value != "") {
                registrarDato(_URL + "traer_productos/" + this.value + "/" + _IdSede, {}, function(rs) {
                    if (rs.respuesta == true) {
                        crear_data_list_producto("list_buscar_producto", rs.datos);
                    }
                });
            }
        } else {
            if (this.value != "") {
                e.preventDefault();
                registrarDato(_URL + "traer_productos/" + this.value + "/" + _IdSede, {}, function(rs) {
                    dibujar_producto_busqueda(rs.datos);
                });
            }
        }
    });
    agregarEvento("selSedesFacturacion", "change", function() {
        if (this.value != "0" || this.value != undefined) {
            if (document.getElementById("selSedesFacturacion").value == 0) {
                mostrarMensaje("Por favor selecciona una sede");
                return false;
            }
            if (document.getElementById("dtFechaFactura").value == "") {
                mostrarMensaje("Por favor selecciona una fecha");
                return false;
            }
            registrarDato(_URL + "facturas_del_dia", {
                dia: document.getElementById("dtFechaFactura").value,
                sede: document.getElementById("selSedesFacturacion").value,
            }, function(rs) {
                if (rs.respuesta) {
                    crear_select_facturas("selFacturasDelDia", rs.datos);
                } else {
                    mostrarMensaje(rs);
                }
            });
        }
    });
    agregarEvento("dtFechaFactura", "change", function() {
        if (this.value != "" || this.value != undefined) {
            if (document.getElementById("selSedesFacturacion").value == 0) {
                mostrarMensaje("Por favor selecciona una sede");
                return false;
            }
            registrarDato(_URL + "facturas_del_dia", {
                dia: document.getElementById("dtFechaFactura").value,
                sede: document.getElementById("selSedesFacturacion").value,
            }, function(rs) {
                if (rs.respuesta) {
                    crear_select_facturas("selFacturasDelDia", rs.datos);
                } else {
                    mostrarMensaje(rs);
                }
            });
        }
    });
    agregarEvento("btnBuscarFactura", "click", function() {
        if (document.getElementById("selFacturasDelDia").value != "0" && document.getElementById("selFacturasDelDia").value != undefined) {
            consultarDatos(_URL + "facturas/" + document.getElementById("selFacturasDelDia").value, {}, function(rs) {
                if (rs.respuesta) {
                    dibujar_facturas_del_dia_consultado(rs.datos);
                }
            });
        }
    });
}

function obtener_tickets_pendientes() {
    consultarDatos(_URL + "obtener_tickets_pendientes/" + _IdSede + "/" + _usuario.id_usuario + "/" + horaCliente().split(" ")[0].split("-")[0].substr(2) + horaCliente().split(" ")[0].split("-")[1] + horaCliente().split(" ")[0].split("-")[2] + "-" + horaCliente().split(" ")[1].split(":")[0] + horaCliente().split(" ")[1].split(":")[1] + horaCliente().split(" ")[1].split(":")[2] + "-" + _IdSede, {}, function(rs) {
        if (rs.respuesta == true) {
            mis_ticket_off = rs.datos;
            mi_ticket = rs.datos;
            var ulTickets = document.getElementById("ulTickets");
            ulTickets.innerHTML = "";
            for (var f = 0; f < mis_ticket_off.length; f++) {
                id_tk_activo = "btn_" + mis_ticket_off[0].id;
                var li = document.createElement("li");
                var inp = document.createElement("input");
                inp.setAttribute("type", "button");
                inp.setAttribute("name", "tk");
                inp.setAttribute("id", "btn_" + (mis_ticket_off[f].id));
                inp.setAttribute("value", "TICKET " + ((f + 1)));
                //inp.setAttribute("onclick","cambio_mi_ticket('"+(mis_ticket_off[f].id )+"')");
                inp.setAttribute("onclick", "cambio_mi_ticket('" + (f) + "')");
                if (f == 0) {
                    inp.setAttribute("style", "background:#ff9998");
                }
                li.appendChild(inp);
                ulTickets.appendChild(li);
            }
            console.log(ulTickets);
            dibujar_factura(mis_ticket_off[0], 0);
        }
    });
}

function dibujar_facturas_del_dia_consultado(datos) {
    var div = document.getElementById("divTablaFacturasDelDia");
    div.innerHTML = "";
    var tbl = document.createElement("table");
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.innerHTML = "CODIGO PRODUCTO"
    tr.appendChild(td);
    var td = document.createElement("td");
    td.innerHTML = "NOMBRE PRODUCTO"
    tr.appendChild(td);
    var td = document.createElement("td");
    td.innerHTML = "TIPO VENTA PRODUCTO"
    tr.appendChild(td);
    var td = document.createElement("td");
    td.innerHTML = "EMBALAJE DE PRESENTACION"
    tr.appendChild(td);
    var td = document.createElement("td");
    td.innerHTML = "CANTIDAD VENTA FACTURA"
    tr.appendChild(td);
    var td = document.createElement("td");
    td.innerHTML = "VALOR PRODUCTO  FACTURA"
    tr.appendChild(td);
    var td = document.createElement("td");
    td.innerHTML = "TOTAL PRODUCTO FACTURA"
    tr.appendChild(td);
    var td = document.createElement("td");
    td.innerHTML = "QUITAR"
    tr.appendChild(td);
    tbl.appendChild(tr);
    div.appendChild(tbl);
    for (var d in datos) {
        console.log(datos[d]);
        var k = Object.keys(datos[d].detalle_factura).length;
        for (var dd in datos[d].detalle_factura) {
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.innerHTML = "   " + datos[d].detalle_factura[dd].codigo_producto;
            tr.appendChild(td);
            var td = document.createElement("td");
            td.innerHTML = "   " + datos[d].detalle_factura[dd].nombre_producto;
            tr.appendChild(td);
            var td = document.createElement("td");
            td.innerHTML = "   " + datos[d].detalle_factura[dd].tipo_venta;
            tr.appendChild(td);
            var td = document.createElement("td");
            if (datos[d].detalle_factura[dd].tipo_venta == "caja") {
                td.innerHTML = "   " + datos[d].detalle_factura[dd].unidades_por_caja;
            } else if (datos[d].detalle_factura[dd].tipo_venta == "blister") {
                td.innerHTML = "   " + datos[d].detalle_factura[dd].unidades_por_blister;
            } else {
                td.innerHTML = "    1";
            }
            tr.appendChild(td);
            var td = document.createElement("td");
            td.innerHTML = "                " + datos[d].detalle_factura[dd].cantidad_producto;
            tr.appendChild(td);
            var td = document.createElement("td");
            td.innerHTML = "$  " + formato_numero(datos[d].detalle_factura[dd].valor_item, "0", ",", ".");
            tr.appendChild(td);
            var td = document.createElement("td");
            td.innerHTML = "$ " + formato_numero(Number(datos[d].detalle_factura[dd].valor_item) * Number(datos[d].detalle_factura[dd].cantidad_producto), "0", ",", ".");
            tr.appendChild(td);
            var td = document.createElement("td");
            var inp = document.createElement("input");
            inp.setAttribute("onclick", "quitar_de_factura(" + datos[d].detalle_factura[dd].id_detalle + "," + k + ")");
            inp.setAttribute("value", "Devolver");
            inp.setAttribute("type", "button");
            td.appendChild(inp);
            tr.appendChild(td);
            tbl.appendChild(tr);
            div.appendChild(tbl);
        }
    }
}

function quitar_de_factura(id, k) {
    var ms = "";
    if (Number(k) == 1) {
        ms = " Recuerde que de eliminar este producto se eliminara esta factura";
    }
    if (confirm("¿Desea quitar este producto de la factura?" + ms)) {
        eliminarDato(_URL + "detalle_factura/" + id, {}, function(rs) {
            mostrarMensaje(rs);
            if (rs.respuesta) {
                var div = document.getElementById("divTablaFacturasDelDia");
                div.innerHTML = "";
            }
        })
    }
}

function dibujar_producto_busqueda(datos) {
    console.log(datos);
    var tbl = document.getElementById("tblBusPro");
    tbl.innerHTML = "";
    for (var d in datos) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.innerHTML += "   " + datos[d].codigo_producto;
        tr.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML += "   " + datos[d].nombre_producto;
        tr.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML += "   $ " + formato_numero(datos[d].precio_venta_sede, "0", ",", ".");
        tr.appendChild(td);
        var td = document.createElement("td");
        if (datos[d].tipo_venta_producto == "CajaBlister") {
            td.innerHTML += "  $ " + formato_numero(datos[d].precio_venta_blister_sede, "0", ",", ".");
        } else {
            td.innerHTML += "  N/A  ";
        }
        tr.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML += "   $ " + formato_numero(datos[d].precio_mayoreo_sede, "0", ",", ".");
        tr.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML += "   " + datos[d].cantidad_existencias;
        tr.appendChild(td);
        var td = document.createElement("td");
        if (datos[d].tipo_venta_producto == "CajaBlister") {
            td.innerHTML += "   " + datos[d].cantidad_existencias_blister;
        } else {
            td.innerHTML += "  N/A ";
        }
        tr.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML += "   " + datos[d].cantidad_existencias_unidades;
        tr.appendChild(td);
        tbl.appendChild(tr);
    }
}

function mostrar_venta_inicial() {
    document.getElementById("tbCuerpoFactura").innerHTML = "";
    consultarDatos(_URL + "obtener_tickets_pendientes/" + _IdSede + "/" + _usuario.id_usuario + "/" + horaCliente().split(" ")[0].split("-")[0].substr(2) + horaCliente().split(" ")[0].split("-")[1] + horaCliente().split(" ")[0].split("-")[2] + "-" + horaCliente().split(" ")[1].split(":")[0] + horaCliente().split(" ")[1].split(":")[1] + horaCliente().split(" ")[1].split(":")[2] + "-" + _IdSede, {}, function(rs) {
        if (rs.respuesta == true) {
            mis_ticket_off = rs.datos;
            if (mis_ticket_off.length > 0) {
                dibujar_factura(mis_ticket_off[0], 0);
                document.getElementById("span").scrollIntoView();
                var cuantos = mis_ticket_off.length;
                console.log(cuantos);
                /*var ulTickets=document.getElementById("ulTickets");
                ulTickets.innerHTML="";
                for(var f=0; f <= mis_ticket_off.length;f++){
                    var li=document.createElement("li");
                    var inp=document.createElement("input");
                    inp.setAttribute("type","button");
                    inp.setAttribute("name","tk");
                    inp.setAttribute("id","btn_"+(mis_ticket_off[f].id));
                    inp.setAttribute("value","TICKET "+(f));
                    inp.setAttribute("onclick","cambio_mi_ticket('"+(f )+"')");
                    if(f==1){
                        inp.setAttribute("style","background:#ff9998");
                    }
                    li.appendChild(inp);
                    ulTickets.appendChild(li);

                }*/
                //agregar_boton_ticket();
            }
        } else {}
    });
}
//funcion para agregar producto al tikect seleccionado
function agregar_producto_mi_ticket(ps) {
    // validar que el producto no exista en el ticket seleccionado 
    // y de ser asu amrle las cantidades necesarias
    console.log(mi_ticket[_numero_ticket]);
    if (ps.cantidad_producto != undefined) {
        ps.cantidad_producto = document.getElementById("numCantidad").value;
    } else {
        ps.cantidad_producto = 1;
    }
    if (ps.tipo_venta != undefined) {
        ps.tipo_venta = document.getElementById("selTipoVentaFactura").value;
    } else {
        ps.tipo_venta = document.getElementById("selTipoVentaFactura").value;
    }
    if (ps.tipo_venta == "unidad") {
        if (ps.tipo_venta_producto == "PorUnidad") {
            ps.valor_item = ps.precio_mayoreo_sede;
        } else if (ps.tipo_venta_producto == "Caja") {
            ps.valor_item = ps.precio_mayoreo_sede;
        } else if (ps.tipo_venta_producto == "CajaBlister") {
            ps.valor_item = ps.precio_mayoreo_sede;
        }
    } else if (ps.tipo_venta == "caja") {
        ps.nombre_producto += " (CAJA)";
        ps.valor_item = ps.precio_venta_sede;
    } else if (ps.tipo_venta == "blister") {
        ps.nombre_producto += " (BLISTER)";
        ps.valor_item = ps.precio_venta_blister_sede;
    }
    registrarDato(_URL + "detalle_factura", {
        producto: ps,
        id_ticket: id_tk_activo.split("_")[1],
        usuario: _usuario.id_usuario,
        sede: _IdSede
    }, function(rs) {
        //en eta funcion el servidor debera insertar el producto en el ticket
        //Y AGREGAR LOS PRODUCTOS
        if (rs.respuesta) {
            console.log(ps);
            var agregar = true;
            var pos = 0;
            ps.id_factura = rs.id;
            console.log(document.getElementById("selTipoVentaFactura").value);
            if (document.getElementById("selTipoVentaFactura").value != "0") {
                if (mi_ticket.length == 0) {
                    mi_ticket.push({
                        numero_ticket: _numero_ticket,
                        id_ticket: _numero_ticket + "_" + _IdSede + "_" + _usuario.id_usuario,
                        productos: []
                    });
                }
                if (mi_ticket.length > 0) {
                    for (var f in mi_ticket[_numero_ticket].productos) {
                        if (mi_ticket[_numero_ticket].productos[f].id == ps.id) {
                            var tip = document.getElementsByName("tipo");
                            var tipo_seleccionado;
                            if (ps.tipo_venta == mi_ticket[_numero_ticket].productos[f].tipo_venta) {
                                agregar = false;
                                pos = f;
                                //console.log(tipo_seleccionado);
                                //console.log(mi_ticket[_numero_ticket].productos[f].tipo_venta);
                                break;
                            } else {
                                //console.log(tipo_seleccionado);
                                //console.log(mi_ticket[_numero_ticket].productos[f].tipo_venta);
                                agregar = true;
                            }
                        }
                    }
                    document.getElementById("span").scrollIntoView();
                    document.getElementById("selTipoVentaFactura").selectedIndex = 0;
                    document.getElementById("numCantidad").value = 0;
                    document.getElementById("txtCodigoProducto").style.backgroundColor = '';
                    document.getElementById("h4NombreProductoInv").innerHTML = "Nombre producto";
                    $("#txtCodigoProducto").focus();
                    ps.id_factura = rs.id;
                    if (mi_ticket[_numero_ticket].productos != undefined) {
                        mi_ticket[_numero_ticket].productos.push(ps);
                    } else {
                        mi_ticket[_numero_ticket].productos = [];
                        mi_ticket[_numero_ticket].productos.push(ps);
                    }
                    dibujar_factura(mi_ticket[_numero_ticket], _numero_ticket);
                    agregar_local_storage("mis_tickets_" + _usuario.id_usuario + "_" + _IdSede, mi_ticket);
                } else {
                    mi_ticket.push({
                        numero_ticket: _numero_ticket,
                        id_ticket: _numero_ticket + "_" + _IdSede + "_" + _usuario.id_usuario,
                        productos: []
                    });
                }
            } else {
                mostrarMensaje("Por favor selecciona un tipo de venta para el producto");
            }
        } else {
            mostrarMensaje(rs);
        }
    });
}

function quitar(id, pos) {
    if (confirm("¿Desea quitar este producto?")) {
        var fila = document.getElementById("fila_" + id + "_" + _numero_ticket + "_" + pos);
        console.log(fila);
        fila.parentNode.removeChild(fila);
        for (var f in mi_ticket[_numero_ticket].productos) {
            if (mi_ticket[_numero_ticket].productos[f].id_factura == id) {
                quitar_unidades_reservadas(mi_ticket[_numero_ticket].productos[f], mi_ticket[_numero_ticket].productos[f].id_factura);
                mi_ticket[_numero_ticket].productos.splice(f, 1);
            }
        }
        //dibujar_factura(mi_ticket[_numero_ticket],_numero_ticket);
        agregar_local_storage("mis_tickets_" + _usuario.id_usuario + "_" + _IdSede, mi_ticket);
        calcular_total(mi_ticket[_numero_ticket]);
        $("#txtCodigoProducto").focus();
    }
}

function calcular_total(fac) {
    if (fac != undefined) {
        var h1Total = document.getElementById("h1Total");
        var h1Total2 = document.getElementById("h1Total2");
        var txtTotal = document.getElementById("txtValorReal");
        var total = 0;
        var cuantos_prodcutos = 0;
        for (var f in fac.productos) {
            total += Number(fac.productos[f].valor_item) * Number(fac.productos[f].cantidad_producto);
            cuantos_prodcutos += Number(fac.productos[f].cantidad_producto);
        }
        mi_ticket[_numero_ticket].valor_real_factura = total;
        console.log(total);
        h1Total.innerHTML = "$ " + formato_numero(total, "0", ",", ".");
        h1Total.value = total;
        h1Total2.innerHTML = "$ " + formato_numero(total, "0", ",", ".");
        h1Total2.value = total;
        txtTotal.value = formato_numero(total, "0", "", "");
        document.getElementById("h3CuantosProductosTotal").innerHTML = Number(cuantos_prodcutos);
    }
}

function cambio_mi_ticket(num_tk) {
    console.log("voy a cambiar de ticket");
    var mis_botones = document.getElementsByName("tk");
    for (var m in mis_botones) {
        if (mis_botones[m].type == "button") {
            console.log(mis_botones[m].type);
            console.log(mis_botones[m].id);
            console.log(num_tk);
            console.log(m);
            mis_botones[m].style.background = "";
            if (mis_botones[num_tk].id != undefined && m === (num_tk)) {
                id_tk_activo = mis_botones[num_tk].id;
                mis_botones[m].style.background = "#ff9998";
                _numero_ticket = num_tk;
                $("#txtCodigoProducto").focus();
            } else if (mis_botones[m].style != undefined) {
                mis_botones[m].style.background = "";
            }
        }
    }
    _numero_ticket = Number(num_tk);
    dibujar_factura(mi_ticket[num_tk], num_tk);
    document.getElementById("span").scrollIntoView();
    //calcular_total(mi_ticket[num_tk]);        
}

function eliminar_ticket(num) {
    eliminarDato(_URL + "facturas/" + num, {}, function(rs) {
        //aqui validar para que no me elimine el ticket si solo existe uno
        if (rs.respuesta != false) {
            console.log(document.getElementById("ulTickets").childNodes.length);
            if (document.getElementById("ulTickets").childNodes.length > 1) {
                mostrarMensaje(rs);
                //mi_ticket.splice((Number(num) - 1), 1);
                /*var btn=document.getElementById("btn_"+num);
                btn.parentNode.removeChild(btn);*/
                var ulTickets = document.getElementById("ulTickets");
                ulTickets.innerHTML = "";
                for (var i = 0; i <= rs.datos.length - 1; i++) {
                    var li = document.createElement("li");
                    var inp = document.createElement("input");
                    inp.setAttribute("type", "button");
                    inp.setAttribute("name", "tk");
                    inp.setAttribute("style", "float:left");
                    inp.setAttribute("id", "btn_" + (rs.datos[i].id));
                    inp.setAttribute("value", "TICKET " + ((i + 1)));
                    inp.setAttribute("onclick", "cambio_mi_ticket('" + (i) + "')");
                    if (i == 0) {
                        inp.setAttribute("style", "background:#ff9998");
                    }
                    li.appendChild(inp);
                    ulTickets.appendChild(li);
                }
                mi_ticket = rs.datos;
                //VOLVER A DIBUJAR LOS CONTROLES
                console.log(mi_ticket);
                console.log(Number(obtener_local_storage("btn_tk_" + _usuario.id_usuario + "_" + _IdSede) - 1));
                agregar_local_storage("btn_tk_" + _usuario.id_usuario + "_" + _IdSede, obtener_local_storage("btn_tk_" + _usuario.id_usuario + "_" + _IdSede) - 1);
                agregar_local_storage("mis_tickets_" + _usuario.id_usuario + "_" + _IdSede, mi_ticket);
                document.getElementById("tbCuerpoFactura").innerHTML = "";
                //fac=>datos de los productos
                //tk=>numero de ticket
                dibujar_factura(mi_ticket[0].productos, 0);
            }else{
                
                     mi_ticket = rs.datos;
                     agregar_local_storage("btn_tk_" + _usuario.id_usuario + "_" + _IdSede, obtener_local_storage("btn_tk_" + _usuario.id_usuario + "_" + _IdSede) - 1);
                     agregar_local_storage("mis_tickets_" + _usuario.id_usuario + "_" + _IdSede, mi_ticket);
                     mostrarMensaje(rs);
                     dibujar_factura(mi_ticket[0].productos, 0);   

                 
            }
        } else {
            mostrarMensaje(rs);

        }
    });
}
var registro_factura = true;

function crear_factura() {
    mi_ticket[_numero_ticket].id_usuario = _usuario.id_usuario;
    registrarDato(_URL + "registro_facturas", mi_ticket[_numero_ticket], function(rs) {
        console.log(rs);
        if (rs.respuesta) {
            $("#txtCodigoProducto").focus();
            mi_ticket.splice(_numero_ticket, 1);
            agregar_local_storage("mis_tickets_" + _usuario.id_usuario + "_" + _IdSede, mi_ticket);
            obtener_tickets_pendientes();
            document.getElementById("h1Total").innerHTML = "$ 0.00";
            document.getElementById("txtValorReal").value = "";
        }
    });
}

function cambio_tipo_venta(tipo) {
    console.log(_producto_seleccionado);
    if (tipo == "caja") {
        //document.getElementById("numCantidad").value=_producto_seleccionado.unidades_por_caja;
        document.getElementById("numCantidad").value = 1;
        _producto_seleccionado.tipo_venta = "caja";
    } else if (tipo == "unidad") {
        _producto_seleccionado.tipo_venta = "unidad";
        _producto_seleccionado.valor_item = _producto_seleccionado.precio_mayoreo_sede;
        document.getElementById("numCantidad").value = 1;
        _producto_seleccionado.cantidad_existencias = _producto_seleccionado.cantidad_existencias_unidades;
    } else if (tipo = "blister") {
        _producto_seleccionado.tipo_venta = "blister";
        _producto_seleccionado.valor_item = _producto_seleccionado.precio_venta_blister_sede;
        document.getElementById("numCantidad").value = 1;
        _producto_seleccionado.cantidad_existencias = _producto_seleccionado.cantidad_existencias_blister;
    }
}
//funcion para calcular el valor de una fila
function calcular_precio(id, pos) {
    var cant = document.getElementById("numCant_" + id + "_" + _numero_ticket + "_" + pos);
    var i = Number(pos);
    if (cant != null) {
        console.log(cant);
        console.log(cant.value);
        console.log("numCant_" + id + "_" + _numero_ticket + "_" + pos);
        var prec = 0;
        var valor_venta = document.getElementById("valor_venta_" + id + "_" + _numero_ticket + "_" + pos);
        var pre = document.getElementById("precio_" + id + "_" + _numero_ticket + "_" + pos);
        console.log(Number(cant.value));
        console.log(Number(valor_venta.value));
        //calculo el precio 
        var ps = mi_ticket[_numero_ticket].productos[i];
        console.log(ps);
        if ((ps.promocion == "1" && ps.tipo_venta_promo == "unidad") && (Number(cant.value) >= Number(ps.promo_desde)) && (Number(cant.value) <= Number(ps.promo_hasta))) {
            valor_venta.value = ps.precio_promo_venta;
            valor_venta.innerHTML = "$ " + formato_numero(ps.precio_promo_venta, "0", ",", ".");
            ps.valor_item = ps.precio_promo_venta;
        } else {
            switch (ps.tipo_venta) {
                case "unidad":
                    ps.valor_item = ps.precio_mayoreo_sede;
                    break;
                case "blister":
                    ps.valor_item = ps.precio_venta_blister_sede;
                    break;
                case "caja":
                    ps.valor_item = ps.precio_venta_sede;
                    break;
            }
            valor_venta.value = ps.valor_item;
            valor_venta.innerHTML = "$ " + formato_numero(ps.valor_item, "0", ",", ".");
        }
        //for(var i in mi_ticket[_numero_ticket].productos){
        if (mi_ticket[_numero_ticket].productos[i].id == id) {
            console.log(mi_ticket[_numero_ticket].productos[i].cantidad_existencias <= cant.value);
            console.log(Number(mi_ticket[_numero_ticket].productos[i].cantidad_existencias));
            console.log(Number(cant.value));
            if (cambiar_cantidad(i, cant) == true) {
                prec = Number(cant.value) * Number(valor_venta.value);
                pre.innerHTML = "$ " + formato_numero(prec, "0", ",", ".");
                pre.value = prec;
                console.log(mi_ticket[_numero_ticket].productos[i]);
                console.log(mi_ticket[_numero_ticket].id);
                console.log(mi_ticket[_numero_ticket].productos[i].id_producto_inventario);
                actualizar_unidades_reservadas(mi_ticket[_numero_ticket].productos[i], mi_ticket[_numero_ticket].id, mi_ticket[_numero_ticket].productos[i].id_producto_inventario);
                calcular_total(mi_ticket[_numero_ticket]);
                agregar_local_storage("mis_tickets_" + _usuario.id_usuario + "_" + _IdSede, mi_ticket);
            } else {
                document.getElementById("numCant_" + id + "_" + _numero_ticket + "_" + pos).value = mi_ticket[_numero_ticket].productos[i].cantidad_producto;
                console.log("Ha dicidico no pedir producto");
            }
        } else {
            console.log(mi_ticket[_numero_ticket].productos[i].id);
            console.log(id);
        }
        //}
    }
}

function cambiar_cantidad(i, cant) {
    var vendidadas = 0;
    if (Number(cant.value) > 0) {
        if (Number(cant.value) < mi_ticket[_numero_ticket].productos[i].cantidad_producto) {
            mi_ticket[_numero_ticket].productos[i].cantidad_producto = cant.value;
            return true;
        } else {
            for (var o in mi_ticket) {
                for (var f in mi_ticket[o].productos) {
                    if (mi_ticket[o].productos[f].codigo_producto == mi_ticket[_numero_ticket].productos[i].codigo_producto) {
                        console.log(mi_ticket[_numero_ticket].productos[f].tipo_venta);
                        if (mi_ticket[_numero_ticket].productos[f].tipo_venta == "unidad") {
                            vendidadas += Number(mi_ticket[o].productos[f].cantidad_producto);
                        }
                        if (mi_ticket[_numero_ticket].productos[f].tipo_venta == "caja") {
                            vendidadas += Number((mi_ticket[0].productos[f].cantidad_producto * mi_ticket[_numero_ticket].productos[f].unidades_por_blister) * mi_ticket[_numero_ticket].productos[f].unidades_por_caja);
                        }
                        if (mi_ticket[_numero_ticket].productos[f].tipo_venta == "blister") {
                            vendidadas += Number(mi_ticket[0].productos[f].cantidad_producto * mi_ticket[_numero_ticket].productos[f].unidades_por_blister);
                        }
                    }
                }
            }
            if (Number(vendidadas) < Number(mi_ticket[_numero_ticket].productos[i].cantidad_existencias_unidades)) {
                console.log(mi_ticket[_numero_ticket].productos[i].cantidad_existencias_unidades);
                switch (mi_ticket[_numero_ticket].productos[i].tipo_venta) {
                    case "unidad":
                        if (mi_ticket[_numero_ticket].productos[i].tipo_venta_producto == "PorUnidad") {
                            if (Number(mi_ticket[_numero_ticket].productos[i].cantidad_existencias_unidades) < Number(cant.value)) {
                                //if(!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")){
                                alert("Esta solicitando una cantidad superior a la existente, no puede realizar esta operacion ");
                                console.log("cambio unidades false");
                                //cant.value=mi_ticket[_numero_ticket].productos[i].cantidad_producto;
                                return false;
                                //}
                                //console.log("cambio unidades true");
                                //mi_ticket[_numero_ticket].productos[i].cantidad_producto=cant.value;
                                //return true;
                            } else {
                                console.log("cambio unidades true");
                                mi_ticket[_numero_ticket].productos[i].cantidad_producto = cant.value;
                                return true;
                            }
                        } else if (mi_ticket[_numero_ticket].productos[i].tipo_venta_producto == "Caja") {
                            if (Number(mi_ticket[_numero_ticket].productos[i].cantidad_existencias_unidades) < Number(cant.value)) {
                                //if(!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")){
                                alert("Esta solicitando una cantidad superior a la existente, no puede realizar esta operacion ");
                                console.log("cambio unidades false");
                                return false;
                                //}
                                //console.log("cambio unidades true");
                                //mi_ticket[_numero_ticket].productos[i].cantidad_producto=cant.value;
                                //return true;
                            } else {
                                console.log("cambio unidades true");
                                mi_ticket[_numero_ticket].productos[i].cantidad_producto = cant.value;
                                return true;
                            }
                        } else if (mi_ticket[_numero_ticket].productos[i].tipo_venta_producto == "CajaBlister") {
                            if (Number(mi_ticket[_numero_ticket].productos[i].cantidad_existencias_unidades) < Number(cant.value)) {
                                //if(!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")){
                                alert("Esta solicitando una cantidad superior a la existente, no puede realizar esta operacion ");
                                console.log("cambio unidades false");
                                return false;
                                //}
                                //console.log("cambio unidades true");
                                //mi_ticket[_numero_ticket].productos[i].cantidad_producto=cant.value;
                                //return true;
                            } else {
                                console.log("cambio unidades true");
                                mi_ticket[_numero_ticket].productos[i].cantidad_producto = cant.value;
                                return true;
                            }
                        }
                        break;
                    case "caja":
                        if (Number(mi_ticket[_numero_ticket].productos[i].cantidad_existencias) < Number(cant.value)) {
                            //if(!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")){
                            alert("Esta solicitando una cantidad superior a la existente, no puede realizar esta operacion ");
                            console.log("cambio unidades false");
                            return false;
                            //}
                            //console.log("cambio unidades true");
                            //mi_ticket[_numero_ticket].productos[i].cantidad_producto=cant.value;
                            //return true;
                        } else {
                            console.log("cambio unidades true");
                            mi_ticket[_numero_ticket].productos[i].cantidad_producto = cant.value;
                            return true;
                        }
                        break;
                    case "blister":
                        if (Number(mi_ticket[_numero_ticket].productos[i].cantidad_existencias_blister) < Number(cant.value)) {
                            //if(!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")){
                            alert("Esta solicitando una cantidad superior a la existente, no puede realizar esta operacion ");
                            console.log("cambio unidades false");
                            return false;
                            //}
                            //console.log("cambio unidades true");
                            //mi_ticket[_numero_ticket].productos[i].cantidad_producto=cant.value;
                            //return true;
                        } else {
                            console.log("cambio unidades true");
                            mi_ticket[_numero_ticket].productos[i].cantidad_producto = cant.value;
                            return true;
                        }
                        break;
                }
            }
        }
        console.log(Number(vendidadas));
        console.log(Number(mi_ticket[_numero_ticket].productos[i].cantidad_existencias));
    }
}

function cambiar_tipo_venta(id, numero_ticket, posicion) {
    console.log(document.getElementById("selCambioUnidad_" + id + "_" + numero_ticket + "_" + posicion).value);
    console.log(id);
    console.log(numero_ticket);
    console.log(posicion);
    console.log(mi_ticket[numero_ticket].productos[posicion]);
    _numero_ticket = numero_ticket;
    var antes = mi_ticket[numero_ticket].productos[posicion].tipo_venta;
    switch (antes) {
        case "unidad":
            antes = 0;
            break;
        case "blister":
            antes = 1;
            break;
        case "caja":
            antes = 2;
            break;
    }
    if (mi_ticket[numero_ticket].productos[posicion] != undefined) {
        /*
        if (document.getElementById("selCambioUnidad_" + id + "_" + numero_ticket + "_" + posicion).value == "unidad") {
            if (mi_ticket[numero_ticket].productos[posicion].tipo_venta_producto == "PorUnidad") {
                mi_ticket[numero_ticket].productos[posicion].tipo_venta = document.getElementById("selCambioUnidad_" + id + "_" + numero_ticket + "_" + posicion).value;
                mi_ticket[numero_ticket].productos[posicion].valor_item = mi_ticket[numero_ticket].productos[posicion].precio_venta_sede;
            } else if (mi_ticket[numero_ticket].productos[posicion].tipo_venta_producto == "Caja") {
                if (mi_ticket[numero_ticket].productos[posicion].cantidad_existencias >= mi_ticket[numero_ticket].productos[posicion].cantidad_producto) {
                    mi_ticket[numero_ticket].productos[posicion].tipo_venta = document.getElementById("selCambioUnidad_" + id + "_" + numero_ticket + "_" + posicion).value;
                    mi_ticket[numero_ticket].productos[posicion].valor_item = mi_ticket[numero_ticket].productos[posicion].precio_mayoreo_sede;
                } else {
                    alert("No hay suficientes unidades para realizar la venta");
                    document.getElementById("selCambioUnidad_" + id + "_" + numero_ticket + "_" + posicion).selectedIndex = antes;
                    return false;
                }
            } else if (mi_ticket[numero_ticket].productos[posicion].tipo_venta_producto == "CajaBlister") {
                if (mi_ticket[numero_ticket].productos[posicion].cantidad_existencias_blister >= mi_ticket[numero_ticket].productos[posicion].cantidad_producto) {
                    mi_ticket[numero_ticket].productos[posicion].tipo_venta = document.getElementById("selCambioUnidad_" + id + "_" + numero_ticket + "_" + posicion).value;
                    mi_ticket[numero_ticket].productos[posicion].valor_item = mi_ticket[numero_ticket].productos[posicion].precio_mayoreo_sede;
                } else {
                    alert("No hay suficientes unidades para realizar la venta");
                    document.getElementById("selCambioUnidad_" + id + "_" + numero_ticket + "_" + posicion).selectedIndex = antes;
                    return false;
                }
            }
        } else if (document.getElementById("selCambioUnidad_" + id + "_" + numero_ticket + "_" + posicion).value == "caja") {
            if (mi_ticket[numero_ticket].productos[posicion].cantidad_existencias >= mi_ticket[numero_ticket].productos[posicion].cantidad_producto) {
                mi_ticket[numero_ticket].productos[posicion].tipo_venta = document.getElementById("selCambioUnidad_" + id + "_" + numero_ticket + "_" + posicion).value;
                mi_ticket[numero_ticket].productos[posicion].nombre_producto += " (CAJA)";
                mi_ticket[numero_ticket].productos[posicion].valor_item = mi_ticket[numero_ticket].productos[posicion].precio_venta_sede;
            } else {
                alert("No hay suficientes unidades para realizar la venta");
                document.getElementById("selCambioUnidad_" + id + "_" + numero_ticket + "_" + posicion).selectedIndex = antes;
            }
        } else if (document.getElementById("selCambioUnidad_" + id + "_" + numero_ticket + "_" + posicion).value == "blister") {
            if (mi_ticket[numero_ticket].productos[posicion].cantidad_existencias_blister >= mi_ticket[numero_ticket].productos[posicion].cantidad_producto) {
                mi_ticket[numero_ticket].productos[posicion].tipo_venta = document.getElementById("selCambioUnidad_" + id + "_" + numero_ticket + "_" + posicion).value;
                mi_ticket[numero_ticket].productos[posicion].nombre_producto += " (BLISTER)";
                mi_ticket[numero_ticket].productos[posicion].valor_item = mi_ticket[numero_ticket].productos[posicion].precio_venta_blister_sede;
            } else {
                alert("No hay suficientes unidades para realizar la venta");
                document.getElementById("selCambioUnidad_" + id + "_" + numero_ticket + "_" + posicion).selectedIndex = antes;
            }
        }
        */
        
        console.log(mi_ticket[numero_ticket].productos[posicion].id_factura);
        //actualizar_unidades_reservadas(mi_ticket[numero_ticket].productos[posicion], mi_ticket[numero_ticket].id, mi_ticket[numero_ticket].productos[posicion].id_factura);
        
        //consulto que existan unidades para registrar
        mi_ticket[numero_ticket].productos[posicion].tipo_venta=document.getElementById("selCambioUnidad_" + id + "_" + numero_ticket + "_" + posicion).value;
        editarDato(_URL + "detalle_factura/" + mi_ticket[numero_ticket].productos[posicion].id_factura, {
            producto: mi_ticket[numero_ticket].productos[posicion],
            id_factura:  mi_ticket[numero_ticket].id
        }, function(rs) {
            //en eta funcion el servidor debera insertar el producto en el ticket
            //Y AGREGAR LOS PRODUCTOS
            if(rs.respuesta==true){
                switch(document.getElementById("selCambioUnidad_" + id + "_" + numero_ticket + "_" + posicion).value){
                    case "unidad":
                        switch(mi_ticket[numero_ticket].productos[posicion].tipo_venta_producto){
                            case "PorUnidad":
                                mi_ticket[numero_ticket].productos[posicion].tipo_venta = document.getElementById("selCambioUnidad_" + id + "_" + numero_ticket + "_" + posicion).value;
                                mi_ticket[numero_ticket].productos[posicion].valor_item = mi_ticket[numero_ticket].productos[posicion].precio_venta_sede;
                                break;
                            case "Caja":
                                 mi_ticket[numero_ticket].productos[posicion].tipo_venta = document.getElementById("selCambioUnidad_" + id + "_" + numero_ticket + "_" + posicion).value;
                                 mi_ticket[numero_ticket].productos[posicion].valor_item = mi_ticket[numero_ticket].productos[posicion].precio_mayoreo_sede;
                                break;
                            case "CajaBlister":
                                 mi_ticket[numero_ticket].productos[posicion].tipo_venta = document.getElementById("selCambioUnidad_" + id + "_" + numero_ticket + "_" + posicion).value;
                                 mi_ticket[numero_ticket].productos[posicion].valor_item = mi_ticket[numero_ticket].productos[posicion].precio_mayoreo_sede;
                                break;        
                        }
                        break;
                    case "blister":
                            mi_ticket[numero_ticket].productos[posicion].tipo_venta = document.getElementById("selCambioUnidad_" + id + "_" + numero_ticket + "_" + posicion).value;
                            mi_ticket[numero_ticket].productos[posicion].nombre_producto ;
                            mi_ticket[numero_ticket].productos[posicion].valor_item = mi_ticket[numero_ticket].productos[posicion].precio_venta_blister_sede;  
                         /*switch(mi_ticket[numero_ticket].productos[posicion].tipo_venta_producto){
                            case "PorUnidad":
                                
                                break;
                            case "Caja":
                                break;
                            case "CajaBlister":
                                break;        
                        } */   
                        break;
                    case "caja":
                            mi_ticket[numero_ticket].productos[posicion].tipo_venta = document.getElementById("selCambioUnidad_" + id + "_" + numero_ticket + "_" + posicion).value;
                            mi_ticket[numero_ticket].productos[posicion].nombre_producto ;
                            mi_ticket[numero_ticket].productos[posicion].valor_item = mi_ticket[numero_ticket].productos[posicion].precio_venta_sede;
                     
                        break;    
                }

                dibujar_factura(mi_ticket[_numero_ticket], _numero_ticket);
                agregar_local_storage("mis_tickets_" + _usuario.id_usuario + "_" + _IdSede, mi_ticket);
            }else{
                mostrarMensaje(rs);

                document.getElementById("selCambioUnidad_" + id + "_" + numero_ticket + "_" + posicion).selectedIndex = antes;
                mi_ticket[numero_ticket].productos[posicion].tipo_venta=document.getElementById("selCambioUnidad_" + id + "_" + numero_ticket + "_" + posicion).value;
                agregar_local_storage("mis_tickets_" + _usuario.id_usuario + "_" + _IdSede, mi_ticket);
                dibujar_factura(mi_ticket[_numero_ticket], _numero_ticket);
            }   
            
        });
    }
}

function actualizar_unidades_reservadas(producto, id_factura, id_ticket) {
    editarDato(_URL + "detalle_factura/" + id_ticket, {
        producto: producto,
        id_factura: id_factura
    }, function(rs) {
        //en eta funcion el servidor debera insertar el producto en el ticket
        //Y AGREGAR LOS PRODUCTOS
        if(rs.respuesta==true){
            dibujar_factura(mi_ticket[_numero_ticket], _numero_ticket);
        }else{
            mostrarMensaje(rs);

        }
        
    });
}

function quitar_unidades_reservadas(producto, id_producto_ticket) {
    console.log(id_producto_ticket),
        editarDato(_URL + "eliminar_ticket/" + id_producto_ticket, producto, function(rs) {
            //en eta funcion el servidor debera insertar el producto en el ticket
            //Y AGREGAR LOS PRODUCTOS
            dibujar_factura(mi_ticket[_numero_ticket], _numero_ticket);
        });
}

function dibujar_factura(fac, tk) {
    console.log("function dibujar_factura");
    console.log(fac);
    var vf = obtener_valores_formulario("formVentaProductos");
    var tbCuerpoFactura = document.getElementById("tbCuerpoFactura");
    tbCuerpoFactura.innerHTML = "";
    var numCantidad = document.getElementById("numCantidad");
    tbCuerpoFactura.innerHTML = "";
    
        var fila_head = document.createElement("tr");
        var td = document.createElement("td");
        td.innerHTML = "#";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "Codigo de barras";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "Descripcion del producto";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "Tipo venta";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "Precio Venta";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "Cantidad";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "Costo";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "Existencias";
        fila_head.appendChild(td);
        tbCuerpoFactura.appendChild(fila_head);
        if (fac != undefined) {
            var indice = 1;
            var fin = Object.keys(fac.productos).length;
            for (var i in fac.productos) {
                if (fac.productos[i].inventario == 1) {
                   
                    if (fac.productos[i].tipo_venta == "unidad") {
                        console.log(fac.productos[i].aprovado);
                        if ( Number(fac.productos[i].cantidad_existencias_unidades) <= Number(fac.productos[i].cantidad_producto)) {
                            if(fac.productos[i].aprovado == undefined){
                                if (!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")) {
                                    fac.productos[i].aprovado = false;
                                    break;
                                } else {
                                    fac.productos[i].aprovado = true;
                                }    
                            }
                            
                        }

                    } else if (fac.productos[i].tipo_venta == "caja") {
                        if ( Number(fac.productos[i].cantidad_existencias) <= Number(fac.productos[i].cantidad_producto)) {
                                if(fac.productos[i].aprovado == undefined){
                                    if (!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")) {
                                        fac.productos[i].aprovado = false;
                                        break;
                                    } else {
                                        fac.productos[i].aprovado = true;
                                    }    
                                }   
                        }
                    } else if (fac.productos[i].tipo_venta == "blister") {
                        if (Number(fac.productos[i].cantidad_existencias_blister) <= Number(fac.productos[i].cantidad_producto)) {
                            if(fac.productos[i].aprovado == undefined){
                                if (!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")) {
                                    fac.productos[i].aprovado = false;
                                    break;
                                } else {
                                    fac.productos[i].aprovado = true;
                                }    
                            }
                        }
                    }
                }
                var fila = document.createElement("tr");
                fila.setAttribute("id", "fila_" + fac.productos[i].id_factura + "_" + _numero_ticket + "_" + i);
                var td = document.createElement("td");
                td.innerHTML = indice++;
                fila.appendChild(td);
                var td = document.createElement("td");
                td.innerHTML = "X";
                td.setAttribute("onclick", "quitar(" + fac.productos[i].id_factura + "," + i + ")");
                fila.appendChild(td);
                var td = document.createElement("td");
                td.innerHTML = fac.productos[i].codigo_producto;
                fila.appendChild(td);
                var td = document.createElement("td");
                var defi_uni = "";
                console.log(fac.productos[i].tipo_venta);
                if (fac.productos[i].tipo_venta == "unidad") {
                    if (fac.productos[i].tipo_venta_producto == "PorUnidad") {
                        defi_uni = "  X " + "1" + " Uni";
                    } else if (fac.productos[i].tipo_venta_producto == "Caja") {
                        defi_uni = "  X " + "1" + " Uni";
                    } else if (fac.productos[i].tipo_venta_producto == "CajaBlister") {
                        defi_uni = "  X " + "1" + " Uni";
                    }
                } else if (fac.productos[i].tipo_venta == "caja") {
                    if (fac.productos[i].tipo_venta_producto == "Caja") {
                        defi_uni = "  X " + fac.productos[i].unidades_por_caja + " Uni";
                    } else if (fac.productos[i].tipo_venta_producto == "CajaBlister") {
                        defi_uni = "  X " + fac.productos[i].unidades_por_caja + " Uni";
                    }
                } else if (fac.productos[i].tipo_venta == "blister") {
                    defi_uni = "  X " + fac.productos[i].unidades_por_blister + " Uni";
                }
                td.innerHTML = fac.productos[i].nombre_producto + " " + defi_uni;
                fila.appendChild(td);
                //SELECT PARA EL IPO DE VENTA
                var td = document.createElement("td");
               
                    var sel = document.createElement("select");
                    sel.setAttribute("id", "selCambioUnidad_" + fac.productos[i].id + "_" + _numero_ticket + "_" + i);
                    sel.setAttribute("onchange", "cambiar_tipo_venta(" + fac.productos[i].id + "," + _numero_ticket + "," + i + ")");
                    switch(fac.productos[i].tipo_venta_producto){
                        case "PorUnidad":
                            var op = document.createElement("option");
                            op.innerHTML = "unidad";
                            op.value = "unidad";
                            if (fac.productos[i].tipo_venta == "unidad") {
                                op.setAttribute("selected", true);
                            }
                            sel.appendChild(op);
                            break;
                        case "Caja":
                            var op = document.createElement("option");
                            op.innerHTML = "unidad";
                            op.value = "unidad";
                            if (fac.productos[i].tipo_venta == "unidad") {
                                op.setAttribute("selected", true);
                            }
                            sel.appendChild(op);
                            var op = document.createElement("option");
                            op.innerHTML = "caja";
                            op.value = "caja";
                            if (fac.productos[i].tipo_venta == "caja") {
                                op.setAttribute("selected", true);
                            }
                            sel.appendChild(op);
                            break;
                        case "CajaBlister":
                            var op = document.createElement("option");
                            op.innerHTML = "unidad";
                            op.value = "unidad";
                            if (fac.productos[i].tipo_venta == "unidad") {
                                op.setAttribute("selected", true);
                            }
                            sel.appendChild(op);
                            var op = document.createElement("option");
                            op.innerHTML = "blister";
                            op.value = "blister";
                            if (fac.productos[i].tipo_venta == "blister") {
                                op.setAttribute("selected", true);
                            }
                            sel.appendChild(op);
                            var op = document.createElement("option");
                            op.innerHTML = "caja";
                            op.value = "caja";
                            if (fac.productos[i].tipo_venta == "caja") {
                                op.setAttribute("selected", true);
                            }
                            sel.appendChild(op);
                            break;       
                    }
                    
                    td.appendChild(sel);

                fila.appendChild(td);
                //FIN SELECT PARA EL IPO DE VENTA                       
                var td = document.createElement("td");

                td.setAttribute("id", "valor_venta_" + fac.productos[i].id + "_" + _numero_ticket + "_" + i);
                td.value = fac.productos[i].valor_item;
                td.innerHTML = "$ " + formato_numero(fac.productos[i].valor_item, "0", ",", ".");
                if(fac.productos[i].valor_item <= 1){
                    td.setAttribute("bgcolor","#FF0000");
                }
                fila.appendChild(td);

                var td = document.createElement("td");
                var ipn = document.createElement("input");
                ipn.setAttribute("type", "number");
                ipn.setAttribute("id", "numCant_" + fac.productos[i].id + "_" + _numero_ticket + "_" + i);
                console.log("cantidad_producto");
                console.log(fac.productos[i].cantidad_producto);
                ipn.setAttribute("value", (Number(fac.productos[i].cantidad_producto)));
                //ipn.setAttribute("onkeypress","calcular_precio("+fac.productos[i].id+","+i+")");
                ipn.setAttribute("onchange", "calcular_precio(" + fac.productos[i].id + "," + i + ")");
                //ipn.setAttribute("onclick","calcular_precio("+fac.productos[i].id+","+i+")");
                td.appendChild(ipn);
                fila.appendChild(td);
                var precio = fac.productos[i].valor_item;
                if ((fac.productos[i].promocion == "1" && fac.productos[i].tipo_venta_promo == "unidad") && (Number(fac.productos[i].cantidad_producto) >= fac.productos[i].promo_desde) && (Number(fac.productos[i].cantidad_producto) <= fac.productos[i].promo_hasta)) {
                    //aplico promocion
                    precio = fac.productos[i].precio_promo_venta;
                }
                var td = document.createElement("td");
                td.value = Number(precio) * Number(fac.productos[i].cantidad_producto);
                td.setAttribute("id", "precio_" + fac.productos[i].id + "_" + _numero_ticket + "_" + i);
                td.innerHTML = "$ " + formato_numero(Number(precio) * Number(fac.productos[i].cantidad_producto), "0", ",", ".");
                fila.appendChild(td);
                var td = document.createElement("td");
                if (fac.productos[i].tipo_venta == "unidad") {
                    td.innerHTML = fac.productos[i].cantidad_existencias_unidades;
                } else if (fac.productos[i].tipo_venta == "blister") {
                    td.innerHTML = fac.productos[i].cantidad_existencias_blister;
                } else {
                    td.innerHTML = fac.productos[i].cantidad_existencias;
                }
                fila.appendChild(td);
                tbCuerpoFactura.appendChild(fila);
                fac.productos[i].valor_item_total = Number(fac.productos[i].valor_item) * Number(fac.productos[i].cantidad_producto);
                if (fin == i) {
                    fila.setAttribute("style", "background:blue");
                }
            }
            calcular_total(mi_ticket[_numero_ticket]);
            document.getElementById("numCantidad").value = 0;
            document.getElementById("h4NombreProductoInv").innerHTML = "Nombre producto";
            document.getElementById("txtCodigoProducto").value = "";
            document.getElementById("h3CuantosProductos").innerHTML = mi_ticket[_numero_ticket].productos.length;
        }
        _producto_seleccionado = false;
     
    document.getElementById("divFactura").scrollTop = '9999';
    /*var span=document.createElement("span");
    span.innerHTML=" ";
    span.setAttribute("id","span");
    document.getElementById("divFactura").appendChild(span);    */
    //agregar_local_storage("mis_tickets_" + _usuario.id_usuario + "_" + _IdSede, mi_ticket);
    console.log("FIN function dibujar_factura");
}
//fac=>datos de los productos
//tk=>numero de ticket
function dibujar_factura_old(fac, tk) {
    console.log("function dibujar_factura");
    console.log(fac);
    var vf = obtener_valores_formulario("formVentaProductos");
    var tbCuerpoFactura = document.getElementById("tbCuerpoFactura");
    tbCuerpoFactura.innerHTML = "";
    var numCantidad = document.getElementById("numCantidad");
    tbCuerpoFactura.innerHTML = "";
    if (_producto_seleccionado != false) {
        var fila_head = document.createElement("tr");
        var td = document.createElement("td");
        td.innerHTML = "#";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "Codigo de barras";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "Descripcion del producto";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "Tipo venta";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "Precio Venta";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "Cantidad";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "Costo";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "Existencias";
        fila_head.appendChild(td);
        tbCuerpoFactura.appendChild(fila_head);
        if (fac != undefined) {
            var indice = 1;
            var fin = Object.keys(fac.productos).length;
            for (var i in fac.productos) {
                if (fac.productos[i].inventario == 1) {
                   
                    if (fac.productos[i].tipo_venta == "unidad") {
                        console.log(fac.productos[i].aprovado);
                        if ( Number(fac.productos[i].cantidad_existencias_unidades) <= Number(fac.productos[i].cantidad_producto)) {
                            if(fac.productos[i].aprovado == undefined){
                                if (!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")) {
                                    fac.productos[i].aprovado = false;
                                    break;
                                } else {
                                    fac.productos[i].aprovado = true;
                                }    
                            }
                            
                        }

                    } else if (fac.productos[i].tipo_venta == "caja") {
                        if ( Number(fac.productos[i].cantidad_existencias) <= Number(fac.productos[i].cantidad_producto)) {
                                if(fac.productos[i].aprovado == undefined){
                                    if (!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")) {
                                        fac.productos[i].aprovado = false;
                                        break;
                                    } else {
                                        fac.productos[i].aprovado = true;
                                    }    
                                }   
                        }
                    } else if (fac.productos[i].tipo_venta == "blister") {
                        if (Number(fac.productos[i].cantidad_existencias_blister) <= Number(fac.productos[i].cantidad_producto)) {
                            if(fac.productos[i].aprovado == undefined){
                                if (!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")) {
                                    fac.productos[i].aprovado = false;
                                    break;
                                } else {
                                    fac.productos[i].aprovado = true;
                                }    
                            }
                        }
                    }
                }
                var fila = document.createElement("tr");
                fila.setAttribute("id", "fila_" + fac.productos[i].id_factura + "_" + _numero_ticket + "_" + i);
                var td = document.createElement("td");
                td.innerHTML = indice++;
                fila.appendChild(td);
                var td = document.createElement("td");
                td.innerHTML = "X";
                td.setAttribute("onclick", "quitar(" + fac.productos[i].id_factura + "," + i + ")");
                fila.appendChild(td);
                var td = document.createElement("td");
                td.innerHTML = fac.productos[i].codigo_producto;
                fila.appendChild(td);
                var td = document.createElement("td");
                var defi_uni = "";
                console.log(fac.productos[i].tipo_venta);
                if (fac.productos[i].tipo_venta == "unidad") {
                    if (fac.productos[i].tipo_venta_producto == "PorUnidad") {
                        defi_uni = "  X " + "1" + " Uni";
                    } else if (fac.productos[i].tipo_venta_producto == "Caja") {
                        defi_uni = "  X " + "1" + " Uni";
                    } else if (fac.productos[i].tipo_venta_producto == "CajaBlister") {
                        defi_uni = "  X " + "1" + " Uni";
                    }
                } else if (fac.productos[i].tipo_venta == "caja") {
                    if (fac.productos[i].tipo_venta_producto == "Caja") {
                        defi_uni = "  X " + fac.productos[i].unidades_por_caja + " Uni";
                    } else if (fac.productos[i].tipo_venta_producto == "CajaBlister") {
                        defi_uni = "  X " + fac.productos[i].unidades_por_caja + " Uni";
                    }
                } else if (fac.productos[i].tipo_venta == "blister") {
                    defi_uni = "  X " + fac.productos[i].unidades_por_blister + " Uni";
                }
                td.innerHTML = fac.productos[i].nombre_producto + " " + defi_uni;
                fila.appendChild(td);
                //SELECT PARA EL IPO DE VENTA
                var td = document.createElement("td");
                var sel = document.createElement("select");
                sel.setAttribute("id", "selCambioUnidad_" + fac.productos[i].id + "_" + _numero_ticket + "_" + i);
                sel.setAttribute("onchange", "cambiar_tipo_venta(" + fac.productos[i].id + "," + _numero_ticket + "," + i + ")");
                var op = document.createElement("option");
                op.innerHTML = "unidad";
                op.value = "unidad";
                if (fac.productos[i].tipo_venta == "unidad") {
                    op.setAttribute("selected", true);
                }
                sel.appendChild(op);
                var op = document.createElement("option");
                op.innerHTML = "blister";
                op.value = "blister";
                if (fac.productos[i].tipo_venta == "blister") {
                    op.setAttribute("selected", true);
                }
                sel.appendChild(op);
                var op = document.createElement("option");
                op.innerHTML = "caja";
                op.value = "caja";
                if (fac.productos[i].tipo_venta == "caja") {
                    op.setAttribute("selected", true);
                }
                sel.appendChild(op);
                td.appendChild(sel);
                fila.appendChild(td);
                //FIN SELECT PARA EL IPO DE VENTA                       
                var td = document.createElement("td");
                td.setAttribute("id", "valor_venta_" + fac.productos[i].id + "_" + _numero_ticket + "_" + i);
                td.value = fac.productos[i].valor_item;
                td.innerHTML = "$ " + formato_numero(fac.productos[i].valor_item, "0", ",", ".");
                fila.appendChild(td);
                var td = document.createElement("td");
                var ipn = document.createElement("input");
                ipn.setAttribute("type", "number");
                ipn.setAttribute("id", "numCant_" + fac.productos[i].id + "_" + _numero_ticket + "_" + i);
                console.log("cantidad_producto");
                console.log(fac.productos[i].cantidad_producto);
                ipn.setAttribute("value", (Number(fac.productos[i].cantidad_producto)));
                //ipn.setAttribute("onkeypress","calcular_precio("+fac.productos[i].id+","+i+")");
                ipn.setAttribute("onchange", "calcular_precio(" + fac.productos[i].id + "," + i + ")");
                //ipn.setAttribute("onclick","calcular_precio("+fac.productos[i].id+","+i+")");
                td.appendChild(ipn);
                fila.appendChild(td);
                var precio = fac.productos[i].valor_item;
                if ((fac.productos[i].promocion == "1" && fac.productos[i].tipo_venta_promo == "unidad") && (Number(fac.productos[i].cantidad_producto) >= fac.productos[i].promo_desde) && (Number(fac.productos[i].cantidad_producto) <= fac.productos[i].promo_hasta)) {
                    //aplico promocion
                    precio = fac.productos[i].precio_promo_venta;
                }
                var td = document.createElement("td");
                td.value = Number(precio) * Number(fac.productos[i].cantidad_producto);
                td.setAttribute("id", "precio_" + fac.productos[i].id + "_" + _numero_ticket + "_" + i);
                td.innerHTML = "$ " + formato_numero(Number(precio) * Number(fac.productos[i].cantidad_producto), "0", ",", ".");
                fila.appendChild(td);
                var td = document.createElement("td");
                if (fac.productos[i].tipo_venta == "unidad") {
                    td.innerHTML = fac.productos[i].cantidad_existencias_unidades;
                } else if (fac.productos[i].tipo_venta == "blister") {
                    td.innerHTML = fac.productos[i].cantidad_existencias_blister;
                } else {
                    td.innerHTML = fac.productos[i].cantidad_existencias;
                }
                fila.appendChild(td);
                tbCuerpoFactura.appendChild(fila);
                fac.productos[i].valor_item_total = Number(fac.productos[i].valor_item) * Number(fac.productos[i].cantidad_producto);
                if (fin == i) {
                    fila.setAttribute("style", "background:blue");
                }
            }
            calcular_total(mi_ticket[_numero_ticket]);
            document.getElementById("numCantidad").value = 0;
            document.getElementById("h4NombreProductoInv").innerHTML = "Nombre producto";
            document.getElementById("txtCodigoProducto").value = "";
            document.getElementById("h3CuantosProductos").innerHTML = mi_ticket[_numero_ticket].productos.length;
        }
        _producto_seleccionado = false;
    } else if (tk != undefined) {
        var fila_head = document.createElement("tr");
        fila_head.classname = "tblTituloTabla1";
        var td = document.createElement("td");
        td.innerHTML = "#";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "Codigo de barras";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "Descripcion del producto";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "Tipo de venta";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "Precio Venta";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "Cantidad";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "Costo";
        fila_head.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "Existencias";
        fila_head.appendChild(td);
        tbCuerpoFactura.appendChild(fila_head);
        if (fac.productos != undefined) {
            var indice = 1;
            var fin = Object.keys(fac.productos).length;
            for (var i in fac.productos) {
                if (fac.productos[i].inventario == 1) {
                    if (fac.productos[i].tipo_venta == "unidad") {
                        if (Number(fac.productos[i].cantidad_existencias_unidades) <= Number(fac.productos[i].cantidad_producto)) {
                            if(fac.productos[i].aprovado == undefined){
                                if (!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")) {
                                    fac.productos[i].aprovado = false;
                                    break;
                                } else {
                                    fac.productos[i].aprovado = true;
                                }    
                            }
                        }
                    } else if (fac.productos[i].tipo_venta == "caja") {
                        if (Number(fac.productos[i].cantidad_existencias) <= Number(fac.productos[i].cantidad_producto)) {
                           if(fac.productos[i].aprovado == undefined){
                                if (!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")) {
                                    fac.productos[i].aprovado = false;
                                    break;
                                } else {
                                    fac.productos[i].aprovado = true;
                                }    
                            }
                        }
                    } else if (fac.productos[i].tipo_venta == "blister") {
                        if (Number(fac.productos[i].cantidad_existencias_blister) <= Number(fac.productos[i].cantidad_producto)) {
                            if(fac.productos[i].aprovado == undefined){
                                if (!confirm("Esta solicitando una cantidad superior a la existente \n ¿Desea continuar?")) {
                                    fac.productos[i].aprovado = false;
                                    break;
                                } else {
                                    fac.productos[i].aprovado = true;
                                }    
                            }
                        }
                    }
                }
                var fila = document.createElement("tr");
                fila.setAttribute("id", "fila_" + fac.productos[i].id_factura + "_" + _numero_ticket + "_" + i);
                var td = document.createElement("td");
                td.innerHTML = indice++;
                fila.appendChild(td);
                var td = document.createElement("td");
                td.innerHTML = "X";
                td.setAttribute("onclick", "quitar(" + fac.productos[i].id_factura + "," + i + ")");
                fila.appendChild(td);
                var td = document.createElement("td");
                td.innerHTML = fac.productos[i].codigo_producto;
                fila.appendChild(td);
                var td = document.createElement("td");
                var defi_uni = "";
                console.log(fac.productos[i].tipo_venta_producto);
                if (fac.productos[i].tipo_venta == "unidad") {
                    if (fac.productos[i].tipo_venta_producto == "PorUnidad") {
                        defi_uni = "  X " + "1" + " Uni";
                    } else if (fac.productos[i].tipo_venta_producto == "Caja") {
                        defi_uni = "  X " + "1" + " Uni";
                    } else if (fac.productos[i].tipo_venta_producto == "CajaBlister") {
                        defi_uni = "  X " + "1" + " Uni";
                    }
                } else if (fac.productos[i].tipo_venta == "caja") {
                    if (fac.productos[i].tipo_venta_producto == "Caja") {
                        defi_uni = "  X " + fac.productos[i].unidades_por_caja + " Uni";
                    } else if (fac.productos[i].tipo_venta_producto == "CajaBlister") {
                        defi_uni = "  X " + fac.productos[i].unidades_por_caja + " Uni";
                    }
                } else if (fac.productos[i].tipo_venta == "blister") {
                    defi_uni = "  X " + fac.productos[i].unidades_por_blister + " Uni";
                }
                td.innerHTML = fac.productos[i].nombre_producto + " " + defi_uni;
                fila.appendChild(td);
                //SELECT PARA EL IPO DE VENTA
                var td = document.createElement("td");
                var sel = document.createElement("select");
                sel.setAttribute("id", "selCambioUnidad_" + fac.productos[i].id + "_" + _numero_ticket + "_" + i);
                sel.setAttribute("onchange", "cambiar_tipo_venta(" + fac.productos[i].id + "," + _numero_ticket + "," + i + ")");
                var op = document.createElement("option");
                op.innerHTML = "unidad";
                op.value = "unidad";
                if (fac.productos[i].tipo_venta == "unidad") {
                    op.setAttribute("selected", true);
                }
                sel.appendChild(op);
                var op = document.createElement("option");
                op.innerHTML = "blister";
                op.value = "blister";
                if (fac.productos[i].tipo_venta == "blister") {
                    op.setAttribute("selected", true);
                }
                sel.appendChild(op);
                var op = document.createElement("option");
                op.innerHTML = "caja";
                op.value = "caja";
                if (fac.productos[i].tipo_venta == "caja") {
                    op.setAttribute("selected", true);
                }
                sel.appendChild(op);
                td.appendChild(sel);
                fila.appendChild(td);
                //FIN SELECT PARA EL IPO DE VENTA                       
                var td = document.createElement("td");
                td.setAttribute("id", "valor_venta_" + fac.productos[i].id + "_" + _numero_ticket + "_" + i);
                td.value = fac.productos[i].valor_item;
                td.innerHTML = "$ " + formato_numero(fac.productos[i].valor_item, "0", ",", ".");
                fila.appendChild(td);
                var td = document.createElement("td");
                var ipn = document.createElement("input");
                ipn.setAttribute("type", "number");
                ipn.setAttribute("id", "numCant_" + fac.productos[i].id + "_" + _numero_ticket + "_" + i);
                console.log("cantidad_producto");
                console.log(fac.productos[i].cantidad_producto);
                ipn.setAttribute("value", (Number(fac.productos[i].cantidad_producto)));
                //ipn.setAttribute("onkeypress","calcular_precio("+fac.productos[i].id+","+i+")");
                ipn.setAttribute("onchange", "calcular_precio(" + fac.productos[i].id + "," + i + ")");
                //ipn.setAttribute("onclick","calcular_precio("+fac.productos[i].id+","+i+")");
                td.appendChild(ipn);
                fila.appendChild(td);
                var precio = fac.productos[i].valor_item;
                if ((fac.productos[i].promocion == "1" && fac.productos[i].tipo_venta_promo == "unidad") && (Number(fac.productos[i].cantidad_producto) >= fac.productos[i].promo_desde) && (Number(fac.productos[i].cantidad_producto) <= fac.productos[i].promo_hasta)) {
                    //aplico promocion
                    precio = fac.productos[i].precio_promo_venta;
                }
                var td = document.createElement("td");
                td.value = Number(precio) * Number(fac.productos[i].cantidad_producto);
                td.setAttribute("id", "precio_" + fac.productos[i].id + "_" + _numero_ticket + "_" + i);
                td.innerHTML = "$ " + formato_numero(Number(precio) * Number(fac.productos[i].cantidad_producto), "0", ",", ".");
                fila.appendChild(td);
                var td = document.createElement("td");
                if (fac.productos[i].tipo_venta == "unidad") {
                    td.innerHTML = fac.productos[i].cantidad_existencias_unidades;
                } else if (fac.productos[i].tipo_venta == "caja") {
                    td.innerHTML = fac.productos[i].cantidad_existencias;
                } else if (fac.productos[i].tipo_venta == "blister") {
                    td.innerHTML = fac.productos[i].cantidad_existencias_blister;
                }
                fila.appendChild(td);
                tbCuerpoFactura.appendChild(fila);
                fac.productos[i].valor_item_total = Number(fac.productos[i].valor_item) * Number(fac.productos[i].cantidad_producto);
                if (fin == i) {
                    fila.setAttribute("style", "background:blue");
                }
            }
            calcular_total(mi_ticket[_numero_ticket]);
            document.getElementById("numCantidad").value = 0;
            document.getElementById("txtCodigoProducto").value = "";
            document.getElementById("h4NombreProductoInv").innerHTML = "Nombre producto";
            if (mi_ticket.length > 0) {
                document.getElementById("h3CuantosProductos").innerHTML = mi_ticket[_numero_ticket].productos.length;
            }
        }
    }
    document.getElementById("divFactura").scrollTop = '9999';
    /*var span=document.createElement("span");
    span.innerHTML=" ";
    span.setAttribute("id","span");
    document.getElementById("divFactura").appendChild(span);    */
    //agregar_local_storage("mis_tickets_" + _usuario.id_usuario + "_" + _IdSede, mi_ticket);
    console.log("FIN function dibujar_factura");
}