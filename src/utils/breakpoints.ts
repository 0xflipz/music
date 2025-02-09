export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  largeDesktop: '1440px'
};

export const devices = {
  mobile: `(min-width: ${breakpoints.mobile})`,
  tablet: `(min-width: ${breakpoints.tablet})`,
  desktop: `(min-width: ${breakpoints.desktop})`,
  largeDesktop: `(min-width: ${breakpoints.largeDesktop})`
}; 