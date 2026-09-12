import { Category } from '../models/category.model.js';
import { Business } from '../models/business.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const defaultCategories = [
  { name: 'IT Services', slug: 'it-services', icon: 'Code', description: 'Software, cloud, web & IT support' },
  { name: 'Restaurants', slug: 'restaurants', icon: 'Utensils', description: 'Dining, cafes, executive catering' },
  { name: 'Healthcare', slug: 'healthcare', icon: 'Activity', description: 'Clinics, diagnostic centers & wellness' },
  { name: 'Education', slug: 'education', icon: 'GraduationCap', description: 'Academies, coaching & professional STEM' },
  { name: 'Real Estate', slug: 'real-estate', icon: 'Building2', description: 'Commercial leases & managed spaces' },
  { name: 'Finance', slug: 'finance', icon: 'Briefcase', description: 'Corporate taxation, legal & advisory' },
];

/**
 * @desc    Get all categories with dynamic count from MongoDB
 * @route   GET /api/v1/categories
 * @access  Public
 */
export const getAllCategories = asyncHandler(async (req, res) => {
  let categories = await Category.find().sort({ createdAt: 1 }).lean();

  if (!categories || categories.length === 0) {
    await Category.insertMany(defaultCategories);
    categories = await Category.find().sort({ createdAt: 1 }).lean();
  }

  // Calculate live count of businesses in each category
  const counts = await Business.aggregate([
    { $match: { status: 'active' } },
    { $group: { _id: '$category', total: { $sum: 1 } } },
  ]);

  const countMap = {};
  counts.forEach((c) => {
    if (c._id) countMap[c._id.toLowerCase()] = c.total;
  });

  const categoriesWithCounts = categories.map((cat) => ({
    id: cat._id.toString(),
    name: cat.name,
    slug: cat.slug,
    icon: cat.icon || 'Folder',
    description: cat.description || '',
    count: countMap[cat.name.toLowerCase()] || 0,
    createdAt: cat.createdAt,
    updatedAt: cat.updatedAt,
  }));

  return res.status(200).json(
    new ApiResponse(
      200,
      categoriesWithCounts,
      'Categories retrieved successfully from MongoDB'
    )
  );
});

/**
 * @desc    Create a new category in MongoDB
 * @route   POST /api/v1/categories
 * @access  Admin
 */
export const createCategory = asyncHandler(async (req, res) => {
  const { name, description, icon } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json(new ApiResponse(400, null, 'Category name is required'));
  }

  const trimmedName = name.trim();
  const slug = trimmedName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const existing = await Category.findOne({
    $or: [
      { name: { $regex: new RegExp(`^${trimmedName}$`, 'i') } },
      { slug },
    ],
  });

  if (existing) {
    return res.status(409).json(new ApiResponse(409, null, `Category "${trimmedName}" already exists`));
  }

  const newCategory = await Category.create({
    name: trimmedName,
    slug,
    icon: icon || 'Folder',
    description: description?.trim() || '',
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        id: newCategory._id.toString(),
        name: newCategory.name,
        slug: newCategory.slug,
        icon: newCategory.icon,
        description: newCategory.description,
        count: 0,
      },
      'Category created successfully'
    )
  );
});

/**
 * @desc    Update an existing category and sync all assigned businesses
 * @route   PUT /api/v1/categories/:id
 * @access  Admin
 */
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, icon } = req.body;

  const category = await Category.findById(id);
  if (!category) {
    return res.status(404).json(new ApiResponse(404, null, 'Category not found'));
  }

  const oldName = category.name;
  let newName = oldName;

  if (name && name.trim() && name.trim() !== oldName) {
    newName = name.trim();

    // Check if new name conflicts with another existing category
    const duplicate = await Category.findOne({
      _id: { $ne: id },
      name: { $regex: new RegExp(`^${newName}$`, 'i') },
    });

    if (duplicate) {
      return res.status(409).json(new ApiResponse(409, null, `A category with name "${newName}" already exists`));
    }

    category.name = newName;
    category.slug = newName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // DYNAMIC SYNC: Update all businesses in MongoDB that were assigned to the old category name!
    await Business.updateMany(
      { category: { $regex: new RegExp(`^${oldName}$`, 'i') } },
      { $set: { category: newName } }
    );
  }

  if (description !== undefined) {
    category.description = description.trim();
  }

  if (icon) {
    category.icon = icon;
  }

  await category.save();

  // Get live count for updated category
  const activeCount = await Business.countDocuments({
    status: 'active',
    category: { $regex: new RegExp(`^${category.name}$`, 'i') },
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        id: category._id.toString(),
        name: category.name,
        slug: category.slug,
        icon: category.icon,
        description: category.description,
        count: activeCount,
        oldName: oldName !== newName ? oldName : undefined,
      },
      'Category updated and assigned businesses synchronized successfully'
    )
  );
});

/**
 * @desc    Delete category from MongoDB
 * @route   DELETE /api/v1/categories/:id
 * @access  Admin
 */
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) {
    return res.status(404).json(new ApiResponse(404, null, 'Category not found'));
  }

  const categoryName = category.name;
  await Category.findByIdAndDelete(id);

  return res.status(200).json(
    new ApiResponse(
      200,
      { id, name: categoryName },
      `Category "${categoryName}" deleted successfully`
    )
  );
});
