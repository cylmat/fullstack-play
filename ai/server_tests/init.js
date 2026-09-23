jest.mock("../server/clients/anth.agent.wrapper", () => ({
  query: jest.fn()
}));