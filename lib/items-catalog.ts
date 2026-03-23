export interface CatalogItem {
  id: string;
  nome: string;
  categoria: "QUARTO" | "COZINHA" | "SALA" | "ESCRITORIO" | "BANHEIRO" | "CAIXAS" | "OUTROS";
  icone: string;
  larguraCm: number;
  alturaCm: number;
  profundidadeCm: number;
  pesoKg: number;
  volumeM3: number;
}

function vol(l: number, a: number, p: number): number {
  return Math.round((l * a * p) / 1_000_000 * 1000) / 1000;
}

export const CATALOG_ITEMS: CatalogItem[] = [
  // QUARTO
  { id: "cama-solteiro", nome: "Cama Solteiro", categoria: "QUARTO", icone: "🛏️", larguraCm: 90, alturaCm: 45, profundidadeCm: 190, pesoKg: 30, volumeM3: vol(90,45,190) },
  { id: "cama-casal", nome: "Cama Casal", categoria: "QUARTO", icone: "🛏️", larguraCm: 140, alturaCm: 45, profundidadeCm: 190, pesoKg: 45, volumeM3: vol(140,45,190) },
  { id: "cama-queen", nome: "Cama Queen", categoria: "QUARTO", icone: "🛏️", larguraCm: 160, alturaCm: 45, profundidadeCm: 200, pesoKg: 55, volumeM3: vol(160,45,200) },
  { id: "cama-king", nome: "Cama King", categoria: "QUARTO", icone: "🛏️", larguraCm: 195, alturaCm: 45, profundidadeCm: 200, pesoKg: 65, volumeM3: vol(195,45,200) },
  { id: "colchao-solteiro", nome: "Colchão Solteiro", categoria: "QUARTO", icone: "🛏️", larguraCm: 88, alturaCm: 25, profundidadeCm: 188, pesoKg: 15, volumeM3: vol(88,25,188) },
  { id: "colchao-casal", nome: "Colchão Casal", categoria: "QUARTO", icone: "🛏️", larguraCm: 138, alturaCm: 25, profundidadeCm: 188, pesoKg: 22, volumeM3: vol(138,25,188) },
  { id: "guarda-roupa-2p", nome: "Guarda-roupa 2 portas", categoria: "QUARTO", icone: "🚪", larguraCm: 100, alturaCm: 200, profundidadeCm: 55, pesoKg: 60, volumeM3: vol(100,200,55) },
  { id: "guarda-roupa-4p", nome: "Guarda-roupa 4 portas", categoria: "QUARTO", icone: "🚪", larguraCm: 200, alturaCm: 200, profundidadeCm: 55, pesoKg: 90, volumeM3: vol(200,200,55) },
  { id: "comoda", nome: "Cômoda", categoria: "QUARTO", icone: "🗄️", larguraCm: 110, alturaCm: 80, profundidadeCm: 45, pesoKg: 35, volumeM3: vol(110,80,45) },
  { id: "criado-mudo", nome: "Criado-mudo", categoria: "QUARTO", icone: "🗄️", larguraCm: 45, alturaCm: 55, profundidadeCm: 40, pesoKg: 10, volumeM3: vol(45,55,40) },
  { id: "penteadeira", nome: "Penteadeira", categoria: "QUARTO", icone: "💄", larguraCm: 100, alturaCm: 140, profundidadeCm: 40, pesoKg: 25, volumeM3: vol(100,140,40) },

  // SALA
  { id: "sofa-2l", nome: "Sofá 2 lugares", categoria: "SALA", icone: "🛋️", larguraCm: 160, alturaCm: 85, profundidadeCm: 90, pesoKg: 40, volumeM3: vol(160,85,90) },
  { id: "sofa-3l", nome: "Sofá 3 lugares", categoria: "SALA", icone: "🛋️", larguraCm: 220, alturaCm: 85, profundidadeCm: 90, pesoKg: 55, volumeM3: vol(220,85,90) },
  { id: "sofa-l", nome: "Sofá em L", categoria: "SALA", icone: "🛋️", larguraCm: 250, alturaCm: 85, profundidadeCm: 180, pesoKg: 70, volumeM3: vol(250,85,180) },
  { id: "poltrona", nome: "Poltrona", categoria: "SALA", icone: "💺", larguraCm: 80, alturaCm: 90, profundidadeCm: 80, pesoKg: 20, volumeM3: vol(80,90,80) },
  { id: "mesa-centro", nome: "Mesa de centro", categoria: "SALA", icone: "🪑", larguraCm: 100, alturaCm: 45, profundidadeCm: 60, pesoKg: 15, volumeM3: vol(100,45,60) },
  { id: "rack-tv", nome: "Rack para TV", categoria: "SALA", icone: "📺", larguraCm: 180, alturaCm: 50, profundidadeCm: 40, pesoKg: 25, volumeM3: vol(180,50,40) },
  { id: "estante", nome: "Estante", categoria: "SALA", icone: "📚", larguraCm: 120, alturaCm: 180, profundidadeCm: 35, pesoKg: 40, volumeM3: vol(120,180,35) },
  { id: "tv-55", nome: "TV 55\"", categoria: "SALA", icone: "📺", larguraCm: 124, alturaCm: 72, profundidadeCm: 8, pesoKg: 15, volumeM3: vol(124,72,8) },
  { id: "mesa-jantar-4", nome: "Mesa de jantar 4 lug.", categoria: "SALA", icone: "🍽️", larguraCm: 120, alturaCm: 78, profundidadeCm: 80, pesoKg: 30, volumeM3: vol(120,78,80) },
  { id: "mesa-jantar-6", nome: "Mesa de jantar 6 lug.", categoria: "SALA", icone: "🍽️", larguraCm: 160, alturaCm: 78, profundidadeCm: 90, pesoKg: 45, volumeM3: vol(160,78,90) },
  { id: "cadeira-jantar", nome: "Cadeira de jantar", categoria: "SALA", icone: "🪑", larguraCm: 45, alturaCm: 90, profundidadeCm: 45, pesoKg: 5, volumeM3: vol(45,90,45) },

  // COZINHA
  { id: "geladeira-1p", nome: "Geladeira 1 porta", categoria: "COZINHA", icone: "🧊", larguraCm: 60, alturaCm: 150, profundidadeCm: 65, pesoKg: 45, volumeM3: vol(60,150,65) },
  { id: "geladeira-2p", nome: "Geladeira Duplex", categoria: "COZINHA", icone: "🧊", larguraCm: 70, alturaCm: 180, profundidadeCm: 70, pesoKg: 70, volumeM3: vol(70,180,70) },
  { id: "fogao-4b", nome: "Fogão 4 bocas", categoria: "COZINHA", icone: "🔥", larguraCm: 52, alturaCm: 86, profundidadeCm: 56, pesoKg: 25, volumeM3: vol(52,86,56) },
  { id: "fogao-5b", nome: "Fogão 5 bocas", categoria: "COZINHA", icone: "🔥", larguraCm: 76, alturaCm: 86, profundidadeCm: 56, pesoKg: 35, volumeM3: vol(76,86,56) },
  { id: "microondas", nome: "Micro-ondas", categoria: "COZINHA", icone: "📻", larguraCm: 45, alturaCm: 28, profundidadeCm: 35, pesoKg: 12, volumeM3: vol(45,28,35) },
  { id: "maquina-lavar", nome: "Máquina de lavar", categoria: "COZINHA", icone: "🌀", larguraCm: 60, alturaCm: 85, profundidadeCm: 60, pesoKg: 55, volumeM3: vol(60,85,60) },
  { id: "mesa-cozinha", nome: "Mesa de cozinha", categoria: "COZINHA", icone: "🪑", larguraCm: 80, alturaCm: 78, profundidadeCm: 80, pesoKg: 15, volumeM3: vol(80,78,80) },
  { id: "armario-cozinha", nome: "Armário de cozinha", categoria: "COZINHA", icone: "🗄️", larguraCm: 120, alturaCm: 70, profundidadeCm: 35, pesoKg: 20, volumeM3: vol(120,70,35) },

  // ESCRITORIO
  { id: "mesa-escritorio", nome: "Mesa de escritório", categoria: "ESCRITORIO", icone: "🖥️", larguraCm: 120, alturaCm: 75, profundidadeCm: 60, pesoKg: 20, volumeM3: vol(120,75,60) },
  { id: "cadeira-escritorio", nome: "Cadeira de escritório", categoria: "ESCRITORIO", icone: "💺", larguraCm: 65, alturaCm: 120, profundidadeCm: 65, pesoKg: 12, volumeM3: vol(65,120,65) },
  { id: "estante-livros", nome: "Estante de livros", categoria: "ESCRITORIO", icone: "📚", larguraCm: 80, alturaCm: 180, profundidadeCm: 30, pesoKg: 30, volumeM3: vol(80,180,30) },
  { id: "gaveteiro", nome: "Gaveteiro", categoria: "ESCRITORIO", icone: "🗄️", larguraCm: 40, alturaCm: 60, profundidadeCm: 50, pesoKg: 15, volumeM3: vol(40,60,50) },

  // BANHEIRO
  { id: "armario-banheiro", nome: "Armário de banheiro", categoria: "BANHEIRO", icone: "🪥", larguraCm: 60, alturaCm: 60, profundidadeCm: 15, pesoKg: 8, volumeM3: vol(60,60,15) },

  // CAIXAS
  { id: "caixa-p", nome: "Caixa P", categoria: "CAIXAS", icone: "📦", larguraCm: 35, alturaCm: 30, profundidadeCm: 30, pesoKg: 5, volumeM3: vol(35,30,30) },
  { id: "caixa-m", nome: "Caixa M", categoria: "CAIXAS", icone: "📦", larguraCm: 50, alturaCm: 40, profundidadeCm: 40, pesoKg: 10, volumeM3: vol(50,40,40) },
  { id: "caixa-g", nome: "Caixa G", categoria: "CAIXAS", icone: "📦", larguraCm: 60, alturaCm: 50, profundidadeCm: 50, pesoKg: 15, volumeM3: vol(60,50,50) },
  { id: "mala-viagem", nome: "Mala de viagem", categoria: "CAIXAS", icone: "🧳", larguraCm: 55, alturaCm: 70, profundidadeCm: 30, pesoKg: 20, volumeM3: vol(55,70,30) },

  // OUTROS
  { id: "bicicleta", nome: "Bicicleta", categoria: "OUTROS", icone: "🚲", larguraCm: 170, alturaCm: 100, profundidadeCm: 45, pesoKg: 12, volumeM3: vol(170,100,45) },
  { id: "ventilador", nome: "Ventilador de coluna", categoria: "OUTROS", icone: "🌬️", larguraCm: 45, alturaCm: 130, profundidadeCm: 45, pesoKg: 5, volumeM3: vol(45,130,45) },
  { id: "ar-condicionado", nome: "Ar-condicionado split", categoria: "OUTROS", icone: "❄️", larguraCm: 80, alturaCm: 30, profundidadeCm: 20, pesoKg: 12, volumeM3: vol(80,30,20) },
  { id: "tapete-medio", nome: "Tapete médio (enrolado)", categoria: "OUTROS", icone: "🧶", larguraCm: 20, alturaCm: 20, profundidadeCm: 200, pesoKg: 8, volumeM3: vol(20,20,200) },
];

export const CATEGORIES = [
  { id: "QUARTO", nome: "Quarto", icone: "🛏️" },
  { id: "SALA", nome: "Sala", icone: "🛋️" },
  { id: "COZINHA", nome: "Cozinha", icone: "🔥" },
  { id: "ESCRITORIO", nome: "Escritório", icone: "🖥️" },
  { id: "BANHEIRO", nome: "Banheiro", icone: "🪥" },
  { id: "CAIXAS", nome: "Caixas", icone: "📦" },
  { id: "OUTROS", nome: "Outros", icone: "📎" },
] as const;
