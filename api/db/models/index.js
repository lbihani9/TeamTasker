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
  files.forEach((file) => {
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
  as: 'OwnedOrganizations',
});

db.models.Organizations.hasMany(db.models.Teams, {
  foreignKey: 'organizationId',
});

db.models.Teams.belongsTo(db.models.Organizations, {
  foreignKey: 'organizationId',
});

db.models.Roles.hasMany(db.models.TeamMembers, {
  foreignKey: 'roleId',
  as: 'TeamMemberRoles',
});

db.models.TeamMembers.belongsTo(db.models.Roles, {
  foreignKey: 'roleId',
  as: 'TeamMemberRoles',
});

db.models.Teams.belongsToMany(db.models.Users, {
  through: db.models.TeamMembers,
  foreignKey: 'teamId',
  otherKey: 'userId',
});

db.models.Users.belongsToMany(db.models.Teams, {
  through: db.models.TeamMembers,
  foreignKey: 'userId',
  otherKey: 'teamId',
});

db.models.Users.hasMany(db.models.Projects, {
  foreignKey: 'createdBy',
  as: 'ProjectCreator',
});

db.models.Projects.belongsTo(db.models.Users, {
  foreignKey: 'createdBy',
  as: 'ProjectCreator',
});

db.models.Teams.hasMany(db.models.Projects, {
  foreignKey: 'teamId',
  as: 'TeamProjects',
});

db.models.Projects.belongsTo(db.models.Teams, {
  foreignKey: 'teamId',
  as: 'TeamProjects',
});

db.models.Users.hasMany(db.models.Tasks, {
  foreignKey: 'createdBy',
  as: 'TaskCreator',
});

db.models.Tasks.belongsTo(db.models.Users, {
  foreignKey: 'createdBy',
  as: 'TaskCreator',
});

db.models.Projects.hasMany(db.models.Tasks, {
  foreignKey: 'projectId',
});

db.models.Tasks.belongsTo(db.models.Project, {
  foreignKey: 'projectId',
});

db.models.Tasks.belongsToMany(db.models.Users, {
  through: db.models.TaskAssignees,
  foreignKey: 'taskId',
  otherKey: 'assignee',
});

db.models.Users.belongsToMany(db.models.Tasks, {
  through: db.models.TaskAssignees,
  foreignKey: 'assignee',
  otherKey: 'taskId',
});

db.models.Organizations.belongsToMany(db.models.Users, {
  through: db.models.OrganizationMembers,
  foreignKey: 'organizationId',
  otherKey: 'userId',
});

db.models.Users.belongsToMany(db.models.Organizations, {
  through: db.models.OrganizationMembers,
  foreignKey: 'userId',
  otherKey: 'organizationId',
});

db.models.OrganizationMembers.belongsTo(db.models.Roles, {
  foreignKey: 'roleId',
});

db.models.Roles.hasMany(db.models.OrganizationMembers, {
  foreignKey: 'roleId',
});

module.exports = {
  db,
};
