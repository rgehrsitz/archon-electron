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
  mdiCogOutline,
  mdiHumanGreeting
} from '@mdi/js'

export default [
  {
    to: '/welcome',
    icon: mdiHumanGreeting,
    label: 'Welcome'
  },
  {
    to: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard'
  },
  {
    to: '/hierarchy',
    label: 'Hierarchy',
    icon: mdiFileTreeOutline
  },
  {
    to: '/snapshots',
    label: 'Snapshots',
    icon: mdiGit
  },
  {
    to: '/diffview',
    label: 'Diff View',
    icon: mdiVectorDifference
  },
  {
    to: '/settings',
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
