export interface TruckSpec {
  id: string;
  nome: string;
  tipo: string;
  capacidadeM3: number;
  capacidadeKg: number;
  comprimentoCm: number;
  larguraCm: number;
  alturaCm: number;
  descricao: string;
}

export const TRUCKS: TruckSpec[] = [
  {
    id: "fiorino",
    nome: "Fiorino",
    tipo: "Fiorino",
    capacidadeM3: 1.5,
    capacidadeKg: 600,
    comprimentoCm: 140,
    larguraCm: 110,
    alturaCm: 105,
    descricao: "Ideal para poucos itens ou mudanças de quartos pequenos",
  },
  {
    id: "hr",
    nome: "HR / Van",
    tipo: "HR",
    capacidadeM3: 6,
    capacidadeKg: 1500,
    comprimentoCm: 310,
    larguraCm: 170,
    alturaCm: 170,
    descricao: "Boa para apartamentos de 1-2 quartos",
  },
  {
    id: "tres-quartos",
    nome: "3/4",
    tipo: "3/4",
    capacidadeM3: 15,
    capacidadeKg: 3500,
    comprimentoCm: 450,
    larguraCm: 220,
    alturaCm: 210,
    descricao: "Ideal para apartamentos de 2-3 quartos",
  },
  {
    id: "bau",
    nome: "Baú / Truck",
    tipo: "Baú",
    capacidadeM3: 25,
    capacidadeKg: 6000,
    comprimentoCm: 600,
    larguraCm: 240,
    alturaCm: 240,
    descricao: "Para casas grandes e mudanças completas",
  },
];
