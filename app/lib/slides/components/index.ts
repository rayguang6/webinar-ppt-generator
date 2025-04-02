import type { SlideComponent, SlideComponentType } from '../../types/slide';
import { TitleComponent } from './title';
import { KeyBenefitsComponent } from './key-benefits';
import { BulletPointsComponent } from './bullet-points';

// Component Registry
const components: Record<SlideComponentType, SlideComponent> = {
  title: TitleComponent,
  keyBenefits: KeyBenefitsComponent,
  bullets: BulletPointsComponent,
  image: {} as SlideComponent,   // Placeholder
};

export const getComponent = (type: SlideComponentType): SlideComponent => {
  if (!components[type]) {
    throw new Error(`Component type "${type}" not found`);
  }
  return components[type];
};

export const getAllComponents = (): Record<SlideComponentType, SlideComponent> => {
  return components;
}; 