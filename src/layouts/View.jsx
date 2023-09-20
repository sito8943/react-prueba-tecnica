import { Fragment } from "react";

import { Outlet } from "react-router-dom";

function View() {
  return (
    <Fragment>
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
}

export default View;
