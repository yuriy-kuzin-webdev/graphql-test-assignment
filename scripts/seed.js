db = db.getSiblingDB('graphql');

const date = new Date()

const categories = Array.from({ length: 20 }).map((_, index) => ({
  name: `Category ${index}`,
  description: `Description for category ${index}`,
  createdBy: 'Seed',
  deleted: false,
  createdAt: date,
  updatedAt: date,
}));

db.categories.insertMany(categories)

categories.forEach((category) => {
  const categoryId = db.categories.findOne({ name: category.name})._id;
  const risks = Array.from({ length: 50 }).map((_, index) => ({
    name: `Risk ${index}`,
    description: `Description for risk ${index}`,
    categoryId,
    resolved: false,
    createdBy: 'Seed',
    createdAt: date,
    updatedAt: date,
  }))
  db.risks.insertMany(risks);
});
