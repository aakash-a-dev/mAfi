import ReactGA from "react-ga4";

const measurementId = process.env.REACT_APP_GA_MEASUREMENT_ID;

export const initializeGA = () => {
  if (measurementId) {
    ReactGA.initialize(measurementId);
  } else {
    console.warn("Google Analytics Measurement ID not found.");
  }
};

export const logPageView = (pagePath: string) => {
  if (measurementId) {
    ReactGA.send({ hitType: "pageview", page: pagePath });
  }
};
