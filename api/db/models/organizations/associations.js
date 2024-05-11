const { db } = require('../../../services/database');

db.Organizations.hasMany(db.Teams, {
  foreignKey: 'organizationId',
});

db.Organizations.belongsTo(db.Users, {
  foreignKey: 'ownedBy',
  as: 'organizationOwner',
});

db.Organizations.belongsToMany(db.Users, {
  through: db.OrganizationMembers,
  foreignKey: 'organizationId',
  otherKey: 'userId',
});
