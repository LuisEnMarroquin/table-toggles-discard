import { Fragment } from "react";
import { load } from "webfontloader";
import { createRoot } from "react-dom/client";

import App from "./App";

load({
  google: {
    families: ["Helvetica Neue"],
  },
});

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Fragment>
    <App />
  </Fragment>
);
