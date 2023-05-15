export interface IPowerup {
  id: keyof IPowerUps;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

export interface IUserPowerups {
  powerUps: IPowerUps;
  money: number;
}

export interface IPowerUps {
  shield: number;
  mjolnir: number;
  armor: number;
  cloak: number;
  ring: number;
  boots: number;
}
