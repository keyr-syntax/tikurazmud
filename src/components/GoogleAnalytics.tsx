import { useEffect } from "react";
import ReactGA from "react-ga4";
const GoogleAnalyticsKey = "G-1JGMPDCC5W";
export const InitializeGoogleAnalytics = () => {
  ReactGA.initialize(GoogleAnalyticsKey);
};

export default function GoogleAnalytics() {
  useEffect(() => {
    InitializeGoogleAnalytics();
  }, []);
  return <></>;
}
