// Layout variants for different slide types
export const SLIDE_VARIANTS = {
  bullets: {
    vertical: {
      id: 'vertical',
      name: 'Vertical List',
      description: 'Traditional bullet point list'
    },
    horizontal: {
      id: 'horizontal',
      name: 'Horizontal Cards',
      description: 'Points displayed as side-by-side cards'
    },
    boxed: {
      id: 'boxed',
      name: 'Boxed Grid',
      description: 'Points in separate boxes in a grid'
    }
  },
  keyBenefits: {
    grid: {
      id: 'grid',
      name: 'Grid Layout',
      description: '2x2 grid of benefits'
    },
    horizontal: {
      id: 'horizontal',
      name: 'Horizontal Row',
      description: 'Benefits in a single row'
    }
  },
  title: {
    center: {
      id: 'center',
      name: 'Centered',
      description: 'Centered title and subtitle'
    },
    side: {
      id: 'side',
      name: 'Side Aligned',
      description: 'Left-aligned with accent bar'
    }
  }
} as const;

export const SLIDE_TYPES = [
  {
    id: 'title-slide',
    name: 'Title Slide',
    description: 'Main title with optional subtitle',
    schema: {
      title: 'string',
      subtitle: 'string?',
    }
  },
  {
    id: 'bullet-points',
    name: 'Bullet Points',
    description: 'Title with bullet points',
    schema: {
      title: 'string',
      points: 'array[1-6]',
      variant: 'string',
    }
  },
  {
    id: 'key-benefits',
    name: 'Key Benefits',
    description: '2-4 key benefits with icons',
    schema: {
      benefits: 'array[2-4]',
      variant: 'string',
    }
  },
  {
    id: 'image-side',
    name: 'Image with Text',
    description: 'Image on one side, text on the other',
    schema: {
      title: 'string',
      content: 'string',
      image: 'string',
      imagePosition: 'left|right',
    }
  },
] as const; 