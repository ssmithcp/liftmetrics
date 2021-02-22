const config = {
  linkedinURL: 'https://www.linkedin.com/in/scottcsmithdev/',
  githubURL: 'https://github.com/ssmithcp/',
  lmGithubURL: 'https://github.com/ssmithcp/liftmetrics',
  portfolioGithubURL: 'https://github.com/ssmithcp/portfolio',
  portfolioURL: 'https://quizzical-leavitt-48e17c.netlify.app/',
  baseURL: '/api/v1',
  isDev: (process.env.NODE_ENV === 'development'),
  versionTitle: 'LiftMetrics Alpha Release',
  get(val) {
    return this[val]
  },
}

export default config