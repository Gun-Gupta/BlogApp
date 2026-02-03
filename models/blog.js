import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnect.js';


const Blog = sequelize.define(
  'Blog',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

  },
  {
    tableName: 'blogs',
    timestamps: true
  }
);



export default Blog;
