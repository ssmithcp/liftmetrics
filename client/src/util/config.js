const config = {
  linkedinURL: 'https://www.linkedin.com/in/scottcsmithdev/',
  githubURL: 'https://github.com/ssmithcp/',
  baseURL: '/api/v1',
  isDev: (process.env.NODE_ENV === 'development'),
  versionTitle: 'LiftMetrics Alpha Release',
  get(val) {
    return this[val]
  },
}

export default config