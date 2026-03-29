import { getUsers, User, UsersResponse } from "../../support/api/users.api";

describe('ReqRes Users API', () => {

  it('should return the expected top-level response structure', () => {
    getUsers().then((response) => {
      expect(response.status).to.eq(200);

      const body = response.body as UsersResponse;

      expect(body).to.have.property('page');
      expect(body).to.have.property('per_page');
      expect(body).to.have.property('total');
      expect(body).to.have.property('total_pages');
      expect(body).to.have.property('data');
      expect(body).to.have.property('support');

      expect(body.data).to.be.an('array');
      expect(body.support).to.be.an('object');
    });
  });

  it('should return users with the expected field types', () => {
    getUsers().then((response) => {
      expect(response.status).to.eq(200);

      const users = (response.body as UsersResponse).data;

      expect(users).to.be.an('array').and.not.be.empty;
      
      users.forEach((user: User) => {
        expect(user.id).to.be.a('number');
        expect(user.email).to.be.a('string').and.include('@');
        expect(user.first_name).to.be.a('string');
        expect(user.last_name).to.be.a('string');
        expect(user.avatar).to.be.a('string').and.not.be.empty;
      });
    });
  });

  it('should handle pagination consistently', () => {
    getUsers({ page: 2 }).then((response) => {
      expect(response.status).to.eq(200);

      const body = response.body as UsersResponse;

      expect(body.page).to.eq(2);
      expect(body.data.length).to.be.at.most(body.per_page);
      expect(body.total_pages).to.be.greaterThan(0);
    });
  });

  it('should return 403 for invalid API key', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users',
      headers: {
        'x-api-key': 'invalid_key',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });

});