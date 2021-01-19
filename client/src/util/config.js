const config = {
  linkedinURL: 'https://www.linkedin.com/in/scottcsmithdev/',
  githubURL: 'https://github.com/ssmithcp/',
  get(val) {
    return this[val]
  },
}

export default config