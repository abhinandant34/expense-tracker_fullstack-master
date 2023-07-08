import {dashboard,trend, download} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },    
    {
        id: 3,
        title: "Transactions",
        icon: download,
        link: "/dashboard",
    },
    {
        id: 2,
        title: "Add Entry",
        icon: trend,
        link: "/dashboard",
    },
]