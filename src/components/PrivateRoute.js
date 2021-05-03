/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import oAuth from "../services/oauth";
const PrivateRoute = ({
  component: Component,
  permissionComponent: PermissionComponent,
}) => {
  const [loading, setLoading] = useState(true);
  const [permissionGranted, setPermission] = useState(false);

  useEffect(() => {
    init();
  });

  const init = async () => {
    if (await oAuth.checkPermissions()) {
      setPermission(true);
    }
    setLoading(false);
  };

  return (
    <div>
      {loading ?
        <div id="spinner-1" />
        : permissionGranted ?
          <Component />
          :
          <PermissionComponent />
      }
    </div>
  );
};

export default PrivateRoute;
