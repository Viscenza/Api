import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "App/Models/User";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    User.create({
      email: "mohamedtine077@gmail.com",
      password: "@71bis32@",
    });
  }
}
