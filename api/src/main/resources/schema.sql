CREATE TABLE IF NOT EXISTS petshop (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(60) NOT NULL,
especie VARCHAR(30) NOT NULL,
raca VARCHAR(60),
dataNascimento DATE NOT NULL,
peso DECIMAL(6,2) NOT NULL,
tutorNome VARCHAR(80) NOT NULL,
tutorTelefone VARCHAR(20) NOT NULL
);

INSERT INTO petshop (nome, especie, raca, dataNascimento, peso, tutorNome, tutorTelefone) VALUES
('Rex', 'Cachorro', 'Labrador', '2021-03-15', 28.50, 'Paulo Goncalves', '11987654321'),
('Mimi', 'Gato', 'Siames', '2022-07-01', 4.20, 'Paulo Goncalves', '11987654321');