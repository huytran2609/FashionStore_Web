// import { useState } from 'react';

import { Fragment } from 'react';
import { privateRoutes, publicRoutes } from './routes';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from '~/layouts/public/DefaultLayout';
import AdminLayout from '~/layouts/admin/AdminLayout';
import { ToastContainer } from 'react-toastify';

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
            <ToastContainer position="bottom-right"/>
        </div>
    );
}

export default App;
