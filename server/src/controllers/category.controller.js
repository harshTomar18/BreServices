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
  let categories = await Category.find().lean();

  if (!categories || categories.length === 0) {
    await Category.insertMany(defaultCategories);
    categories = await Category.find().lean();
  }

  // Calculate live count of businesses in each category
  const counts = await Business.aggregate([
    { $match: { status: 'active' } },
    { $group: { _id: '$category', total: { $sum: 1 } } },
  ]);

  const countMap = {};
  counts.forEach((c) => {
    countMap[c._id] = c.total;
  });

  const categoriesWithCounts = categories.map((cat) => ({
    id: cat._id.toString(),
    name: cat.name,
    slug: cat.slug,
    icon: cat.icon,
    description: cat.description,
    count: countMap[cat.name] || 0,
  }));

  return res.status(200).json(
    new ApiResponse(
      200,
      categoriesWithCounts,
      'Categories retrieved successfully from MongoDB'
    )
  );
});
