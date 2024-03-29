export interface Route {
  title: string;
  path: string;
  toPath?: (id: string) => string;
}

interface RoutesList {
  [key: string]: Route;
}

const routes: RoutesList = {
  index: {
    title: 'Landing page',
    path: '/'
  },
  about: {
    title: 'About',
    path: '/about',
  },
  signUp: {
    title: 'Sign Up',
    path: '/account/create',
  },
  home: {
    title: 'Home',
    path: '/home',
  },
  login: {
    title: 'Login',
    path: '/account/login',
  },
  profile: {
    title: 'Profile',
    path: '/account/profile',
  },
  trackHome: {
    title: 'Track',
    path: '/track'
  },
  trackWeight: {
    title: 'Weight',
    path: '/track/weight',
  },
  trackEditWeight: {
    title: 'Edit weight',
    path: '/track/weight/:id',
    toPath: id => `/track/weight/${ id }`
  },
  trackFood: {
    title: 'Food',
    path: '/track/food',
  },
  trackExercise: {
    title: 'Workout',
    path: '/track/exercise',
  },
  trackEditExercise: {
    title: 'Edit exercise',
    path: '/track/exercise/:id',
    toPath: id => `/track/exercise/${ id }`
  },
  trackEditMovement: {
    title: 'Edit movements',
    path: '/track/movement'
  },
  trackSleep: {
    title: 'Sleep',
    path: '/track/sleep',
  },
  trackSupplement: {
    title: 'Supplement',
    path: '/track/supplement',
  },
  trackEditConsumedSupplement: {
    title: 'Edit supplement',
    path: '/track/supplement/:id',
    toPath: id => `/track/supplement/${ id }`
  },
  trackMeasurement: {
    title: 'Measurement',
    path: '/track/measurement',
  },
  trackEditMeasurement: {
    title: 'Edit measurement',
    path: '/track/measurement/:id',
    toPath: id => `/track/measurement/${ id }`
  },
  trackNote: {
    title: 'Note',
    path: '/track/note',
  },
  trackGoal: {
    title: 'Goal',
    path: '/track/goal',
  },
  analyzeHome: {
    title: 'Analyze',
    path: '/analyze'
  },
  analyzeWeekly: {
    title: 'Weekly summary',
    path: '/analyze/weekly'
  },
  analyzeGraph: {
    title: 'Progress graph',
    path: '/analyze/graph'
  },
};

export default routes;