export interface IExersice {
  id?: number;
  name: string;
  description: string;
  category_id: number;
  category?: ICategory;
}

interface ICategory {
  category_id: number;
  name: string;
}
