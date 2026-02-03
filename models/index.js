import User from './user.js';
import Blog from './blog.js';

User.hasMany(Blog, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  }
});

export { User, Blog };
