-- CreateTable
CREATE TABLE "etapa" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "etapa_pkey" PRIMARY KEY ("id")
);

insert into etapa (descricao) values ('pre-catecumenato');
insert into etapa (descricao) values ('1º escrutinio');
insert into etapa (descricao) values ('Shemá Israel');
insert into etapa (descricao) values ('2º escrutinio');
insert into etapa (descricao) values ('Iniciação a Oração');
insert into etapa (descricao) values ('Tradditio Symboli');
insert into etapa (descricao) values ('Redditio Symboli');
insert into etapa (descricao) values ('Pai Nosso I');
insert into etapa (descricao) values ('Pai Nosso II');
insert into etapa (descricao) values ('Pai Nosso III');
insert into etapa (descricao) values ('3º escrutinio');
