---
id: rendering-elements
title: Elementen Renderen
permalink: docs/rendering-elements.html
redirect_from:
  - "docs/displaying-data.html"
prev: introducing-jsx.html
next: components-and-props.html
---

Elementen zijn de kleinste bouwstenen van React applicaties.

Een element beschrijft dat wat je wilt laten zien op het scherm:

```js
const element = <h1>Hello, world</h1>;
```

In tegenstelling tot de elementen van het browser DOM zijn React elementen eenvoudige objecten en goedkoop om te maken. Het React DOM zorgt ervoor dat het DOM wordt bijgewerkt zodat het gelijk blijft aan de React elementen.

>**Opmerking:**
>
>Het zou kunnen dat men elementen verwart met het bekendere concept van "componenten". We zullen componenten introduceren in het [volgende hoofdstuk](/docs/components-and-props.html). Elementen zijn waar componenten "van gemaakt zijn" en we raden je aan om eerst dit hoofdstuk te lezen alvorens verder te gaan.

## Een Element In Het DOM Renderen {#rendering-an-element-into-the-dom}

Stel dat er ergens in je HTML bestand een `<div>` staat:

```html
<div id="root"></div>
```

We noemen dit een "root" DOM node omdat alle inhoud van deze node beheerd zal worden door het React DOM.

Applicaties die alleen met React gebouwd zijn, hebben meestal een enkele root DOM node. Als je React probeert te integreren in een bestaande applicatie, kun je zoveel geïsoleerde root DOM nodes hebben als je maar wilt.

<<<<<<< HEAD
Om een React element in de root DOM node te renderen, geef je beide door aan [`ReactDOM.render()`](/docs/react-dom.html#render):

`embed:rendering-elements/render-an-element.js`

[Probeer het op Codepen](codepen://rendering-elements/render-an-element)
=======
To render a React element, first pass the DOM element to [`ReactDOM.createRoot()`](/docs/react-dom-client.html#createroot), then pass the React element to `root.render()`:

`embed:rendering-elements/render-an-element.js`

**[Try it on CodePen](https://codepen.io/gaearon/pen/ZpvBNJ?editors=1010)**
>>>>>>> 63c77695a95902595b6c2cc084a5c3650b15210a

Dit zal "Hello, world" op de pagina tonen.

## Een Gerenderd Element Bijwerken {#updating-the-rendered-element}

React elementen zijn [immutable (Engels)](https://en.wikipedia.org/wiki/Immutable_object) (onveranderlijk). Nadat je een element hebt gemaakt, kun je zijn children of attributen niet meer wijzigen. Een element is als een enkel frame in een film: het vertegenwoordigt de UI op een bepaald moment in de tijd.

<<<<<<< HEAD
Voor zover we nu weten, kan de UI alleen bijgewerkt worden door een nieuw element te maken en het door te geven aan [`ReactDOM.render()`](/docs/react-dom.html#render).
=======
With our knowledge so far, the only way to update the UI is to create a new element, and pass it to `root.render()`.
>>>>>>> 63c77695a95902595b6c2cc084a5c3650b15210a

Neem dit voorbeeld van een tikkende klok:

`embed:rendering-elements/update-rendered-element.js`

<<<<<<< HEAD
[Probeer het op CodePen](codepen://rendering-elements/update-rendered-element)

Hierin wordt [`ReactDOM.render() (Engels)`](/docs/react-dom.html#render) elke seconde aangeroepen via een [`setInterval()` (Engels)](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) callback.
=======
**[Try it on CodePen](https://codepen.io/gaearon/pen/gwoJZk?editors=1010)**

It calls [`root.render()`](/docs/react-dom.html#render) every second from a [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) callback.
>>>>>>> 63c77695a95902595b6c2cc084a5c3650b15210a

>**Opmerking:**
>
<<<<<<< HEAD
>In de praktijk roepen de meeste React apps [`ReactDOM.render()`](/docs/react-dom.html#render) maar één keer aan. In de volgende hoofdstukken zullen we leren hoe code zoals dit voorbeeld ingekapseld worden in [stateful componenten](/docs/state-and-lifecycle.html).
=======
>In practice, most React apps only call `root.render()` once. In the next sections we will learn how such code gets encapsulated into [stateful components](/docs/state-and-lifecycle.html).
>>>>>>> 63c77695a95902595b6c2cc084a5c3650b15210a
>
>We raden aan om geen hoofdstukken over te slaan, omdat ze op elkaar voortbouwen.

## React Werkt Alleen Datgene Bij Dat Nodig Is {#react-only-updates-whats-necessary}

Het React DOM vergelijkt het element en zijn children met het vorige element en voert alleen de wijzigingen in het DOM uit die nodig zijn om deze in de gewenste staat te krijgen.

<<<<<<< HEAD
Je kunt dit zien door met de browser tools het [laatste voorbeeld](codepen://rendering-elements/update-rendered-element)  te inspecteren:
=======
You can verify by inspecting the [last example](https://codepen.io/gaearon/pen/gwoJZk?editors=1010) with the browser tools:
>>>>>>> 63c77695a95902595b6c2cc084a5c3650b15210a

![DOM inspector toont granulaire updates](../images/docs/granular-dom-updates.gif)

Alleen de tekst node waarvan de inhoud wijzigt wordt bijgewerkt door het React DOM, ook al gebruiken we een element dat de hele UI tree beschrijft op elke tick.

Onze ervaringen hebben ons geleerd dat je een hele categorie aan bugs elimineert als je nadenkt over hoe de UI er uit moet zien op een bepaald moment, in plaats van hoe ze voortdurend verandert.
