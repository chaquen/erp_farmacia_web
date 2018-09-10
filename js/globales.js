/*
 *Aqui se declaran las variables que van a ser tomadas como variables globales 
 */
//variable que almacena el usuario
var _usuario=false;
//variable que almacena las url
//PRODUCCION
//var _URL="https://api.asopharma.com/";
//TEST LOCAL
//var _URL="http://localhost/erp_farmacia_back_end/";
//TEST WEB
var _URL="apierpfarmacia.mohansoft.com/"
//VentasARIBLE QUE DEFINE LA SEDE DONDE SE FACTURA
var _IdSede;
var _id_cliente=1;

var cajeros=[];
var _donde_estoy="Ventas";
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/


//DEPARTAMENTOS
var _btnEditarDepartamento="btnEditarDepartamento";
var _btnEliminarDepartamento="btnEliminarDepartamento";
var _btnCrearDepartamento="btnCrearCategoria";
var _btnConsultarDepartamento="buscarCat";

//PRODUCTOS
var _btnEditarProducto="btnGuardarEditarProducto";
var _btnEliminarProducto="btnEliminarProducto";
var _btnCrearProducto="btnCrearProducto";
var _btnConsultarProducto;

//USUARIO
var _btnEditarUsuario;
var _btnEliminarUsuario;
var _btnCrearUsuario;
var _btnConsultarUsuario;

//CLIENTE
var _btnEditarCliente="btnEditarCliente";
var _btnEliminarCliente="btnEliminarCliente";
var _btnCrearCliente="btnCrearCliente";
var _btnConsultarCliente;


//ENTRADA CONTABLE
var _btnEditarEntradaContable;
var _btnEliminarEntradaContable;
var _btnCrearEntradaContable;
var _btnConsultarEntradaContable;

//FACTURA
var _btnEditarFactura;
var _btnEliminarFactura;
var _btnCrearFactura="liCrearFactura";
var _btnConsultarFactura;

//IMPUESTO
var _btnEditarImpuesto;
var _btnEliminarImpuesto;
var _btnCrearImpuesto;
var _btnConsultarImpuesto;

//PERMISOS
var _btnEditarPermiso;
var _btnEliminarPermiso;
var _btnCrearPermiso;
var _btnConsultarPermiso;


//PROVEEDORES
var _btnEditarProveedor="btnEditarProveedor";
var _btnEliminarProveedor;
var _btnCrearProveedor="btnCrearProveedor";
var _btnConsultarProveedor="buscarProv";


//ROLES
var _btnEditarRol;
var _btnEliminarRol;
var _btnCrearRol;
var _btnConsultarRol;

//SALIDAS CONTABLES
var _btnEditarSalidaContable;
var _btnEliminarSalidaContable;
var _btnCrearSalidaContable;
var _btnConsultarSalidaContable;

//SEDES
var _btnEditarSede;
var _btnEliminarSede;
var _btnCrearSede="btnRegistroSede";
var _btnConsultarSede;

//CREDITOS
var _btnCrearCredito;
var _btnConsultarCredito="reporteS";
var _btnEditarCredito;
var _btnEliminarCredito;
var _btnEliminarCredito;



/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistroObjeto;
var _formConsultaObjeto;

/*AQUI VARIABLES GLOBALES PARA MANEJO DE FACTURAS;*/

var _Facturas=[];
var _lista_mis_productos;

var _factura_seleccionada;
//variable con el producto seleccionado para agregarse a la factura
var _producto_seleccionado=false;


