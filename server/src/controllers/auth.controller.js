import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, 'Name, email, and password are required');
  }

  if (password.length < 6) {
    throw new ApiError(400, 'Password must be at least 6 characters long');
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
  if (existingUser) {
    throw new ApiError(409, 'An account with this email address already exists');
  }

  // Create new user in MongoDB Atlas
  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password,
    role: 'user',
  });

  const token = user.generateAuthToken();

  const userResponse = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };

  return res
    .status(201)
    .json(new ApiResponse(201, { user: userResponse, token }, 'User registered successfully'));
});

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  // Find user and explicitly include password field
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
  if (!user) {
    throw new ApiError(404, 'User does not exist. Please register.');
  }

  // Validate password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Incorrect password. Please try again.');
  }

  const token = user.generateAuthToken();

  const userResponse = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, { user: userResponse, token }, 'Login successful'));
});

/**
 * @desc    Get current logged in user profile
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return res.status(200).json(new ApiResponse(200, user, 'Profile retrieved successfully'));
});
