import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('UA-138341130-1');
};

export const logPageView = (title) => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname, [], title);
};
