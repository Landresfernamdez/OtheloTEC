INSERT INTO Usuarios (Correo,Contrasenia,Nickname) VALUES ('rodriguez.elio.97@gmail.com','Capitan123','TuringCR'),
														  ('landresf3638@gmail.com','Andres123abcd','AndresF12');

INSERT INTO SesionesJuego(NumPartidas,N_Tablero,ColorFondo,TipoPartida) VALUES (3,6,'FFFFFF',1),
														  (2,8,'FFFFFF',1);

INSERT INTO SesionesJuego(NumPartidas,N_Tablero,ColorFondo,TipoPartida) VALUES (3,6,'FFFFFF',1),
														  (2,8,'FFFFFF',1);

INSERT INTO Usuarios_SesionJuego (ID_SJ,ID_Usuario,ColorFicha) VALUES (1,1,'#CC2EFA'),(1,3,'#FF8000');	


INSERT INTO Partidas(ID_SJ,MatrizJuego) VALUES (1,'000000000000001200002100000000000000'),(2,'000000000000001200002100000000000000');	
