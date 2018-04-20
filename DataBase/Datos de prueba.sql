Use OthelloTEC
INSERT INTO Usuarios (Correo,Contrasenia,Nickname) VALUES ('rodriguez.elio.97@gmail.com','Capitan123','TuringCR'),
														  ('landresf3638@gmail.com','Andres123abcd','AndresF12');
EXEC selectUsuario 'landresf3638@gmail.com','Andres123abcd',0
INSERT INTO SesionesJuego(NumPartidas,N_Tablero,TipoPartida) VALUES (3,6,1)

INSERT INTO SesionesJuego(NumPartidas,N_Tablero,ColorFondo,TipoPartida) VALUES (3,6,'FFFFFF',1),
														  (2,8,'FFFFFF',1)

INSERT INTO Usuarios_SesionJuego (ID_SJ,ID_Usuario,ColorFicha) VALUES (2,2,'#FF8000'),(1,2,'#FF8000');	


INSERT INTO Partidas(ID_SJ,MatrizJuego) VALUES (1,'000000000000001200002100000000000000'),(2,'000000000000001200002100000000000000');	


SELECT * FROM SesionesJuego


SELECT * FROM Usuarios_SesionJuego
SELECT * FROM Usuarios
EXEC insertUsuario 'landresf10@hotmail.es','1234','nnnnn',


EXEC insertSesionJuego 2,8,3,2,1,'#000000',0

SELECT * FROM Partidas

EXEC insertUsuario_SesionJuego 'landresf3638@gmail.com',2,'#FF8000',0