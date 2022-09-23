import { GetOptions } from "../Questions/GetOptions";
import { GetQuestionResponse } from "../Questions/GetQuestionResponseI";

export interface GetQuestionProps {
  question: string;
  options: GetOptions[];
}
