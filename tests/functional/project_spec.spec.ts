import { test } from "@japa/runner";

test.group("Project spec ts", () => {
  test("test create user", async ({ client }) => {
    const response = await client.post("/register").json({
      email: "mohamedtine17@gmail.com",
      password: "@71bis32@",
    });

    response.assertBodyContains({ email: "mohamedtine17@gmail.com" });
    response.assertStatus(200);
  });

  test("test post", async ({ client }) => {
    const response = await client.post("/").form({
      nom: "Mohamed",
      user_id: 1,
    });

    response.assertBodyContains({ nom: "Mohamed" });
    response.assertStatus(200);
  });

  test("test get", async ({ client }) => {
    const response = await client.get("/");

    response.assertStatus(200);
  });

  test("test delete", async ({ client }) => {
    const response = await client.delete("/1");

    response.assertStatus(200);
  });
});
