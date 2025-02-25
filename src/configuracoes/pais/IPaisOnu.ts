export interface IPaisOnu {
  id: Id
  nome: Nome
  localizacao: Localizacao
  linguas: Lingua[]
  governo: Governo
  historico: string
}

export interface Id {
  M49: number
  "ISO-3166-1-ALPHA-2": string
  "ISO-3166-1-ALPHA-3": string
}

export interface Nome {
  abreviado: string
}

export interface Localizacao {
  regiao: Regiao
  "sub-regiao": SubRegiao
  "regiao-intermediaria": RegiaoIntermediaria
}

export interface RegiaoIntermediaria {
  nome: string
}

export interface Regiao {
  nome: string
}

export interface SubRegiao {
  nome: string
}

export interface Lingua {
  nome: string
}

export interface Governo {
  capital: Capital
}

export interface Capital {
  nome: string
}