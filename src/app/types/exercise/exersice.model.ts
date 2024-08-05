export interface IExersice {
  name: string;
  description: string;
  exercise_id: number;
  category: ICategory;
  cateogry_id: number;
}

interface ICategory {
  cateogry_id: number;
  name: string;
}
