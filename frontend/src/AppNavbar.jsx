import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarToggler } from 'reactstrap';
import DButton from './components/DButton';

export default function AppNavbar() {
    const user = useSelector(state => state.tokenStore.user);
    const [collapsed, setCollapsed] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const toggleNavbar = () => setCollapsed(!collapsed);

    function getProps(link) {
        const props = {
            onClick: () => {navigate(link)},
            // eslint-disable-next-line react-hooks/rules-of-hooks
            ...(location.pathname === link ? 
                { onClick: undefined, style: { pointerEvents: 'none' } } : { color: 'white' } ),
        };

        return props;
    }

    /**
     * SE UTILIZAN DIFERENTES RUTAS DEPENDIENDO DEL ESTADO DE INICIO DE SESIÓN DEL USUARIO
     */
    /**
     * Rutas que estarán disponibles para administradores
     */
    function adminRoutes() {
        if (user?.is_admin) {
            return (
                <>
                </>
            )
        }
    }

    /**
     * Rutas que estarán disponibles para usuarios autenticados que no son administradores
     */
    function notAdminRoutes() {
        if (user && !user?.is_admin) {
            return (
                <>
                </>
            )
        }
    }

    /**
     * Rutas que estarán disponibles para usuarios autenticados
     */
    function loggedRoutes() {
        if (user) {
            return (
                <>

                </>
            )
        }
    }

    return (
        <div style={{ position: 'sticky', width: '100vw', zIndex: '1000', top: '0' }}>
            <Navbar expand="md" light style={{ backgroundColor: 'var(--bs-body-bg)'}}>
                {!user?.is_admin ? (
                <DButton {...getProps('/')} style={{ display: 'flex' }}>
                    <img alt="Pubus logo" src="/logo.png" style={
                        { height: '100%', width: '100%', maxHeight: 40, maxWidth: 40, padding: '0', marginBottom: '5px' }
                    } />
                    <p style={{ lineHeight: '2em', marginBottom: '0' }}>Online</p>
                </DButton>
                ) : undefined}
            </Navbar>
        </div>
    );
}
