import Script from 'next/script'

export const SegmentScript = ({
  segmentWriteKey,
}: {
  segmentWriteKey?: string
}) => {
  if (!segmentWriteKey) return null
  return (
    <Script
      id="segment"
      dangerouslySetInnerHTML={{
        __html: `
                  !function() {
                    var analytics = window.analytics = window.analytics || [];
                    if (!analytics.initialize)
                      if (analytics.invoked) window.console && console.error && console.error("Segment snippet included twice.");
                      else {
                        analytics.invoked = !0;
                        analytics.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "reset", "group", "track", "ready", "alias", "debug", "page", "screen", "once", "off", "on", "addSourceMiddleware", "addIntegrationMiddleware", "setAnonymousId", "addDestinationMiddleware", "register"];
                        analytics.factory = function(e) {
                          return function() {
                            if (window.analytics.initialized) return window.analytics[e].apply(window.analytics, arguments);
                            var i = Array.prototype.slice.call(arguments);
                            if (["track", "screen", "alias", "group", "page", "identify"].indexOf(e) > -1) {
                              var c = document.querySelector("link[rel='canonical']");
                              i.push({
                                __t: "bpc",
                                c: c && c.getAttribute("href") || void 0,
                                p: location.pathname,
                                u: location.href,
                                s: location.search,
                                t: document.title,
                                r: document.referrer
                              })
                            }
                            i.unshift(e);
                            analytics.push(i);
                            return analytics
                          }
                        };
                        for (var i = 0; i < analytics.methods.length; i++) {
                          var key = analytics.methods[i];
                          analytics[key] = analytics.factory(key)
                        }
                        analytics.load = function(key, i) {
                          var t = document.createElement("script");
                          t.type = "text/javascript";
                          t.async = !0;
                          t.src = "https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";
                          var n = document.getElementsByTagName("script")[0];
                          n.parentNode.insertBefore(t, n);
                          analytics._loadOptions = i
                        };
                        analytics._writeKey = "${segmentWriteKey}";;
                        analytics.SNIPPET_VERSION = "5.2.0";
                        analytics.load("${segmentWriteKey}");
                        analytics.page();
                      }
                  }();
                `,
      }}
    />
  )
}
