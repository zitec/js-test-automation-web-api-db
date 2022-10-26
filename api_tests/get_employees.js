const { spec, request } = require("pactum");

describe("API Test suite", () => {
  let jwt = "";

  before(async () => {
    console.log("before");

    request.setDefaultTimeout(15000);
    request.setBaseUrl("https://qa-practice.herokuapp.com");
  });

  beforeEach(async () => {
    console.log("before each");
  });

  it("GET specific employee", async () => {
    const expectResponse = {
      id: 1,
      firstName: "Razvan",
      lastName: "Smith",
      dob: "1994-05-06",
      email: "iamqarv@gmail.com",
    };

    await spec()
      .get("/api/v1/employees/1")
      // .inspect()
      .expectStatus(200)
      .expectBody(expectResponse);
  });

  it("Get JWT test", async () => {
    const USER_REQUEST_CREDS = { username: "admin", password: "admin" };

    const resp = await spec()
      .post("/api/v1/simulate/token")
      .withHeaders("Content-Type", "application/json")
      .withBody(USER_REQUEST_CREDS)
      .stores("token", "[0].token")
      .expectStatus(200);

    jwt = resp.body.token;
    console.log(resp.body.token);
  });

  it("Get employees with JWT endpoint test", async () => {
    const resp = await spec()
      .get("/api/v1/simulate/get/employees")
      .withHeaders("Authorization", "Bearer " + jwt)
      // .inspect()
      .expectStatus(200)
      .expectResponseTime(500);

    console.log(resp.body.token);
  });
});
