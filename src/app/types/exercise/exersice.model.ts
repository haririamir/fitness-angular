export interface IExersice {
  name: string;
  description: string;
  exercise_id: number;
  category_id: number;
  category: ICategory;
}

interface ICategory {
  category_id: number;
  name: string;
}
