export interface Question {
  id: number;
  text: string;
  description?: string;
  image?: string;
  options: string[];
  data: any;
}
