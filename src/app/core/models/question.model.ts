// question.model.ts
export interface Question {
  id: number;
  text: string;
  image?: string;
  description?: string;
  options: string[];
  selectedAnswer?: number;
}

export interface ExamSubmission {
  categoryId: number;
  answers: {
    questionId: number;
    selectedOption: number;
  }[];
}