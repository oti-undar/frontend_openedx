let getAuthenticatedUser
try {
  // eslint-disable-next-line no-undef
  ;({ getAuthenticatedUser } = require('@edx/frontend-platform/auth'))
} catch {
  getAuthenticatedUser = () => ({
    userId: 4,
  })
}

export function getUserAuth() {
  const data = getAuthenticatedUser()

  return data
}
