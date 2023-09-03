import React, {lazy, Suspense} from 'react';
import { createRoot } from 'react-dom/client';
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Error from "./components/Error";
import Contacts from "./components/Contacts";
import Loading from './components/Loading';
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

//on demand lazy loading while clicking on Grocery for making it as a small bundler, check it in dist folder
const Grocery = lazy(() => import("./components/Grocery"));

const AppLayout = () => {
    /*
    lazy loading (or) code splitting (or) chunking (or)
    dynamic bundling (or) on demand loading (or)
    
    lazy lets you defer loading component’s code until it is rendered for the first time.
    dynamic import with the path
    */
    return <div className="app">
        <Header/>
        <Outlet/>
    </div>
}

//Router Configuration
const appRouter = createBrowserRouter([
    {
        path: "/",
        element : <AppLayout/>,
        children: 
        [
            {
                path: "/",
                element: <Body/>,
            },
            {
                path: "/about",
                element: <About/>,
            },
            {
                path: "/grocery",
                element: <Suspense fallback={<Loading/>}>
                    <Grocery/>
                </Suspense>,
            },
            {
                path: "/contacts",
                element: <Contacts/>,
            },
            {
                path: "/restaurant/:resId", //: used for dynamic routing (resId is a param which differentiates the restaurants)
                element: <RestaurantMenu/>
            },
        ],
        errorElement: <Error/>,//shows error page
    },
    
])
const root = createRoot(document.getElementById("root"));

//Providing router configuration(appRouter) to the AppLayout
root.render(<RouterProvider router={appRouter}/>);
