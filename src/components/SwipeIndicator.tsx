import styled from 'styled-components';
import { devices } from '../utils/breakpoints';

const SwipeHint = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  display: none;
  align-items: center;
  color: #666;
  font-size: 14px;
  opacity: 0.7;

  /* Only show on mobile */
  @media (max-width: ${devices.tablet}) {
    display: flex;
  }

  &::before {
    content: '←';
    margin-right: 8px;
    animation: swipeHint 1.5s infinite;
  }

  @keyframes swipeHint {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(-10px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

export const SwipeIndicator = () => (
  <SwipeHint>Swipe to close</SwipeHint>
); 