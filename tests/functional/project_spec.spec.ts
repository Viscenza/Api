import { test } from "@japa/runner";
import User from "App/Models/User";

test.group("Project test success", () => {
  test("test to create user", async ({ client }) => {
    const response = await client.post("/register").json({
      email: "mohamedtine17@gmail.com",
      password: "@71bis32@",
    });

    response.assertBody({ message: "Success" });
    response.assertStatus(200);
  });

  test("test to create project", async ({ client }) => {
    const user = await User.findOrFail(1);
    const response = await client
      .post("/")
      .json({
        user_id: 1,
        nom: "test 12",
      })
      .guard("api")
      .loginAs(user);

    response.assertBody({ message: "Success" });
    response.assertStatus(200);
  });

  test("test dispolay projects", async ({ client }) => {
    const user = await User.findOrFail(1);
    const response = await client.get("/").guard("api").loginAs(user);

    response.assertBody([{ id: 1, nom: "test 12", user_id: 1 }]);
    response.assertStatus(200);
  });

  test("test to delete", async ({ client }) => {
    const user = await User.findOrFail(1);
    const response = await client.delete("/1").guard("api").loginAs(user);

    response.assertStatus(200);
  });
});
