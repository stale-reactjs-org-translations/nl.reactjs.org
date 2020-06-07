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

Rendert een React-element naar zijn initiële HTML. React zal een HTML-string terug geven. Je kunt deze methode gebruiken om HTML te genereren op de server en deze markup versturen bij het eerste verzoek voor het sneller laden van de pagina en om searchengines je pagina te kunnen laten crawlen voor SEO-doeleinden.

Als je [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) aanroept op een node die deze server-rendered markup al heeft zal React deze behouden en alleen event-handlers koppelen, wat je de mogelijkheid geeft zeer snelle first-load ervaringen te krijgen.

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

Vergelijkbaar met [`renderToString`](#rendertostring) behalve dat er geen extra DOM-attributen worden gegenereerd die React intern gebruikt zoals `data-reactroot`. Dit is handig, als je React wilt gebruiken als een eenvoudige generator van statische pagina's omdat het weghalen van de extra attributen wat bytes kan schelen.

Gebruik deze methode niet als je van plan bent React op de client te gebruiken om de markup interactief te maken. Gebruik in plaats daarvan [`renderToString`](#rendertostring) op de server en [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) op de client.

* * *

### `renderToNodeStream()` {#rendertonodestream}

```javascript
ReactDOMServer.renderToNodeStream(element)
```

Rendert een React-element naar zijn initiële HTML. Geeft een [Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams) terug die een HTML-string geeft. De HTML-uitvoer van deze stream is exact hetzelfde als die [`ReactDOMServer.renderToString`](#rendertostring) terug zou geven. Je kunt deze methode gebruiken om HTML te generenen op de server en deze markup versturen bij het eerste verzoek voor het sneller laden van de pagina en om searchengines je pagina te kunnen laten crawlen voor SEO-doeleinden.

Als je [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) aanroept op een node die deze server-rendered markup al heeft zal React deze behouden en alleen event-handlers koppelen, wat je de mogelijkheid geeft zeer snelle first-load ervaringen te krijgen.

> Opmerking:
>
> Server-only. Deze API is niet beschikbaar in de browser.
>
> De stream die teruggegeven wordt door deze methode geeft een byte-stream gecodeerd in utf-8. Als je een andere encoding nodig hebt, bekijk dan een project zoals [iconv-lite](https://www.npmjs.com/package/iconv-lite), dat voorziet in transformatie-streams voor het transcoderen van tekst.

* * *

### `renderToStaticNodeStream()` {#rendertostaticnodestream}

```javascript
ReactDOMServer.renderToStaticNodeStream(element)
```

Vergelijkbaar met [`renderToNodeStream`](#rendertonodestream) behalve dat er geen extra DOM-attributen worden gegenereerd die React intern gebruikt zoals `data-reactroot`. Dit is handig, als je React wilt gebruiken als een eenvoudige generator van statische pagina's omdat het weghalen van de extra attributen wat bytes kan schelen.

De HTML-uitvoer van deze stream is exact hetzelfde als die [`ReactDOMServer.renderToStaticMarkup`](#rendertostaticmarkup) terug zou geven.

Gebruik deze methode niet als je van plan bent React op de client te gebruiken om de markup interactief te maken. Gebruik in plaats daarvan [`renderToNodeStream`](#rendertonodestream) op de server en [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) op de client.

> Opmerking:
>
> Server-only. Deze API is niet beschikbaar in de browser.
>
> De stream die teruggegeven wordt door deze methode geeft een byte-stream gecodeerd in utf-8. Als je een andere encoding nodig hebt, bekijk dan een project zoals [iconv-lite](https://www.npmjs.com/package/iconv-lite) dat voorziet in transformatie-streams voor het transcoderen van tekst.
