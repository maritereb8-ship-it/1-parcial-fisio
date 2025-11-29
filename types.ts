export interface Question {
  id: number;
  numberStr: string;
  question: string;
  answerOption: string;
  answerText: string;
  category: 'Motor' | 'Cerebelo' | 'ACV' | 'P. Intracraneal' | 'General' | 'Clínica';
}