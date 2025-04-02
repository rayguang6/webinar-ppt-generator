import { Slide, IconContent, Theme } from '../../types/presentation';
import { defaultTheme, gradients } from '../../styles/theme';
import { IconType } from 'react-icons';
import { 
  FiTarget, FiSettings, FiTrendingUp, FiBriefcase,
  FiAward, FiUsers, FiCheckCircle, FiFlag,
  FiArrowRight, FiMessageCircle, FiStar
} from 'react-icons/fi';
import { cn } from '../../lib/utils';

const ICON_MAP: { [key: string]: IconType } = {
  target: FiTarget,
  settings: FiSettings,
  trending: FiTrendingUp,
  briefcase: FiBriefcase,
  award: FiAward,
  users: FiUsers,
  check: FiCheckCircle,
  flag: FiFlag,
  arrow: FiArrowRight,
  message: FiMessageCircle,
  star: FiStar,
};

interface SlideRendererProps {
  slide: Slide;
  index: number;
}

export default function SlideRenderer({ slide, index }: SlideRendererProps) {
  // Merge theme with defaults
  const theme: Theme = {
    ...defaultTheme,
    ...slide.theme,
  };

  // Get background styles
  const getBackgroundStyles = () => {
    if (slide.background?.gradient) {
      return gradients[slide.background.gradient as keyof typeof gradients];
    }
    return slide.background?.color || theme.colors.background;
  };

  // Render different content types
  const renderContent = () => {
    switch (slide.type) {
      case 'cover':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-12">
            <h1 className={cn(
              "text-6xl font-bold mb-6 bg-clip-text text-transparent",
              gradients.primary
            )}>
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="text-2xl text-gray-600 mb-8">{slide.subtitle}</p>
            )}
            {typeof slide.content === 'string' && (
              <p className="text-xl text-gray-700">{slide.content}</p>
            )}
          </div>
        );

      case 'section':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-12">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-violet-500 mb-8 rounded-full" />
            <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
            {typeof slide.content === 'string' && (
              <p className="text-xl opacity-90">{slide.content}</p>
            )}
          </div>
        );

      case 'grid':
        if (!Array.isArray(slide.content)) return null;
        const iconContent = slide.content as IconContent[];
        return (
          <div className="h-full p-12">
            <h2 className="text-4xl font-bold mb-12 text-center">{slide.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {iconContent.map((item, i) => {
                const Icon = ICON_MAP[item.icon] || FiTarget;
                return (
                  <div key={i} className="flex flex-col items-center text-center group">
                    <div className="relative mb-6 transition-transform duration-300 group-hover:scale-110">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-violet-100 rounded-2xl flex items-center justify-center">
                        <Icon size={32} className="text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'steps':
        if (!Array.isArray(slide.content)) return null;
        const steps = slide.content as string[];
        return (
          <div className="h-full p-12">
            <h2 className="text-4xl font-bold mb-12">{slide.title}</h2>
            <div className="space-y-8">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg mr-6">
                    {i + 1}
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
                    <p className="text-xl text-gray-700">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'quote':
        return (
          <div className="h-full flex items-center justify-center p-12">
            <div className="max-w-3xl text-center">
              <div className="text-6xl text-blue-500 mb-8">"</div>
              <p className="text-2xl italic mb-8 leading-relaxed">
                {typeof slide.content === 'string' ? slide.content : ''}
              </p>
              {slide.subtitle && (
                <div className="text-lg font-semibold text-gray-700">
                  — {slide.subtitle}
                </div>
              )}
            </div>
          </div>
        );

      default:
        if (Array.isArray(slide.content)) {
          return (
            <div className="h-full p-12">
              <h2 className="text-4xl font-bold mb-8">{slide.title}</h2>
              <ul className="space-y-4">
                {slide.content.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4">
                      {i + 1}
                    </span>
                    <span className="text-xl text-gray-700 leading-relaxed pt-1">
                      {typeof item === 'string' ? item : item.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        
        return (
          <div className="h-full p-12">
            <h2 className="text-4xl font-bold mb-8">{slide.title}</h2>
            <div className="prose prose-lg max-w-none">
              {typeof slide.content === 'string' ? slide.content : null}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg border border-gray-200 aspect-[16/9]">
      <div className="absolute inset-0" style={{ backgroundColor: getBackgroundStyles() }} />
      <div className="relative z-10 h-full">
        {renderContent()}
      </div>
      <div className="absolute bottom-4 right-4 text-sm text-gray-500">
        {index + 1}
      </div>
    </div>
  );
} 