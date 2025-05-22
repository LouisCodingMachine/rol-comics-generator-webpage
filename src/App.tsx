import React, { useEffect } from 'react';
import useAppStore from './store';
import EditorScreen from './screens/EditorScreen';
import LoadingScreen from './screens/LoadingScreen';
import FeedScreen from './screens/FeedScreen';
import './index.css';

function App() {
  const view = useAppStore(state => state.view);
  
  // Add animation classes to Tailwind
  useEffect(() => {
    // Add custom styles to head
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {view === 'editor' && <EditorScreen />}
      {view === 'loading' && <LoadingScreen />}
      {view === 'feed' && <FeedScreen />}
    </>
  );
}

export default App;