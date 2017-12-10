$(document).ready(function(){    
    
    $('.salirForFac').click(function(){
        $('.formularioCentral').fadeOut('fast');
    });
    
    //Salir 
    $('.salir').click(function(){
        $('.mascara').fadeOut('fast');
    });
    
    //Login ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $('#ingresarSis').click(function(){
        //$('#formLogueo, #recuperarUsuario').fadeOut('fast');
        //$('#menuGeneral, #ventas').fadeIn('slow');
    });
    //Recuperar Contraseña
    $('#recuperarU').click(function(){
        $('#recuperarUsuario').fadeIn('slow');
        
    });
    
    
    //Deslogueo ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $('#menuSalir').click(function(){
        //$('#menuGeneral, #ventas, #clientes, #productos, #inventarios, #configuracion, #cortes').fadeOut('fast');
        //$('#formLogueo').fadeIn('slow');
    });
    
    // Ventana Factura +++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $('#menuVenta').click(function(){
       $('#clientes, #productos, #inventarios, #configuracion, #cortes, #perfil').fadeOut('fast');
       $('#ventas').fadeIn('slow'); 
       $("#txtCodigoProducto").focus(); 
    });
    
    //Entrada de Efectivo
    $('#entradaD').click(function(){
        $('#salidaDinero').fadeOut('fast');
        $('#entradaDinero').fadeIn('slow');
    });
    //Salida de Efectivo
    $('#salidaD').click(function(){
        $('#entradaDinero').fadeOut('fast');
        $('#salidaDinero').fadeIn('slow');
    });
    
    
    // Ventana Cliente +++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $('#menuCliente').click(function(){
        $('#ventas, #productos, #inventarios, #configuracion, #cortes, #estadoCuenta, #reporteSaldos, #perfil').fadeOut('fast');
       $('#clientes').fadeIn('slow'); 
    });
    
    //Menu cliente ...........................................................
    //Estado de cliente
    $('#estadoC').click(function(){
        $('#nuevoCliente, #edicionCliente, #eliminarCliente, #resultadoEdicionC, #estadoCuenta, #reporteSaldos').fadeOut('fast');
        $('#estadoCliente').fadeIn('slow');
    });
    //Resultado Estado Cliente
    $('#estadoCu').click(function(){
        $('#estadoCliente').fadeOut('fast');
        $('#estadoCuenta').fadeIn('slow');
    });
    //Abono
    $('#menuAbono').click(function(){
        $('#abono').fadeIn('slow');
    });
    //Nuevo cliente
    $('#nuevoC').click(function(){
        $('#estadoCliente, #edicionCliente, #eliminarCliente, #resultadoEdicionC, #estadoCuenta, #reporteSaldos').fadeOut('fast');
        $('#nuevoCliente').fadeIn('slow');
    });
    //Edicion Cliente
    $('#modificarC').click(function(){
        $('#estadoCliente, #nuevoCliente, #eliminarCliente, #resultadoEdicionC, #estadoCuenta, #reporteSaldos').fadeOut('fast');
        $('#edicionCliente').fadeIn('slow');
    });
    //Resultado busqueda edicion Cliente
    $('#btnEdicionCliente').click(function(){
        $('#estadoCliente, #nuevoCliente, #edicionCliente, #eliminarCliente, #estadoCuenta, #reporteSaldos').fadeOut('fast');
        $('#resultadoEdicionC').fadeIn('slow');
    });
    //Eliminar Cliente
    $('#eliminarC').click(function(){
        $('#estadoCliente, #nuevoCliente, #edicionCliente, #resultadoEdicionC, #estadoCuenta, #reporteSaldos').fadeOut('fast');
        $('#eliminarCliente').fadeIn('slow');
    });
    //Reporte de saldos
    $('#reporteS').click(function(){
        $('#estadoCliente, #nuevoCliente, #edicionCliente, #resultadoEdicionC, #eliminarCliente, #estadoCuenta').fadeOut('fast');
        $('#reporteSaldos').fadeIn('slow');
    });
    

    // Ventana Producto ++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //menu Productos
    $('#menuProducto').click(function(){
        $('#ventas, #clientes, #inventarios, #configuracion, #cortes, #categoriaProducto, #ventasPeriodo, #promo, #resultadoEdicionP, #perfil, #nuevoPedido').fadeOut('fast');
       $('#productos, #nuevoProducto').fadeIn('slow'); 
    });
    
    //Nuevo Producto
    $('#nuevoP').click(function(){
        $('#editarProducto, #eliminarProducto, #resultadoEditarP, #categoriaProducto, #ventasPeriodo, #promo, #proveedoresProducto, #nuevoProveedor, #adminpedido, #importarProductos').fadeOut('fast');
        $('#nuevoProducto').fadeIn('slow');
    });
    
    //Editar Producto
    $('#modificarP').click(function(){
        $('#nuevoProducto, #eliminarProducto, #resultadoEditarP, #categoriaProducto, #ventasPeriodo, #promo, #importarProductos').fadeOut('fast');
        $('#editarProducto').fadeIn('slow');
    });
    
    //Resultado edicion Producto
    $('#btnEditarProducto').click(function(){
        //$('#nuevoProducto, #eliminarProducto, #editarProducto, #categoriaProducto, #ventasPeriodo, #promo').fadeOut('fast');
        //$('#resultadoEdicionP').fadeIn('slow');
    });
    
    //Eliminar Producto
    $('#eliminarP').click(function(){
        $('#nuevoProducto, #editarProducto, #resultadoEdicionP, #categoriaProducto, #ventasPeriodo, #promo, #importarProductos').fadeOut('fast');
        $('#eliminarProducto').fadeIn('slow');
    });
    
    //Categorias de los Productos
    $('#categoriaP').click(function(){
        $('#nuevoProducto, #editarProducto, #resultadoEdicionP, #eliminarProducto, #ventasPeriodo, #promo, #proveedoresProducto, #pedido, #nuevoPedido').fadeOut('fast');
        $('#categoriaProducto').fadeIn('slow');
    });
    //nueva Categoria
    $('#nuevaCat').click(function(){
        $('#resultadoSeleccionCat').fadeOut('fast');
        $('#nuevaCategoria').fadeIn('slow');
    });
    //Editar Categoria
    $('.cat').click(function(){
        $('#nuevaCategoria').fadeOut('fast');
        $('#resultadoSeleccionCat').fadeIn('slow');
    });
    
    //Ventas por periodos
    $('#ventaPer').click(function(){
        $('#nuevoProducto, #editarProducto, #resultadoEdicionP, #eliminarProducto, #categoriaProducto, #promo, #proveedoresProducto, #adminpedidosubir').fadeOut('fast');
        $('#ventasPeriodo').fadeIn('slow');
    });
    //Promociones 
    $('#promocionP').click(function(){
        $('#nuevoProducto, #editarProducto, #resultadoEdicionP, #eliminarProducto, #categoriaProducto, #ventasPeriodo, #importarProductos, #adminpedido').fadeOut('fast');
        $('#promo').fadeIn('slow');
    });
    

    // Ventana Inventario ++++++++++++++++++++++++++++++++++++++++++++++++++++
    $('#menuInventario').click(function(){
        $('#ventas, #clientes, #productos, #configuracion, #cortes, #ajusteInventario, #bajoInventario, #reporteInventario, #reporteMovimientos, #perfil').fadeOut('fast');
       $('#inventarios, #agregarInventario').fadeIn('slow'); 
    });
    //Agregar Inventario
    $('#agregarI').click(function(){
        $('#ajusteInventario, #bajoInventario, #reporteInventario, #reporteMovimientos').fadeOut('fast');
       $('#agregarInventario').fadeIn('slow'); 
    });
    //Ajustar Inventario
    $('#ajusteI').click(function(){
        $('#agregarInventario, #bajoInventario, #reporteInventario, #reporteMovimientos').fadeOut('fast');
       $('#ajusteInventario').fadeIn('slow'); 
    });
    //Bajo Inventario
    $('#bajoI').click(function(){
        $('#agregarInventario, #ajusteInventario, #reporteInventario, #reporteMovimientos').fadeOut('fast');
       $('#bajoInventario').fadeIn('slow'); 
    });
    //Reporte de Inventario
    $('#reporteI').click(function(){
        $('#agregarInventario, #ajusteInventario, #bajoInventario, #reporteMovimientos, #agregarInvSel').fadeOut('fast');
        $('#reporteInventario').fadeIn('slow');
    });
    //Agregar Inventario desde el reporte
    $('#agregarInv').click(function(){
        //$('#agregarInvSel').fadeIn('slow');
    });
    //Modificar Inventario desde el reporte
    $('#modificarInvReporte').click(function(){
        $('#inventarios, #nuevoProducto').fadeOut('fast');
        $('#productos, #resultadoEdicionP').fadeIn('slow');
    });
    //Reporte de Movimientos
    $('#reporteM').click(function(){
        $('#agregarInventario, #ajusteInventario, #bajoInventario, #reporteInventario').fadeOut('fast');
        $('#reporteMovimientos').fadeIn('slow');
    });
    
    //Ventana Configuracion ++++++++++++++++++++++++++++++++++++++++++++++++++
    $('#menuConfiguracion').click(function(){
        $('#ventas, #clientes, #productos, #inventarios, #cortes, #perfil').fadeOut('fast');
       $('#configuracion').fadeIn('slow'); 
    });
    $('#menuCajeros').click(function(){
        $('#menusConfiguracion').fadeOut('fast');
        $('#cajeros').fadeIn('slow');
    });
    
    $('#opcionesConfi').click(function(){
        $('#cajeros, #sedes').fadeOut('fast');
        $('#menusConfiguracion').fadeIn('slow');
    });
    //Sedes
   
     $('#menuSedes').click(function(){
        $('#menusConfiguracion, #ResultadoEditarSede, #editarSede, #eliminarSede').fadeOut('fast');
        $('#sedes, #crearSede').fadeIn('slow');
    });
    //Nueva Sede
    $('#nuevaS').click(function(){
        $('#editarSede, #ResultadoEditarSede, #eliminarSede').fadeOut('fast');
        $('#crearSede').fadeIn('slow');
    });
    
    //Editar Sede
    $('#editarS').click(function(){
        $('#crearSede, #eliminarSede').fadeOut('fast');
        $('#editarSede').fadeIn('slow');
    });
    $('#buscarSede').click(function(){
        $('#ResultadoEditarSede').fadeIn('slow');
    });
    
    //Eliminar Sede
    $('#eliminarS').click(function(){
        $('#crearSede, #editarSede, #ResultadoEditarSede').fadeOut('fast');
        $('#eliminarSede').fadeIn('slow');
    });
    
    // Ventana Corte +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $('#menuCorte').click(function(){
        $('#ventas, #clientes, #productos, #inventarios, #configuracion, #perfil').fadeOut('fast');
       $('#cortes').fadeIn('slow'); 
    });
    
    
    
    // Ventana Salir +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
});