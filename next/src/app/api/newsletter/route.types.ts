export type RequestTypes = {
  name: string;
  email: string;
  legal: boolean;
};

export type BodyTypes = {
  data: {
    type: 'profile',
    attributes: {
      email: string,
      first_name: string,
    },
  }
};
