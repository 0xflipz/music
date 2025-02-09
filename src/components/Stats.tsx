import { useSwipeable } from 'react-swipeable';
import styled from 'styled-components';
import { devices } from '../utils/breakpoints';
import { SwipeIndicator } from './SwipeIndicator';

interface StatsProps {
  isOpen: boolean;
  onClose: () => void;
}

const StatsContainer = styled.div<{ isOpen: boolean; swipeOffset: number }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 300px;
  background: #ffffff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-out;
  transform: translateX(${props => props.isOpen ? 0 : '100%'})
    translateX(${props => props.swipeOffset}px);
  z-index: 1000;
  overflow-y: auto;

  /* Only enable swipe on mobile */
  @media ${devices.desktop} {
    transform: translateX(${props => props.isOpen ? 0 : '100%'});
  }
`;

export const Stats: React.FC<StatsProps> = ({ isOpen, onClose }) => {
  const [swipeOffset, setSwipeOffset] = React.useState(0);

  const handlers = useSwipeable({
    onSwiping: (event) => {
      if (event.dir === 'Right') {
        // Only allow swiping right (to close)
        setSwipeOffset(Math.min(event.deltaX, 300));
      }
    },
    onSwipeEnd: (event) => {
      setSwipeOffset(0);
      // If swiped more than 100px to the right, close the panel
      if (event.deltaX > 100) {
        onClose();
      }
    },
    trackMouse: false, // Only track touch events
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
  });

  return (
    <StatsContainer 
      isOpen={isOpen} 
      swipeOffset={swipeOffset}
      {...handlers}
    >
      <SwipeIndicator />
      {/* Your existing stats content */}
    </StatsContainer>
  );
}; 