export interface QuestionParagraph {
  type: 'paragraph',
  title: string,
  answer?: string;
  required?: boolean;
}

export interface QuestionCheckList {
  type: 'check_list',
  title: string,
  options: { id: number, content: string, selected?: boolean }[],
  required?: boolean;
}

export type Question = QuestionParagraph | QuestionCheckList;

