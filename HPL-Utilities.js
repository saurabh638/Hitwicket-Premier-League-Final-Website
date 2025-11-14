/**
 * ============================================================================
 * Hitwicket Premier League (HPL) Landing Page - JavaScript Utilities
 * ============================================================================
 * Collection of helper functions, constants, and utility scripts for
 * HPL landing page development using React.js
 * ============================================================================
 */

// ============================================================================
// 1. CONSTANTS & CONFIGURATION
// ============================================================================

/**
 * Event Configuration
 * Main configuration object for HPL event details
 */
export const HPL_CONFIG = {
  eventName: 'Hitwicket Premier League',
  eventYear: 2025,
  tagline: 'Build Your City. Choose Your Coach. Dominate the Arena.',
  description: 'Join the ultimate cricket gaming tournament where community participation drives the action. Vote for cities, elect coaches, participate in live auctions, and lead your franchise to glory.',
  
  // Event Timeline
  eventStart: '2025-11-14',
  eventEnd: '2026-01-31',
  
  // YouTube Video Details
  youtube: {
    videoId: 'n3PIq7Au6bk',
    title: 'Hitwicket Premier League 2025 Trailer',
    channel: '@hitwicket'
  },

  // Current Phase (Update as phases progress)
  currentPhase: {
    id: 'city-voting',
    name: 'City Voting & Selection',
    startDate: '2025-11-14T00:00:00Z',
    endDate: '2025-11-17T23:59:59Z',
    isActive: true,
    icon: 'MapPin',
    description: 'Vote for your favorite city to represent in the tournament'
  }
};

/**
 * Color Palette
 * All colors used in HPL design system
 */
export const HPL_COLORS = {
  // Primary Colors (from HPL Logo)
  primary: {
    yellow: '#FFEB3B',
    orange: '#FF9800',
    navy: '#1A2B4D',
    white: '#FFFFFF',
    charcoal: '#0F1419'
  },

  // Extended Palette
  background: {
    dark: '#0A0E1A',
    surface: '#151B2A',
    card: '#1E2538',
    hover: '#252E45'
  },

  // Text Colors
  text: {
    primary: '#FFFFFF',
    secondary: '#A0AEC0',
    muted: '#4B5563',
    accent: '#FFEB3B'
  },

  // Status Colors
  status: {
    active: '#10B981',
    upcoming: '#FF9800',
    completed: '#6B7280',
    error: '#EF4444'
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #FFEB3B 0%, #FF9800 100%)',
    dark: 'linear-gradient(180deg, #0F1419 0%, #151B2A 100%)',
    accent: 'linear-gradient(90deg, #FFEB3B 0%, #FFA500 100%)',
    hover: 'linear-gradient(135deg, #1E2538 0%, #151B2A 100%)'
  }
};

/**
 * Event Phases
 * Complete list of all HPL event phases
 */
export const HPL_PHASES = [
  {
    id: 'city-voting',
    name: 'City Voting & Selection',
    order: 1,
    startDate: '2025-11-14',
    endDate: '2025-11-17',
    platform: 'Website',
    description: 'Vote for your favorite city to represent in the tournament',
    icon: 'MapPin',
    status: 'active',
    route: '/hpl/city-voting',
    fullDetails: 'Choose from cities across the country. The top 10 cities with maximum votes will be selected to compete in HPL 2025.'
  },
  {
    id: 'coach-nominations',
    name: 'Head Coach Nominations',
    order: 2,
    startDate: '2025-11-19',
    endDate: '2025-11-21',
    platform: 'Website / Google Form',
    description: 'Apply to lead your city\'s franchise as head coach',
    icon: 'User',
    status: 'upcoming',
    route: '/hpl/coach-nominations',
    fullDetails: 'Eligible players can nominate themselves to become the head coach of their chosen city.'
  },
  {
    id: 'coach-elections',
    name: 'Head Coach Elections',
    order: 3,
    startDate: '2025-11-23',
    endDate: '2025-11-26',
    platform: 'Website',
    description: 'Vote for who will lead your city\'s franchise',
    icon: 'Vote',
    status: 'upcoming',
    route: '/hpl/elections',
    fullDetails: 'Community votes to elect the head coach for each city. Each city gets one head coach.'
  },
  {
    id: 'franchise-setup',
    name: 'Franchise Setup',
    order: 4,
    startDate: '2025-11-28',
    endDate: '2025-12-04',
    platform: 'Google Form / Email',
    description: 'Coaches build their teams and create franchise identity',
    icon: 'Users',
    status: 'upcoming',
    route: '/hpl/franchise-setup',
    fullDetails: 'Head coaches assemble their support staff, design team logos, choose team names, and select primary colors.'
  },
  {
    id: 'player-nominations',
    name: 'Player Nominations',
    order: 5,
    startDate: '2025-11-30',
    endDate: '2025-12-03',
    platform: 'In-game / Website',
    description: 'Nominate your best players for the live auction',
    icon: 'Users2',
    status: 'upcoming',
    route: '/hpl/player-nominations',
    fullDetails: 'Players are nominated by community members to participate in the live auction. Selected players will be bid on by franchises.'
  },
  {
    id: 'live-auction',
    name: 'Live Player Auction',
    order: 6,
    startDate: '2025-12-06',
    endDate: '2025-12-07',
    platform: 'Live Stream (Social Media)',
    description: 'Franchises bid for players (IPL-style auction)',
    icon: 'Gavel',
    status: 'upcoming',
    route: '/hpl/auction',
    fullDetails: 'Live streamed auction where franchises competitively bid to acquire top players for their teams.'
  },
  {
    id: 'fixtures-reveal',
    name: 'Group Stage Draw',
    order: 7,
    startDate: 'TBD',
    endDate: 'TBD',
    platform: 'Social Media',
    description: 'Tournament groups announced via live group draw',
    icon: 'Calendar',
    status: 'tbd',
    route: '/hpl/fixtures',
    fullDetails: 'Tournament brackets and group stages are announced through a live draw ceremony.'
  },
  {
    id: 'group-matches',
    name: 'Group Stage Matches',
    order: 8,
    startDate: 'TBD',
    endDate: 'TBD',
    platform: 'In-game',
    description: 'Round-robin matches in group stages',
    icon: 'Trophy',
    status: 'tbd',
    route: '/hpl/matches',
    fullDetails: 'Teams compete in group stage matches. Winners advance to knockout rounds.'
  },
  {
    id: 'finals',
    name: 'Semi-Finals & Grand Finale',
    order: 9,
    startDate: 'TBD',
    endDate: 'TBD',
    platform: 'In-game / Social Media',
    description: 'Knockout stages culminating in grand finals',
    icon: 'Flame',
    status: 'tbd',
    route: '/hpl/finals',
    fullDetails: 'Top teams compete in knockout matches. Semi-finals and grand final will be live-streamed.'
  }
];

/**
 * FAQ Data
 * Frequently asked questions organized by category
 */
export const HPL_FAQS = [
  {
    category: 'General Questions',
    questions: [
      {
        id: 'faq-001',
        question: 'What is Hitwicket Premier League?',
        answer: 'Hitwicket Premier League (HPL) 2025 is a massive community-driven esports cricket tournament where players vote for cities, elect head coaches, participate in live player auctions, and compete in tournament matches. It\'s the ultimate cricket gaming experience combining strategy, community engagement, and competitive gameplay.'
      },
      {
        id: 'faq-002',
        question: 'When does HPL 2025 take place?',
        answer: 'HPL 2025 runs from November 14, 2025 to January 31, 2026. The event is divided into multiple phases including city voting, coach elections, player auctions, and tournament matches.'
      },
      {
        id: 'faq-003',
        question: 'Who can participate in HPL?',
        answer: 'All registered Hitwicket players at Level 10 or above are eligible to participate in HPL 2025.'
      },
      {
        id: 'faq-004',
        question: 'Is there a registration fee to join HPL?',
        answer: 'No, HPL 2025 is completely free to participate. All you need is a Hitwicket account and to meet the Level 10+ requirement.'
      }
    ]
  },
  {
    category: 'Participation Questions',
    questions: [
      {
        id: 'faq-101',
        question: 'How do I vote for my city?',
        answer: 'During the City Voting phase (November 14-17), visit the HPL website, log in with your Hitwicket account, and vote for your favorite city. Each account gets one vote.'
      },
      {
        id: 'faq-102',
        question: 'Can I change my vote after submitting it?',
        answer: 'No, votes are final once submitted. Choose carefully as you cannot modify your vote after submission.'
      },
      {
        id: 'faq-103',
        question: 'How many votes can I cast?',
        answer: 'Each eligible player can cast one vote per phase. You can vote for your city, then vote for a head coach candidate, and so on.'
      },
      {
        id: 'faq-104',
        question: 'What happens if I miss a voting phase?',
        answer: 'Voting phases are limited time events. If you miss a phase, you won\'t be able to participate in that particular voting. Make sure to check the timeline and participate during the active phases.'
      }
    ]
  },
  {
    category: 'Coach & Franchise Questions',
    questions: [
      {
        id: 'faq-201',
        question: 'How do I become a head coach?',
        answer: 'During the Head Coach Nominations phase (November 19-21), eligible players can submit their nomination through the provided form. You can nominate yourself to represent your chosen city.'
      },
      {
        id: 'faq-202',
        question: 'What are the responsibilities of a head coach?',
        answer: 'Head coaches are responsible for: selecting their support staff, designing the franchise identity (logo, team name, tagline, colors), and making strategic decisions during the tournament.'
      },
      {
        id: 'faq-203',
        question: 'How many players can a franchise have?',
        answer: 'Each franchise will have a squad size determined through the player auction. The exact squad size will be announced before the Live Auction phase.'
      },
      {
        id: 'faq-204',
        question: 'Can I be a head coach of multiple cities?',
        answer: 'No, each head coach can only lead one city franchise. One city = One head coach.'
      }
    ]
  },
  {
    category: 'Rewards & Competition',
    questions: [
      {
        id: 'faq-301',
        question: 'What rewards can I win?',
        answer: 'HPL 2025 offers exclusive rewards including digital trophies, in-game currency, custom jerseys, profile badges, and special recognition. Specific reward tiers will be announced during the event.'
      },
      {
        id: 'faq-302',
        question: 'How are winners determined?',
        answer: 'Winners are determined based on tournament results. The city franchise that wins the grand finale gets the championship. Individual and team achievements also earn recognition.'
      },
      {
        id: 'faq-303',
        question: 'Are there participation rewards?',
        answer: 'Yes! All participants who engage in HPL activities (voting, nominations, auctions) will receive participation rewards and badges.'
      },
      {
        id: 'faq-304',
        question: 'Will there be live streaming of matches?',
        answer: 'Yes, semi-final and final matches will be live-streamed on Hitwicket\'s social media channels (YouTube, Instagram, etc.) for all community members to watch.'
      }
    ]
  }
];

/**
 * Social Media Links
 * All social media and community channel links
 */
export const HPL_SOCIAL_LINKS = {
  discord: {
    name: 'Discord',
    url: 'https://discord.gg/hitwicket',
    icon: 'Discord',
    color: '#5865F2',
    label: 'Join Discord Community'
  },
  instagram: {
    name: 'Instagram',
    url: 'https://instagram.com/hitwicket',
    icon: 'Instagram',
    color: '#E1306C',
    label: 'Follow on Instagram'
  },
  youtube: {
    name: 'YouTube',
    url: 'https://www.youtube.com/@hitwicket',
    icon: 'Youtube',
    color: '#FF0000',
    label: 'Subscribe on YouTube'
  },
  twitter: {
    name: 'Twitter/X',
    url: 'https://twitter.com/hitwicket',
    icon: 'Twitter',
    color: '#000000',
    label: 'Follow on Twitter'
  },
  whatsapp: {
    name: 'WhatsApp',
    url: 'https://whatsapp.com/channel/0029Va...',
    icon: 'MessageCircle',
    color: '#25D366',
    label: 'Join WhatsApp Channel'
  },
  facebook: {
    name: 'Facebook',
    url: 'https://facebook.com/hitwicket',
    icon: 'Facebook',
    color: '#1877F2',
    label: 'Like Facebook Page'
  }
};

// ============================================================================
// 2. UTILITY FUNCTIONS
// ============================================================================

/**
 * Format Date
 * Converts date string to readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

/**
 * Format Date Range
 * Creates a date range string (e.g., "Nov 14 - Nov 17")
 * @param {string} startDate - Start date ISO string
 * @param {string} endDate - End date ISO string
 * @returns {string} Formatted date range
 */
export const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
  const end = new Date(endDate).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
  return `${start} - ${end}`;
};

/**
 * Calculate Time Until Date
 * Returns days, hours, minutes, seconds until target date
 * @param {Date} targetDate - Target date
 * @returns {object} Object with time units
 */
export const calculateTimeUntil = (targetDate) => {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const distance = target - now;

  if (distance < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: true };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
    completed: false
  };
};

/**
 * Get Phase Status
 * Determines if a phase is active, upcoming, or completed
 * @param {string} startDate - Phase start date
 * @param {string} endDate - Phase end date
 * @returns {string} Status: 'active', 'upcoming', 'completed', or 'tbd'
 */
export const getPhaseStatus = (startDate, endDate) => {
  if (startDate === 'TBD' || endDate === 'TBD') return 'tbd';
  
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) return 'upcoming';
  if (now > end) return 'completed';
  return 'active';
};

/**
 * Get Phase Icon
 * Returns the appropriate icon name for a phase
 * @param {string} phaseId - Phase ID
 * @returns {string} Icon component name
 */
export const getPhaseIcon = (phaseId) => {
  const iconMap = {
    'city-voting': 'MapPin',
    'coach-nominations': 'User',
    'coach-elections': 'Vote',
    'franchise-setup': 'Users',
    'player-nominations': 'Users2',
    'live-auction': 'Gavel',
    'fixtures-reveal': 'Calendar',
    'group-matches': 'Trophy',
    'finals': 'Flame'
  };
  return iconMap[phaseId] || 'HelpCircle';
};

/**
 * Validate Email
 * Simple email validation
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Debounce Function
 * Delays function execution
 * @param {function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {function} Debounced function
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle Function
 * Limits function execution frequency
 * @param {function} func - Function to throttle
 * @param {number} limit - Minimum time between calls in milliseconds
 * @returns {function} Throttled function
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Scroll to Element
 * Smoothly scrolls to a specific element
 * @param {string} elementId - ID of element to scroll to
 */
export const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

/**
 * Get Scroll Percentage
 * Returns percentage of page scrolled
 * @returns {number} Scroll percentage (0-100)
 */
export const getScrollPercentage = () => {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  return scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
};

/**
 * Copy to Clipboard
 * Copies text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise} Resolves when copy is complete
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

/**
 * Format Number with Commas
 * Adds commas to large numbers
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Generate YouTube Embed URL
 * Creates embed URL from video ID
 * @param {string} videoId - YouTube video ID
 * @param {boolean} autoplay - Auto-play video
 * @returns {string} Embed URL
 */
export const generateYouTubeEmbedUrl = (videoId, autoplay = false) => {
  const baseUrl = 'https://www.youtube.com/embed';
  const params = new URLSearchParams({
    autoplay: autoplay ? 1 : 0,
    controls: 1,
    modestbranding: 1
  });
  return `${baseUrl}/${videoId}?${params.toString()}`;
};

/**
 * Check if Element is in Viewport
 * Determines if element is visible
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if element is visible
 */
export const isElementInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Merge Class Names
 * Combines multiple class strings
 * @param {...string} classes - Class names to merge
 * @returns {string} Combined class string
 */
export const mergeClassNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// ============================================================================
// 3. CUSTOM HOOKS (to be used in React components)
// ============================================================================

/**
 * useCountdown Hook
 * Manages countdown timer logic
 * Usage in React component:
 * const { days, hours, minutes, seconds } = useCountdown(targetDate);
 */
export const useCountdownHook = (targetDate) => {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  React.useEffect(() => {
    const updateCountdown = () => {
      setTimeLeft(calculateTimeUntil(targetDate));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
};

/**
 * useMediaQuery Hook
 * Detects media query matches
 * Usage: const isMobile = useMediaQuery('(max-width: 768px)');
 */
export const useMediaQueryHook = (query) => {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

/**
 * useIntersectionObserver Hook
 * Detects when element enters viewport
 * Usage: const ref = useIntersectionObserver(callback);
 */
export const useIntersectionObserverHook = (callback, options = {}) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [callback]);

  return ref;
};

// ============================================================================
// 4. ANIMATION HELPERS
// ============================================================================

/**
 * Create Stagger Animation Delays
 * Returns array of delays for staggered animations
 * @param {number} count - Number of items
 * @param {number} delayUnit - Delay unit in ms
 * @returns {array} Array of delay values
 */
export const createStaggerDelays = (count, delayUnit = 100) => {
  return Array.from({ length: count }, (_, i) => i * delayUnit);
};

/**
 * Get Animation Class
 * Returns appropriate animation class based on parameters
 * @param {string} animationType - Type of animation
 * @param {boolean} isVisible - Is element visible
 * @returns {string} CSS class name
 */
export const getAnimationClass = (animationType, isVisible) => {
  if (!isVisible) return '';
  
  const animationMap = {
    'fade-in': 'fade-in',
    'slide-left': 'slide-in-left',
    'slide-right': 'slide-in-right',
    'scale-pop': 'scale-pop',
    'bounce': 'bounce-icon'
  };

  return animationMap[animationType] || '';
};

// ============================================================================
// 5. EXPORT DEFAULT
// ============================================================================

export default {
  HPL_CONFIG,
  HPL_COLORS,
  HPL_PHASES,
  HPL_FAQS,
  HPL_SOCIAL_LINKS,
  formatDate,
  formatDateRange,
  calculateTimeUntil,
  getPhaseStatus,
  validateEmail,
  debounce,
  throttle,
  scrollToElement,
  generateYouTubeEmbedUrl
};