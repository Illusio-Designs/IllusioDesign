'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';
import { dashboardAPI } from '@/services/api';
import '@/styles/pages/Dashboard/Profile.css';

export default function Profile() {
  const { user, getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fetchingProfile, setFetchingProfile] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);

  // Helper function to construct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath || imagePath.trim() === '') return '';
    // If it's already a full URL or base64, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    // If it's a relative path, prepend backend URL
    const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${backendUrl}${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
  };

  // Fetch latest profile data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await dashboardAPI.getProfile();
        if (result.user) {
          const userImage = result.user.image || '';
          // For base64 images, use directly; for paths, construct URL
          let imageUrl = '';
          let isTruncated = false;
          
          if (userImage && userImage.trim() !== '') {
            if (userImage.startsWith('data:')) {
              // Base64 data URL - check if it's complete
              const base64Part = userImage.split(',')[1] || '';
              // Base64 images should be much longer than 255 chars
              // If it's exactly 255 or ends abruptly, it's likely truncated
              if (userImage.length <= 255 || (base64Part.length < 100 && !base64Part.endsWith('='))) {
                isTruncated = true;
                console.warn('Image appears to be truncated (length:', userImage.length, ')');
                toast.warn('Profile image was truncated. Please re-upload your image.');
                imageUrl = ''; // Don't use truncated base64
              } else {
                imageUrl = userImage;
              }
            } else {
              // Regular path - construct full URL
              imageUrl = getImageUrl(userImage);
            }
          }
          
          setFormData({
            name: result.user.name || '',
            email: result.user.email || '',
            image: imageUrl,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
          // Set image preview - use imageUrl if it exists and is not empty
          setImagePreview(imageUrl && imageUrl.trim() !== '' ? imageUrl : null);
          setOriginalImage(userImage); // Store original for backend
          setNewImageFile(null);
          
          // Update localStorage with latest user data
          localStorage.setItem('auth_user', JSON.stringify(result.user));
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Fallback to user from context if API fails
        if (user) {
          const userImage = user.image || '';
          const imageUrl = userImage 
            ? (userImage.startsWith('data:') ? userImage : getImageUrl(userImage))
            : '';
          
          setFormData({
            name: user.name || '',
            email: user.email || '',
            image: imageUrl,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
          setImagePreview(imageUrl || null);
          setOriginalImage(userImage);
        }
      } finally {
        setFetchingProfile(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      // Store the actual file for upload
      setNewImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendUpdate = async (updateData) => {
    try {
      const result = await dashboardAPI.updateProfile(updateData);

      if (result.success || result.user) {
        toast.success('Profile updated successfully');
        // Update localStorage with new user data
        if (result.user) {
          localStorage.setItem('auth_user', JSON.stringify(result.user));
          // Update original image reference
          if (result.user.image) {
            setOriginalImage(result.user.image);
            setNewImageFile(null);
          }
        }
        // Reload page to update user context
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(result.error || 'Failed to update profile');
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate passwords if changing
      if (formData.newPassword) {
        if (!formData.currentPassword) {
          toast.error('Please enter current password');
          setLoading(false);
          return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
          toast.error('New passwords do not match');
          setLoading(false);
          return;
        }
        if (formData.newPassword.length < 6) {
          toast.error('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
      }

      const updateData = {
        name: formData.name,
        email: formData.email
      };

      // Only include image if a new file was selected, otherwise preserve existing
      if (newImageFile) {
        // Convert file to base64 for sending
        const reader = new FileReader();
        reader.onloadend = async () => {
          updateData.image = reader.result;
          await sendUpdate(updateData);
        };
        reader.readAsDataURL(newImageFile);
        return;
      } else if (originalImage) {
        // Preserve existing image if no new file was selected
        updateData.image = originalImage;
      }

      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      await sendUpdate(updateData);
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (fetchingProfile) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1 className="profile-title">My Profile</h1>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-image-section">
            <div className="profile-image-wrapper">
              {imagePreview && imagePreview.trim() !== '' ? (
                <img
                  key={imagePreview.substring(0, 50)} // Force re-render if image changes
                  src={imagePreview}
                  alt="Profile"
                  width={120}
                  height={120}
                  className="profile-image"
                  style={{ objectFit: 'cover', borderRadius: '50%', display: 'block' }}
                  onError={(e) => {
                    // If image fails to load, show placeholder
                    console.error('Image failed to load. Image src:', imagePreview?.substring(0, 100));
                    console.error('Image length:', imagePreview?.length);
                    setImagePreview(null);
                  }}
                  onLoad={() => {
                    console.log('Profile image loaded successfully');
                  }}
                />
              ) : (
                <div className="profile-image-placeholder">
                  {getInitials(formData.name || user?.name || 'U')}
                </div>
              )}
            </div>
            <label className="profile-image-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <span>Change Photo</span>
            </label>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="password-section">
            <h3 className="section-title">Change Password</h3>
            <p className="section-subtitle">Leave blank if you don&apos;t want to change password</p>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="form-input"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="form-input"
                  autoComplete="new-password"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  autoComplete="new-password"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

