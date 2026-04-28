// ============================================================
// CONTROLLER LAYER — xử lý logic, điều phối giữa Model & View
// ============================================================

import { useState, useCallback } from 'react';
import { profileData } from '../models/profileModel';

/**
 * useProfileController — Custom hook đóng vai trò Controller trong MVC.
 * Quản lý toàn bộ state và business logic của trang profile.
 */
export function useProfileController() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [heroSlide, setHeroSlide] = useState(0);

  // Chuyển tab và cuộn lên đầu trang
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Toggle menu mobile
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Xử lý hover card
  const handleCardHover = useCallback((cardId) => {
    setHoveredCard(cardId);
  }, []);

  const handleCardLeave = useCallback(() => {
    setHoveredCard(null);
  }, []);

  // Chuyển slide hero
  const handleHeroSlide = useCallback((direction) => {
    setHeroSlide((prev) => {
      const total = profileData.skills.length;
      if (direction === 'next') return (prev + 1) % total;
      return (prev - 1 + total) % total;
    });
  }, []);

  // Tạo các highlight cards cho quick navigation
  const getHighlightCards = useCallback(() => [
    {
      id: 'education',
      icon: '🎓',
      title: 'Học vấn',
      value: profileData.education.school,
      sub: profileData.education.major,
      color: '#6366f1',
      tab: 'education',
    },
    {
      id: 'specialization',
      icon: '💻',
      title: 'Chuyên ngành',
      value: profileData.specialization.field,
      sub: profileData.specialization.focus,
      color: '#8b5cf6',
      tab: 'projects',
    },
    {
      id: 'hobbies',
      icon: '❤️',
      title: 'Sở thích',
      value: profileData.hobbies.slice(0, 3).map((h) => h.label).join(' · '),
      sub: 'và nhiều hơn nữa...',
      color: '#ec4899',
      tab: 'hobbies',
    },
  ], []);

  return {
    // State
    activeTab,
    isMenuOpen,
    hoveredCard,
    heroSlide,

    // Data từ model
    profile: profileData,

    // Actions
    handleTabChange,
    toggleMenu,
    handleCardHover,
    handleCardLeave,
    handleHeroSlide,
    getHighlightCards,
  };
}
