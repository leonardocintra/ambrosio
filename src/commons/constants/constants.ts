// PRISMA ERROR CODE EXCEPTION
export const UNIQUE_CONSTRAINT_FAILED = 'P2002';
export const FOREIGN_KEY_CONSTRAINT = 'P2003';
export const RECORD_DOES_NOT_EXIST = 'P2025';
export const NULL_CONSTRAINT_VIOLATION = 'P2011';

// CONTROLERS PAGINATION
export const LIMIT_DEFAULT = 50;
export const PAGE_DEFAULT = 1;

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
