import type { SlideTemplate } from '../types/slide';

export const basicTemplate: SlideTemplate[] = [
  {
    id: 'title-slide',
    name: 'Title Slide',
    components: ['title'],
    layout: 'default'
  },
  {
    id: 'key-benefits',
    name: 'Key Benefits',
    components: ['keyBenefits'],
    layout: 'default'
  }
]; 