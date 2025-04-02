import { IconType } from 'react-icons';
import { 
  FiTarget, FiSettings, FiTrendingUp, FiBriefcase,
  FiAward, FiUsers, FiCheckCircle, FiFlag,
  FiArrowRight, FiMessageCircle, FiStar,
  FiBox, FiCpu, FiDatabase, FiGlobe, FiLayout,
  FiPieChart, FiShield, FiSmartphone, FiZap
} from 'react-icons/fi';

export const ICON_MAP: Record<string, IconType> = {
  // Default
  default: FiBox,
  
  // Basic icons
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
  
  // Technology icons
  cpu: FiCpu,
  database: FiDatabase,
  globe: FiGlobe,
  layout: FiLayout,
  chart: FiPieChart,
  shield: FiShield,
  mobile: FiSmartphone,
  lightning: FiZap
}; 