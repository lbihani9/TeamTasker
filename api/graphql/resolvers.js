import { queryResolver } from "./queries.js";
import { userResolver } from "./schema/user.js";
// import { organizationResolver } from "./schema/organization.js";
// import { groupResolver } from "./schema/group.js";
// import { projectResolver } from "./schema/project.js";
// import { taskResolver } from "./schema/task.js";
// import { commentResolver } from "./schema/comment.js";
// import { teamResolver } from "./schema/team.js";
import pkg from "lodash";
const { merge } = pkg;

export const resolvers = merge(
  userResolver,
  queryResolver
  // organizationResolver,
  // groupResolver,
  // projectResolver,
  // taskResolver,
  // teamResolver,
  // commentResolver
);