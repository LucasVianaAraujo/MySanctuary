CREATE DATABASE MySanctuary;
USE MySanctuary;

CREATE TABLE Cadastro (
id_cadastro INT PRIMARY KEY AUTO_INCREMENT,
nome varchar(50) NOT NULL,
email varchar(50) NOT NULL UNIQUE,
senha varchar(50) NOT NULL
 );
 
CREATE TABLE Login (
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
id_cadastro INT,
email VARCHAR(50),
senha varchar(50),
FOREIGN KEY (id_cadastro)
REFERENCES Cadastro(id_cadastro)
ON DELETE CASCADE
);
 
 CREATE TABLE Registros (
 id_registro INT PRIMARY KEY AUTO_INCREMENT,
 id_usuario INT,
 FOREIGN KEY (id_usuario)
 REFERENCES login(id_usuario)
 ON DELETE CASCADE
 );
 
 CREATE TABLE Registro_Unico (
 id_registro_unico INT PRIMARY KEY AUTO_INCREMENT,
 id_registro INT,
 id_usuario INT,
 titulo VARCHAR(50),
 data_registro DATE,
 registro VARCHAR(500),
 FOREIGN KEY (id_registro)
 REFERENCES Registros(id_registro),
 FOREIGN KEY (id_usuario)
 REFERENCES Login(id_usuario)
 ON DELETE CASCADE
 );