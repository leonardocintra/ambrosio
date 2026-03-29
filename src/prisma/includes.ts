// INCLUDES PRISMA CLIENT
export const ENDERECO_INCLUDE = {
  include: {
    cidade: {
      include: {
        estado: {
          include: {
            pais: true,
          },
        },
      },
    },
  },
};

export const PESSOA_CARISMA_INCLUDE = {
  include: {
    carisma: {
      select: {
        id: true,
        tipo: true,
        descricao: true,
        casalAndaJunto: true,
      },
    },
  },
};
