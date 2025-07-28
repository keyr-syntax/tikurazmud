import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// <!-- Google tag (gtag.js) -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=G-1JGMPDCC5W"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'G-1JGMPDCC5W');
// </script>

import ReactGA from "react-ga4";
const GoogleAnalyticsKey = "G-1JGMPDCC5W";
export const InitializeGoogleAnalytics = () => {
  ReactGA.initialize(GoogleAnalyticsKey);
};

// export const PageVisitor = () => {
//   ReactGA.pageview(window.location.pathname + window.location.search);
// };
