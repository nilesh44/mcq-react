export interface OptionProps {
  srNo: number;
  id: string;
  value: string;
  removeOption(event: React.MouseEvent<HTMLButtonElement>): void;
  checked: boolean;

  getCorrectAnswer(
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ): void;
}
