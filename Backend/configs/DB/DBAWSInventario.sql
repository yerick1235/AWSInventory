Create Database if not exists DBAWSInventario;
Use DBAWSInventario;

Create Table Servidores(
	servidorId int not null auto_increment,unidad varchar(255),herramienta varchar(255),
    administrador varchar(255),proveedor varchar(255),correo varchar(255),
    metodoPago varchar(255),idLogin varchar(255),credencial varchar(255),
    tipoServicio varchar(255),nombreServicio varchar(255),region varchar(255),
    tipoInstancia varchar(255),ipPublica varchar(255),vpc varchar(255),
    securityGroup varchar(255),sistemaOperativo varchar(255),clavePEM varchar(255),
    costoMensual varchar(255),costoAnual varchar(255),observaciones varchar(255),
    otros varchar(255),serverBackup varchar(255),cliente varchar(255),
    agencia varchar(255), cierre varchar(20), primary key pk_servidorId(servidorId)
);

Create Table Usuarios(
	userId int not null auto_increment,
    correo varchar (100) not null,
    contrasena varchar (255) not null,
    rol enum('ADMIN','USER'),
    unique (correo),
    primary key pk_userId(userId)
);

-- Agregar Servidor --
Delimiter $$
	Create Procedure sp_agregarServidor(
		in unidad varchar(255),in herramienta varchar(255),
		in administrador varchar(255),in proveedor varchar(255),in correo varchar(255),
		in metodoPago varchar(255),in idLogin varchar(255),in credencial varchar(255),
		in tipoServicio varchar(255),in nombreServicio varchar(255),in region varchar(255),
		in tipoInstancia varchar(255),in ipPublica varchar(255),in vpc varchar(255),
		in securityGroup varchar(255),in sistemaOperativo varchar(255),in clavePEM varchar(255),
		in costoMensual varchar(255),in costoAnual varchar(255),in observaciones varchar(255),
		in otros varchar(255),in serverBackup varchar(255),
        in cliente varchar(255), in agencia varchar(255), in cierre varchar(20)
    )
    Begin
		Insert Into Servidores(
			unidad,herramienta,administrador,
            proveedor,correo,metodoPago,
            idLogin,credencial,tipoServicio,
            nombreServicio,region,tipoInstancia,
            ipPublica,vpc,securityGroup,
            sistemaOperativo,clavePEM,costoMensual,
            costoAnual,observaciones,otros,
            serverBackup,cliente,agencia,cierre
        )values(
			unidad,herramienta,administrador,
            proveedor,correo,metodoPago,
            idLogin,credencial,tipoServicio,
            nombreServicio,region,tipoInstancia,
            ipPublica,vpc,securityGroup,
            sistemaOperativo,clavePEM,costoMensual,
            costoAnual,observaciones,otros,
            serverBackup,cliente,agencia,cierre
        );
    End$$
Delimiter ;

-- Listar Servidores --
Delimiter $$
	Create Procedure sp_listarServidores()
    Begin
		Select 
			servidorId,unidad,herramienta,administrador,
            proveedor,correo,metodoPago,
            idLogin,credencial,tipoServicio,
            nombreServicio,region,tipoInstancia,
            ipPublica,vpc,securityGroup,
            sistemaOperativo,clavePEM,costoMensual,
            costoAnual,observaciones,otros,
            serverBackup,cliente,agencia,cierre
        From Servidores S;
    End$$
Delimiter ;

-- Actualizar Servidor --
Delimiter $$
	Create Procedure sp_actualizarServidor(
		in p_servidorId int,in p_unidad varchar(255),in p_herramienta varchar(255),
		in p_administrador varchar(255),in p_proveedor varchar(255),in p_correo varchar(255),
		in p_metodoPago varchar(255),in p_idLogin varchar(255),in p_credencial varchar(255),
		in p_tipoServicio varchar(255),in p_nombreServicio varchar(255),in p_region varchar(255),
		in p_tipoInstancia varchar(255),in p_ipPublica varchar(255),in p_vpc varchar(255),
		in p_securityGroup varchar(255),in p_sistemaOperativo varchar(255),in p_clavePEM varchar(255),
		in p_costoMensual varchar(255),in p_costoAnual varchar(255),in p_observaciones varchar(255),
		in p_otros varchar(255),in p_serverBackup varchar(255),in p_cliente varchar(255), in p_agencia varchar(255), in p_cierre varchar(20)
    )
    Begin
		Update Servidores S set
         S.unidad = p_unidad,
         S.herramienta = p_herramienta,
         S.administrador = p_administrador,
         S.proveedor = p_proveedor,
         S.correo = p_correo,
         S.metodoPago = p_metodoPago,
         S.idLogin = p_idLogin,
         S.credencial = p_credencial,
         S.tipoServicio = p_tipoServicio,
         S.nombreServicio = p_nombreServicio,
         S.region = p_region,
         S.tipoInstancia = p_tipoInstancia,
         S.ipPublica = p_ipPublica,
         S.vpc = p_vpc,
         S.securityGroup = p_securityGroup,
         S.sistemaOperativo = p_sistemaOperativo,
         S.clavePEM = p_clavePEM,
         S.costoMensual = p_costoMensual,
         S.costoAnual = p_costoAnual,
         S.observaciones = p_observaciones,
         S.otros = p_otros,
         S.serverBackup =  p_serverBackup,
         S.cliente = p_cliente,
         S.agencia = p_agencia,
         S.cierre = p_cierre
         Where servidorId = p_servidorId;
    End$$
Delimiter ;

-- Eliminar Servidor --
Delimiter $$
	Create Procedure sp_eliminarServidor(in p_servidorId int)
		Begin
			Delete from Servidores Where servidorId = p_servidorId;
        End$$
Delimiter ;

-- Listar Servidor por ID --
Delimiter $$
	Create Procedure sp_listarPorId(in p_servidorId int)
		Begin
			Select
			servidorId,unidad,herramienta,administrador,
            proveedor,correo,metodoPago,
            idLogin,credencial,tipoServicio,
            nombreServicio,region,tipoInstancia,
            ipPublica,vpc,securityGroup,
            sistemaOperativo,clavePEM,costoMensual,
            costoAnual,observaciones,otros,
            serverBackup,cliente,agencia,cierre
            From Servidores S Where servidorId = p_servidorId;
        End$$
Delimiter ;

-- Listar Servidores por Fecha --
Delimiter $$
	Create Procedure sp_listServerDate(in p_cierre varchar(20))
    Begin
		Select
		servidorId,unidad,herramienta,administrador,
		proveedor,correo,metodoPago,
		idLogin,credencial,tipoServicio,
		nombreServicio,region,tipoInstancia,
		ipPublica,vpc,securityGroup,
		sistemaOperativo,clavePEM,costoMensual,
		costoAnual,observaciones,otros,
		serverBackup,cliente,agencia,cierre
		From Servidores S Where cierre = p_cierre;
	End$$
Delimiter ;

-- Registrar Usuarios --
Delimiter $$
	Create Procedure sp_regist(in correo varchar(100), in contrasena varchar(255), in rol enum('ADMIN','USER'))
    Begin
		Insert Into Usuarios(correo, contrasena, rol)
			values(correo, contrasena, rol);
    End$$
Delimiter ;

-- Listar Usuarios--
Delimiter $$
	Create Procedure sp_listUsers()
    Begin
		Select
			userId,
			correo,
            rol
		From Usuarios U;
    End $$
Delimiter ;

-- Actualizar Usuarios --
Delimiter $$
	Create Procedure sp_updateUser(in p_userId int, in p_rol enum('ADMIN','USER'), in p_contrasena varchar(255))
    Begin
		Update Usuarios U set
        U.rol = p_rol,
        U.contrasena = p_contrasena
        where userId = p_userId;
    End$$
Delimiter ;

-- Eliminar Usuario --
Delimiter $$
	Create Procedure sp_deleteUser(in p_userId int)
    Begin
		Delete From Usuarios where userId = p_userId;
    End$$
Delimiter ;

-- Buscar Usuario por ID --
Delimiter $$
	Create Procedure sp_listById(in p_userId int)
    Begin
		Select 
			userId, correo, rol
        From Usuarios U where userId = p_userId;
    End$$
Delimiter ;

/*
select userId, correo from Usuarios U where userId = 2 and rol = 'ADMIN';
select * from Usuarios U where correo = 'lolo@gmail.com';

select * from usuarios;

call sp_listUsers();
call sp_regist('lololo@gmail.com','12345','ADMIN');
call sp_updateUser(26,'USER', '54321');
call sp_deleteUser(5);
call sp_listById(1);

call sp_agregarServidor('1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','2024-09-03');
call sp_actualizarServidor(3,null,null,1,1,1,1,1,1,1,1,1,'','','','','','','','','','','','','','');
call sp_eliminarServidor(172);
call sp_listarServidores();
call sp_listarPorId(3);
call sp_listServerDate('2024-09-25');
delete from Servidores;
SET SQL_SAFE_UPDATES = 0;

select clavePEM from servidores where servidorId = 29;

select correo, rol from usuarios where rol = 'ADMIN' and userId != 1;*/
