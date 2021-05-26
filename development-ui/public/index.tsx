import React from "react";
import ReactDom from "react-dom";
import { QuirrelDevelopmentUI, Route } from "..";

function getCurrentRoute(): Route {
  const { pathname } = window.location;
  switch (pathname) {
    case "/activity":
      return "activity";
    case "/pending":
      return "pending";
    case "/cron":
      return "cron";
    default:
      return "pending";
  }
}

ReactDom.render(
  <QuirrelDevelopmentUI
    router={{
      initial: getCurrentRoute(),
      onChange(newRoute) {
        window.history.pushState(null, newRoute, "/" + newRoute);
      },
      listenToNavigationChanges(onChange) {
        function listener(event: any) {
          onChange(getCurrentRoute())
        }
        window.addEventListener("popstate", listener);
        return () => window.removeEventListener("popstate", listener);
      },
    }}
  />,
  document.getElementById("app")
);