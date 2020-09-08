CREATE TABLE tipo_template_exame (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	uuid char(36) NOT NULL,
	descricao varchar(100) NOT NULL,
	ativo bit(1) NOT NULL,
	identificador_manual INT NOT NULL,
    cliente_que_criou bigint(20) NOT NULL,
	data_criacao DATETIME NOT NULL,
	data_atualizacao DATETIME NOT NULL,
    PRIMARY KEY (id)
);
