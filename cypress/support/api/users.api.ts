export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type UsersResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: {
    url: string;
    text: string;
  };
};

type QueryParams = Record<string, any>;

export const getUsers = (queryParams?: QueryParams) => {
  return cy.request({
    method: 'GET',
    url: 'https://reqres.in/api/users',
    qs: queryParams,
    headers: {
      'x-api-key': Cypress.env('reqresApiKey'),
    },
  });
};