import { GetOptions } from "./GetOptions";
export interface GetQuestionResponse {
  questionId: number;
  question: string;
  options: GetOptions[];
}
