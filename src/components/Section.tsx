import styled from 'styled-components';
import { devices } from '../utils/breakpoints';

const ResponsiveSection = styled.section`
  /* Mobile styles (default) */
  display: flex;
  flex-direction: column;
  padding: 1rem;
  
  /* Items that need different mobile layout */
  .content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  /* Preserve desktop layout at larger screens */
  @media ${devices.desktop} {
    .content-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* Handle text overflow */
  .text-content {
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  }

  /* Handle images */
  img {
    max-width: 100%;
    height: auto;
  }

  /* Handle tables */
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    
    @media ${devices.desktop} {
      display: table;
      white-space: normal;
    }
  }
`; 