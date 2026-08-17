// ✅ UTILITY: Safe storage access (localStorage + sessionStorage fallback)

export const storageUtils = {
  // SET: Try localStorage, fallback to sessionStorage
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (err) {
      console.warn(`localStorage blocked for ${key}, using sessionStorage:`, err);
      try {
        sessionStorage.setItem(key, value);
      } catch (sessionErr) {
        console.error(`Both storage methods failed for ${key}:`, sessionErr);
      }
    }
  },

  // GET: Check localStorage first, then sessionStorage
  getItem: (key) => {
    try {
      const localValue = localStorage.getItem(key);
      if (localValue) return localValue;
    } catch (err) {
      console.warn(`localStorage access blocked for ${key}`);
    }

    try {
      const sessionValue = sessionStorage.getItem(key);
      if (sessionValue) return sessionValue;
    } catch (err) {
      console.warn(`sessionStorage access blocked for ${key}`);
    }

    return null;
  },

  // REMOVE: Remove from both storage methods
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.warn(`localStorage removeItem blocked for ${key}`);
    }

    try {
      sessionStorage.removeItem(key);
    } catch (err) {
      console.warn(`sessionStorage removeItem blocked for ${key}`);
    }
  },

  // CLEAR: Clear both storage methods
  clear: () => {
    try {
      localStorage.clear();
    } catch (err) {
      console.warn("localStorage clear blocked");
    }

    try {
      sessionStorage.clear();
    } catch (err) {
      console.warn("sessionStorage clear blocked");
    }
  },
};

export default storageUtils;