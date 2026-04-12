// ============================================================
// MuebleClick - Mock Database
// Based on dbdiagram.io schema (35 tables)
// ============================================================

// ---- ROLES ----
export const roles = [
  { id_rol: 1, nombre: 'Administrador', descripcion: 'Control total de la plataforma' },
  { id_rol: 2, nombre: 'Propietario', descripcion: 'Dueño de una o más mueblerías' },
  { id_rol: 3, nombre: 'Empleado', descripcion: 'Trabajador de una sucursal' },
  { id_rol: 4, nombre: 'Cliente', descripcion: 'Comprador de muebles' },
];

// ---- ESTADOS & MUNICIPIOS ----
export const estados = [
  { id_estado: 1, nombre: 'Jalisco', codigo_iso: 'MX-JAL' },
  { id_estado: 2, nombre: 'Nuevo León', codigo_iso: 'MX-NLE' },
  { id_estado: 3, nombre: 'Ciudad de México', codigo_iso: 'MX-CMX' },
  { id_estado: 4, nombre: 'Puebla', codigo_iso: 'MX-PUE' },
  { id_estado: 5, nombre: 'Querétaro', codigo_iso: 'MX-QUE' },
];

export const municipios = [
  { id_municipio: 1, id_estado: 1, nombre: 'Guadalajara' },
  { id_municipio: 2, id_estado: 1, nombre: 'Zapopan' },
  { id_municipio: 3, id_estado: 2, nombre: 'Monterrey' },
  { id_municipio: 4, id_estado: 2, nombre: 'San Pedro Garza García' },
  { id_municipio: 5, id_estado: 3, nombre: 'Benito Juárez' },
  { id_municipio: 6, id_estado: 3, nombre: 'Miguel Hidalgo' },
  { id_municipio: 7, id_estado: 4, nombre: 'Puebla Centro' },
  { id_municipio: 8, id_estado: 5, nombre: 'Querétaro Centro' },
];

// ---- USUARIOS ----
export const usuarios = [
  { id_usuario: 1, nombre: 'Carlos Mendoza', correo: 'carlos@admin.com', password: '***', role_id: 1, fecha_registro: '2023-01-15T10:00:00', activo: true },
  { id_usuario: 2, nombre: 'Roberto Fuentes', correo: 'roberto@mueblesdelvalle.com', password: '***', role_id: 2, fecha_registro: '2023-03-10T10:00:00', activo: true },
  { id_usuario: 3, nombre: 'María García', correo: 'maria@interioresmodernos.com', password: '***', role_id: 2, fecha_registro: '2023-04-20T10:00:00', activo: true },
  { id_usuario: 4, nombre: 'Jorge Ramírez', correo: 'jorge@artesanalmx.com', password: '***', role_id: 2, fecha_registro: '2023-05-15T10:00:00', activo: true },
  { id_usuario: 5, nombre: 'Ana López', correo: 'ana@gmail.com', password: '***', role_id: 4, fecha_registro: '2023-06-01T10:00:00', activo: true },
  { id_usuario: 6, nombre: 'Pedro Sánchez', correo: 'pedro@gmail.com', password: '***', role_id: 4, fecha_registro: '2023-07-15T10:00:00', activo: true },
  { id_usuario: 7, nombre: 'Laura Martínez', correo: 'laura@gmail.com', password: '***', role_id: 4, fecha_registro: '2023-08-20T10:00:00', activo: true },
  { id_usuario: 8, nombre: 'Diego Torres', correo: 'diego@mueblesdelvalle.com', password: '***', role_id: 3, fecha_registro: '2023-04-01T10:00:00', activo: true },
  { id_usuario: 9, nombre: 'Sofía Hernández', correo: 'sofia@interioresmodernos.com', password: '***', role_id: 3, fecha_registro: '2023-05-01T10:00:00', activo: true },
  { id_usuario: 10, nombre: 'Andrés Vega', correo: 'andres@mueblesdelvalle.com', password: '***', role_id: 3, fecha_registro: '2023-06-15T10:00:00', activo: true },
  { id_usuario: 11, nombre: 'Gabriela Ríos', correo: 'gabriela@artesanalmx.com', password: '***', role_id: 3, fecha_registro: '2023-07-01T10:00:00', activo: true },
];

// ---- PROPIETARIOS ----
export const propietarios = [
  { id_usuario: 2, curp_rfc: 'FURO800315HJC', clabe_interbancaria: '012180001234567890', banco: 'BBVA', verificado: true },
  { id_usuario: 3, curp_rfc: 'GARM790420MNL', clabe_interbancaria: '014320009876543210', banco: 'Santander', verificado: true },
  { id_usuario: 4, curp_rfc: 'RAJR850515HPL', clabe_interbancaria: '021180005432109876', banco: 'Banorte', verificado: false },
];

// ---- MUEBLERÍAS ----
export const mueblerias = [
  { id_muebleria: 1, nombre_negocio: 'Muebles del Valle', id_propietario: 2, razon_social: 'Muebles del Valle SA de CV', rfc: 'MDV200315A01', direccion_principal: 'Av. Vallarta 1234, Col. Americana, Guadalajara', telefono: '33-1234-5678', creado_en: '2023-03-10T10:00:00' },
  { id_muebleria: 2, nombre_negocio: 'Interiores Modernos', id_propietario: 3, razon_social: 'Interiores Modernos SA de CV', rfc: 'IMO230420B02', direccion_principal: 'Blvd. Puerta de Hierro 456, Zapopan', telefono: '81-9876-5432', creado_en: '2023-04-20T10:00:00' },
  { id_muebleria: 3, nombre_negocio: 'Artesanal MX', id_propietario: 4, razon_social: 'Artesanal México SA de CV', rfc: 'AMX230515C03', direccion_principal: 'Av. Reforma 789, CDMX', telefono: '55-5678-1234', creado_en: '2023-05-15T10:00:00' },
];

// ---- SUCURSALES ----
export const sucursales = [
  { id_sucursal: 1, id_muebleria: 1, nombre_sucursal: 'Muebles del Valle - Centro', calle_numero: 'Av. Vallarta 1234', id_municipio: 1, telefono: '33-1234-5678', horario: { lunes_viernes: '9:00-20:00', sabado: '10:00-18:00', domingo: 'Cerrado' }, activo: true, creado_en: '2023-03-15T10:00:00' },
  { id_sucursal: 2, id_muebleria: 1, nombre_sucursal: 'Muebles del Valle - Zapopan', calle_numero: 'Av. Patria 567', id_municipio: 2, telefono: '33-8765-4321', horario: { lunes_viernes: '9:00-20:00', sabado: '10:00-18:00', domingo: '11:00-16:00' }, activo: true, creado_en: '2023-04-01T10:00:00' },
  { id_sucursal: 3, id_muebleria: 2, nombre_sucursal: 'Interiores Modernos - Monterrey', calle_numero: 'Av. Constitución 890', id_municipio: 3, telefono: '81-9876-5432', horario: { lunes_viernes: '10:00-20:00', sabado: '10:00-18:00', domingo: 'Cerrado' }, activo: true, creado_en: '2023-05-01T10:00:00' },
  { id_sucursal: 4, id_muebleria: 2, nombre_sucursal: 'Interiores Modernos - San Pedro', calle_numero: 'Calzada del Valle 123', id_municipio: 4, telefono: '81-1234-8765', horario: { lunes_viernes: '10:00-20:00', sabado: '10:00-17:00', domingo: 'Cerrado' }, activo: true, creado_en: '2023-06-01T10:00:00' },
  { id_sucursal: 5, id_muebleria: 3, nombre_sucursal: 'Artesanal MX - CDMX', calle_numero: 'Av. Reforma 789', id_municipio: 5, telefono: '55-5678-1234', horario: { lunes_viernes: '10:00-19:00', sabado: '10:00-17:00', domingo: '11:00-15:00' }, activo: true, creado_en: '2023-06-15T10:00:00' },
];

// ---- CLIENTES ----
export const clientes = [
  { id_usuario: 5, telefono: '33-5555-1234', id_municipio_default: 1, direccion_principal: 'Calle Hidalgo 456, Col. Centro, Guadalajara', puntos: 250 },
  { id_usuario: 6, telefono: '81-6666-5678', id_municipio_default: 3, direccion_principal: 'Av. Garza Sada 789, Monterrey', puntos: 120 },
  { id_usuario: 7, telefono: '55-7777-9012', id_municipio_default: 5, direccion_principal: 'Calle Ámsterdam 321, Col. Condesa, CDMX', puntos: 380 },
];

// ---- EMPLEADOS ----
export const empleados = [
  { id_usuario: 8, id_sucursal: 1, puesto: 'Gerente de Sucursal', fecha_ingreso: '2023-04-01', activo: true, es_vendedor: true, codigo_vendedor: 'VDV-001', comision_pct: 5.0 },
  { id_usuario: 9, id_sucursal: 3, puesto: 'Vendedor Senior', fecha_ingreso: '2023-05-01', activo: true, es_vendedor: true, codigo_vendedor: 'VIM-001', comision_pct: 4.5 },
  { id_usuario: 10, id_sucursal: 2, puesto: 'Vendedor', fecha_ingreso: '2023-06-15', activo: true, es_vendedor: true, codigo_vendedor: 'VDV-002', comision_pct: 3.5 },
  { id_usuario: 11, id_sucursal: 5, puesto: 'Encargado de Almacén', fecha_ingreso: '2023-07-01', activo: true, es_vendedor: false, codigo_vendedor: null, comision_pct: 0 },
];

// ---- PRODUCTOS ----
const IMG = 'https://images.unsplash.com';
export const productos = [
  // Salas
  { id_producto: 1, sku: 'SAL-001', id_muebleria: 1, nombre: 'Sofá Milán 3 Plazas', descripcion: 'Sofá moderno de 3 plazas tapizado en tela premium. Estructura de madera de pino con patas de acero inoxidable. Cojines con relleno de espuma de alta densidad.', categoria: 'Salas', unidad_medida: 'pieza', imagen_url: `${IMG}/photo-1759647020668-648cd90ddce4?w=600&h=400&fit=crop`, precio_venta: 18500.00, peso_kg: 45, volumen_m3: 1.8, tipo_producto: 'terminado', creado_en: '2023-06-01T10:00:00', actualizado_en: '2024-01-15T10:00:00' },
  { id_producto: 2, sku: 'SAL-002', id_muebleria: 2, nombre: 'Sofá Seccional Esquinero', descripcion: 'Sofá seccional en forma de L. Tapizado en piel sintética de alta calidad. Incluye cojines decorativos.', categoria: 'Salas', unidad_medida: 'pieza', imagen_url: `${IMG}/photo-1768946131549-f03cafef7bc1?w=600&h=400&fit=crop`, precio_venta: 32900.00, peso_kg: 78, volumen_m3: 3.2, tipo_producto: 'terminado', creado_en: '2023-07-01T10:00:00', actualizado_en: '2024-02-10T10:00:00' },
  { id_producto: 3, sku: 'SAL-003', id_muebleria: 1, nombre: 'Sillón Relax Reclinable', descripcion: 'Sillón individual reclinable con reposapiés integrado. Tapizado en microfibra suave. Mecanismo manual.', categoria: 'Salas', unidad_medida: 'pieza', imagen_url: `${IMG}/photo-1768946052273-0a2dd7f3e365?w=600&h=400&fit=crop`, precio_venta: 12800.00, peso_kg: 35, volumen_m3: 1.2, tipo_producto: 'terminado', creado_en: '2023-08-15T10:00:00', actualizado_en: '2024-01-20T10:00:00' },
  { id_producto: 4, sku: 'SAL-004', id_muebleria: 3, nombre: 'Sofá Cama Convertible', descripcion: 'Sofá de 2 plazas que se convierte en cama individual. Tapizado en lino natural. Ideal para espacios pequeños.', categoria: 'Salas', unidad_medida: 'pieza', imagen_url: `${IMG}/photo-1763565909003-46e9dfb68a00?w=600&h=400&fit=crop`, precio_venta: 15600.00, peso_kg: 42, volumen_m3: 1.5, tipo_producto: 'terminado', creado_en: '2023-09-01T10:00:00', actualizado_en: '2024-03-05T10:00:00' },
  // Comedores
  { id_producto: 5, sku: 'COM-001', id_muebleria: 1, nombre: 'Mesa de Comedor Roble 6 Personas', descripcion: 'Mesa de comedor rectangular en madera de roble maciza. Acabado natural con barniz mate. Capacidad para 6 personas.', categoria: 'Comedores', unidad_medida: 'pieza', imagen_url: `${IMG}/photo-1758977404683-d04c315a005b?w=600&h=400&fit=crop`, precio_venta: 22400.00, peso_kg: 55, volumen_m3: 1.6, tipo_producto: 'terminado', creado_en: '2023-06-15T10:00:00', actualizado_en: '2024-01-25T10:00:00' },
  { id_producto: 6, sku: 'COM-002', id_muebleria: 2, nombre: 'Comedor Moderno 4 Sillas', descripcion: 'Conjunto de mesa redonda con 4 sillas tapizadas. Estructura metálica con cubierta de madera. Estilo contemporáneo.', categoria: 'Comedores', unidad_medida: 'juego', imagen_url: `${IMG}/photo-1758977245928-296e47fa2155?w=600&h=400&fit=crop`, precio_venta: 16800.00, peso_kg: 48, volumen_m3: 2.0, tipo_producto: 'terminado', creado_en: '2023-07-10T10:00:00', actualizado_en: '2024-02-15T10:00:00' },
  { id_producto: 7, sku: 'COM-003', id_muebleria: 3, nombre: 'Mesa Extensible Nogal 8 Personas', descripcion: 'Mesa extensible que va de 6 a 8 personas. Madera de nogal con acabado satinado. Mecanismo de extensión central.', categoria: 'Comedores', unidad_medida: 'pieza', imagen_url: `${IMG}/photo-1758977403826-01e2c8a3f68f?w=600&h=400&fit=crop`, precio_venta: 28500.00, peso_kg: 62, volumen_m3: 1.8, tipo_producto: 'terminado', creado_en: '2023-08-01T10:00:00', actualizado_en: '2024-03-10T10:00:00' },
  { id_producto: 8, sku: 'COM-004', id_muebleria: 1, nombre: 'Sillas Tapizadas Set de 4', descripcion: 'Set de 4 sillas con respaldo alto tapizadas en terciopelo verde. Patas de madera torneada.', categoria: 'Comedores', unidad_medida: 'juego', imagen_url: `${IMG}/photo-1762012591687-eafadfee3121?w=600&h=400&fit=crop`, precio_venta: 9800.00, peso_kg: 24, volumen_m3: 1.0, tipo_producto: 'terminado', creado_en: '2023-09-10T10:00:00', actualizado_en: '2024-01-30T10:00:00' },
  // Recámaras
  { id_producto: 9, sku: 'REC-001', id_muebleria: 2, nombre: 'Cama King Size Capitoneada', descripcion: 'Cama king size con cabecera capitoneada en tela gris. Incluye base con almacenaje. Estilo moderno y elegante.', categoria: 'Recámaras', unidad_medida: 'pieza', imagen_url: `${IMG}/photo-1768946131530-358c52c4c42d?w=600&h=400&fit=crop`, precio_venta: 24900.00, peso_kg: 85, volumen_m3: 3.5, tipo_producto: 'terminado', creado_en: '2023-06-20T10:00:00', actualizado_en: '2024-02-20T10:00:00' },
  { id_producto: 10, sku: 'REC-002', id_muebleria: 1, nombre: 'Cama Queen Plataforma Flotante', descripcion: 'Cama queen con diseño de plataforma flotante. Madera de fresno con acabado natural. Cabecera minimalista.', categoria: 'Recámaras', unidad_medida: 'pieza', imagen_url: `${IMG}/photo-1768946131535-b90bad125f16?w=600&h=400&fit=crop`, precio_venta: 19800.00, peso_kg: 70, volumen_m3: 2.8, tipo_producto: 'terminado', creado_en: '2023-07-15T10:00:00', actualizado_en: '2024-01-18T10:00:00' },
  { id_producto: 11, sku: 'REC-003', id_muebleria: 3, nombre: 'Recámara Completa Juvenil', descripcion: 'Set completo con cama individual, buró, escritorio y closet. Acabado en blanco mate con detalles de madera.', categoria: 'Recámaras', unidad_medida: 'juego', imagen_url: `${IMG}/photo-1768253843445-49fa5f4a801f?w=600&h=400&fit=crop`, precio_venta: 21500.00, peso_kg: 120, volumen_m3: 5.0, tipo_producto: 'terminado', creado_en: '2023-08-20T10:00:00', actualizado_en: '2024-03-15T10:00:00' },
  { id_producto: 12, sku: 'REC-004', id_muebleria: 2, nombre: 'Buró con Cajón Roble', descripcion: 'Buró de noche con un cajón y repisa inferior. Madera de roble macizo con herrajes de latón.', categoria: 'Recámaras', unidad_medida: 'pieza', imagen_url: `${IMG}/photo-1583221742001-9ad88bf233ff?w=600&h=400&fit=crop`, precio_venta: 4500.00, peso_kg: 12, volumen_m3: 0.15, tipo_producto: 'terminado', creado_en: '2023-09-05T10:00:00', actualizado_en: '2024-02-25T10:00:00' },
  // Oficina
  { id_producto: 13, sku: 'OFI-001', id_muebleria: 1, nombre: 'Escritorio Ejecutivo Nogal', descripcion: 'Escritorio ejecutivo de 150cm con 3 cajones. Madera de nogal con cubierta de cristal templado. Organizador de cables.', categoria: 'Oficina', unidad_medida: 'pieza', imagen_url: `${IMG}/photo-1718524767499-78ce54e0e188?w=600&h=400&fit=crop`, precio_venta: 16500.00, peso_kg: 40, volumen_m3: 1.2, tipo_producto: 'terminado', creado_en: '2023-07-01T10:00:00', actualizado_en: '2024-01-22T10:00:00' },
  { id_producto: 14, sku: 'OFI-002', id_muebleria: 3, nombre: 'Escritorio Minimalista 120cm', descripcion: 'Escritorio de trabajo sencillo de 120cm. Estructura metálica con superficie de madera de pino.', categoria: 'Oficina', unidad_medida: 'pieza', imagen_url: `${IMG}/photo-1718049719677-85afb466425a?w=600&h=400&fit=crop`, precio_venta: 7900.00, peso_kg: 20, volumen_m3: 0.6, tipo_producto: 'terminado', creado_en: '2023-08-10T10:00:00', actualizado_en: '2024-03-08T10:00:00' },
  { id_producto: 15, sku: 'OFI-003', id_muebleria: 2, nombre: 'Silla Ergonómica Premium', descripcion: 'Silla de oficina ergonómica con soporte lumbar ajustable. Malla transpirable. Reposabrazos 3D.', categoria: 'Oficina', unidad_medida: 'pieza', imagen_url: `${IMG}/photo-1718524767521-1aec8589115b?w=600&h=400&fit=crop`, precio_venta: 8900.00, peso_kg: 15, volumen_m3: 0.5, tipo_producto: 'terminado', creado_en: '2023-09-15T10:00:00', actualizado_en: '2024-02-28T10:00:00' },
  { id_producto: 16, sku: 'OFI-004', id_muebleria: 1, nombre: 'Librero Modular 5 Niveles', descripcion: 'Librero modular de 5 niveles con puertas inferiores. Madera MDF con acabado en roble.', categoria: 'Oficina', unidad_medida: 'pieza', imagen_url: `${IMG}/photo-1762681829669-2cd09f21ad7a?w=600&h=400&fit=crop`, precio_venta: 11200.00, peso_kg: 35, volumen_m3: 0.9, tipo_producto: 'terminado', creado_en: '2023-10-01T10:00:00', actualizado_en: '2024-01-28T10:00:00' },
  // Estantes y Almacenamiento
  { id_producto: 17, sku: 'EST-001', id_muebleria: 3, nombre: 'Estante Industrial 4 Niveles', descripcion: 'Estante estilo industrial con estructura metálica negra y repisas de madera. Ideal para sala o estudio.', categoria: 'Estantes', unidad_medida: 'pieza', imagen_url: `${IMG}/photo-1762606368623-81bb2d5f5778?w=600&h=400&fit=crop`, precio_venta: 6800.00, peso_kg: 22, volumen_m3: 0.7, tipo_producto: 'terminado', creado_en: '2023-08-25T10:00:00', actualizado_en: '2024-03-12T10:00:00' },
  { id_producto: 18, sku: 'EST-002', id_muebleria: 2, nombre: 'Vitrina de Cristal Moderna', descripcion: 'Vitrina con puertas de cristal templado y estructura de metal dorado. 3 estantes interiores con iluminación LED.', categoria: 'Estantes', unidad_medida: 'pieza', imagen_url: `${IMG}/photo-1761330439863-c5054148d0c1?w=600&h=400&fit=crop`, precio_venta: 14200.00, peso_kg: 30, volumen_m3: 0.8, tipo_producto: 'terminado', creado_en: '2023-09-20T10:00:00', actualizado_en: '2024-02-18T10:00:00' },
  { id_producto: 19, sku: 'EST-003', id_muebleria: 1, nombre: 'Organizador Cubos Apilable', descripcion: 'Sistema de organización con 9 cubos apilables. MDF con acabado blanco mate. Configurable según necesidad.', categoria: 'Estantes', unidad_medida: 'pieza', imagen_url: `${IMG}/photo-1773291933661-ea3a4a611fab?w=600&h=400&fit=crop`, precio_venta: 5400.00, peso_kg: 18, volumen_m3: 0.6, tipo_producto: 'terminado', creado_en: '2023-10-10T10:00:00', actualizado_en: '2024-01-12T10:00:00' },
  { id_producto: 20, sku: 'EST-004', id_muebleria: 3, nombre: 'Repisa Flotante Set de 3', descripcion: 'Set de 3 repisas flotantes de diferentes tamaños. Madera de pino con soportes ocultos.', categoria: 'Estantes', unidad_medida: 'juego', imagen_url: `${IMG}/photo-1771360925795-913c52119ea3?w=600&h=400&fit=crop`, precio_venta: 2800.00, peso_kg: 6, volumen_m3: 0.2, tipo_producto: 'terminado', creado_en: '2023-10-15T10:00:00', actualizado_en: '2024-03-01T10:00:00' },
];

export const categorias = ['Salas', 'Comedores', 'Recámaras', 'Oficina', 'Estantes'];

// ---- PROVEEDORES ----
export const proveedores = [
  { id_proveedor: 1, nombre: 'Maderas Finas del Norte', contacto_nombre: 'Luis Castillo', contacto_email: 'luis@maderasfinas.com', telefono: '33-4444-1111', id_municipio: 1, direccion: 'Parque Industrial El Salto, Guadalajara', rfc: 'MFN200101A01', cuenta_bancaria: '012180001111222233', tiempo_entrega_dias: 7, tipo_proveedor: 'Materia Prima' },
  { id_proveedor: 2, nombre: 'Textiles y Tapices SA', contacto_nombre: 'Carmen Ortiz', contacto_email: 'carmen@textilesytapices.com', telefono: '81-3333-2222', id_municipio: 3, direccion: 'Zona Industrial, Monterrey', rfc: 'TYT190215B02', cuenta_bancaria: '014320002222333344', tiempo_entrega_dias: 5, tipo_proveedor: 'Materia Prima' },
  { id_proveedor: 3, nombre: 'Herrajes Industriales MX', contacto_nombre: 'Fernando Díaz', contacto_email: 'fernando@herrajes.mx', telefono: '55-2222-3333', id_municipio: 5, direccion: 'Central de Abastos, CDMX', rfc: 'HIM180320C03', cuenta_bancaria: '021180003333444455', tiempo_entrega_dias: 3, tipo_proveedor: 'Componentes' },
  { id_proveedor: 4, nombre: 'Distribuidora de Muebles Importados', contacto_nombre: 'Patricia Luna', contacto_email: 'patricia@mueblesimport.com', telefono: '55-1111-4444', id_municipio: 6, direccion: 'Polanco, CDMX', rfc: 'DMI170510D04', cuenta_bancaria: '012180004444555566', tiempo_entrega_dias: 14, tipo_proveedor: 'Producto Terminado' },
];

// ---- PROVEEDOR_PRODUCTO (M:N) ----
export const proveedor_producto = [
  { id: 1, id_proveedor: 4, id_producto: 1, codigo_proveedor: 'DMI-SOF-001', precio_compra: 12500.00, lead_time_days: 14, min_cantidad_pedido: 2, activo: true },
  { id: 2, id_proveedor: 4, id_producto: 5, codigo_proveedor: 'DMI-COM-001', precio_compra: 15000.00, lead_time_days: 14, min_cantidad_pedido: 1, activo: true },
  { id: 3, id_proveedor: 4, id_producto: 9, codigo_proveedor: 'DMI-CAM-001', precio_compra: 17000.00, lead_time_days: 21, min_cantidad_pedido: 1, activo: true },
];

// ---- MATERIAS PRIMAS ----
export const materias_primas = [
  { id_materia: 1, codigo: 'MP-001', nombre: 'Madera de Roble (tabla)', descripcion: 'Tabla de roble 2.5m x 30cm x 3cm', unidad_medida: 'tabla', precio_unitario: 850.00, proveedor_preferente: 1, creado_en: '2023-03-01T10:00:00', actualizado_en: '2024-01-01T10:00:00' },
  { id_materia: 2, codigo: 'MP-002', nombre: 'Tela Tapiz Premium (metro)', descripcion: 'Tela para tapizado en rollo de 1.5m de ancho', unidad_medida: 'metro', precio_unitario: 320.00, proveedor_preferente: 2, creado_en: '2023-03-01T10:00:00', actualizado_en: '2024-01-01T10:00:00' },
  { id_materia: 3, codigo: 'MP-003', nombre: 'Espuma Alta Densidad (plancha)', descripcion: 'Plancha de espuma HD 2m x 1m x 10cm', unidad_medida: 'plancha', precio_unitario: 450.00, proveedor_preferente: 2, creado_en: '2023-03-01T10:00:00', actualizado_en: '2024-01-01T10:00:00' },
  { id_materia: 4, codigo: 'MP-004', nombre: 'Herraje para cajón (juego)', descripcion: 'Juego de correderas telescópicas 45cm', unidad_medida: 'juego', precio_unitario: 180.00, proveedor_preferente: 3, creado_en: '2023-03-01T10:00:00', actualizado_en: '2024-01-01T10:00:00' },
  { id_materia: 5, codigo: 'MP-005', nombre: 'Barniz Mate (litro)', descripcion: 'Barniz mate para acabado de madera', unidad_medida: 'litro', precio_unitario: 280.00, proveedor_preferente: 1, creado_en: '2023-03-01T10:00:00', actualizado_en: '2024-01-01T10:00:00' },
];

// ---- INVENTARIO ----
export const inventario = [
  { id_inventario: 1, id_sucursal: 1, id_producto: 1, cantidad: 8, reservado: 2, stock_min: 3, stock_max: 15, ultimo_movimiento: '2024-03-15T10:00:00' },
  { id_inventario: 2, id_sucursal: 2, id_producto: 1, cantidad: 5, reservado: 1, stock_min: 2, stock_max: 10, ultimo_movimiento: '2024-03-14T10:00:00' },
  { id_inventario: 3, id_sucursal: 1, id_producto: 3, cantidad: 12, reservado: 0, stock_min: 4, stock_max: 20, ultimo_movimiento: '2024-03-13T10:00:00' },
  { id_inventario: 4, id_sucursal: 3, id_producto: 2, cantidad: 4, reservado: 1, stock_min: 2, stock_max: 8, ultimo_movimiento: '2024-03-12T10:00:00' },
  { id_inventario: 5, id_sucursal: 4, id_producto: 2, cantidad: 3, reservado: 0, stock_min: 1, stock_max: 6, ultimo_movimiento: '2024-03-11T10:00:00' },
  { id_inventario: 6, id_sucursal: 1, id_producto: 5, cantidad: 6, reservado: 1, stock_min: 2, stock_max: 10, ultimo_movimiento: '2024-03-10T10:00:00' },
  { id_inventario: 7, id_sucursal: 2, id_producto: 5, cantidad: 3, reservado: 0, stock_min: 1, stock_max: 6, ultimo_movimiento: '2024-03-09T10:00:00' },
  { id_inventario: 8, id_sucursal: 3, id_producto: 6, cantidad: 7, reservado: 2, stock_min: 3, stock_max: 12, ultimo_movimiento: '2024-03-08T10:00:00' },
  { id_inventario: 9, id_sucursal: 5, id_producto: 4, cantidad: 2, reservado: 0, stock_min: 2, stock_max: 8, ultimo_movimiento: '2024-03-07T10:00:00' },
  { id_inventario: 10, id_sucursal: 1, id_producto: 8, cantidad: 15, reservado: 0, stock_min: 5, stock_max: 25, ultimo_movimiento: '2024-03-06T10:00:00' },
  { id_inventario: 11, id_sucursal: 3, id_producto: 9, cantidad: 3, reservado: 1, stock_min: 1, stock_max: 6, ultimo_movimiento: '2024-03-05T10:00:00' },
  { id_inventario: 12, id_sucursal: 1, id_producto: 10, cantidad: 4, reservado: 0, stock_min: 2, stock_max: 8, ultimo_movimiento: '2024-03-04T10:00:00' },
  { id_inventario: 13, id_sucursal: 5, id_producto: 11, cantidad: 2, reservado: 1, stock_min: 1, stock_max: 5, ultimo_movimiento: '2024-03-03T10:00:00' },
  { id_inventario: 14, id_sucursal: 4, id_producto: 12, cantidad: 18, reservado: 0, stock_min: 8, stock_max: 30, ultimo_movimiento: '2024-03-02T10:00:00' },
  { id_inventario: 15, id_sucursal: 1, id_producto: 13, cantidad: 5, reservado: 1, stock_min: 2, stock_max: 8, ultimo_movimiento: '2024-03-01T10:00:00' },
  { id_inventario: 16, id_sucursal: 5, id_producto: 14, cantidad: 9, reservado: 0, stock_min: 4, stock_max: 15, ultimo_movimiento: '2024-02-28T10:00:00' },
  { id_inventario: 17, id_sucursal: 3, id_producto: 15, cantidad: 11, reservado: 2, stock_min: 5, stock_max: 20, ultimo_movimiento: '2024-02-27T10:00:00' },
  { id_inventario: 18, id_sucursal: 1, id_producto: 16, cantidad: 6, reservado: 0, stock_min: 3, stock_max: 10, ultimo_movimiento: '2024-02-26T10:00:00' },
  { id_inventario: 19, id_sucursal: 5, id_producto: 17, cantidad: 7, reservado: 1, stock_min: 3, stock_max: 12, ultimo_movimiento: '2024-02-25T10:00:00' },
  { id_inventario: 20, id_sucursal: 4, id_producto: 18, cantidad: 4, reservado: 0, stock_min: 2, stock_max: 8, ultimo_movimiento: '2024-02-24T10:00:00' },
  { id_inventario: 21, id_sucursal: 1, id_producto: 19, cantidad: 14, reservado: 0, stock_min: 5, stock_max: 20, ultimo_movimiento: '2024-02-23T10:00:00' },
  { id_inventario: 22, id_sucursal: 5, id_producto: 20, cantidad: 20, reservado: 3, stock_min: 8, stock_max: 30, ultimo_movimiento: '2024-02-22T10:00:00' },
];

// ---- DIRECCIONES ENVIO ----
export const direcciones_envio = [
  { id_direccion: 1, id_cliente: 5, calle_numero: 'Calle Hidalgo 456', id_municipio: 1, referencias: 'Entre López Cotilla y Madero, portón azul' },
  { id_direccion: 2, id_cliente: 5, calle_numero: 'Av. México 1234', id_municipio: 2, referencias: 'Plaza del Sol, entrada por Mariano Otero' },
  { id_direccion: 3, id_cliente: 6, calle_numero: 'Av. Garza Sada 789', id_municipio: 3, referencias: 'Frente al Tecnológico de Monterrey' },
  { id_direccion: 4, id_cliente: 7, calle_numero: 'Calle Ámsterdam 321', id_municipio: 5, referencias: 'Colonia Condesa, cerca del parque' },
  { id_direccion: 5, id_cliente: 7, calle_numero: 'Insurgentes Sur 1500', id_municipio: 6, referencias: 'Torre corporativa, piso 3' },
];

// ---- PEDIDOS ----
export const pedidos = [
  { id_pedido: 1, id_cliente: 5, id_direccion: 1, fecha_pedido: '2024-02-01T14:30:00', tipo_entrega: 'domicilio', id_sucursal_origen: 1, estado_pedido: 'entregado', total: 18500.00 },
  { id_pedido: 2, id_cliente: 6, id_direccion: 3, fecha_pedido: '2024-02-10T10:00:00', tipo_entrega: 'domicilio', id_sucursal_origen: 3, estado_pedido: 'entregado', total: 32900.00 },
  { id_pedido: 3, id_cliente: 7, id_direccion: 4, fecha_pedido: '2024-02-15T16:45:00', tipo_entrega: 'sucursal', id_sucursal_origen: 5, estado_pedido: 'entregado', total: 15600.00 },
  { id_pedido: 4, id_cliente: 5, id_direccion: 2, fecha_pedido: '2024-03-01T11:00:00', tipo_entrega: 'domicilio', id_sucursal_origen: 1, estado_pedido: 'enviado', total: 22400.00 },
  { id_pedido: 5, id_cliente: 7, id_direccion: 5, fecha_pedido: '2024-03-05T09:30:00', tipo_entrega: 'domicilio', id_sucursal_origen: 5, estado_pedido: 'en_proceso', total: 21500.00 },
  { id_pedido: 6, id_cliente: 6, id_direccion: 3, fecha_pedido: '2024-03-10T13:15:00', tipo_entrega: 'sucursal', id_sucursal_origen: 3, estado_pedido: 'pendiente', total: 8900.00 },
  { id_pedido: 7, id_cliente: 5, id_direccion: 1, fecha_pedido: '2024-03-12T15:00:00', tipo_entrega: 'domicilio', id_sucursal_origen: 1, estado_pedido: 'confirmado', total: 12800.00 },
  { id_pedido: 8, id_cliente: 7, id_direccion: 4, fecha_pedido: '2024-03-15T17:20:00', tipo_entrega: 'domicilio', id_sucursal_origen: 5, estado_pedido: 'pendiente', total: 6800.00 },
];

// ---- METODOS DE PAGO ----
export const metodos_pago = [
  { id_metodo: 1, tipo_pago: 'Tarjeta de Crédito', detalles_pago: { ultimos_4: '4532', marca: 'Visa' }, estado_pago: 'completado' },
  { id_metodo: 2, tipo_pago: 'Transferencia Bancaria', detalles_pago: { banco: 'BBVA', referencia: 'REF-2024-001' }, estado_pago: 'completado' },
  { id_metodo: 3, tipo_pago: 'Contra Entrega', detalles_pago: { nota: 'Pago en efectivo al recibir' }, estado_pago: 'pendiente' },
  { id_metodo: 4, tipo_pago: 'Tarjeta de Débito', detalles_pago: { ultimos_4: '8901', marca: 'Mastercard' }, estado_pago: 'completado' },
];

// ---- CUPONES ----
export const cupones = [
  { id_cupon: 1, codigo: 'BIENVENIDO10', descuento_porcentaje: 10, fecha_expiracion: '2024-12-31', activo: true },
  { id_cupon: 2, codigo: 'VERANO15', descuento_porcentaje: 15, fecha_expiracion: '2024-08-31', activo: true },
  { id_cupon: 3, codigo: 'NAVIDAD20', descuento_porcentaje: 20, fecha_expiracion: '2024-12-25', activo: false },
];

// ---- VENTAS ----
export const ventas = [
  { id_venta: 1, id_pedido: 1, id_cliente: 5, id_metodo_pago: 1, id_cupon: null, id_vendedor: 8, fecha_venta: '2024-02-01T14:35:00', sub_total: 18500.00, descuento: 0, total_venta: 18500.00, comision: 925.00, estado_venta: 'completada' },
  { id_venta: 2, id_pedido: 2, id_cliente: 6, id_metodo_pago: 2, id_cupon: 1, id_vendedor: 9, fecha_venta: '2024-02-10T10:05:00', sub_total: 32900.00, descuento: 3290.00, total_venta: 29610.00, comision: 1332.45, estado_venta: 'completada' },
  { id_venta: 3, id_pedido: 3, id_cliente: 7, id_metodo_pago: 4, id_cupon: null, id_vendedor: null, fecha_venta: '2024-02-15T16:50:00', sub_total: 15600.00, descuento: 0, total_venta: 15600.00, comision: 0, estado_venta: 'completada' },
  { id_venta: 4, id_pedido: 4, id_cliente: 5, id_metodo_pago: 1, id_cupon: null, id_vendedor: 8, fecha_venta: '2024-03-01T11:05:00', sub_total: 22400.00, descuento: 0, total_venta: 22400.00, comision: 1120.00, estado_venta: 'completada' },
  { id_venta: 5, id_pedido: 5, id_cliente: 7, id_metodo_pago: 2, id_cupon: 2, id_vendedor: null, fecha_venta: '2024-03-05T09:35:00', sub_total: 21500.00, descuento: 3225.00, total_venta: 18275.00, comision: 0, estado_venta: 'en_proceso' },
  { id_venta: 6, id_pedido: 6, id_cliente: 6, id_metodo_pago: 3, id_cupon: null, id_vendedor: 9, fecha_venta: '2024-03-10T13:20:00', sub_total: 8900.00, descuento: 0, total_venta: 8900.00, comision: 400.50, estado_venta: 'pendiente' },
];

// ---- DETALLE VENTA ----
export const detalle_venta = [
  { id_detalle_venta: 1, id_venta: 1, id_producto: 1, cantidad: 1, precio_unitario: 18500.00, subtotal: 18500.00 },
  { id_detalle_venta: 2, id_venta: 2, id_producto: 2, cantidad: 1, precio_unitario: 32900.00, subtotal: 32900.00 },
  { id_detalle_venta: 3, id_venta: 3, id_producto: 4, cantidad: 1, precio_unitario: 15600.00, subtotal: 15600.00 },
  { id_detalle_venta: 4, id_venta: 4, id_producto: 5, cantidad: 1, precio_unitario: 22400.00, subtotal: 22400.00 },
  { id_detalle_venta: 5, id_venta: 5, id_producto: 11, cantidad: 1, precio_unitario: 21500.00, subtotal: 21500.00 },
  { id_detalle_venta: 6, id_venta: 6, id_producto: 15, cantidad: 1, precio_unitario: 8900.00, subtotal: 8900.00 },
];

// ---- PAQUETERIAS ----
export const paqueterias = [
  { id_paqueteria: 1, nombre: 'MuebleExpress', telefono: '800-123-4567', url_tracking: 'https://tracking.muebleexpress.com/', tiempo_promedio_entrega_days: 5 },
  { id_paqueteria: 2, nombre: 'EnvíoSeguro MX', telefono: '800-765-4321', url_tracking: 'https://envioseguromx.com/rastreo/', tiempo_promedio_entrega_days: 7 },
  { id_paqueteria: 3, nombre: 'LogísticaPlus', telefono: '800-999-8888', url_tracking: 'https://logisticaplus.mx/track/', tiempo_promedio_entrega_days: 4 },
];

// ---- ENVIOS ----
export const envios = [
  { id_envio: 1, id_venta: 1, id_paqueteria: 1, id_direccion: 1, fecha_envio: '2024-02-02T09:00:00', fecha_entrega_estimada: '2024-02-07', fecha_entrega_real: '2024-02-06', estado_envio: 'entregado', tracking_number: 'MEX-2024-00001', costo_envio: 850.00, seguro: true, nota: 'Entregado en puerta' },
  { id_envio: 2, id_venta: 2, id_paqueteria: 2, id_direccion: 3, fecha_envio: '2024-02-11T08:30:00', fecha_entrega_estimada: '2024-02-18', fecha_entrega_real: '2024-02-17', estado_envio: 'entregado', tracking_number: 'ESM-2024-00015', costo_envio: 1200.00, seguro: true, nota: 'Recibido por el cliente' },
  { id_envio: 3, id_venta: 4, id_paqueteria: 3, id_direccion: 2, fecha_envio: '2024-03-02T10:00:00', fecha_entrega_estimada: '2024-03-06', fecha_entrega_real: null, estado_envio: 'en_transito', tracking_number: 'LP-2024-00042', costo_envio: 950.00, seguro: true, nota: 'En camino a Zapopan' },
  { id_envio: 4, id_venta: 5, id_paqueteria: 1, id_direccion: 5, fecha_envio: null, fecha_entrega_estimada: '2024-03-12', fecha_entrega_real: null, estado_envio: 'preparando', tracking_number: null, costo_envio: 1100.00, seguro: false, nota: 'Pendiente de recolección' },
];

// ---- ORDENES DE COMPRA ----
export const ordenes_compra = [
  { id_orden: 1, id_proveedor: 1, id_sucursal: 1, fecha_orden: '2024-02-20T10:00:00', fecha_recepcion_esperada: '2024-02-27', estado: 'recibida', total: 12750.00, creado_por: 8 },
  { id_orden: 2, id_proveedor: 2, id_sucursal: 3, fecha_orden: '2024-03-01T10:00:00', fecha_recepcion_esperada: '2024-03-06', estado: 'en_transito', total: 8400.00, creado_por: 9 },
  { id_orden: 3, id_proveedor: 3, id_sucursal: 1, fecha_orden: '2024-03-10T10:00:00', fecha_recepcion_esperada: '2024-03-13', estado: 'pendiente', total: 3600.00, creado_por: 8 },
  { id_orden: 4, id_proveedor: 4, id_sucursal: 5, fecha_orden: '2024-03-12T10:00:00', fecha_recepcion_esperada: '2024-03-26', estado: 'aprobada', total: 45000.00, creado_por: 11 },
];

// ---- DETALLE ORDEN COMPRA ----
export const detalle_orden_compra = [
  { id_detalle: 1, id_orden: 1, id_producto: null, id_materia: 1, cantidad: 15, precio_unitario: 850.00, subtotal: 12750.00 },
  { id_detalle: 2, id_orden: 2, id_producto: null, id_materia: 2, cantidad: 20, precio_unitario: 320.00, subtotal: 6400.00 },
  { id_detalle: 3, id_orden: 2, id_producto: null, id_materia: 3, cantidad: 4, precio_unitario: 500.00, subtotal: 2000.00 },
  { id_detalle: 4, id_orden: 3, id_producto: null, id_materia: 4, cantidad: 20, precio_unitario: 180.00, subtotal: 3600.00 },
  { id_detalle: 5, id_orden: 4, id_producto: 9, id_materia: null, cantidad: 2, precio_unitario: 17000.00, subtotal: 34000.00 },
  { id_detalle: 6, id_orden: 4, id_producto: 15, id_materia: null, cantidad: 2, precio_unitario: 5500.00, subtotal: 11000.00 },
];

// ---- ORDEN PRODUCCION ----
export const ordenes_produccion = [
  { id_produccion: 1, id_producto: 1, id_sucursal: 1, cantidad_planificada: 5, fecha_programada: '2024-03-20', fecha_inicio: '2024-03-18T08:00:00', fecha_fin: null, estado: 'en_proceso', creado_por: 8, notas: 'Producción regular de sofás Milán' },
  { id_produccion: 2, id_producto: 5, id_sucursal: 1, cantidad_planificada: 3, fecha_programada: '2024-03-25', fecha_inicio: null, fecha_fin: null, estado: 'pendiente', creado_por: 8, notas: 'Mesas de comedor bajo pedido' },
  { id_produccion: 3, id_producto: 13, id_sucursal: 1, cantidad_planificada: 4, fecha_programada: '2024-03-15', fecha_inicio: '2024-03-14T08:00:00', fecha_fin: '2024-03-17T16:00:00', estado: 'completada', creado_por: 10, notas: 'Escritorios para stock' },
];

// ---- TRANSFERENCIAS ENTRE SUCURSALES ----
export const transferencias = [
  { id_transferencia: 1, id_sucursal_origen: 1, id_sucursal_destino: 2, fecha_transferencia: '2024-03-05T10:00:00', estado: 'completada', creado_por: 8 },
  { id_transferencia: 2, id_sucursal_origen: 3, id_sucursal_destino: 4, fecha_transferencia: '2024-03-10T10:00:00', estado: 'en_transito', creado_por: 9 },
];

// ---- REGISTRO COMISIONES ----
export const registro_comisiones = [
  { id_comision: 1, id_venta: 1, id_vendedor: 8, porcentaje: 5.0, monto: 925.00, fecha: '2024-02-01T14:35:00', pagada: true },
  { id_comision: 2, id_venta: 2, id_vendedor: 9, porcentaje: 4.5, monto: 1332.45, fecha: '2024-02-10T10:05:00', pagada: true },
  { id_comision: 3, id_venta: 4, id_vendedor: 8, porcentaje: 5.0, monto: 1120.00, fecha: '2024-03-01T11:05:00', pagada: false },
  { id_comision: 4, id_venta: 6, id_vendedor: 9, porcentaje: 4.5, monto: 400.50, fecha: '2024-03-10T13:20:00', pagada: false },
];

// ---- MOVIMIENTOS INVENTARIO ----
export const movimientos_inventario = [
  { id_movimiento: 1, id_sucursal: 1, id_producto: 1, tipo: 'entrada', cantidad: 10, fecha: '2024-02-20T10:00:00', referencia_tipo: 'orden_compra', referencia_id: 1, id_usuario: 8, nota: 'Recepción de orden de compra' },
  { id_movimiento: 2, id_sucursal: 1, id_producto: 1, tipo: 'salida', cantidad: 1, fecha: '2024-02-01T14:35:00', referencia_tipo: 'venta', referencia_id: 1, id_usuario: 8, nota: 'Venta a cliente' },
  { id_movimiento: 3, id_sucursal: 1, id_producto: 1, tipo: 'transferencia', cantidad: 3, fecha: '2024-03-05T10:00:00', referencia_tipo: 'transferencia', referencia_id: 1, id_usuario: 8, nota: 'Transferencia a Sucursal Zapopan' },
  { id_movimiento: 4, id_sucursal: 3, id_producto: 2, tipo: 'entrada', cantidad: 6, fecha: '2024-01-15T10:00:00', referencia_tipo: 'produccion', referencia_id: null, id_usuario: 9, nota: 'Producción completada' },
  { id_movimiento: 5, id_sucursal: 3, id_producto: 2, tipo: 'salida', cantidad: 1, fecha: '2024-02-10T10:05:00', referencia_tipo: 'venta', referencia_id: 2, id_usuario: 9, nota: 'Venta a cliente' },
];

// ---- RESERVAS DE STOCK ----
export const reservas_stock = [
  { id_reserva: 1, id_pedido: 4, id_producto: 5, cantidad: 1, fecha_reserva: '2024-03-01T11:00:00', fecha_expira: '2024-03-08T11:00:00' },
  { id_reserva: 2, id_pedido: 5, id_producto: 11, cantidad: 1, fecha_reserva: '2024-03-05T09:30:00', fecha_expira: '2024-03-12T09:30:00' },
  { id_reserva: 3, id_pedido: 7, id_producto: 3, cantidad: 1, fecha_reserva: '2024-03-12T15:00:00', fecha_expira: '2024-03-19T15:00:00' },
];

// ============================================================
// HELPER FUNCTIONS (mock "queries")
// ============================================================

export const getProductoById = (id) => productos.find(p => p.id_producto === id);
export const getMuebleriaById = (id) => mueblerias.find(m => m.id_muebleria === id);
export const getSucursalById = (id) => sucursales.find(s => s.id_sucursal === id);
export const getUsuarioById = (id) => usuarios.find(u => u.id_usuario === id);
export const getProveedorById = (id) => proveedores.find(p => p.id_proveedor === id);
export const getMunicipioById = (id) => municipios.find(m => m.id_municipio === id);
export const getEstadoById = (id) => estados.find(e => e.id_estado === id);
export const getRolById = (id) => roles.find(r => r.id_rol === id);
export const getPaqueteriaById = (id) => paqueterias.find(p => p.id_paqueteria === id);

export const getProductosByMuebleria = (muebleriaId) => productos.filter(p => p.id_muebleria === muebleriaId);
export const getSucursalesByMuebleria = (muebleriaId) => sucursales.filter(s => s.id_muebleria === muebleriaId);
export const getEmpleadosBySucursal = (sucursalId) => empleados.filter(e => e.id_sucursal === sucursalId);
export const getInventarioBySucursal = (sucursalId) => inventario.filter(i => i.id_sucursal === sucursalId);
export const getInventarioByProducto = (productoId) => inventario.filter(i => i.id_producto === productoId);
export const getPedidosByCliente = (clienteId) => pedidos.filter(p => p.id_cliente === clienteId);
export const getVentaByPedido = (pedidoId) => ventas.find(v => v.id_pedido === pedidoId);
export const getDetalleVentaByVenta = (ventaId) => detalle_venta.filter(d => d.id_venta === ventaId);
export const getEnvioByVenta = (ventaId) => envios.find(e => e.id_venta === ventaId);
export const getDireccionesByCliente = (clienteId) => direcciones_envio.filter(d => d.id_cliente === clienteId);
export const getComisionesByVendedor = (vendedorId) => registro_comisiones.filter(c => c.id_vendedor === vendedorId);

export const getUbicacionCompleta = (municipioId) => {
  const mun = getMunicipioById(municipioId);
  if (!mun) return '';
  const est = getEstadoById(mun.id_estado);
  return `${mun.nombre}, ${est?.nombre || ''}`;
};

export const getStockTotal = (productoId) => {
  return inventario
    .filter(i => i.id_producto === productoId)
    .reduce((acc, i) => acc + (i.cantidad - i.reservado), 0);
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price);
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const formatDateTime = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};
