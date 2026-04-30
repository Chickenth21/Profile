/**
 * App.jsx — Entry point theo mô hình MVC
 * Luồng: Model → Controller → View (với animated page transitions)
 */
import './index.css';
import { useState, useEffect, useRef } from 'react';
import { useProfileController } from './controllers/profileController';
import MainLayout from './views/layouts/MainLayout';
import HomePage from './views/Home/HomePage';
import PlaceholderView from './views/components/PlaceholderView';
import ContactPage from './views/Contact/ContactPage';

/* ── Keyframes injected once ── */
const TRANSITION_STYLE = `
  @keyframes page-in  { from { opacity:0; transform:translateY(28px) scale(0.98) } to { opacity:1; transform:translateY(0) scale(1) } }
  @keyframes page-out { from { opacity:1; transform:translateY(0)  scale(1)    } to { opacity:0; transform:translateY(-20px) scale(0.98) } }
  .page-enter { animation: page-in  0.42s cubic-bezier(0.22,0.68,0,1.1) both }
  .page-exit  { animation: page-out 0.22s cubic-bezier(0.4,0,1,1) both; pointer-events:none; }
`;

function AnimatedView({ activeTab, controller }) {
  const [displayTab, setDisplayTab] = useState(activeTab);
  const [phase, setPhase] = useState('enter'); // 'enter' | 'exit'
  const prevTab = useRef(activeTab);

  useEffect(() => {
    if (activeTab === prevTab.current) return;
    // 1. Trigger exit animation
    setPhase('exit');
    const t = setTimeout(() => {
      // 2. Swap content
      setDisplayTab(activeTab);
      prevTab.current = activeTab;
      // 3. Trigger enter animation
      setPhase('enter');
    }, 220); // match page-out duration
    return () => clearTimeout(t);
  }, [activeTab]);

  const renderTab = (tab) => {
    switch (tab) {
      case 'home':
        return <HomePage controller={controller} />;
      case 'education':
      case 'projects':
      case 'hobbies':
        return (
          <PlaceholderView
            tabId={tab}
            onBack={() => controller.handleTabChange('home')}
          />
        );
      case 'contact':
        return <ContactPage profile={controller.profile} />;
      default:
        return <HomePage controller={controller} />;
    }
  };

  return (
    <div
      className={phase === 'exit' ? 'page-exit' : 'page-enter'}
      style={{ willChange: 'opacity, transform' }}
    >
      {renderTab(displayTab)}
    </div>
  );
}

function App() {
  const controller = useProfileController();
  const { activeTab, profile, isMenuOpen, handleTabChange, toggleMenu } = controller;

  return (
    <>
      <style>{TRANSITION_STYLE}</style>
      <MainLayout
        profile={profile}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isMenuOpen={isMenuOpen}
        onToggleMenu={toggleMenu}
      >
        <AnimatedView activeTab={activeTab} controller={controller} />
      </MainLayout>
    </>
  );
}

export default App;
