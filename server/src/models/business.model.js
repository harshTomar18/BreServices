import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Business name is required'],
      trim: true,
      maxlength: [150, 'Business name cannot exceed 150 characters'],
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      index: true,
    },
    city: {
      type: String,
      required: [true, 'City/Region is required'],
      trim: true,
      index: true,
    },
    location: {
      type: String,
      required: [true, 'Location display string is required'],
      trim: true,
    },
    address: {
      type: String,
      trim: true,
      default: '',
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    website: {
      type: String,
      trim: true,
      default: '',
    },
    description: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    fullDescription: {
      type: String,
      trim: true,
      default: '',
    },
    image: {
      type: String,
      trim: true,
      default: '',
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 0,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: true,
      index: true,
    },
    openNow: {
      type: Boolean,
      default: true,
    },
    acceptsBookings: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['active', 'pending', 'inactive'],
      default: 'active',
      index: true,
    },
    hours: {
      type: String,
      default: 'Mon - Fri: 9:00 AM - 6:00 PM',
    },
    categoryDetails: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Compound text index for powerful search
businessSchema.index({
  name: 'text',
  description: 'text',
  category: 'text',
  city: 'text',
  location: 'text',
});

export const Business = mongoose.model('Business', businessSchema);
