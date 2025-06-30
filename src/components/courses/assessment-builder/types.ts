
export interface Question {
  id: string;
  type: 'MCQ' | 'Coding' | 'True/False' | 'Fill in the Blank';
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  points: number;
}
