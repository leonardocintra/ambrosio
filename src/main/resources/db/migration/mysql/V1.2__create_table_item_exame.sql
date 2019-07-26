CREATE TABLE tipo_campo(
	id bigint(20) NOT NULL AUTO_INCREMENT,
	uuid char(36) NOT NULL,
	descricao varchar(150) NOT NULL UNIQUE,
	observacao TEXT NULL,
	ativo bit(1) NOT NULL,
	data_criacao DATETIME NOT NULL,
	data_atualizacao DATETIME NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO tipo_campo(uuid, descricao, ativo, data_criacao, data_atualizacao)
values ('f488136e-ae97-42bc-9350-b8e41a890dec', 'Numerico', 1, now(), now());


INSERT INTO tipo_campo(uuid, descricao, ativo, data_criacao, data_atualizacao)
values ('c9d7577c-df00-4c69-81d3-164008b114fa', 'Decimal', 1, now(), now());


INSERT INTO tipo_campo(uuid, descricao, ativo, data_criacao, data_atualizacao)
values ('06004523-fa66-4908-bfcb-c02734b0b160', 'Data', 1, now(), now());


INSERT INTO tipo_campo(uuid, descricao, ativo, data_criacao, data_atualizacao)
values ('c9d7577c-df00-4c69-81d3-164008b114fa', 'Texto livre', 1, now(), now());


INSERT INTO tipo_campo(uuid, descricao, ativo, data_criacao, data_atualizacao)
values ('159f949a-9a0e-4e6d-ad97-308af95688d8', 'Lista com unica opção', 1, now(), now());


INSERT INTO tipo_campo(uuid, descricao, ativo, data_criacao, data_atualizacao)
values ('32461099-c6bc-4660-874f-3e89de2453b3', 'Lista com varias opções', 1, now(), now());


INSERT INTO tipo_campo(uuid, descricao, ativo, data_criacao, data_atualizacao)
values ('1e04a3fa-ae35-4e38-8e48-e699bead64da', 'SIM/NÃO', 1, now(), now()); 

CREATE TABLE item_exame (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	uuid char(36) NOT NULL,
	exame_id bigint(20) NOT NULL,
	nome varchar(150) NOT NULL UNIQUE,
	tipo_campo_id bigint(20) NOT NULL,
	valor_padrao varchar(150) NULL,
	order_exibicao INT NOT NULL,
	metodo varchar(200) NULL,
	material varchar(200) NULL,
	observacao TEXT NULL,
	valor_referencia varchar(100) NULL,
	unidade_medida varchar(50) NULL,
	ativo bit(1) NOT NULL,
	data_criacao DATETIME NOT NULL,
	data_atualizacao DATETIME NOT NULL,
    PRIMARY KEY (id),
    
    FOREIGN KEY fk_item_exame_exame(exame_id) REFERENCES exame(id)
	ON UPDATE CASCADE
   	ON DELETE RESTRICT,

    FOREIGN KEY fk_item_exame_tipo_campo(tipo_campo_id) REFERENCES tipo_campo(id)
	ON UPDATE CASCADE
   	ON DELETE RESTRICT
);

