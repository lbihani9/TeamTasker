const fs = require('fs');

const db = {
  models: {},
};

const directoryPath = './db/models';

try {
  const files = fs.readdirSync(directoryPath);

  files.forEach((file) => {
    const model = require(`./${file}`);
    const [k, _] = Object.keys(model);
    if (typeof k !== 'undefined') {
      db.models = {
        ...db.models,
        ...model,
      };
    }
  });
} catch (err) {
  console.error('Error reading directory:', err);
  process.exit(1);
}

module.exports = {
  models: db.models,
};

// ====================== Sessions

db.models.Sessions.belongsTo(db.models.Users, {
  foreignKey: 'userId',
});

// ====================== Labels

db.models.Labels.belongsTo(db.models.Users, {
  foreignKey: 'labelableId',
  constraints: false,
});

db.models.Labels.belongsTo(db.models.Teams, {
  foreignKey: 'labelableId',
  constraints: false,
});

db.models.Labels.belongsToMany(db.models.Tasks, {
  through: db.models.TaskLabels,
  foreignKey: 'labelId',
  otherKey: 'taskId',
});

// ======================== Organizations

db.models.Organizations.hasMany(db.models.Teams, {
  foreignKey: 'organizationId',
});

db.models.Organizations.belongsTo(db.models.Users, {
  foreignKey: 'ownedBy',
  as: 'organizationOwner',
});

db.models.Organizations.belongsToMany(db.models.Users, {
  through: db.models.OrganizationMembers,
  userId: 'organizationId',
  otherKey: 'userId',
});

// ========================== Projects

db.models.Projects.belongsTo(db.models.Users, {
  foreignKey: 'projectableId',
  constraints: false,
});

db.models.Projects.belongsTo(db.models.Teams, {
  foreignKey: 'projectableId',
  constraints: false,
});

db.models.Projects.belongsTo(db.models.Users, {
  foreignKey: 'createdBy',
  as: 'projectAuthor',
});

db.models.Projects.hasMany(db.models.Tasks, {
  foreignKey: 'taskableId',
  constraints: false,
  scope: {
    taskableType: 'project',
  },
});

db.models.Projects.hasMany(db.models.Statuses, {
  foreignKey: 'statusableId',
  constraints: false,
  scope: {
    taskableType: 'project',
  },
});

// ============================== Statuses

db.models.Statuses.hasMany(db.models.Tasks, {
  foreignKey: 'statusId',
});

db.models.Statuses.belongsTo(db.models.Projects, {
  foreignKey: 'statusableId',
  constraints: false,
});

db.models.Statuses.belongsTo(db.models.Users, {
  foreignKey: 'statusableId',
  constraints: false,
});

// ==================== TaskComments

db.models.TaskComments.belongsTo(db.models.Tasks, {
  foreignKey: 'taskId',
});

db.models.TaskComments.belongsTo(db.models.Users, {
  foreignKey: 'createdBy',
});

// ==================== Tasks

db.models.Tasks.hasMany(db.models.TaskComments, {
  foreignKey: 'taskId',
});

db.models.Tasks.belongsToMany(db.models.Users, {
  through: db.models.TaskAssignees,
  as: 'assignees',
  foreignKey: 'taskId',
  otherKey: 'userId',
});

db.models.Tasks.belongsTo(db.models.Users, {
  foreignKey: 'createdBy',
  as: 'taskAuthor',
});

db.models.Tasks.belongsTo(db.models.Users, {
  foreignKey: 'taskableId',
  constraints: false,
});

db.models.Tasks.belongsTo(db.models.Projects, {
  foreignKey: 'taskableId',
  constraints: false,
});

db.models.Tasks.belongsTo(db.models.Statuses, {
  foreignKey: 'statusId',
});

db.models.Tasks.belongsToMany(db.models.Labels, {
  through: db.models.TaskLabels,
  foreignKey: 'taskId',
  otherKey: 'labelId',
});

// ======================= TaskLabels
db.models.TaskLabels.belongsTo(db.models.Labels, {
  foreignKey: 'labelId',
});

db.models.TaskLabels.belongsTo(db.models.Tasks, {
  foreignKey: 'taskId',
});

// ======================= TaskAssignees

// db.models.TaskAssignees.belongsTo(db.models.Tasks, {
//   foreignKey: 'taskId',
// });

// db.models.TaskAssignees.belongsTo(db.models.Users, {
//   foreignKey: 'userId',
// });

// ======================= TeamMembers

db.models.TeamMembers.belongsTo(db.models.Users, {
  foreignKey: 'userId',
});

db.models.TeamMembers.belongsTo(db.models.Teams, {
  foreignKey: 'teamId',
});

// ======================== Teams

db.models.Teams.belongsTo(db.models.Organizations, {
  foreignKey: 'organizationId',
});

db.models.Teams.hasMany(db.models.Labels, {
  foreignKey: 'labelableId',
  constraints: false,
  scope: {
    taskableType: 'user',
  },
});

db.models.Teams.belongsToMany(db.models.Users, {
  through: db.models.TeamMembers,
  foreignKey: 'teamId',
  otherKey: 'userId',
});

db.models.Teams.hasMany(db.models.Projects, {
  foreignKey: 'projectableId',
  constraints: false,
  scope: {
    taskableType: 'team',
  },
});

// ======================= Users

db.models.Users.hasMany(db.models.Sessions, {
  foreignKey: 'userId',
});

db.models.Users.hasMany(db.models.Projects, {
  foreignKey: 'projectableId',
  constraints: false,
  scope: {
    taskableType: 'user',
  },
});

db.models.Users.belongsToMany(db.models.Tasks, {
  through: db.models.TaskAssignees,
  as: 'assignedTasks',
  foreignKey: 'userId',
  otherKey: 'taskId',
});

db.models.Users.hasMany(db.models.Tasks, {
  foreignKey: 'taskableId',
  constraints: false,
  scope: {
    taskableType: 'user',
  },
});

db.models.Users.hasMany(db.models.Tasks, {
  foreignKey: 'createdBy',
  as: 'createdTasks',
});

db.models.Users.hasMany(db.models.Statuses, {
  foreignKey: 'statusableId',
  constraints: false,
  scope: {
    taskableType: 'user',
  },
});

db.models.Users.hasMany(db.models.Projects, {
  foreignKey: 'createdBy',
  as: 'createdProjects',
});

db.models.Users.hasMany(db.models.Organizations, {
  foreignKey: 'organizationId',
  as: 'ownedOrganizations',
});

db.models.Users.hasMany(db.models.Labels, {
  foreignKey: 'labelableId',
  constraints: false,
  scope: {
    taskableType: 'user',
  },
});

db.models.Users.belongsToMany(db.models.Teams, {
  through: db.models.TeamMembers,
  foreignKey: 'userId',
  otherKey: 'teamId',
});

db.models.Users.belongsToMany(db.models.Organizations, {
  through: db.models.OrganizationMembers,
  foreignKey: 'userId',
  otherKey: 'organizationId',
});

db.models.Users.hasMany(db.models.TaskComments, {
  foreignKey: 'createdBy',
});
