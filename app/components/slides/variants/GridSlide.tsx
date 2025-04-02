import { Slide, IconContent } from '../../../types/presentation';
import { Container } from '../elements/Container';
import { Heading } from '../elements/Heading';
import { IconBox } from '../elements/IconBox';
import { ICON_MAP } from '../../../lib/icons';

interface GridSlideProps {
  slide: Slide;
}

export function GridSlide({ slide }: GridSlideProps) {
  if (!Array.isArray(slide.content)) return null;
  const content = slide.content as IconContent[];

  return (
    <Container padding="large">
      <div className="w-full">
        <Heading 
          size="xl" 
          align="center" 
          gradient="primary" 
          className="mb-12"
        >
          {slide.title}
        </Heading>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {content.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || ICON_MAP.default;
            
            return (
              <div key={i} className="group">
                <div className="flex flex-col items-center text-center space-y-4">
                  <IconBox 
                    icon={Icon}
                    variant="gradient"
                    size="lg"
                    className="group-hover:scale-105"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
} 