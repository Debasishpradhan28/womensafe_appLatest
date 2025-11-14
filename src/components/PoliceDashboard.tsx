import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Shield,
  MapPin,
  Clock,
  AlertCircle,
  TrendingUp,
  CheckCircle,
  Navigation,
  Filter,
} from 'lucide-react';

interface PoliceDashboardProps {
  onViewCase: (caseId: string) => void;
}

interface SOSCase {
  id: string;
  victimName: string;
  location: string;
  distance: string;
  time: string;
  severity: 'critical' | 'high' | 'medium';
  status: 'active' | 'acknowledged' | 'resolved';
}

export function PoliceDashboard({ onViewCase }: PoliceDashboardProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'acknowledged' | 'resolved'>('all');

  const cases: SOSCase[] = [
    {
      id: '1',
      victimName: 'Priya S.',
      location: 'Connaught Place, New Delhi',
      distance: '1.2 km',
      time: '2 min ago',
      severity: 'critical',
      status: 'active',
    },
    {
      id: '2',
      victimName: 'Anjali M.',
      location: 'Karol Bagh, New Delhi',
      distance: '3.8 km',
      time: '15 min ago',
      severity: 'high',
      status: 'acknowledged',
    },
    {
      id: '3',
      victimName: 'Meera K.',
      location: 'Nehru Place, New Delhi',
      distance: '5.1 km',
      time: '32 min ago',
      severity: 'medium',
      status: 'acknowledged',
    },
    {
      id: '4',
      victimName: 'Divya R.',
      location: 'Saket, New Delhi',
      distance: '7.3 km',
      time: '1 hour ago',
      severity: 'high',
      status: 'resolved',
    },
  ];

  const filteredCases = cases.filter(c => filter === 'all' || c.status === filter);

  const stats = {
    active: cases.filter(c => c.status === 'active').length,
    acknowledged: cases.filter(c => c.status === 'acknowledged').length,
    resolved: cases.filter(c => c.status === 'resolved').length,
    avgResponseTime: '4.5 min',
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'from-red-600 to-rose-600';
      case 'high': return 'from-orange-500 to-amber-500';
      case 'medium': return 'from-yellow-500 to-amber-400';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-700 border-red-200';
      case 'acknowledged': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-6">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white mb-6 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-white">Police Control Room</h1>
              <p className="text-white/80 text-sm">Central Delhi Station</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs text-white/80">Active</span>
              </div>
              <p className="text-white text-xl">{stats.active}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <Navigation className="w-4 h-4" />
                <span className="text-xs text-white/80">Acknowledged</span>
              </div>
              <p className="text-white text-xl">{stats.acknowledged}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs text-white/80">Resolved</span>
              </div>
              <p className="text-white text-xl">{stats.resolved}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs text-white/80">Avg Response</span>
              </div>
              <p className="text-white text-xl">{stats.avgResponseTime}</p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-6"
        >
          <Filter className="w-5 h-5 text-slate-600" />
          <div className="flex gap-2">
            {['all', 'active', 'acknowledged', 'resolved'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  filter === f
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cases List */}
        <div className="space-y-4">
          {filteredCases.map((sosCase, index) => (
            <motion.div
              key={sosCase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => onViewCase(sosCase.id)}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                {/* Severity Badge */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getSeverityColor(sosCase.severity)} flex items-center justify-center flex-shrink-0`}>
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>

                {/* Case Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-slate-900 mb-1">Case #{sosCase.id} - {sosCase.victimName}</h3>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {sosCase.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Navigation className="w-4 h-4" />
                          {sosCase.distance} away
                        </span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(sosCase.status)}`}>
                      {sosCase.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      {sosCase.time}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs uppercase tracking-wide ${
                      sosCase.severity === 'critical' ? 'bg-red-100 text-red-700' :
                      sosCase.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {sosCase.severity} priority
                    </span>
                  </div>
                </div>

                {/* Action Indicator */}
                <div className="flex-shrink-0">
                  {sosCase.status === 'active' && (
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                      className="w-3 h-3 rounded-full bg-red-500"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCases.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-slate-200"
          >
            <CheckCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-slate-900 mb-2">No Cases Found</h3>
            <p className="text-slate-500">No {filter} cases at the moment</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
