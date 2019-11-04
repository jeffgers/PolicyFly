const routes = [
  {
    path: '/',
    view: 'Home',
  },
  {
    path: 'commits',
    view: 'Commits',
  },
  {
    path: 'commits/:hash',
    view: 'CommitDetails',
  },
  {
    path: 'auth',
    view: 'Auth',
  },
]

export default routes
