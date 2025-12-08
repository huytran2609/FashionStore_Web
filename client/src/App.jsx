import { Fragment } from 'react';
import { privateRoutes, publicRoutes } from './routes';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from '~/layouts/public/defaultLayout';
import AdminLayout from '~/layouts/admin/adminLayout';
import { ToastContainer } from 'react-toastify';
import Scroll from './layouts/public/scrollToTop';

function App() {
    return (
        <div className="App">
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.page;
                    let Layout = DefaultLayout;
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
                {privateRoutes.map((route, index) => {
                    const Page = route.page;
                    let LayoutAdmin = AdminLayout;
                    if (route.layout) {
                        LayoutAdmin = route.layout;
                    } else if (route.layout === null) {
                        LayoutAdmin = Fragment;
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <LayoutAdmin>
                                    <Page />
                                </LayoutAdmin>
                            }
                        />
                    );
                })}
            </Routes>
            <Scroll />
            <ToastContainer style={{ bottom: '-1%' }} position="bottom-right" />
        </div>
    );
}

export default App;
