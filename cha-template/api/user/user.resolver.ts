import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { user } from "./user.entity";

@Resolver()
export class User {
  @Query(() => String)
  hypebeast() {
    return "My awesome hypebeast app";
  }
  
  @Query(() => [user])
  read() {
    return user.find();
  }

  @Mutation(() => Boolean)
  async create(@Arg("name") name: string) {
    try {
      const create = user.create({
        name: name,
      });
      await create.save();
    } catch (err) {
      console.log(err.message);
      return false;
    }

    return true;
  }

  @Mutation(() => Boolean)
  async update(@Arg("id") id: number, @Arg("name") name: string) {
    await user.update({ id }, { name: name });

    return true;
  }

  @Mutation(() => Boolean)
  async delete(@Arg("id") id: number) {
    await user.delete({ id });

    return true;
  }
}
