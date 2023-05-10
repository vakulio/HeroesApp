export interface IBattle {
  userId: string;
  heroName: string;
  heroId: string;
  enemyName: string;
  timestamp: Date;
  result: string;
  docID?: string;
}
