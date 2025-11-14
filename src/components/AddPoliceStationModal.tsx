import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Building2, Phone, MapPin, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export interface PoliceStation {
  id: string;
  name: string;
  phone: string;
  address: string;
  latitude?: number;
  longitude?: number;
}

interface AddPoliceStationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (station: Omit<PoliceStation, 'id'>) => void;
  editStation?: PoliceStation | null;
}

export function AddPoliceStationModal({ isOpen, onClose, onSave, editStation }: AddPoliceStationModalProps) {
  const [formData, setFormData] = useState({
    name: editStation?.name || '',
    phone: editStation?.phone || '',
    address: editStation?.address || '',
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const [isLocating, setIsLocating] = useState(false);

  const validateForm = () => {
    const newErrors = {
      name: '',
      phone: '',
      address: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Station name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Contact number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleGetCurrentLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode this to get an address
          const mockAddress = `${position.coords.latitude.toFixed(4)}°N, ${position.coords.longitude.toFixed(4)}°E`;
          setFormData({ ...formData, address: mockAddress });
          setIsLocating(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocating(false);
          alert('Unable to get current location. Please enter manually.');
        }
      );
    } else {
      setIsLocating(false);
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({ name: '', phone: '', address: '' });
    setErrors({ name: '', phone: '', address: '' });
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
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white">{editStation ? 'Edit' : 'Add'} Police Station</h2>
                    <p className="text-white/80 text-sm">Add nearby station details</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="p-6 space-y-5">
                {/* Station Name Field */}
                <div className="space-y-2">
                  <Label className="text-slate-700 dark:text-slate-300">Station Name *</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="e.g., Central Police Station"
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
                  <Label className="text-slate-700 dark:text-slate-300">Station Contact Number *</Label>
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

                {/* Address Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-700 dark:text-slate-300">Station Address *</Label>
                    <button
                      type="button"
                      onClick={handleGetCurrentLocation}
                      disabled={isLocating}
                      className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-xs hover:underline"
                    >
                      <Navigation className="w-3 h-3" />
                      {isLocating ? 'Locating...' : 'Use Current'}
                    </button>
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <textarea
                      placeholder="Enter complete address with city and postal code"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={3}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 resize-none"
                    />
                  </div>
                  {errors.address && (
                    <p className="text-red-600 text-xs">{errors.address}</p>
                  )}
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <p className="text-blue-900 dark:text-blue-100 text-xs">
                    This station will be notified automatically during emergency situations in nearby areas.
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
                    {editStation ? 'Update' : 'Save'} Station
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
