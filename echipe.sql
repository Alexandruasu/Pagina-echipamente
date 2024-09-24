CREATE TYPE culoare AS ENUM('green', 'blue', 'red');
CREATE TABLE IF NOT EXISTS echipe (
   id SERIAL PRIMARY KEY,
   nume VARCHAR(40) NOT NULL,
   rating NUMERIC(4, 2) CHECK (rating > 0),
   nr_proiecte INTEGER DEFAULT 0,
   membri_echipa TEXT[] NOT NULL DEFAULT '{}', 
   culoare_emblema culoare,
   data_adaugare TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

INSERT INTO echipe (nume, rating, nr_proiecte, membri_echipa, culoare_emblema)
VALUES 
('echipa vesela', 3.7, 1, '{"Ion Popescu","Tania Georgescu","Maria Ana Bobescu"}', 'green'),
('echipa nula', 1.7, 12, '{}', 'red'),
('echipa fara proiecte', 4.7, 0, '{"Ion Alin Dorel Popescu","George Georgescu","Maia Alina Popescu"}', 'green'),
('echipa vesela', 2.3, 1, '{"Ion Ionescu","Ana Escu","Ana Bobescu","Bob Costica Ionescu"}', NULL),
('unu si bun', 4.9, 100, '{"Destept desteptescu"}', NULL),
('abcd', 5.7, 1, '{"Mihai George Florin Popescu","Oana Georgescu","Maria Popescu","Teo Teodorescu"}', NULL),
('xyz', 3.8, 12, '{"Dan Dragos Popescu","Dana Georgescu","Daniela Bobescu"}', NULL),
('harnicutii', 5.7, 50, '{"Luana Costina Popescu","Bob Georgescu","Roberta Ana Ionescu"}', 'blue'),
('extraterestrii', 3.5, 27, '{"Bzzzzzzz","Bzz Bzz","B B Z"}', NULL);