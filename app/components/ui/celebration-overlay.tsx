import React from 'react';
 import { AnimatePresence, motion } from 'framer-motion';
import Confetti from 'react-confetti';  
import { useWindowSize } from 'react-use'; 

interface CelebrationOverlayProps {
  isVisible: boolean;
  onAnimationComplete?: () => void;
 }

const CelebrationOverlay: React.FC<CelebrationOverlayProps> = ({ isVisible, onAnimationComplete }) => {
  const { width, height } = useWindowSize();

   React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVisible) {
      timer = setTimeout(() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [isVisible, onAnimationComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'rgba(0, 0, 0, 0.7)', // Removed semi-transparent background
            zIndex: 9999, // Ensure it's on top
            pointerEvents: 'none', // Allow clicks/interactions on elements underneath
          }}
        >
          <Confetti
            width={width}
            height={height}
            recycle={false} // Play once
            numberOfPieces={ 500 } // Only show pieces when visible
            gravity={0.1}
            tweenDuration={2000} // Adjust to match overall duration
            onConfettiComplete={(confetti) => {
               // This callback is useful if you want to do something when confetti finishes                                                                         │
               // but we're using a timer for onAnimationComplete 
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CelebrationOverlay;
