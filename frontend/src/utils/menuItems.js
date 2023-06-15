import {dashboard, expenses, users, trend} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "Credit",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Debit",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Signup",
        icon: users,
        link: "/dashboard",
    },
    {
        id: 5,
        title: "Login",
        icon: users,
        link: "/dashboard",
    },
]