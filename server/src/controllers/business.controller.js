import { Business } from '../models/business.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Initial business data to seed into MongoDB when collection is empty
 */
const initialDirectoryBusinesses = [
  {
    name: 'TechNova Solutions',
    category: 'IT Services',
    city: 'Noida',
    location: 'Noida, India',
    address: 'Sector 62, Electronic City, Noida, UP 201309',
    phone: '+91 98112 34567',
    email: 'contact@technova.in',
    website: 'https://technova.example.com',
    description: 'Enterprise cloud & software engineering. Specialized in multi-cloud architecture and high-throughput systems.',
    fullDescription: 'TechNova Solutions is an ISO-certified enterprise IT services and digital transformation provider based in Noida.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=200&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 128,
    verified: true,
    openNow: true,
    acceptsBookings: true,
    status: 'active',
  },
  {
    name: 'Urban Eats',
    category: 'Restaurants',
    city: 'Delhi',
    location: 'New Delhi, India',
    address: 'Connaught Place, Inner Circle, New Delhi 110001',
    phone: '+91 98765 43210',
    email: 'hello@urbaneats.in',
    website: 'https://urbaneats.example.com',
    description: 'Artisanal multi-cuisine & executive catering for enterprise summits, corporate events and private dining.',
    fullDescription: 'Award-winning culinary destination located in the heart of Connaught Place, serving authentic farm-to-table cuisine.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 342,
    verified: true,
    openNow: true,
    acceptsBookings: true,
    status: 'active',
  },
  {
    name: 'HealthPlus Clinic',
    category: 'Healthcare',
    city: 'Gurugram',
    location: 'Gurugram, India',
    address: 'Golf Course Road, DLF Phase 5, Gurugram 122002',
    phone: '+91 99100 88221',
    email: 'care@healthplusclinic.in',
    website: 'https://healthplus.example.com',
    description: 'Advanced outpatient diagnostics & wellness programs tailored for corporate employees and families.',
    fullDescription: 'Comprehensive outpatient polyclinic featuring multi-speciality consultations and diagnostic testing.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 210,
    verified: true,
    openNow: true,
    acceptsBookings: true,
    status: 'active',
  },
  {
    name: 'Apex Law Partners',
    category: 'Finance',
    city: 'Delhi',
    location: 'New Delhi, India',
    address: 'Barakhamba Road, Connaught Place, New Delhi 110001',
    phone: '+91 98101 22334',
    email: 'info@apexlaw.in',
    website: 'https://apexlaw.example.com',
    description: 'Corporate compliance, taxation, cross-border M&A structuring, and corporate intellectual property advisory.',
    fullDescription: 'Premier boutique corporate legal advisory firm serving Fortune 500 multinationals and high-growth ventures.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 95,
    verified: true,
    openNow: true,
    acceptsBookings: false,
    status: 'active',
  },
  {
    name: 'EduSmart Academy',
    category: 'Education',
    city: 'Noida',
    location: 'Noida, India',
    address: 'Sector 18, Commercial Belt, Noida, UP 201301',
    phone: '+91 98188 55443',
    email: 'admissions@edusmart.in',
    website: 'https://edusmart.example.com',
    description: 'Executive leadership coaching, certified corporate STEM training, and university readiness programs.',
    fullDescription: 'Accredited international coaching institute delivering cutting-edge technical bootcamps.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=200&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewsCount: 164,
    verified: true,
    openNow: true,
    acceptsBookings: true,
    status: 'active',
  },
  {
    name: 'Horizon Living Spaces',
    category: 'Real Estate',
    city: 'Gurugram',
    location: 'Gurugram, India',
    address: 'Cyber City, DLF Phase 2, Gurugram 122002',
    phone: '+91 98111 99887',
    email: 'connect@horizonspaces.in',
    website: 'https://horizonspaces.example.com',
    description: 'Premium commercial leases, managed tech parks, and luxury residential real estate portfolio advisory.',
    fullDescription: 'Leading real estate advisory and development firm helping multinational organizations secure Grade-A workspaces.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 188,
    verified: true,
    openNow: true,
    acceptsBookings: true,
    status: 'active',
  },
];

/**
 * @desc    Get all businesses with search, filters, sorting, and aggregate category counts
 * @route   GET /api/v1/businesses
 * @access  Public
 */
export const getAllBusinesses = asyncHandler(async (req, res) => {
  const {
    search,
    category,
    city,
    verified,
    openNow,
    acceptsBookings,
    minRating,
    sort = 'highest-rated',
  } = req.query;

  // Auto-seed if database is currently empty
  const count = await Business.countDocuments();
  if (count === 0) {
    await Business.insertMany(initialDirectoryBusinesses);
  }

  // Build query filter
  const filter = { status: 'active' };

  if (search && search.trim()) {
    const rawSearch = search.trim();
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const terms = rawSearch.split(/\s+/).filter(Boolean);

    const buildTermQuery = (term) => {
      const termRegex = new RegExp(escapeRegex(term), 'i');
      return {
        $or: [
          { name: termRegex },
          { category: termRegex },
          { city: termRegex },
          { location: termRegex },
          { address: termRegex },
          { description: termRegex },
          { fullDescription: termRegex },
          { 'categoryDetails.primaryTechStack': termRegex },
          { 'categoryDetails.serviceModel': termRegex },
          { 'categoryDetails.cuisineType': termRegex },
          { 'categoryDetails.diningStyle': termRegex },
          { 'categoryDetails.specialization': termRegex },
          { 'categoryDetails.facilityType': termRegex },
          { 'categoryDetails.propertyType': termRegex },
          { 'categoryDetails.institutionType': termRegex },
          { 'categoryDetails.coursesOffered': termRegex },
          { 'categoryDetails.financialServiceType': termRegex },
        ],
      };
    };

    if (terms.length > 1) {
      filter.$and = terms.map((term) => buildTermQuery(term));
    } else if (terms.length === 1) {
      filter.$or = buildTermQuery(terms[0]).$or;
    }
  }

  if (category && category !== 'All' && category !== 'All Categories') {
    filter.category = new RegExp(`^${category.trim()}$`, 'i');
  }

  if (city && city !== 'All' && city !== 'All Locations' && city !== 'All Regions') {
    filter.city = new RegExp(city.trim(), 'i');
  }

  if (verified === 'true' || verified === true) {
    filter.verified = true;
  }

  if (openNow === 'true' || openNow === true) {
    filter.openNow = true;
  }

  if (acceptsBookings === 'true' || acceptsBookings === true) {
    filter.acceptsBookings = true;
  }

  if (minRating && Number(minRating) > 0) {
    filter.rating = { $gte: Number(minRating) };
  }

  // Build sort options
  let sortOption = { rating: -1, reviewsCount: -1 };
  if (sort === 'highest-rated') {
    sortOption = { rating: -1, reviewsCount: -1 };
  } else if (sort === 'most-reviewed') {
    sortOption = { reviewsCount: -1, rating: -1 };
  } else if (sort === 'newest') {
    sortOption = { createdAt: -1 };
  } else if (sort === 'alphabetical') {
    sortOption = { name: 1 };
  }

  // Fetch businesses
  const businesses = await Business.find(filter).sort(sortOption).lean();

  // Aggregate category counts from real database documents
  const categoryAggregations = await Business.aggregate([
    { $match: { status: 'active' } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
  ]);

  const categoryCounts = {};
  categoryAggregations.forEach((item) => {
    categoryCounts[item._id] = item.count;
  });

  // Calculate total active
  const totalActive = await Business.countDocuments({ status: 'active' });

  // Extract distinct cities and locations from active businesses in MongoDB
  const distinctCities = await Business.distinct('city', { status: 'active' });
  const distinctLocations = await Business.distinct('location', { status: 'active' });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        businesses: businesses.map((b) => ({
          id: b._id.toString(),
          ...b,
        })),
        total: businesses.length,
        totalActive,
        categoryCounts,
        cities: distinctCities.filter(Boolean).sort((a, b) => a.localeCompare(b)),
        locations: distinctLocations.filter(Boolean).sort((a, b) => a.localeCompare(b)),
      },
      'Businesses retrieved successfully from MongoDB'
    )
  );
});

/**
 * @desc    Get business by ID
 * @route   GET /api/v1/businesses/:id
 * @access  Public
 */
export const getBusinessById = asyncHandler(async (req, res) => {
  const business = await Business.findById(req.params.id);

  if (!business) {
    throw new ApiError(404, 'Business not found');
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        id: business._id.toString(),
        ...business.toObject(),
      },
      'Business retrieved successfully'
    )
  );
});

/**
 * @desc    Create a new business
 * @route   POST /api/v1/businesses
 * @access  Public / Authenticated
 */
export const createBusiness = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    city,
    location,
    address,
    phone,
    email,
    website,
    description,
    fullDescription,
    image,
    hours,
    categoryDetails,
    verified = true,
  } = req.body;

  if (!name || !category || !phone || !description) {
    throw new ApiError(400, 'Name, category, phone, and description are required fields');
  }

  // Automatically derive city from location if city is not explicitly passed
  let resolvedCity = city?.trim();
  if (!resolvedCity && location) {
    resolvedCity = location.split(',')[0].trim();
  }
  if (!resolvedCity) {
    resolvedCity = 'Delhi';
  }

  const newBusiness = await Business.create({
    name: name.trim(),
    category: category.trim(),
    city: resolvedCity,
    location: (location || `${resolvedCity}, India`).trim(),
    address: address?.trim() || '',
    phone: phone.trim(),
    email: email?.trim() || '',
    website: website?.trim() || '',
    description: description.trim(),
    fullDescription: fullDescription?.trim() || description.trim(),
    image: image?.trim() || '',
    hours: hours?.trim() || 'Mon - Fri: 9:00 AM - 6:00 PM',
    categoryDetails: categoryDetails && typeof categoryDetails === 'object' ? categoryDetails : {},
    rating: 5.0,
    reviewsCount: 1,
    verified: Boolean(verified),
    status: 'active',
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        id: newBusiness._id.toString(),
        ...newBusiness.toObject(),
      },
      'Business created successfully in MongoDB'
    )
  );
});

/**
 * @desc    Update business details
 * @route   PUT /api/v1/businesses/:id
 * @access  Public / Authenticated
 */
export const updateBusiness = asyncHandler(async (req, res) => {
  const updatePayload = { ...req.body };
  if (!updatePayload.city && updatePayload.location) {
    updatePayload.city = updatePayload.location.split(',')[0].trim();
  }

  const business = await Business.findByIdAndUpdate(req.params.id, updatePayload, {
    new: true,
    runValidators: true,
  });

  if (!business) {
    throw new ApiError(404, 'Business not found');
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        id: business._id.toString(),
        ...business.toObject(),
      },
      'Business updated successfully'
    )
  );
});

/**
 * @desc    Delete a business
 * @route   DELETE /api/v1/businesses/:id
 * @access  Public / Authenticated
 */
export const deleteBusiness = asyncHandler(async (req, res) => {
  const business = await Business.findByIdAndDelete(req.params.id);

  if (!business) {
    throw new ApiError(404, 'Business not found');
  }

  return res.status(200).json(new ApiResponse(200, null, 'Business deleted successfully from MongoDB'));
});

/**
 * @desc    Reset or seed businesses
 * @route   POST /api/v1/businesses/seed
 * @access  Public
 */
export const seedBusinesses = asyncHandler(async (req, res) => {
  await Business.deleteMany({});
  const seeded = await Business.insertMany(initialDirectoryBusinesses);

  return res.status(200).json(
    new ApiResponse(
      200,
      { count: seeded.length },
      'Businesses seeded successfully in MongoDB'
    )
  );
});
