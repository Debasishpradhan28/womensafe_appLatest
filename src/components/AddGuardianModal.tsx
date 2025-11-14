import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Phone, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Guardian } from '../App';

interface AddGuardianModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (guardian: Omit<Guardian, 'id'>) => void;
  editGuardian?: Guardian | null;
}

const RELATIONSHIPS = [
  'Parent',
  'Spouse',
  'Sibling',
  'Friend',
  'Colleague',
  'Neighbor',
  'Relative',
  'Other',
];

export function AddGuardianModal({ isOpen, onClose, onSave, editGuardian }: AddGuardianModalProps) {
  const [formData, setFormData] = useState({
    name: editGuardian?.name || '',
    phone: editGuardian?.phone || '',
    relationship: editGuardian?.relationship || '',
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    relationship: '',
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      phone: '',
      relationship: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.relationship) {
      newErrors.relationship = 'Please select a relationship';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        relationship: formData.relationship,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({ name: '', phone: '', relationship: '' });
    setErrors({ name: '', phone: '', relationship: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 rounded-t-3xl relative">
                <button
                  onClick={handleClose}
                  className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white">{editGuardian ? 'Edit' : 'Add'} Emergency Contact</h2>
                    <p className="text-white/80 text-sm">Add a trusted guardian</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="p-6 space-y-5">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label className="text-slate-700 dark:text-slate-300">Guardian's Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-11 h-12 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 rounded-xl"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-600 text-xs">{errors.name}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label className="text-slate-700 dark:text-slate-300">Mobile Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type="tel"
                      placeholder="+1 234 567 8900"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-11 h-12 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 rounded-xl"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-600 text-xs">{errors.phone}</p>
                  )}
                </div>

                {/* Relationship Dropdown */}
                <div className="space-y-2">
                  <Label className="text-slate-700 dark:text-slate-300">Relationship *</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
                    <select
                      value={formData.relationship}
                      onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                      className="w-full pl-11 pr-4 h-12 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 appearance-none cursor-pointer"
                    >
                      <option value="">Select relationship</option>
                      {RELATIONSHIPS.map((rel) => (
                        <option key={rel} value={rel}>
                          {rel}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.relationship && (
                    <p className="text-red-600 text-xs">{errors.relationship}</p>
                  )}
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <p className="text-blue-900 dark:text-blue-100 text-xs">
                    This contact will receive instant SMS and push notifications during emergency situations.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleClose}
                    variant="outline"
                    className="flex-1 h-12 rounded-xl border-slate-200 dark:border-slate-600"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                  >
                    {editGuardian ? 'Update' : 'Save'} Contact
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
