USE OthelloTEC
CREATE TABLE Usuarios 
(
	ID				INT IDENTITY,
	Correo			VARCHAR (200)	NOT NULL	UNIQUE,
	Nickname		VARCHAR(50)		NOT NULL	UNIQUE,
	Contrasenia		VARCHAR(50)		NOT NULL,
	NivelExp		FLOAT			NOT NULL	DEFAULT 0,

	CONSTRAINT PK_Usuarios_ID PRIMARY KEY CLUSTERED (ID)
);

CREATE TABLE SesionesJuego 
(
	ID					INT IDENTITY,
	Estado				INT				NOT NULL	DEFAULT 0, -- estado de la partida(0 pendiente, 1 fin)
	NumPartidas			INT				NOT NULL, -- numero de partidas
	N_Tablero			INT				NOT NULL, -- tamanio del tablero
	NivelDificultad		INT,					  -- facil, medio, dificil un # para cada uno
	TipoPartida			INT				NOT NULL, -- tipo de partidas (vsUsuario, vsPC, PCvsPC)
	
	CONSTRAINT PK_SesionesJuego_ID PRIMARY KEY CLUSTERED (ID)
);

CREATE TABLE Usuarios_SesionJuego 
(
	ID_SJ				INT,
	ID_Usuario			INT,
	ColorFicha			VARCHAR(10)		NOT NULL,
	
	CONSTRAINT FK_Usuarios_SesionJuego_ID_Usuario FOREIGN KEY (ID_Usuario) 
		REFERENCES	dbo.Usuarios (ID) ON DELETE CASCADE ON UPDATE CASCADE,

	CONSTRAINT FK_Usuarios_SesionJuego_ID_SJ FOREIGN KEY (ID_SJ) 
		REFERENCES	dbo.SesionesJuego (ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Partidas 
(
	ID					INT IDENTITY,
	ID_SJ				INT,
	PuntosP1			INT				NOT NULL	DEFAULT 0,
	PuntosP2			INT				NOT NULL	DEFAULT 0,
	Turno				INT				NOT NULL	DEFAULT 0,
	EstadoPartida		INT				NOT NULL	DEFAULT 0,
	MatrizJuego			VARCHAR(8000)	NOT NULL,
	
	CONSTRAINT PK_Partidas_ID PRIMARY KEY CLUSTERED (ID),

	CONSTRAINT FK_Partidas_ID_SJ	FOREIGN KEY (ID_SJ) 
		REFERENCES	dbo.SesionesJuego (ID) ON DELETE CASCADE ON UPDATE CASCADE
);


----------------------------------------------
--			USUARIOS
----------------------------------------------
USE OthelloTEC
GO
CREATE PROCEDURE dbo.insertUsuario -- para primer vez que se logea
	@Correo				VARCHAR(200),
	@Contrasena			VARCHAR(50),
	@Nickname			VARCHAR(50),
	@success			BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Usuarios AS U WHERE U.Correo = @Correo) = 1) -- ya existe el correo
			BEGIN
				SET @success = 0 -- error
				SELECT @success
			END;
		ELSE
			BEGIN
				INSERT INTO dbo.Usuarios (Correo, Contrasenia, Nickname) VALUES (@Correo,@Contrasena,@Nickname);
				SET @success = 1 -- exito
				SELECT @success
			END;			
	END;
GO

CREATE PROCEDURE dbo.existeUsuario -- verifica que un correo exista en la base de datos
	@Correo				VARCHAR(200),
	@success			BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Usuarios AS U WHERE U.Correo = @Correo) = 1) -- ya existe el usuario
			BEGIN
				SET @success = 1 -- exito
				SELECT @success 
			END;
		ELSE
			BEGIN			
				SET @success = 0 -- error
				SELECT @success
			END;			
	END;
GO
-- para el login
CREATE PROCEDURE dbo.selectUsuario -- para logearse despues y retornar toda la info
	@Correo				VARCHAR(200),
	@Contrasenia		VARCHAR(50),
	@success			BIT		OUTPUT
AS 
	BEGIN
		IF((SELECT COUNT(*) FROM dbo.Usuarios AS Us WHERE Us.Correo = @Correo AND Us.Contrasenia = @Contrasenia) = 1) -- correo y contrasenia coinciden
			BEGIN			
				SET @success = 1 -- exito			
				SELECT @success, * FROM Usuarios AS U WHERE U.Correo = @Correo;
			END;
		ELSE
			BEGIN			
				SET @success = 0 -- error
				SELECT @success
			END;
	END;
GO

----------------------------------------------
--		    Usuarios_SesionJuego
----------------------------------------------
USE OthelloTEC
GO
CREATE PROCEDURE insertUsuario_SesionJuego -- LISTO
	@Correo VARCHAR(50),			
	@ID_SesionJuego		INT,
	@ColorFicha			VARCHAR(10),
	@success			BIT		OUTPUT
AS 
	BEGIN
		DECLARE @ID_Usuario INT;
		SET @ID_Usuario=(SELECT ID FROM Usuarios WHERE Correo=@Correo);
		IF ((SELECT COUNT(*) FROM dbo.Usuarios_SesionJuego AS US WHERE US.ID_Usuario != @ID_Usuario AND US.ID_SJ = @ID_SesionJuego and US.ColorFicha!=@ColorFicha) = 1) -- Existe solo el creador de la sesion
			BEGIN
				INSERT INTO dbo.Usuarios_SesionJuego (ID_Usuario,ID_SJ,ColorFicha) VALUES (@ID_Usuario,@ID_SesionJuego,@ColorFicha);
				UPDATE SesionesJuego SET Estado=1 where ID=@ID_SesionJuego;
				SET @success = 1 -- exito
				SELECT @success
			END;	
		ELSE
			BEGIN
				SET @success = 0 -- error
				SELECT @success
			END;		
	END;
GO

----------------------------------------------
--				SesionJuego
----------------------------------------------
USE OthelloTEC
GO
CREATE PROCEDURE insertSesionJuego -- LISTO
	@NumPartidas		INT,
	@N_Tablero			INT,
	@NivelDificultad	INT,
	@TipoPartida		INT,
	@IdUsuario VARCHAR(200),
	@colorFicha VARCHAR(200),
	@success			BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.SesionesJuego AS SJ WHERE SJ.NumPartidas = @NumPartidas AND 
																SJ.N_Tablero = @N_Tablero  AND 
																SJ.NivelDificultad = @NivelDificultad AND SJ.TipoPartida = @TipoPartida) = 1) -- ya existe el registro
			BEGIN
				SET @success = 0 -- error
				SELECT @success
			END;
		ELSE
			BEGIN
				INSERT INTO dbo.SesionesJuego(NumPartidas,N_Tablero,NivelDificultad,TipoPartida) VALUES (@NumPartidas,@N_Tablero,@NivelDificultad,@TipoPartida);
				DECLARE @IDS INT;
				SET @IDS =(SELECT SCOPE_IDENTITY());
				DECLARE @IDU INT;
				SET @IDU=(SELECT ID from Usuarios where Correo=@IdUsuario);
				INSERT INTO dbo.Usuarios_SesionJuego (ID_SJ,ID_Usuario,ColorFicha) VALUES (@IDS,@IDU,@colorFicha);
				SET @success = 1 -- exito
				SELECT @success
			END;			
	END;
GO

----------------------------------------------
--				Partidas
----------------------------------------------
USE OthelloTEC
GO
CREATE PROCEDURE insertPartidas -- LISTO
	@ID_SJ				INT,
	@MatrizJuego		VARCHAR(8000),
	@success			BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Partidas AS P WHERE P.ID_SJ = @ID_SJ AND P.MatrizJuego = @MatrizJuego) = 1) -- ya existe la partida
			BEGIN
				SET @success = 0 -- error
				SELECT @success
			END;
		ELSE
			BEGIN
				INSERT INTO Partidas (ID_SJ, MatrizJuego) VALUES (@ID_SJ, @MatrizJuego);
				SET @success = 1 -- exito
				SELECT @success
			END;			
	END;
GO

CREATE PROCEDURE selectPartida -- LISTO
	@ID_Partida			INT,
	@success			BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Partidas AS P WHERE P.ID = @ID_Partida )= 1) -- existe la partida
			BEGIN	
				SET @success = 1 			
				SELECT @success, * FROM Partidas WHERE ID = @ID_Partida;
			END;
		ELSE
			BEGIN
				SET @success = 0 -- error
				SELECT @success
			END;			
	END;
GO

CREATE PROCEDURE selectPartidasDisponibles -- LISTO
	@success			BIT		OUTPUT
AS 
	BEGIN
		SET @success = 0 -- error
		SELECT @success, * FROM Partidas WHERE EstadoPartida = 1 -- pausa		
	END;
GO

CREATE PROCEDURE editPartida -- LISTO
	@ID					INT,
	@Turno				INT,
	@EstadoPartida		INT,
	@ID_SJ				INT,
	@Puntos_P1			INT,
	@Puntos_P2			INT,
	@MatrizJuego		VARCHAR(8000),
	@success			BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM Partidas AS P WHERE P.ID = @ID) = 1) -- existe la partida
			BEGIN
				UPDATE dbo.Partidas 
				SET ID_SJ = ID_SJ,
				Turno = @Turno,
				EstadoPartida = @EstadoPartida,
				PuntosP1 = @Puntos_P1,
				PuntosP2 = @Puntos_P2,
				MatrizJuego = @MatrizJuego
				WHERE ID = @ID;
				SET @success = 0 -- exito
				SELECT @success
			END;
		ELSE
			BEGIN
				SET @success = 0 -- error
				SELECT @success
			END;			
	END;
GO




SELECT us.ID,us.Correo,us.Nickname,temp.ID_SJ,temp.N_Tablero,temp.NivelDificultad,temp.TipoPartida,temp.NumPartidas FROM Usuarios as us inner join 
(SELECT * FROM SesionesJuego  as sj inner join Usuarios_SesionJuego as u on  sj.Estado = 0 and u.ID_SJ=sj.ID) as temp
on us.ID=temp.ID

SELECT * from SesionesJuego 
