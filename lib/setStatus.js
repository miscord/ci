const agent = require('superagent')

module.exports = async (pr, token, state, description) => {
  const { head: { sha, repo: { full_name: name } } } = pr
  const { body } = await agent
    .post(`https://api.github.com/repos/${name}/statuses/${sha}`) // eslint-disable-line camelcase
    .set({ Authorization: `Bearer ${token}` })
    .send({
      state,
      description,
      context: 'continuous-integration/miscord-ci'
    })
  return body
}