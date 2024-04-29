-- CreateTable
CREATE TABLE "tipoPessoa" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(40) NOT NULL,

    CONSTRAINT "tipoPessoa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tipoPessoa_descricao_key" ON "tipoPessoa"("descricao");

-- insert DATA
insert into "tipoPessoa" (descricao) values ('Leigo');
insert into "tipoPessoa" (descricao) values ('Padre');
insert into "tipoPessoa" (descricao) values ('Bispo ');
insert into "tipoPessoa" (descricao) values ('Arcebispo');
insert into "tipoPessoa" (descricao) values ('Seminarista');
insert into "tipoPessoa" (descricao) values ('Diácono');
insert into "tipoPessoa" (descricao) values ('Diácono Permanente');
insert into "tipoPessoa" (descricao) values ('Religioso(a)');
