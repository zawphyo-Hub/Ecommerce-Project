import React from 'react';
import AdminSidebar from './AdminSideBar';
import { Outlet } from 'react-router-dom';

function AdminLayout(){
  return (
    <AdminSidebar>
      <Outlet />
    </AdminSidebar>
  );
};

export default AdminLayout;
