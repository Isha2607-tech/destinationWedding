import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const hexToHsl = (hex) => {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
};

const ThemeController = () => {
  const location = useLocation();

  useEffect(() => {
    const applyTheme = () => {
      const isVendor = location.pathname.startsWith('/vendor');
      const isAdmin = location.pathname.startsWith('/admin');
      
      let targetHex = null;
      if (isAdmin) {
        targetHex = localStorage.getItem('theme_admin_primary') || localStorage.getItem('theme_global_primary');
      } else if (isVendor) {
        targetHex = localStorage.getItem('theme_vendor_primary') || localStorage.getItem('theme_global_primary');
      } else {
        targetHex = localStorage.getItem('theme_user_primary') || localStorage.getItem('theme_global_primary');
      }

      const styleId = 'dynamic-theme-overrides';
      let styleTag = document.getElementById(styleId);

      if (!targetHex) {
         if (styleTag) styleTag.remove();
         return;
      }

      const hslValue = hexToHsl(targetHex);
      const css = `
        :root {
          --primary: ${hslValue} !important;
          --wedding-gold: ${hslValue} !important;
          --ring: ${hslValue} !important;
        }
        .active-sidebar-item {
          background-color: hsl(${hslValue}) !important;
        }
      `;

      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = styleId;
        document.head.appendChild(styleTag);
      }
      styleTag.innerHTML = css;
    };

    applyTheme();
    
    // Listen for storage changes from other tabs/settings
    window.addEventListener('storage', applyTheme);
    window.addEventListener('themeChanged', applyTheme);
    
    return () => {
      window.removeEventListener('storage', applyTheme);
      window.removeEventListener('themeChanged', applyTheme);
    };
  }, [location.pathname]);

  return null;
};

export default ThemeController;
