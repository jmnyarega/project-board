import { Outlet } from "react-router";

const Layout = () => {
    return (
        <>
            <span>Header</span>
            <main style={{ minHeight: "80vh" }}>
                <Outlet />
            </main>
            <span>Footer</span>
        </>
    )
};

export default Layout;
