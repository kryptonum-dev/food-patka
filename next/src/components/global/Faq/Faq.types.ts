export type FaqTypes = {
  heading: string;
  paragraph: string;
  list: {
    question: string;
    answer: string;
  }[];
}

export type ListTypes = {
  list: {
    question: React.ReactNode;
    answer: React.ReactNode;
  }[];
}