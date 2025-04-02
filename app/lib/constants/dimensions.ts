// PowerPoint default dimensions (16:9)
export const SLIDE_DIMENSIONS = {
  width: 1920,  // px
  height: 1080, // px
  aspectRatio: 16/9,
  // PPTX uses inches, so we need conversion
  pptx: {
    width: 10,    // inches
    height: 5.625 // inches
  }
} as const;

// Common spacing values
export const SPACING = {
  padding: {
    small: '1rem',
    medium: '2rem',
    large: '3rem'
  },
  margin: {
    small: '1rem',
    medium: '2rem',
    large: '3rem'
  }
} as const;

// Common text sizes
export const TEXT_SIZES = {
  title: {
    fontSize: '2.5rem',
    lineHeight: '3rem'
  },
  subtitle: {
    fontSize: '1.8rem',
    lineHeight: '2.4rem'
  },
  body: {
    fontSize: '1.25rem',
    lineHeight: '1.75rem'
  }
} as const;

// Common slide padding (in pixels and percentage)
export const SLIDE_PADDING = {
  px: 48,
  percent: '5%',
} as const;

// PowerPoint coordinate system (percentage-based)
export const PPTX_COORDINATES = {
  defaultMargin: '5%',
  titleY: '40%',
  subtitleY: '60%',
  contentWidth: '90%', // 100% - (2 * defaultMargin)
} as const; 