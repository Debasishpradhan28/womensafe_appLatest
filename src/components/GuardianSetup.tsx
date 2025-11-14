import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserPlus, Phone, User, Trash2, Shield, Check, AlertCircle } from 'lucide-react';
import type { Guardian } from '../App';

interface GuardianSetupProps {
  onComplete: (guardians: Guardian[]) => void;
}

export function GuardianSetup({ onComplete }: GuardianSetupProps) {
  const [guardians, setGuardians] = useState<Guardian[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddGuardian = () => {
    if (validateForm()) {
      const newGuardian: Guardian = {
        id: Date.now().toString(),
        name,
        phone,
        relationship: relationship || 'Emergency Contact',
      };
      setGuardians([...guardians, newGuardian]);
      setName('');
      setPhone('');
      setRelationship('');
      setShowForm(false);
      setErrors({});
    }
  };

  const handleRemoveGuardian = (id: string) => {
    setGuardians(guardians.filter(g => g.id !== id));
  };

  const handleComplete = () => {
    if (guardians.length > 0) {
      onComplete(guardians);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-6">
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="mb-2">Add Emergency Contacts</h1>
          <p className="text-slate-600">
            Add trusted contacts who will be alerted during emergencies
          </p>
        </motion.div>

        {/* Guardians List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 space-y-3"
        >
          <AnimatePresence>
            {guardians.map((guardian, index) => (
              <motion.div
                key={guardian.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 truncate">{guardian.name}</p>
                  <p className="text-slate-500 text-sm">{guardian.phone}</p>
                  <p className="text-blue-600 text-xs">{guardian.relationship}</p>
                </div>
                <button
                  onClick={() => handleRemoveGuardian(guardian.id)}
                  className="p-2 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {guardians.length === 0 && !showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 px-6 bg-white rounded-2xl border-2 border-dashed border-slate-200"
            >
              <UserPlus className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-500">No emergency contacts added yet</p>
              <p className="text-slate-400 text-sm mt-1">Add at least one contact to continue</p>
            </motion.div>
          )}
        </motion.div>

        {/* Add Guardian Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 mb-4 overflow-hidden"
            >
              <h3 className="mb-4">New Emergency Contact</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-700 mb-2 text-sm">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter name"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        errors.name ? 'border-red-400' : 'border-slate-300'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 mb-2 text-sm">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter 10-digit number"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        errors.phone ? 'border-red-400' : 'border-slate-300'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 mb-2 text-sm">
                    Relationship
                  </label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Select relationship</option>
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Friend">Friend</option>
                    <option value="Partner">Partner</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowForm(false);
                    setName('');
                    setPhone('');
                    setRelationship('');
                    setErrors({});
                  }}
                  className="flex-1 py-3 rounded-full border-2 border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddGuardian}
                  className="flex-1 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-200"
                >
                  Add Contact
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Button */}
        {!showForm && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="w-full py-4 rounded-full border-2 border-dashed border-blue-400 text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 mb-6"
          >
            <UserPlus className="w-5 h-5" />
            Add Another Contact
          </motion.button>
        )}

        {/* Police Station Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-blue-50 rounded-2xl p-4 border border-blue-200 mb-6"
        >
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-blue-900 mb-1">Police Stations Included</p>
              <p className="text-blue-700 text-sm">
                Local police stations will be automatically notified based on your location during SOS
              </p>
            </div>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={handleComplete}
          disabled={guardians.length === 0}
          className={`w-full py-4 rounded-full text-white transition-all shadow-lg flex items-center justify-center gap-2 ${
            guardians.length > 0
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-200'
              : 'bg-slate-300 cursor-not-allowed'
          }`}
        >
          Continue to App
          <Check className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
