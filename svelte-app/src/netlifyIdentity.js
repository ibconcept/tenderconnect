// netlifyIdentity.js
export const initNetlifyIdentity = (userStore, navigate) => {
  if (typeof window !== 'undefined') {
    window.netlifyIdentity = window.netlifyIdentity || function() {
      console.warn('Netlify Identity widget is not loaded.');
    };

    window.netlifyIdentity.on('init', (user) => {
      if (user) {
        console.log('User is logged in:', user);
        userStore.set(user);
      } else {
        console.log('User is not logged in.');
      }
    });

    window.netlifyIdentity.on('login', (userData) => {
      console.log('User logged in:', userData);
      userStore.set(userData);
      window.netlifyIdentity.close();
      navigate('/');
    });

    window.netlifyIdentity.on('logout', () => {
      console.log('User logged out');
      userStore.set(null);
      navigate('/login'); // Redirect to login page after logout
    });

    window.netlifyIdentity.on('signup', (userData) => {
      console.log('User signed up:', userData);
      userStore.set(userData);
      window.netlifyIdentity.close();
      navigate('/');
    });
  }
};

export const login = () => {
  window.netlifyIdentity.open();
};

export const logout = () => {
  window.netlifyIdentity.logout();
};

export const signup = () => {
  window.netlifyIdentity.open();
};
