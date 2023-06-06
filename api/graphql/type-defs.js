import { queryTypeDef } from "./queries.js";

// schema
import { commentTypeDef } from "./schema/comment.js";
import { groupTypeDef } from "./schema/group.js";
import { organizationTypeDef } from "./schema/organization.js";
import { projectTypeDef } from "./schema/project.js";
import { taskTypeDef } from "./schema/task.js";
import { teamTypeDef } from "./schema/team.js";
import { userTypeDef } from "./schema/user.js";

export const typeDefs = [
  userTypeDef,
  // organizationTypeDef,
  // groupTypeDef,
  // projectTypeDef,
  // taskTypeDef,
  // teamTypeDef,
  // commentTypeDef,
  queryTypeDef
]; 