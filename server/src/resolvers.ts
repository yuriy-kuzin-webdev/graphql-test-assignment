import { Category, ICategory } from './models/Category';
import { IRisk, Risk } from './models/Risk';

interface CategoryFilter {
    name?: string,
    description?: string,
    createdBy?: string,
}

interface RiskFilter {
    name?: string
    description?: string
    createdBy?: string
    resolved?: boolean
    categoryId?: any
}

type Filter = CategoryFilter | RiskFilter;

type PaginationArgs = {
    filter?: Filter
    page?: number,
    limit?: number,
}

export const resolvers = {
    Query: {
        categories: async (_: unknown, { filter = {}, page = 1, limit = 10 }: PaginationArgs) => {
            const skip = (page - 1) * limit;
            const [totalItems, categories] = await Promise.all([
                Category.countDocuments(filter),
                Category.find(filter).skip(skip).limit(limit)
            ]);

            const totalPages = Math.ceil(totalItems / limit);

            return {
                categories,
                totalPages,
                totalItems
            };
        },
        category: async (_: unknown, { id }: any) => {
            return await Category.findById(id);
        },
        risks: async (_: unknown, { filter = {}, page = 1, limit = 10 }: PaginationArgs) => {
            const skip = (page - 1) * limit;
            const [totalItems, risks] = await Promise.all([
                Risk.countDocuments(filter),
                Risk.find(filter).skip(skip).limit(limit)
            ]);

            const totalPages = Math.ceil(totalItems / limit);

            return {
                risks,
                totalPages,
                totalItems
            };
        },
        risk: async (_: unknown, { id }: any) => {
            return await Risk.findById(id);
        },
    },

    Mutation: {
        createCategory: async (_: unknown, { name, description, createdBy }: ICategory) => {
            const category = new Category({ name, description, createdBy });
            return await category.save();
        },
        updateCategory: async (_: unknown, { id, name, description }: ICategory) => {
            return await Category.findByIdAndUpdate(id, { name, description }, { new: true });
        },
        deleteCategory: async (_: unknown, { id }: ICategory) => {
            const result = await Category.findByIdAndDelete(id);
            return !!result;
        },

        createRisk: async (_: unknown, { name, description, categoryId, resolved, createdBy }: IRisk) => {
            const risk = new Risk({ name, description, categoryId, resolved, createdBy });
            return await risk.save();
        },
        updateRisk: async (_: unknown, { id, name, description, resolved }: IRisk) => {
            return await Risk.findByIdAndUpdate(id, { name, description, resolved }, { new: true });
        },
        deleteRisk: async (_: unknown, { id }: IRisk) => {
            const result = await Risk.findByIdAndDelete(id);
            return !!result;
        },
    },

    Category: {
        risks: async (category: ICategory) => {
            return await Risk.find({ categoryId: category._id })
        },
    },

    Risk: {
        category: async (risk: IRisk) => {
            return await Category.findById(risk.categoryId);
        },
    },
};
