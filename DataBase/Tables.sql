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
	Estado				INT				NOT NULL	DEFAULT 2, -- estado de la partida(0 fin partida jugador, 1 pendiente, 2 esperando jugador)
	NumPartidas			INT				NOT NULL, -- numero de partidas
	N_Tablero			INT				NOT NULL, -- tamanio del tablero
	NivelDificultad		INT,					  -- facil, medio, dificil un # para cada uno
	TipoPartida			INT				NOT NULL, -- tipo de partidas (1 vsUsuario, 2 vsPC, 3 PCvsPC)

	
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
	ID_SJ				INT				NOT NULL,
	PuntosP1			INT				NOT NULL	DEFAULT 2,
	PuntosP2			INT				NOT NULL	DEFAULT 2,
	Turno				INT				NOT NULL	DEFAULT 1,
	EstadoPartida		INT				NOT NULL	DEFAULT 1, --(0 fin 1 en juego)
	MatrizJuego			VARCHAR(8000)	NOT NULL,
	
	CONSTRAINT PK_Partidas_ID PRIMARY KEY CLUSTERED (ID),

	CONSTRAINT FK_Partidas_ID_SJ	FOREIGN KEY (ID_SJ) 
		REFERENCES	dbo.SesionesJuego (ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ChatJuego
(
	ID					INT IDENTITY,
	ID_Partida			INT					NOT NULL,
	Nickname			VARCHAR(50)			NOT NULL,
	Mensaje				VARCHAR(400)		NOT NULL,

	CONSTRAINT PK_ChatJuego_ID PRIMARY KEY CLUSTERED (ID),

	CONSTRAINT FK_ChatJuego_ID_Partida	FOREIGN KEY (ID_Partida) 
		REFERENCES	dbo.Partidas (ID) ON DELETE CASCADE ON UPDATE CASCADE
);

----------------------------------------------
--				CHAT DE JUEGO
----------------------------------------------
USE OthelloTEC
GO
CREATE PROCEDURE insertMensaje
	@ID_Partida			INT,
	@Nickname			VARCHAR(50),
	@Mensaje			VARCHAR(400),
	@success			BIT		OUTPUT
AS
	BEGIN
		BEGIN TRY
			INSERT INTO ChatJuego (ID_Partida,Mensaje,Nickname) VALUES (@ID_Partida,@Mensaje,@Nickname);
			SET @success = 1 -- exito
			SELECT @success
		END TRY
		BEGIN CATCH
			SET @success = 0 -- error
			SELECT @success
		END CATCH
	END;
GO

USE OthelloTEC
GO
CREATE PROCEDURE eliminarMensajesPartida
	@ID_Partida			INT,
	@success			BIT		OUTPUT
AS
	BEGIN
		BEGIN TRY
			DELETE FROM dbo.ChatJuego WHERE ID_Partida = @ID_Partida;
			SET @success = 1 -- exito
			SELECT @success
		END TRY
		BEGIN CATCH
			SET @success = 0 -- error
			SELECT @success
		END CATCH
	END;
GO

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
ALTER PROCEDURE insertUsuario_SesionJuego -- LISTO
	@Correo VARCHAR(50),
	@ID_SesionJuego		INT,
	@ColorFicha			VARCHAR(10),
	@success			BIT		OUTPUT
AS 
	BEGIN
		DECLARE @ID_Usuario INT;
		SET @ID_Usuario=(SELECT ID FROM Usuarios WHERE Correo=@Correo);
		IF ((SELECT COUNT(*) FROM dbo.Usuarios_SesionJuego AS US WHERE US.ID_Usuario !=@ID_Usuario  AND US.ID_SJ = @ID_SesionJuego and US.ColorFicha!=@ColorFicha) = 1) -- Existe solo el creador de la sesion
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

EXEC insertUsuario_SesionJuego 'landresf3638@gmail.com',4004,'#0232fr',0

SELECT * FROM SesionesJuego
SELECT * FROM Usuarios_SesionJuego
select * from Usuarios


----------------------------------------------
--				SesionJuego
----------------------------------------------
USE OthelloTEC
GO

ALTER PROCEDURE insertSesionJuego -- LISTO
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
				INSERT INTO dbo.SesionesJuego(NumPartidas,N_Tablero,NivelDificultad,TipoPartida,Estado) VALUES (@NumPartidas,@N_Tablero,@NivelDificultad,@TipoPartida,2);
				DECLARE @IDS INT;
				SET @IDS =(SELECT SCOPE_IDENTITY());
				DECLARE @IDU INT;
				SET @IDU=(SELECT ID from Usuarios where Correo=@IdUsuario);
				INSERT INTO dbo.Usuarios_SesionJuego (ID_SJ,ID_Usuario,ColorFicha) VALUES (@IDS,@IDU,@colorFicha);
				---This code fragment generate the first matriz in the game
				DECLARE @N INT=@N_Tablero;	
				DECLARE @NC1 INT=@N;
				DECLARE @TXTPLANO NVARCHAR(MAX)='';
				DECLARE @PS1 INT=@N/2;
				DECLARE @PS2 INT=@PS1+1;
				WHILE(@NC1>0)
					BEGIN
						SELECT @NC1
						DECLARE @NC2 INT=@N;
						WHILE(@NC2>0)
							BEGIN
								IF(@NC1=@PS1 and @NC2=@PS1)
									BEGIN
										SET @TXTPLANO=(SELECT CONCAT(@TXTPLANO,'1'));
										SET @NC2=@NC2-1;
									END
								ELSE IF(@NC1=@PS2 and @NC2=@PS2)
									BEGIN
										SET @TXTPLANO=(SELECT CONCAT(@TXTPLANO,'1'));
										SET @NC2=@NC2-1;
									END
								ELSE IF(@NC1=@PS1 and @NC2=@PS2)
									BEGIN
										SET @TXTPLANO=(SELECT CONCAT(@TXTPLANO,'2'));
										SET @NC2=@NC2-1;
									END
								ELSE IF(@NC1=@PS2 and @NC2=@PS1)
									BEGIN
										SET @TXTPLANO=(SELECT CONCAT(@TXTPLANO,'2'));
										SET @NC2=@NC2-1;
									END
								ELSE
									BEGIN
										SET @TXTPLANO=(SELECT CONCAT(@TXTPLANO,'0'));
										SET @NC2=@NC2-1;
									END	
							END
							SET @NC1=@NC1-1;
					END
					----------
				INSERT INTO Partidas(ID_SJ,Turno,MatrizJuego,EstadoPartida)VALUES(@IDS,1,@TXTPLANO,1);

				SET @success = 1 -- exito
				SELECT @success
			END;			
	END;
GO
ALTER PROCEDURE misSesiones
		@correo VARCHAR(200),
		@filtro CHAR(1),
		@success BIT OUTPUT
AS 
BEGIN
			IF((SELECT COUNT(*) FROM SesionesJuego as sj inner join (SELECT * FROM Usuarios as u inner join Usuarios_SesionJuego as us on u.ID=us.ID_Usuario and u.Correo='landresf3638@gmail.com' )as j on j.ID_SJ=sj.ID and (sj.Estado=1 or sj.Estado=0))=0 and (SELECT COUNT(*) FROM Usuarios as us inner join 
					(SELECT * FROM SesionesJuego  as sj inner join Usuarios_SesionJuego as u on  sj.Estado = 2 and u.ID_SJ=sj.ID and sj.TipoPartida=2) as temp
							on us.ID=temp.ID_Usuario AND us.Correo!='carlosmario.villafuerted66@gmail.com')=0)
						BEGIN 
							print('entro')
							SET @success = 0 -- error
							SELECT @success
						END;
			ELSE
				BEGIN
					IF(@filtro='1')
						BEGIN 
							SET @success = 1 -- exito
							SELECT * FROM(SELECT sj.Estado,sj.NumPartidas,sj.N_Tablero,sj.NivelDificultad,sj.TipoPartida,j.ID_SJ FROM SesionesJuego as sj inner join (SELECT * FROM Usuarios as u inner join Usuarios_SesionJuego as us on u.ID=us.ID_Usuario and u.Correo=@correo )as j
							on j.ID_SJ=sj.ID and sj.Estado=1 ) as temp
							inner join (SELECT @success as succces) AS temp1 on temp.Estado=1
						END
					ELSE IF(@filtro='2')
						BEGIN
							 SET @success = 1 -- exito
							SELECT * FROM(SELECT sj.Estado,sj.NumPartidas,sj.N_Tablero,sj.NivelDificultad,sj.TipoPartida,j.ID_SJ FROM SesionesJuego as sj inner join (SELECT * FROM Usuarios as u inner join Usuarios_SesionJuego as us on u.ID=us.ID_Usuario and u.Correo=@correo)as j
							on j.ID_SJ=sj.ID and sj.Estado=0 ) as temp
							inner join (SELECT @success as succces) AS temp1 on temp.Estado=0
						END
					ELSE
						BEGIN
						SET @success = 1 -- exito
						SELECT  * FROM(SELECT us.ID,us.Correo,us.Nickname,temp.ID_SJ,temp.N_Tablero,temp.NivelDificultad,temp.TipoPartida,temp.NumPartidas FROM Usuarios as us inner join 
						(SELECT * FROM SesionesJuego  as sj inner join Usuarios_SesionJuego as u on  sj.Estado = 2 and u.ID_SJ=sj.ID and sj.TipoPartida=2) as temp
						 on us.ID=temp.ID_Usuario) AS todo inner join (SELECT @success as succces) as ex on todo.Correo!=@correo 
						END
				END;
END


---TRUNCATE  TABLE Usuarios_SesionJuego
---TRUNCATE TABLE Partidas
---TRUNCATE TABLE SesionesJuego


EXEC misSesiones 'carlosmario.villafuerted66@gmail.com','1',0
EXEC misSesiones 'landresf3638@gmail.com','1',0
EXEC misSesiones 'rodriguez.elio.97@gmail.com','1',0
SELECT * FROM SesionesJuego

SELECT * FROM Usuarios_SesionJuego


SELECT * FROM Usuarios


ALTER PROCEDURE devuelvePartidas
				@ID_S INT ,
				@success BIT OUTPUT
AS 
	BEGIN 
		IF((SELECT COUNT(*) FROM Partidas as p inner join SesionesJuego s on p.ID_SJ=s.ID and p.ID_SJ=@ID_S and s.Estado=0)=0)
			BEGIN
				SET @success =0;
				SELECT @success; 
			END 
		ELSE
			BEGIN
				SET @success=1;
				SELECT  data.MatrizJuego,data.PuntosP1,data.PuntosP2,estado.success FROM (SELECT p.MatrizJuego,p.PuntosP1,p.PuntosP2 FROM Partidas as p inner join SesionesJuego s on p.ID_SJ=s.ID and p.ID_SJ=@ID_S and s.Estado=0) AS data
				inner join (SELECT @success as success) AS estado ON estado.success=1 
			END
	END 


DECLARE @N INT=6;
DECLARE @NC1 INT=@N;
DECLARE @TXTPLANO NVARCHAR(MAX)='';
DECLARE @PS1 INT=@N/2;
DECLARE @PS2 INT=@PS1+1;
WHILE(@NC1>0)
	BEGIN
		SELECT @NC1
		DECLARE @NC2 INT=@N;
		WHILE(@NC2>0)
			BEGIN
				IF(@NC1=@PS1 and @NC2=@PS1)
					BEGIN
						SET @TXTPLANO=(SELECT CONCAT(@TXTPLANO,'1'));
						SET @NC2=@NC2-1;
					END
				ELSE IF(@NC1=@PS2 and @NC2=@PS2)
					BEGIN
						SET @TXTPLANO=(SELECT CONCAT(@TXTPLANO,'1'));
						SET @NC2=@NC2-1;
					END
				ELSE IF(@NC1=@PS1 and @NC2=@PS2)
					BEGIN
						SET @TXTPLANO=(SELECT CONCAT(@TXTPLANO,'2'));
						SET @NC2=@NC2-1;
					END
				ELSE IF(@NC1=@PS2 and @NC2=@PS1)
					BEGIN
						SET @TXTPLANO=(SELECT CONCAT(@TXTPLANO,'2'));
						SET @NC2=@NC2-1;
					END
				ELSE
					BEGIN
						SET @TXTPLANO=(SELECT CONCAT(@TXTPLANO,'0'));
						SET @NC2=@NC2-1;
					END	
			END
			SET @NC1=@NC1-1;
	END
	


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
				IF ((SELECT COUNT(*) FROM SesionesJuego AS S WHERE S.ID = @ID_SJ) = 1)
					BEGIN
						INSERT INTO Partidas (ID_SJ, MatrizJuego) VALUES (@ID_SJ, @MatrizJuego);
						SET @success = 1 -- exito
						SELECT @success
					END
				ELSE
					BEGIN
						SET @success = 0 -- error
						SELECT @success
					END
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

/*
	Movimiento por parte de los jugadores, si se realiza un movimiento se guarda en la base de datos junto con todos los datos relacionados (puntos, estado de la partida, turno, etc.)
	Retorna la partida actualizada para que de actualice la matriz de juego
*/
CREATE PROCEDURE editPartida -- LISTO
	@ID					INT,
	@Turno				INT,
	@EstadoPartida		INT,
	@ID_SJ				INT,
	@Puntos_P1			INT,
	@Puntos_P2			INT,
	@MatrizJuego		VARCHAR(MAX),
	@success			BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM Partidas AS P WHERE P.ID = @ID) = 1) -- existe la partida
			BEGIN				
				BEGIN TRY
					UPDATE dbo.Partidas 
					SET ID_SJ = @ID_SJ,
					Turno = @Turno,
					EstadoPartida = @EstadoPartida,
					PuntosP1 = @Puntos_P1,
					PuntosP2 = @Puntos_P2,
					MatrizJuego = @MatrizJuego
					WHERE ID = @ID AND EstadoPartida = 1; -- que no este terminada la partida

					IF((SELECT COUNT(*) AS NumPartidas FROM Partidas AS P INNER JOIN SesionesJuego AS SJ ON SJ.ID = P.ID_SJ AND SJ.ID = @ID_SJ WHERE P.EstadoPartida = 0) = (SELECT SJ.NumPartidas FROM SesionesJuego AS SJ WHERE SJ.ID = @ID_SJ))
						BEGIN
							UPDATE SesionesJuego
								SET Estado = 0							
							WHERE ID = @ID_SJ

							SET @success = 1
							SELECT @success, 0 AS EstadoSesion, ID, ID_SJ, PuntosP1, PuntosP2, Turno AS turno, EstadoPartida, MatrizJuego AS matriz FROM Partidas WHERE ID = @ID -- termino la sesion
						END
					ELSE
						BEGIN
							SET @success = 1
							SELECT @success, 1 AS EstadoSesion,  ID, ID_SJ, PuntosP1, PuntosP2, Turno AS turno, EstadoPartida, MatrizJuego AS matriz FROM Partidas WHERE ID = @ID -- continua sesion y partida
						END
				END TRY
				BEGIN CATCH
					SET @success = 0 -- fallo
					SELECT @success, 1 AS EstadoSesion
				END CATCH
			END;
		ELSE
			BEGIN
				SET @success = 0 -- error
				SELECT @success, 1 AS EstadoSesion

			END;			
	END;
GO

SELECT us.ID,us.Correo,us.Nickname,temp.ID_SJ,temp.N_Tablero,temp.NivelDificultad,temp.TipoPartida,temp.NumPartidas FROM Usuarios as us inner join 
(SELECT * FROM SesionesJuego  as sj inner join Usuarios_SesionJuego as u on  sj.Estado = 0 and u.ID_SJ=sj.ID) as temp
on us.ID=temp.ID

ALTER PROCEDURE [dbo].[partidaActual]
				@ID_S INT ,
				@success BIT OUTPUT
AS 
	BEGIN 
		IF((SELECT COUNT(*) FROM Partidas as p inner join SesionesJuego s on p.ID_SJ=s.ID and p.ID_SJ=@ID_S and s.Estado=1)=0)
			BEGIN
				SET @success =0;
				SELECT @success; 
			END 
		ELSE

			BEGIN
				SET @success=1;
				SELECT  data.MatrizJuego,data.PuntosP1,data.PuntosP2,data.ID,data.Turno,data.EstadoPartida,data.Estado,data.NivelDificultad,data.ID_SJ,data.TipoPartida,data.N_Tablero,estado.success FROM (SELECT p.MatrizJuego,p.PuntosP1,p.PuntosP2,p.ID,p.Turno,p.EstadoPartida,s.Estado,s.NivelDificultad,s.ID as ID_SJ,s.TipoPartida,s.N_Tablero FROM Partidas as p inner join SesionesJuego AS s on p.ID_SJ=s.ID and p.ID_SJ=@ID_S and s.Estado=1) AS data
				inner join (SELECT @success as success) AS estado ON estado.success=1 
			END
	END 


	SELECT * FROM Partidas