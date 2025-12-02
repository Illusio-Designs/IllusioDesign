import User from '../../models/User.js';
import bcrypt from 'bcryptjs';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      message: 'User profile',
      user: user.toJSON()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, image, currentPassword, newPassword } = req.body;
    
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Update basic fields
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (image) updateData.image = image;
    
    // Handle password change
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ error: 'Current password is required' });
      }
      
      // Verify current password
      const isValidPassword = await bcrypt.compare(currentPassword, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }
      
      // Hash new password
      updateData.password = await bcrypt.hash(newPassword, 10);
    }
    
    await user.update(updateData);
    const { password: _, ...updatedUser } = user.toJSON();
    
    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStats = async (req, res) => {
  try {
    res.json({
      data: {
        userId: req.user.id,
        totalViews: 1234,
        lastLogin: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
