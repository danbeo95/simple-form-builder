export interface QuestionParagraph {
  type: 'paragraph',
  title: string,
  answer?: string;
  required?: boolean;
}

export interface QuestionCheckList {
  type: 'check_list',
  title: string,
  options: { id: number, content: string, selected?: boolean, answer?: string }[],
  required?: boolean;
  allow_other_options?: boolean;
}

export type Question = QuestionParagraph | QuestionCheckList;

