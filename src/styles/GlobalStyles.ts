import { createGlobalStyle } from 'styled-components';
import { devices } from '../utils/breakpoints';

export const GlobalStyles = createGlobalStyle`
  /* Base styles (mobile-first) */
  .section {
    padding: 20px;
    font-size: 16px;
    width: 100%;
  }

  /* Tablet styles */
  @media ${devices.tablet} {
    .section {
      padding: 30px;
      font-size: 18px;
    }
  }

  /* Desktop styles */
  @media ${devices.desktop} {
    .section {
      padding: 40px;
      font-size: 20px;
    }
  }
`; 