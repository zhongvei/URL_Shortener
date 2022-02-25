import NavBar from "./NavBar";

const Layout = ({ children }) => {
    return(
        <div className="flex-row">
            <NavBar />
            <div className="flex-grow">{children}</div>
        </div>
    )

};

export default Layout;
