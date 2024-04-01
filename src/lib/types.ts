export type Player = {
  id: string
  userName: string,
  results: Number[]
}

type Button = {
  id: number;
  lit: boolean;
}

export type GameState = {
  status: "Waiting" | "Playing" | "Results";
  buttons: Button[];
  players: Player[]
}
