import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { ThemeProvider } from './components/ThemeContext';
import { Welcome } from './components/Welcome';
import { AuthScreen } from './components/AuthScreen';
import { OnboardingFlow } from './components/OnboardingFlow';
import { GuardianSetup } from './components/GuardianSetup';
import { HomeScreen } from './components/HomeScreen';
import { SOSActivation } from './components/SOSActivation';
import { OfflineSOS } from './components/OfflineSOS';
import { OnlineSOS } from './components/OnlineSOS';
import { RecordingEvidence } from './components/RecordingEvidence';
import { Settings } from './components/Settings';
import { PoliceDashboard } from './components/PoliceDashboard';
import { PoliceCommandCenter } from './components/PoliceCommandCenter';
import { PoliceCommandCenterNew } from './components/PoliceCommandCenterNew';
import { CaseDetail } from './components/CaseDetail';
import { ResponderView } from './components/ResponderView';

export type Screen = 
  | 'welcome'
  | 'auth'
  | 'onboarding' 
  | 'guardian-setup' 
  | 'home' 
  | 'sos-activation' 
  | 'offline-sos' 
  | 'online-sos' 
  | 'recording' 
  | 'settings'
  | 'police-dashboard'
  | 'police-command-center'
  | 'police-command-center-new'
  | 'case-detail'
  | 'responder-view';

export interface Guardian {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

function AppContent() {
  const { isAuthenticated, logout, user } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [guardians, setGuardians] = useState<Guardian[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [sosMode, setSosMode] = useState<'offline' | 'online' | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [hasSetupGuardians, setHasSetupGuardians] = useState(false);

  // Load saved state from localStorage
  useEffect(() => {
    const savedOnboarding = localStorage.getItem('sahaaya_onboarding_complete');
    const savedGuardians = localStorage.getItem('sahaaya_guardians');
    
    if (savedOnboarding === 'true') {
      setHasCompletedOnboarding(true);
    }
    
    if (savedGuardians) {
      const parsedGuardians = JSON.parse(savedGuardians);
      setGuardians(parsedGuardians);
      if (parsedGuardians.length > 0) {
        setHasSetupGuardians(true);
      }
    }
  }, []);

  // Determine initial screen based on auth and setup state
  useEffect(() => {
    if (!isAuthenticated) {
      // Not authenticated - stay on welcome or show welcome
      if (currentScreen !== 'welcome' && currentScreen !== 'auth') {
        setCurrentScreen('welcome');
      }
    } else {
      // Authenticated - determine where to send user
      if (!hasCompletedOnboarding) {
        setCurrentScreen('onboarding');
      } else if (currentScreen === 'welcome' || currentScreen === 'auth') {
        // If coming from auth screens, go to home (skip guardian setup)
        setCurrentScreen('home');
      }
    }
  }, [isAuthenticated, hasCompletedOnboarding, hasSetupGuardians]);

  const handleGetStarted = () => {
    setCurrentScreen('auth');
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    localStorage.setItem('sahaaya_onboarding_complete', 'true');
    // Skip guardian setup - go directly to home
    setCurrentScreen('home');
  };

  const handleGuardianSetupComplete = (contacts: Guardian[]) => {
    setGuardians(contacts);
    setHasSetupGuardians(true);
    localStorage.setItem('sahaaya_guardians', JSON.stringify(contacts));
    setCurrentScreen('home');
  };

  const handleSOSTrigger = () => {
    setCurrentScreen('sos-activation');
    // Simulate checking connectivity
    setTimeout(() => {
      const isOnline = Math.random() > 0.3; // 70% online
      setSosMode(isOnline ? 'online' : 'offline');
      setCurrentScreen(isOnline ? 'online-sos' : 'offline-sos');
    }, 2000);
  };

  const handleImSafe = () => {
    setCurrentScreen('home');
    setSosMode(null);
  };

  const handleOpenSettings = () => {
    setCurrentScreen('settings');
  };

  const handleCloseSettings = () => {
    setCurrentScreen('home');
  };

  const handleOpenPoliceControl = () => {
    setCurrentScreen('police-command-center-new');
  };

  const handleClosePoliceControl = () => {
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    logout();
    setCurrentScreen('welcome');
    setGuardians([]);
    setHasCompletedOnboarding(false);
    setHasSetupGuardians(false);
    localStorage.removeItem('sahaaya_onboarding_complete');
    localStorage.removeItem('sahaaya_guardians');
  };

  const handleViewCaseDetail = (caseId: string) => {
    setSelectedCaseId(caseId);
    setCurrentScreen('case-detail');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('police-dashboard');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <Welcome onGetStarted={handleGetStarted} />;
      case 'auth':
        return <AuthScreen />;
      case 'onboarding':
        return <OnboardingFlow onComplete={handleOnboardingComplete} />;
      case 'guardian-setup':
        return <GuardianSetup onComplete={handleGuardianSetupComplete} />;
      case 'home':
        return <HomeScreen onSOSTrigger={handleSOSTrigger} onOpenSettings={handleOpenSettings} onOpenPoliceControl={handleOpenPoliceControl} />;
      case 'sos-activation':
        return <SOSActivation />;
      case 'offline-sos':
        return <OfflineSOS guardians={guardians} onImSafe={handleImSafe} />;
      case 'online-sos':
        return <OnlineSOS guardians={guardians} onImSafe={handleImSafe} />;
      case 'recording':
        return <RecordingEvidence />;
      case 'settings':
        return (
          <Settings 
            onClose={handleCloseSettings} 
            onLogout={handleLogout}
            guardians={guardians}
            onUpdateGuardians={setGuardians}
          />
        );
      case 'police-dashboard':
        return <PoliceDashboard onViewCase={handleViewCaseDetail} />;
      case 'police-command-center':
        return <PoliceCommandCenter />;
      case 'police-command-center-new':
        return <PoliceCommandCenterNew onClose={handleClosePoliceControl} />;
      case 'case-detail':
        return <CaseDetail caseId={selectedCaseId} onBack={handleBackToDashboard} />;
      case 'responder-view':
        return <ResponderView onClose={() => setCurrentScreen('home')} />;
      default:
        return <Welcome onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {renderScreen()}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;