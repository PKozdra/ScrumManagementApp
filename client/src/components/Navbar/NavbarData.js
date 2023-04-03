// table for keeping navbar data - title, path, icon

// home, signin, signup, dashboard, logout
const NavbarData = [
    {
        title: 'Sign In',
        path: '/signin',
        icon: <i className="fas fa-sign-in-alt"></i>,
    },
    {
        title: 'Sign Up',
        path: '/signup',
        icon: <i className="fas fa-user-plus"></i>
    },
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <i className="fas fa-tachometer-alt"></i>
    },
    {
        title: 'Logout',
        path: '/logout',
        icon: <i className="fas fa-sign-out-alt"></i>
    }
];

export default NavbarData;
