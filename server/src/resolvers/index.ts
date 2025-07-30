import mutation from "./mutation";
import query from "./query";
import {subscription} from "./subscription";

const resolvers = {
  Subscription: subscription,
  Query: query,
  Mutation: mutation
}

export default resolvers;