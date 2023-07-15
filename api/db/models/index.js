const { sequelize } = require('..');
const fs = require('fs');

const db = {
  models: {},
};

db.sequelize = sequelize;

// Specify the directory path
const directoryPath = './db/models';

try {
  const files = fs.readdirSync(directoryPath);

  // Iterate through the files array and log each filename
  files.forEach(file => {
    if (file === 'index.js') return;

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

// ================ Model relationships ==============
db.models.Users.hasMany(db.models.Organizations, {
  foreignKey: 'ownedBy',
  as: 'OwnedOrganizations',
});

db.models.Organizations.belongsTo(db.models.Users, {
  foreignKey: 'ownedBy',
  as: 'Owner',
});

db.models.Organizations.hasMany(db.models.Teams, {
  foreignKey: 'organizationId',
});

db.models.Teams.belongsTo(db.models.Organizations, {
  foreignKey: 'organizationId',
});

db.models.TeamMembers.belongsTo(db.models.Users, {
  foreignKey: 'userId',
  as: 'Member',
});

db.models.TeamMembers.belongsTo(db.models.Teams, {
  foreignKey: 'teamId',
  as: 'Team',
});

db.models.TeamMembers.belongsTo(db.models.Roles, {
  foreignKey: 'roleId',
  as: 'Role',
});

db.models.Teams.hasMany(db.models.TeamMembers, {
  foreignKey: 'teamId',
  as: 'TeamMembers',
});

db.models.Users.hasMany(db.models.TeamMembers, {
  foreignKey: 'userId',
  as: 'TeamMembers',
});

db.models.Roles.hasMany(db.models.TeamMembers, {
  foreignKey: 'roleId',
  as: 'TeamMembers',
});

db.models.Users.hasMany(db.models.Projects, {
  foreignKey: 'createdBy',
  as: 'CreatedProjects',
});

db.models.Projects.belongsTo(db.models.Users, {
  foreignKey: 'createdBy',
  as: 'ProjectCreator',
});

db.models.Teams.hasMany(db.models.Projects, {
  foreignKey: 'teamId',
});

db.models.Projects.belongsTo(db.models.Teams, {
  foreignKey: 'teamId',
  as: 'Team',
});

db.models.Tasks.belongsTo(db.models.Users, {
  foreignKey: 'createdBy',
  as: 'TaskCreator',
});

db.models.Users.hasMany(db.models.Tasks, {
  foreignKey: 'createdBy',
});

db.models.ProjectTasks.belongsTo(db.models.Tasks, {
  foreignKey: 'taskId',
  as: 'Task',
});

db.models.ProjectTasks.belongsTo(db.models.Projects, {
  foreignKey: 'projectId',
  as: 'Project',
});

db.models.Projects.hasMany(db.models.ProjectTasks, {
  foreignKey: 'projectId',
  as: 'ProjectTasks',
});

db.models.Tasks.hasMany(db.models.ProjectTasks, {
  foreignKey: 'taskId',
  as: 'ProjectTasks',
});

db.models.TaskAssignees.belongsTo(db.models.Tasks, {
  foreignKey: 'taskId',
  as: 'Task',
});

db.models.TaskAssignees.belongsTo(db.models.Users, {
  foreignKey: 'assignee',
  as: 'Assignee',
});

db.models.Users.hasMany(db.models.TaskAssignees, {
  foreignKey: 'assignee',
  as: 'AssignedTasks',
});

db.models.Tasks.hasMany(db.models.TaskAssignees, {
  foreignKey: 'taskId',
  as: 'Assignees',
});

module.exports = {
  db,
};
