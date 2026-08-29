CREATE DATABASE IF NOT EXISTS petshop
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE petshop;

CREATE TABLE IF NOT EXISTS pets (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(60) NOT NULL,
especie VARCHAR(30) NOT NULL,
raca VARCHAR(60),
dataNasc DATE NOT NULL,
peso DECIMAL(6,2) NOT NULL,
tutorNome VARCHAR(80) NOT NULL,
tutorTelefone VARCHAR(20) NOT NULL
);

-- Dados de exemplo (opcional, ajuda a testar a listagem sem cadastrar nada antes)
INSERT INTO pets (nome, especie, raca, data_nascimento, peso, tutor_nome, tutor_telefone) VALUES
('Rex', 'Cachorro', 'Labrador', '2021-03-15', 28.50, 'Paulo Goncalves', '11987654321'),
('Mimi', 'Gato', 'Siames', '2022-07-01', 4.20, 'Paulo Goncalves', '11987654321');
