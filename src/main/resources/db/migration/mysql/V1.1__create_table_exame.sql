CREATE TABLE exame (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	uuid char(36) NOT NULL,
	descricao varchar(100) NOT NULL,
	tipo_template_exame_id bigint(20) NOT NULL,
	ativo bit(1) NOT NULL,
	data_criacao DATETIME NOT NULL,
	data_atualizacao DATETIME NOT NULL,
    PRIMARY KEY (id),
    
    FOREIGN KEY fk_tipo_template(tipo_template_exame_id) REFERENCES tipo_template_exame(id)
	ON UPDATE CASCADE
   	ON DELETE RESTRICT
);
