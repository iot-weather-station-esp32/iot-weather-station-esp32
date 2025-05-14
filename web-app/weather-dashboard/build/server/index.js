import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Precipitation() {
  return /* @__PURE__ */ jsxs("div", { className: "dashboard-component lg:col-span-2", children: [
    /* @__PURE__ */ jsx("div", { className: "container-decoration" }),
    /* @__PURE__ */ jsx("div", { className: "container-distribution", children: /* @__PURE__ */ jsxs("div", { className: "p-10 pt-4", children: [
      /* @__PURE__ */ jsx("h3", { children: "Precipitación" }),
      /* @__PURE__ */ jsx("p", { className: "data", children: "2.6 mm hoy" }),
      /* @__PURE__ */ jsx("p", { className: "description", children: "Acumulado mes · Intensidad actual" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" })
  ] });
}
function PressureForecast() {
  return /* @__PURE__ */ jsxs("div", { className: "dashboard-component lg:col-span-3", children: [
    /* @__PURE__ */ jsx("div", { className: "container-decoration lg:rounded-tr-[2rem]" }),
    /* @__PURE__ */ jsx("div", { className: "container-distribution lg:rounded-tr-[calc(2rem+1px)]", children: /* @__PURE__ */ jsxs("div", { className: "p-10 pt-4", children: [
      /* @__PURE__ */ jsx("h3", { children: "Presión & Pronóstico" }),
      /* @__PURE__ */ jsx("p", { className: "data", children: "1013 hPa" }),
      /* @__PURE__ */ jsx("p", { className: "description", children: "Tendencia ↑/↓ · Altitud compensada" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 lg:rounded-tr-[2rem]" })
  ] });
}
function RadiationUV() {
  return /* @__PURE__ */ jsxs("div", { className: "dashboard-component lg:col-span-2", children: [
    /* @__PURE__ */ jsx("div", { className: "container-decoration max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" }),
    /* @__PURE__ */ jsx("div", { className: "container-distribution max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]", children: /* @__PURE__ */ jsxs("div", { className: "p-10 pt-4", children: [
      /* @__PURE__ */ jsx("h3", { children: "Radiación & UV" }),
      /* @__PURE__ */ jsx("p", { className: "data", children: "Índice UV 5" }),
      /* @__PURE__ */ jsx("p", { className: "description", children: "Irradiancia W/m² · Salida/puesta de sol" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" })
  ] });
}
function TemperatureHumidity() {
  return /* @__PURE__ */ jsxs("div", { className: "dashboard-component lg:col-span-3", children: [
    /* @__PURE__ */ jsx("div", { className: "container-decoration max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" }),
    /* @__PURE__ */ jsx("div", { className: "container-distribution max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]", children: /* @__PURE__ */ jsxs("div", { className: "p-10 pt-4", children: [
      /* @__PURE__ */ jsx("h3", { children: "Temperatura & Humedad" }),
      /* @__PURE__ */ jsx("p", { className: "data", children: "24 °C · 46 %" }),
      /* @__PURE__ */ jsx("p", { className: "description", children: "Mín./máx. del día · Punto de rocío" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" })
  ] });
}
function Wind() {
  return /* @__PURE__ */ jsxs("div", { className: "dashboard-component lg:col-span-2", children: [
    /* @__PURE__ */ jsx("div", { className: "container-decoration lg:rounded-bl-[2rem]" }),
    /* @__PURE__ */ jsx("div", { className: "container-distribution lg:rounded-bl-[calc(2rem+1px)]", children: /* @__PURE__ */ jsxs("div", { className: "p-10 pt-4", children: [
      /* @__PURE__ */ jsx("h3", { children: "Viento" }),
      /* @__PURE__ */ jsx("p", { className: "data", children: "12 km/h NE" }),
      /* @__PURE__ */ jsx("p", { className: "description", children: "Ráfaga máx. · Dirección dominante" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 lg:rounded-bl-[2rem]" })
  ] });
}
function Welcome() {
  return /* @__PURE__ */ jsx("div", { className: "bg-white py-24 sm:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-base/7 font-semibold text-indigo-600", children: "Estación Meteorológica" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-row justify-between", children: [
      /* @__PURE__ */ jsx("p", { className: "max-w-lg text-2xl font-semibold tracking-tight text-pretty text-gray-950 sm:text-3xl", children: "Tres Cantos, Madrid, Spain" }),
      /* @__PURE__ */ jsx("p", { className: "max-w-lg text-2xl font-semibold tracking-tight text-pretty text-gray-950 sm:text-3xl", children: "24º" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2", children: [
      /* @__PURE__ */ jsx(TemperatureHumidity, {}),
      /* @__PURE__ */ jsx(PressureForecast, {}),
      /* @__PURE__ */ jsx(Wind, {}),
      /* @__PURE__ */ jsx(Precipitation, {}),
      /* @__PURE__ */ jsx(RadiationUV, {})
    ] })
  ] }) });
}
function meta({}) {
  return [{
    title: "Weather Dashboard"
  }, {
    name: "description",
    content: "IOT Weather Station - ESP32"
  }];
}
const home = withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(Welcome, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-SQZkSKxz.js", "imports": ["/assets/chunk-D4RADZKF-BXVSF3ox.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-DAuLI5Pb.js", "imports": ["/assets/chunk-D4RADZKF-BXVSF3ox.js", "/assets/with-props-BMOtgW5C.js"], "css": ["/assets/root-DaL2qPZg.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-GVL2LOsc.js", "imports": ["/assets/with-props-BMOtgW5C.js", "/assets/chunk-D4RADZKF-BXVSF3ox.js"], "css": ["/assets/home-BpPTZoYk.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-cee65b8e.js", "version": "cee65b8e", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
