import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiViewList,
  mdiResponsive,
  mdiPalette,
  mdiReact,
  mdiGit,
  mdiFileTreeOutline,
  mdiVectorDifference,
  mdiCogOutline
} from '@mdi/js'

export default [
  {
    to: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard'
  },
  {
    to: '/tables',
    label: 'Hierarchy',
    icon: mdiFileTreeOutline
  },
  {
    to: '/forms',
    label: 'Snapshots',
    icon: mdiGit
  },
  {
    to: '/ui',
    label: 'Diff View',
    icon: mdiVectorDifference
  },
  {
    to: '/responsive',
    label: 'Settings',
    icon: mdiCogOutline
  },

  {
    href: 'https://github.com/rgehrsitz/archon-electron',
    label: 'GitHub',
    icon: mdiGithub,
    target: '_blank'
  },


]
