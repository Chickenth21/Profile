/**
 * App.jsx — Entry point theo mô hình MVC
 *
 * Luồng dữ liệu:
 *  Model (profileModel.js) → Controller (profileController.js)
 *                          → View (MainLayout + HomePage / PlaceholderView)
 */
import './index.css';
import { useProfileController } from './controllers/profileController';
import MainLayout from './views/layouts/MainLayout';
import HomePage from './views/Home/HomePage';
import PlaceholderView from './views/components/PlaceholderView';

function App() {
  // ── Controller khởi tạo ──
  const controller = useProfileController();
  const { activeTab, profile, isMenuOpen, handleTabChange, toggleMenu } = controller;

  // ── Router đơn giản dựa trên activeTab ──
  const renderView = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage controller={controller} />;
      case 'education':
      case 'projects':
      case 'hobbies':
      case 'contact':
        return (
          <PlaceholderView
            tabId={activeTab}
            onBack={() => handleTabChange('home')}
          />
        );
      default:
        return <HomePage controller={controller} />;
    }
  };

  return (
    <MainLayout
      profile={profile}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      isMenuOpen={isMenuOpen}
      onToggleMenu={toggleMenu}
    >
      {renderView()}
    </MainLayout>
  );
}

export default App;
