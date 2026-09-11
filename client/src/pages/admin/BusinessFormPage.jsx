import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDirectory } from '../../context/DirectoryContext';
import { useToast } from '../../context/ToastContext';
import { uploadImageApi } from '../../services/api';
import {
  ArrowLeft,
  Save,
  Building2,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  Link as LinkIcon,
  Image as ImageIcon,
  Trash2,
  Loader2,
  Code,
  Utensils,
  Activity,
  GraduationCap,
  Briefcase,
  Layers,
  Sparkles
} from 'lucide-react';

/**
 * Category-specific schema definitions
 * Defines the specialized fields and validation constraints for each category.
 */
export const CATEGORY_FIELD_SCHEMAS = {
  'IT Services': {
    title: 'IT & Software Engineering Specifications',
    badge: 'Technology Parameters',
    icon: Code,
    fields: [
      {
        key: 'serviceModel',
        label: 'Primary Service Model',
        type: 'select',
        required: true,
        options: [
          'Custom Software Engineering',
          'Cloud Architecture & DevOps',
          'Enterprise SaaS Solutions',
          'Cybersecurity & Auditing',
          'IT Infrastructure & Managed Support',
        ],
        placeholder: 'Select IT service model',
      },
      {
        key: 'primaryTechStack',
        label: 'Core Technologies / Tech Stack',
        type: 'text',
        required: true,
        placeholder: 'e.g. React, Node.js, Python, AWS, Docker, Kubernetes',
        hint: 'Key languages, frameworks, or cloud platforms your company specializes in',
      },
      {
        key: 'teamSize',
        label: 'Engineering Team Size',
        type: 'select',
        required: true,
        options: [
          '1 - 10 Specialists (Boutique)',
          '11 - 50 Engineers (Mid-size)',
          '51 - 200 Consultants (Scale-up)',
          '200+ Global Engineering Staff',
        ],
        placeholder: 'Select team size',
      },
      {
        key: 'deliveryModel',
        label: 'Client Engagement Model',
        type: 'select',
        required: true,
        options: [
          'Dedicated Agile Pods',
          'Time & Material (T&M)',
          'Fixed Price & Milestone Delivery',
          'Staff Augmentation & Dedicated FTE',
        ],
        placeholder: 'Select engagement model',
      },
    ],
  },
  'Restaurants': {
    title: 'Restaurant & Dining Specifications',
    badge: 'Culinary Parameters',
    icon: Utensils,
    fields: [
      {
        key: 'cuisineType',
        label: 'Cuisine Specialties',
        type: 'text',
        required: true,
        placeholder: 'e.g. Authentic Italian, North Indian Mughlai, Pan-Asian',
        hint: 'Primary culinary offerings and signature cuisines',
      },
      {
        key: 'diningStyle',
        label: 'Dining Experience / Atmosphere',
        type: 'select',
        required: true,
        options: [
          'Fine Dining & Private Dining',
          'Casual Dining & Bistro',
          'Café & Artisan Bakery',
          'Fast Casual / Quick Service',
          'Lounge & Rooftop Bar',
        ],
        placeholder: 'Select dining style',
      },
      {
        key: 'priceRange',
        label: 'Average Price Bracket',
        type: 'select',
        required: true,
        options: [
          '₹ - Budget Friendly (Under ₹500 for two)',
          '₹₹ - Moderate Dining (₹500 - ₹1,500 for two)',
          '₹₹₹ - Premium / Upscale (₹1,500 - ₹3,500 for two)',
          '₹₹₹₹ - Luxury / Fine Dining (₹3,500+ for two)',
        ],
        placeholder: 'Select price range',
      },
      {
        key: 'seatingCapacity',
        label: 'Total Guest Seating Capacity',
        type: 'number',
        required: true,
        placeholder: 'e.g. 85',
        min: 1,
        hint: 'Number of guests the venue can comfortably accommodate',
      },
      {
        key: 'dietaryFeatures',
        label: 'Dietary Offerings',
        type: 'select',
        required: true,
        options: [
          'Multi-Dietary (Veg & Non-Veg)',
          '100% Pure Vegetarian',
          'Vegan & Plant-Based Specialties',
          'Halal Certified & Multi-Cuisine',
          'Gluten-Free & Allergen-Safe Options',
        ],
        placeholder: 'Select dietary category',
      },
    ],
  },
  'Healthcare': {
    title: 'Healthcare & Clinical Specifications',
    badge: 'Medical Parameters',
    icon: Activity,
    fields: [
      {
        key: 'specialization',
        label: 'Primary Medical Specialization(s)',
        type: 'text',
        required: true,
        placeholder: 'e.g. Cardiology, Orthopedics, Pediatrics, Multispeciality',
        hint: 'Primary medical departments or clinical disciplines',
      },
      {
        key: 'facilityType',
        label: 'Clinical Facility Type',
        type: 'select',
        required: true,
        options: [
          'Multi-Specialty Hospital',
          'Outpatient Polyclinic & Wellness',
          'Diagnostic & Pathology Imaging Center',
          'Specialist Dental & Eye Clinic',
          'Day Care & Ambulatory Surgical Center',
        ],
        placeholder: 'Select facility type',
      },
      {
        key: 'emergencyServices',
        label: 'Emergency & Critical Care Availability',
        type: 'select',
        required: true,
        options: [
          '24/7 Emergency & ICU Facilities',
          'Daytime Emergency During Clinic Hours',
          'Scheduled Consultations Only (No Emergency)',
        ],
        placeholder: 'Select emergency capability',
      },
      {
        key: 'doctorCount',
        label: 'Practicing Doctors / Specialists',
        type: 'number',
        required: true,
        placeholder: 'e.g. 15',
        min: 1,
        hint: 'Total certified medical practitioners on panel',
      },
      {
        key: 'insuranceAccepted',
        label: 'Insurance & TPA Coverage',
        type: 'select',
        required: true,
        options: [
          'Cashless TPA & All Major Insurances Accepted',
          'Selected Network Insurances Accepted',
          'Direct Payment / Reimbursable Receipt Provided',
        ],
        placeholder: 'Select insurance network',
      },
    ],
  },
  'Education': {
    title: 'Educational Institution Specifications',
    badge: 'Academic Parameters',
    icon: GraduationCap,
    fields: [
      {
        key: 'institutionType',
        label: 'Institution Category',
        type: 'select',
        required: true,
        options: [
          'University / Higher Degree College',
          'K-12 CBSE / ICSE / IB International School',
          'Competitive Exam & Entrance Coaching',
          'Executive Tech & STEM Bootcamp',
          'Vocational & Professional Skills Institute',
        ],
        placeholder: 'Select institution type',
      },
      {
        key: 'coursesOffered',
        label: 'Flagship Programs / Courses',
        type: 'text',
        required: true,
        placeholder: 'e.g. Computer Science, Executive MBA, Data Science, NEET/JEE Prep',
        hint: 'Primary degrees, certifications or diplomas provided',
      },
      {
        key: 'accreditation',
        label: 'Accreditation & Affiliation Board',
        type: 'text',
        required: true,
        placeholder: 'e.g. NAAC A++, UGC Approved, AICTE, CBSE Affiliated',
        hint: 'Governing educational authority accreditation',
      },
      {
        key: 'modeOfStudy',
        label: 'Delivery Mode',
        type: 'select',
        required: true,
        options: [
          'On-Campus / Classroom Interactive',
          '100% Online Live & Self-Paced',
          'Hybrid Blended (Classroom + Online Portal)',
        ],
        placeholder: 'Select mode of study',
      },
    ],
  },
  'Real Estate': {
    title: 'Real Estate & Property Specifications',
    badge: 'Property Parameters',
    icon: Building2,
    fields: [
      {
        key: 'propertyType',
        label: 'Primary Property Classification',
        type: 'select',
        required: true,
        options: [
          'Commercial Grade-A Office Spaces',
          'Managed Co-Working & IT Tech Parks',
          'Luxury Residential Towers & Condos',
          'Commercial Retail & High-Street Showrooms',
          'Industrial Warehousing & Logistics Parks',
        ],
        placeholder: 'Select property classification',
      },
      {
        key: 'dealType',
        label: 'Transaction / Engagement Type',
        type: 'select',
        required: true,
        options: [
          'Commercial Long-Term Lease / Rent',
          'Outright Purchase / Sale',
          'Both Lease & Direct Purchase Available',
          'Project Development & Turnkey Build-to-Suit',
        ],
        placeholder: 'Select transaction type',
      },
      {
        key: 'startingPrice',
        label: 'Indicative Base Pricing / Rental Rate',
        type: 'text',
        required: true,
        placeholder: 'e.g. ₹55 Lakhs onwards OR ₹75 / sq.ft / month',
        hint: 'Starting price or leasing quotation format',
      },
      {
        key: 'reraStatus',
        label: 'RERA Regulatory Status',
        type: 'select',
        required: true,
        options: [
          'RERA Registered & Approved',
          'Under Regulatory Application',
          'Exempt / Not Applicable for Commercial Plotting',
        ],
        placeholder: 'Select RERA status',
      },
      {
        key: 'reraNumber',
        label: 'RERA Registration ID Number',
        type: 'text',
        required: false,
        placeholder: 'e.g. UPRERA1234567 / HRERA987654',
        hint: 'Required if RERA Registered & Approved is selected',
      },
    ],
  },
  'Finance': {
    title: 'Financial & Advisory Specifications',
    badge: 'Advisory Parameters',
    icon: Briefcase,
    fields: [
      {
        key: 'financialServiceType',
        label: 'Core Financial Practice',
        type: 'select',
        required: true,
        options: [
          'Corporate Taxation, Statutory Audit & GST',
          'Investment Banking, M&A & Due Diligence',
          'Corporate Accounting & Payroll Outsourcing',
          'Wealth Management & Private Equity Portfolio',
          'Commercial Debt Financing & Working Capital',
        ],
        placeholder: 'Select advisory discipline',
      },
      {
        key: 'regulatoryBody',
        label: 'Regulatory Body / Certified Membership',
        type: 'text',
        required: true,
        placeholder: 'e.g. ICAI Chartered Accountants, SEBI Registered, RBI Approved',
        hint: 'Professional certification or regulatory body',
      },
      {
        key: 'clientFocus',
        label: 'Target Client Segment',
        type: 'select',
        required: true,
        options: [
          'Startups, Seed & Early-Stage Ventures',
          'SMEs & Mid-Market Enterprises',
          'Fortune 500, Large Corporates & Multinationals',
          'High Net-Worth Individuals (HNIs) & Family Offices',
        ],
        placeholder: 'Select primary target clientele',
      },
      {
        key: 'consultationMode',
        label: 'Consultation & Advisory Mode',
        type: 'select',
        required: true,
        options: [
          'In-Person Office Consultations',
          'Virtual Secure Video Advisory',
          'On-Site Client Office Deployment',
          'Omnichannel (Both In-Person & Remote)',
        ],
        placeholder: 'Select advisory mode',
      },
    ],
  },
};

export default function BusinessFormPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { categories, getBusinessById, createBusiness, updateBusiness } = useDirectory();
  const { addToast } = useToast();
  const formRef = useRef(null);

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    category: 'IT Services',
    location: '',
    phone: '',
    address: '',
    description: '',
    fullDescription: '',
    email: '',
    website: '',
    status: 'active',
    image: '',
    categoryDetails: {},
  });

  const [imageInputMode, setImageInputMode] = useState('upload'); // 'upload' | 'url'
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const existing = getBusinessById(id);
      if (existing) {
        setFormData({
          name: existing.name || '',
          category: existing.category || 'IT Services',
          location: existing.location || '',
          phone: existing.phone || '',
          address: existing.address || '',
          description: existing.description || '',
          fullDescription: existing.fullDescription || '',
          email: existing.email || '',
          website: existing.website || '',
          status: existing.status || 'active',
          image: existing.image || '',
          categoryDetails: existing.categoryDetails || {},
        });
        if (existing.image) {
          setImageInputMode('url');
        }
      } else {
        setNotFound(true);
      }
    }
  }, [id, isEditing, getBusinessById]);

  // Current category schema
  const activeCategorySchema = CATEGORY_FIELD_SCHEMAS[formData.category];
  const CategoryIcon = activeCategorySchema?.icon || Layers;

  const handleCategoryChange = (newCategory) => {
    setFormData((prev) => ({
      ...prev,
      category: newCategory,
      // If switching categories, start with clean category details or preserve existing if same
      categoryDetails: prev.category === newCategory ? prev.categoryDetails : {},
    }));

    // Clear category-specific validation errors on category change
    setErrors((prev) => {
      const cleanErrors = {};
      Object.keys(prev).forEach((k) => {
        if (!k.startsWith('cat_')) {
          cleanErrors[k] = prev[k];
        }
      });
      return cleanErrors;
    });
  };

  const handleCategoryFieldChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      categoryDetails: {
        ...prev.categoryDetails,
        [key]: value,
      },
    }));

    // Clear error for this field if it was previously invalid
    if (errors[`cat_${key}`]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[`cat_${key}`];
        return copy;
      });
    }
  };

  const handleImageFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      addToast('Image size exceeds 10MB limit', 'error');
      return;
    }

    setUploading(true);
    try {
      const result = await uploadImageApi(file, 'bre_services');
      const uploadedUrl = result.secure_url || result.url;
      setFormData((prev) => ({ ...prev, image: uploadedUrl }));
      addToast('Image uploaded successfully to Cloudinary!', 'success');
    } catch (err) {
      addToast(err.message || 'Image upload failed. You can also paste an Image URL directly.', 'error');
    } finally {
      setUploading(false);
    }
  };

  // Comprehensive Form Validation
  const validate = () => {
    const newErrors = {};

    // 1. Standard Fields Validation
    if (!formData.name?.trim()) {
      newErrors.name = 'Business name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Business name must be at least 2 characters';
    }

    if (!formData.category?.trim()) {
      newErrors.category = 'Please select a valid business category';
    }

    if (!formData.location?.trim()) {
      newErrors.location = 'Location (City, State / Region) is required';
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s+\-()]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (e.g. +91 98765 43210)';
    }

    if (!formData.address?.trim()) {
      newErrors.address = 'Physical street address is required';
    } else if (formData.address.trim().length < 5) {
      newErrors.address = 'Street address must be at least 5 characters';
    }

    if (!formData.description?.trim()) {
      newErrors.description = 'Short description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Short description should be at least 10 characters';
    }

    if (formData.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.website?.trim() && !/^https?:\/\//i.test(formData.website.trim())) {
      newErrors.website = 'Website URL must begin with http:// or https://';
    }

    // 2. Category-Specific Fields Validation
    if (activeCategorySchema && activeCategorySchema.fields) {
      activeCategorySchema.fields.forEach((field) => {
        const val = formData.categoryDetails?.[field.key];
        const stringVal = typeof val === 'string' ? val.trim() : (val !== undefined && val !== null ? String(val) : '');

        // Required check
        if (field.required && !stringVal) {
          newErrors[`cat_${field.key}`] = `${field.label} is required for ${formData.category}`;
        }

        // Numeric positive number check
        if (field.type === 'number' && stringVal) {
          const num = Number(stringVal);
          if (isNaN(num) || num <= 0 || !Number.isInteger(num)) {
            newErrors[`cat_${field.key}`] = `${field.label} must be a positive whole number`;
          }
        }
      });

      // Conditional check for Real Estate RERA Number
      if (formData.category === 'Real Estate') {
        const isReraApproved = formData.categoryDetails?.reraStatus === 'RERA Registered & Approved';
        const reraNum = formData.categoryDetails?.reraNumber?.trim();
        if (isReraApproved && !reraNum) {
          newErrors['cat_reraNumber'] = 'RERA Registration ID is required when status is Registered & Approved';
        }
      }
    }

    setErrors(newErrors);

    // Scroll to the first error if any exist
    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        const firstErrorEl = document.querySelector('.has-error, .field-error-msg');
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Please fill all mandatory fields and resolve highlighted errors.', 'error');
      return;
    }

    setSaving(true);
    try {
      const submissionPayload = {
        ...formData,
        city: formData.city || formData.location?.split(',')[0]?.trim() || formData.location?.trim(),
      };

      if (isEditing) {
        await updateBusiness(id, submissionPayload);
        addToast(`"${formData.name}" was successfully updated!`, 'success');
      } else {
        await createBusiness(submissionPayload);
        addToast(`"${formData.name}" has been published to the directory!`, 'success');
      }
      navigate('/admin/businesses');
    } catch (err) {
      addToast(err.message || 'Failed to save business', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (notFound) {
    return (
      <div style={{ padding: '2rem 0' }}>
        <div className="state-box">
          <AlertCircle size={32} color="var(--danger)" style={{ margin: '0 auto 1rem' }} />
          <h3>Listing Not Found</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            The business you are trying to edit does not exist.
          </p>
          <Link to="/admin/businesses" className="btn btn-primary">
            Back to Business List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '880px' }} ref={formRef}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/admin/businesses" className="btn-icon" title="Cancel and go back">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 style={{ fontSize: '1.85rem', marginBottom: '0.25rem' }}>
            {isEditing ? 'Edit Business Listing' : 'Add New Business Listing'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            {isEditing
              ? 'Update commercial specifications and operational parameters for this directory listing.'
              : 'Create and verify a new commercial profile with category-specific criteria.'}
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="form-card" style={{ maxWidth: '100%' }}>
        <form onSubmit={handleSubmit} noValidate>
          {/* Business Name */}
          <div className="form-group">
            <label className="form-label">
              Business Name <span className="req">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              placeholder="e.g. Acme Technologies Inc."
              className={`form-input ${errors.name ? 'has-error' : ''}`}
            />
            {errors.name && (
              <span className="field-error-msg">
                <AlertCircle size={13} /> {errors.name}
              </span>
            )}
          </div>

          {/* Category & Status */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Category <span className="req">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className={`form-select ${errors.category ? 'has-error' : ''}`}
              >
                {categories.map((c) => (
                  <option key={c.id || c.slug || c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="field-error-msg">
                  <AlertCircle size={13} /> {errors.category}
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Publication Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="form-select"
              >
                <option value="active">Active (Visible in Public Directory)</option>
                <option value="draft">Draft / Inactive (Hidden)</option>
              </select>
            </div>
          </div>

          {/* DYNAMIC CATEGORY-SPECIFIC SPECIFICATIONS CARD */}
          {activeCategorySchema && (
            <div className="category-spec-card">
              <div className="category-spec-header">
                <div className="category-spec-title-wrap">
                  <div className="category-spec-icon-box">
                    <CategoryIcon size={18} />
                  </div>
                  <div>
                    <h3 className="category-spec-title">{activeCategorySchema.title}</h3>
                    <p className="category-spec-subtitle">
                      Specialized parameters for <strong>{formData.category}</strong> listings.
                    </p>
                  </div>
                </div>
                <span className="category-spec-badge">{activeCategorySchema.badge}</span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '1.25rem',
                }}
              >
                {activeCategorySchema.fields.map((field) => {
                  const errorKey = `cat_${field.key}`;
                  const fieldError = errors[errorKey];
                  const fieldValue = formData.categoryDetails?.[field.key] ?? '';

                  // Check if RERA Number is conditionally required
                  const isReraNumberField = field.key === 'reraNumber';
                  const isReraRequired =
                    isReraNumberField &&
                    formData.categoryDetails?.reraStatus === 'RERA Registered & Approved';

                  return (
                    <div key={field.key} className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">
                        {field.label} {(field.required || isReraRequired) && <span className="req">*</span>}
                      </label>

                      {field.type === 'select' ? (
                        <select
                          value={fieldValue}
                          onChange={(e) => handleCategoryFieldChange(field.key, e.target.value)}
                          className={`form-select ${fieldError ? 'has-error' : ''}`}
                        >
                          <option value="">-- {field.placeholder} --</option>
                          {field.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type || 'text'}
                          value={fieldValue}
                          min={field.min}
                          onChange={(e) => handleCategoryFieldChange(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className={`form-input ${fieldError ? 'has-error' : ''}`}
                        />
                      )}

                      {field.hint && !fieldError && (
                        <span className="field-hint">
                          {isReraRequired ? 'Mandatory for RERA-registered properties' : field.hint}
                        </span>
                      )}

                      {fieldError && (
                        <span className="field-error-msg">
                          <AlertCircle size={13} /> {fieldError}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Business Image / Logo: File Upload (Cloudinary) or Direct URL */}
          <div
            className="form-group"
            style={{
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.85rem',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <div>
                <label className="form-label" style={{ marginBottom: '0.15rem', fontWeight: 600, fontSize: '0.95rem' }}>
                  Business Image / Storefront Logo
                </label>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  This image will be shown on listing cards and business detail pages on the user side.
                </span>
              </div>

              {/* Mode Toggle Buttons */}
              <div
                style={{
                  display: 'inline-flex',
                  padding: '3px',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  gap: '2px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setImageInputMode('upload')}
                  className={`btn btn-sm ${imageInputMode === 'upload' ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ fontSize: '0.78rem', padding: '0.3rem 0.75rem', borderRadius: '4px' }}
                >
                  <UploadCloud size={14} style={{ marginRight: '0.35rem' }} />
                  Upload Image
                </button>
                <button
                  type="button"
                  onClick={() => setImageInputMode('url')}
                  className={`btn btn-sm ${imageInputMode === 'url' ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ fontSize: '0.78rem', padding: '0.3rem 0.75rem', borderRadius: '4px' }}
                >
                  <LinkIcon size={14} style={{ marginRight: '0.35rem' }} />
                  Image URL
                </button>
              </div>
            </div>

            {/* Option A: Upload File via Cloudinary */}
            {imageInputMode === 'upload' ? (
              <div>
                <label
                  htmlFor="business-image-file"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.75rem 1rem',
                    border: '2px dashed var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-card)',
                    cursor: uploading ? 'wait' : 'pointer',
                    textAlign: 'center',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  {uploading ? (
                    <>
                      <Loader2 size={32} className="spin-animation" color="var(--primary)" style={{ marginBottom: '0.5rem' }} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>
                        Uploading to Cloudinary...
                      </span>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        Please wait while the image is being processed
                      </span>
                    </>
                  ) : (
                    <>
                      <UploadCloud size={32} color="var(--primary)" style={{ marginBottom: '0.5rem' }} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        Click to select and upload an image file
                      </span>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        Supports JPG, PNG, WEBP, GIF, SVG (up to 10MB) &bull; Cloudinary Powered
                      </span>
                    </>
                  )}
                  <input
                    id="business-image-file"
                    type="file"
                    accept="image/*"
                    disabled={uploading}
                    onChange={handleImageFileUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            ) : (
              /* Option B: Direct Image URL */
              <div>
                <div style={{ position: 'relative' }}>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="e.g. https://images.unsplash.com/photo-... or https://mycompany.com/logo.jpg"
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                  <LinkIcon
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '0.85rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-muted)',
                    }}
                  />
                </div>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.35rem', display: 'block' }}>
                  Enter any direct public image URL to display as this business's thumbnail.
                </span>
              </div>
            )}

            {/* Live Image Preview Card */}
            {formData.image && (
              <div
                style={{
                  marginTop: '1rem',
                  padding: '0.85rem 1rem',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', overflow: 'hidden' }}>
                  <img
                    src={formData.image}
                    alt="Listing thumbnail preview"
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: 'var(--radius-sm)',
                      objectFit: 'cover',
                      border: '1px solid var(--border-subtle)',
                      flexShrink: 0,
                    }}
                    onError={(e) => {
                      e.currentTarget.style.opacity = '0.3';
                    }}
                  />
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                      <CheckCircle2 size={15} color="var(--success)" />
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--success)' }}>
                        Active Thumbnail Selected
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        color: 'var(--text-muted)',
                        display: 'block',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '450px',
                      }}
                      title={formData.image}
                    >
                      {formData.image}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: '' })}
                  className="btn btn-secondary btn-sm"
                  style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.3)', flexShrink: 0 }}
                  title="Remove image"
                >
                  <Trash2 size={14} style={{ marginRight: '0.25rem' }} />
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Location & Phone */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Location (City, State / Region) <span className="req">*</span>
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => {
                  setFormData({ ...formData, location: e.target.value });
                  if (errors.location) setErrors({ ...errors, location: '' });
                }}
                placeholder="e.g. San Francisco, CA or Noida, UP"
                className={`form-input ${errors.location ? 'has-error' : ''}`}
              />
              {errors.location && (
                <span className="field-error-msg">
                  <AlertCircle size={13} /> {errors.location}
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                Phone Number <span className="req">*</span>
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                placeholder="e.g. +91 98112 34567"
                className={`form-input ${errors.phone ? 'has-error' : ''}`}
              />
              {errors.phone && (
                <span className="field-error-msg">
                  <AlertCircle size={13} /> {errors.phone}
                </span>
              )}
            </div>
          </div>

          {/* Street Address */}
          <div className="form-group">
            <label className="form-label">
              Physical Street Address <span className="req">*</span>
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => {
                setFormData({ ...formData, address: e.target.value });
                if (errors.address) setErrors({ ...errors, address: '' });
              }}
              placeholder="e.g. Sector 62, Electronic City, Noida, UP 201309"
              className={`form-input ${errors.address ? 'has-error' : ''}`}
            />
            {errors.address && (
              <span className="field-error-msg">
                <AlertCircle size={13} /> {errors.address}
              </span>
            )}
          </div>

          {/* Short Description */}
          <div className="form-group">
            <label className="form-label">
              Short Summary Description <span className="req">*</span>
            </label>
            <textarea
              rows="2"
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description) setErrors({ ...errors, description: '' });
              }}
              placeholder="1-2 sentences summarizing core offerings for directory cards (min 10 characters)..."
              className={`form-textarea ${errors.description ? 'has-error' : ''}`}
            />
            {errors.description && (
              <span className="field-error-msg">
                <AlertCircle size={13} /> {errors.description}
              </span>
            )}
          </div>

          {/* Full Description */}
          <div className="form-group">
            <label className="form-label">Detailed Profile Overview</label>
            <textarea
              rows="4"
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              placeholder="Comprehensive details about the business, mission, qualifications, and specialties..."
              className="form-textarea"
            />
          </div>

          {/* Email & Website */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Business Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="contact@company.com"
                className={`form-input ${errors.email ? 'has-error' : ''}`}
              />
              {errors.email && (
                <span className="field-error-msg">
                  <AlertCircle size={13} /> {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Website URL</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => {
                  setFormData({ ...formData, website: e.target.value });
                  if (errors.website) setErrors({ ...errors, website: '' });
                }}
                placeholder="https://company.example.com"
                className={`form-input ${errors.website ? 'has-error' : ''}`}
              />
              {errors.website && (
                <span className="field-error-msg">
                  <AlertCircle size={13} /> {errors.website}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <Link to="/admin/businesses" className="btn btn-secondary">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="btn btn-primary"
            >
              <Save size={16} />
              <span>{saving ? 'Saving Changes...' : (isEditing ? 'Update Business' : 'Save Business')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

