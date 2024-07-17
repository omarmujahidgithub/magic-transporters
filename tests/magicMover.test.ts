import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";

beforeAll(async () => {
  const url = `mongodb://localhost:27017/magicTransportersTest`;
  await mongoose.connect(
    "mongodb://127.0.0.1:27017/magicTransporters?retryWrites=true&loadBalanced=false&connectTimeoutMS=10000",
    {
      bufferCommands: false,
      dbName: "magicTransporters",
      autoIndex: true,
      autoCreate: true,
    }
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Magic Mover API", () => {
  it("should create a new Magic Mover", async () => {
    const res = await request(app).post("/api/magic-movers").send({
      weight_limit: 100,
      quest_state: "resting",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
  });

  it("should load a Magic Mover with items", async () => {
    const moverRes = await request(app).post("/api/magic-movers").send({
      weight_limit: 100,
      quest_state: "loading",
    });
    const moverId = moverRes.body._id;

    const itemRes = await request(app).post("/api/magic-items").send({
      name: "Magic Wand",
      weight: 10,
    });
    const itemId = itemRes.body._id;

    const res = await request(app)
      .post("/api/magic-movers/load")
      .send({
        moverId,
        items: [itemId],
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.items).toContain(itemId);
  });

  it("should start a mission for a Magic Mover", async () => {
    const moverRes = await request(app).post("/api/magic-movers").send({
      weight_limit: 100,
      quest_state: "loading",
    });
    const moverId = moverRes.body._id;

    const res = await request(app)
      .post("/api/magic-movers/start-mission")
      .send({
        moverId,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.quest_state).toEqual("on-mission");
  });

  it("should end a mission for a Magic Mover", async () => {
    const moverRes = await request(app).post("/api/magic-movers").send({
      weight_limit: 100,
      quest_state: "on-mission",
    });
    const moverId = moverRes.body._id;

    const res = await request(app).post("/api/magic-movers/end-mission").send({
      moverId,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.quest_state).toEqual("resting");
  });

  it("should list Magic Movers by missions completed", async () => {
    const res = await request(app).get("/api/magic-movers/top-movers");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
