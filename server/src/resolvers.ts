import { Category } from './models/Category';
import { Risk } from './models/Risk';

export const resolvers = {
  Query: {
    categories: async (_, { filter, page = 1, limit = 10 }) => {
      const skip = (page - 1) * limit;
      const query = filter ? { ...filter } : {};
      return await Category.find(query).skip(skip).limit(limit);
    },
    category: async (_, { id }) => {
      return await Category.findById(id);
    },
    risks: async (_, { filter, page = 1, limit = 10 }) => {
      const skip = (page - 1) * limit;
      const query = filter ? { ...filter } : {};
      return await Risk.find(query).skip(skip).limit(limit);
    },
    risk: async (_, { id }) => {
      return await Risk.findById(id);
    },
  },

  Mutation: {
    createCategory: async (_, { name, description, createdBy }) => {
      const category = new Category({ name, description, createdBy });
      return await category.save();
    },
    updateCategory: async (_, { id, name, description }) => {
      return await Category.findByIdAndUpdate(id, { name, description }, { new: true });
    },
    deleteCategory: async (_, { id }) => {
      const result = await Category.findByIdAndDelete(id);
      return !!result;
    },

    createRisk: async (_, { name, description, categoryId, resolved, createdBy }) => {
      const risk = new Risk({ name, description, categoryId, resolved, createdBy });
      return await risk.save();
    },
    updateRisk: async (_, { id, name, description, resolved }) => {
      return await Risk.findByIdAndUpdate(id, { name, description, resolved }, { new: true });
    },
    deleteRisk: async (_, { id }) => {
      const result = await Risk.findByIdAndDelete(id);
      return !!result;
    },
  },
};
