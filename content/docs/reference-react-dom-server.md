---
id: react-dom-server
title: ReactDOMServer
layout: docs
category: Reference
permalink: docs/react-dom-server.html
---

Het `ReactDOMServer` object stelt je in staat componenten te renderen naar statische markup. Meestal wordt het gebruikt op een Node server:

```js
// ES modules
import ReactDOMServer from 'react-dom/server';
// CommonJS
var ReactDOMServer = require('react-dom/server');
```

## Overzicht {#overview}

De volgende methoden kunnen zowel op de server- als in de browser-omgeving worden gebruikt:

- [`renderToString()`](#rendertostring)
- [`renderToStaticMarkup()`](#rendertostaticmarkup)

Deze extra methoden zijn afhankelijk van een package (`stream`) die **alleen beschikbaar is op de server**, en zal niet werken in de browser.

- [`renderToNodeStream()`](#rendertonodestream)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## Reference {#reference}

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```

Render een React element naar zijn initiële HTML. React zal een HTML-string terug geven. Je kunt deze methode gebruiken om HTML te genereren op de server en deze markup versturen bij het eerste verzoek voor het sneller laden van de pagina en om searchengines je pagina te kunnen laten crawlen voor SEO-doeleinden.

Als je [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) aanroept op een node die deze server-rendered markup al heeft zal React deze behouden en alleen event-handlers koppelen, wat je de mogelijkheid geeft zeer snelle first-load ervaringen te krijgen.

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

Similar to [`renderToString`](#rendertostring), except this doesn't create extra DOM attributes that React uses internally, such as `data-reactroot`. This is useful if you want to use React as a simple static page generator, as stripping away the extra attributes can save some bytes.

If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToString`](#rendertostring) on the server and [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) on the client.

* * *

### `renderToNodeStream()` {#rendertonodestream}

```javascript
ReactDOMServer.renderToNodeStream(element)
```

Render a React element to its initial HTML. Returns a [Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams) that outputs an HTML string. The HTML output by this stream is exactly equal to what [`ReactDOMServer.renderToString`](#rendertostring) would return. You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes.

If you call [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

> Opmerking:
>
> Server-only. Deze API is niet beschikbaar in de browser.
>
> De stream die teruggegeven wordt door deze methode geeft een byte-stream gencodeerd in utf-8. Als je een andere encoding nodig hebt, bekijk dan een project zoals [iconv-lite](https://www.npmjs.com/package/iconv-lite), dat voorziet in transformatie-streams voor het transcoden van tekst.

* * *

### `renderToStaticNodeStream()` {#rendertostaticnodestream}

```javascript
ReactDOMServer.renderToStaticNodeStream(element)
```

Similar to [`renderToNodeStream`](#rendertonodestream), except this doesn't create extra DOM attributes that React uses internally, such as `data-reactroot`. This is useful if you want to use React as a simple static page generator, as stripping away the extra attributes can save some bytes.

The HTML output by this stream is exactly equal to what [`ReactDOMServer.renderToStaticMarkup`](#rendertostaticmarkup) would return.

If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToNodeStream`](#rendertonodestream) on the server and [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) on the client.

> Opmerking:
>
> Server-only. Deze API is niet beschikbaar in de browser.
>
> De stream die teruggegeven wordt door deze methode geeft een byte-stream gencodeerd in utf-8. Als je een andere encoding nodig hebt, bekijk dan een project zoals [iconv-lite](https://www.npmjs.com/package/iconv-lite), dat voorziet in transformatie-streams voor het transcoden van tekst.
