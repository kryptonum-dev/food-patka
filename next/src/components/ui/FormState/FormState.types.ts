import type { FormStatusTypes } from '@/global/types';

export type FormStateTypes = {
  errorState: {
    heading: string;
    paragraph: string;
  }
  successState: {
    heading: string;
    paragraph: string;
  }
  isSuccess: FormStatusTypes['success'];
  setStatus: React.Dispatch<React.SetStateAction<FormStatusTypes>>;
}
