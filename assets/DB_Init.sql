DROP TABLE IF EXISTS cadastro_medico;
DROP TABLE IF EXISTS cadastro_paciente;
DROP TABLE IF EXISTS dados_diario;

CREATE TABLE cadastro_paciente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255),
    Sexo VARCHAR(45),
    Nascimento DATE,
    CPF VARCHAR(45),
    Senha VARCHAR(100),
    NomePai VARCHAR(255),
    NomeMae VARCHAR(255),
    Telefone VARCHAR(45),
    CRM_do_Medico VARCHAR(45)
);
CREATE TABLE cadastro_medico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255),
    CRM VARCHAR(45),
    Email VARCHAR(100),
    Senha VARCHAR(100)
);
CREATE TABLE dados_diario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    CPF VARCHAR(45),
    Data_Diario VARCHAR(45),
    Hora VARCHAR(45),
    QntdXixi INT,
    Correu VARCHAR(20),
    Molhou VARCHAR(20),
    FezForcaXixi VARCHAR(20),
    HoraIngestao VARCHAR(45),
    LiquidoIngerido VARCHAR(50),
    QntdLiqIngerido INT,
    CocoSangue VARCHAR(20),
    FezMtaForca VARCHAR(20),
    EntopeVaso VARCHAR(20),
    Info_Extra VARCHAR(999)
);