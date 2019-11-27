---
id: hello-world
title: Hello World
permalink: docs/hello-world.html
prev: cdn-links.html
next: introducing-jsx.html
---

Het meest eenvoudige React-voorbeeld ziet er zo uit:

```js
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

Het toont een kop met de tekst "Hello, world!" op de pagina.

[Probeer het op CodePen](codepen://hello-world)

Klik op de bovenstaande link om een online editor te openen. Voel je vrij om wat aanpassingen te maken en te zien hoe deze de uitkomst beïnvloeden. De meeste pagina's in deze gids hebben dit soort bewerkbare voorbeelden.


## Hoe Lees Je Deze Gids {#how-to-read-this-guide}

In deze gids zullen we de bouwstenen van React-applicaties onderzoeken: elementen en componenten. Wanneer je ze onder de knie hebt, kan je complexe applicaties ontwikkelen uit kleine, herbruikbare stukjes.

>Tip
>
>Deze gids is bedoeld voor mensen die liever **concepten stap voor stap leren**. Als je liever al doende leert, bekijk dan onze [praktische tutorial](/tutorial/tutorial.html). Mogelijk vind je dan dat deze gids en de tutorial elkaar aanvullen.

Dit is het eerste hoofdstuk in een stap-voor-stapgids over de belangrijkste React-concepten. Een lijst van alle hoofdstukken is te vinden in de navigatie zijbalk. Indien je dit leest vanaf een mobiel apparaat, dan kun je bij de navigatie komen via de knop in de rechterbenedenhoek.

Elk hoofdstuk in deze gids bouwt verder op de kennis uit voorgaande hoofdstukken. **Het grootste deel van React kan je leren door de hoofdstukken “Algemene Concepten” te lezen in de volgorde waarin ze verschijnen in de zijbalk**. [“JSX: Een Introductie”](/docs/introducing-jsx.html) is bijvoorbeeld het volgende hoofdstuk.

## Aannames Over Je Kennisniveau {#knowledge-level-assumptions}

React is een JavaScript library en dus zullen we aannemen dat je een basisbegrip hebt van de JavaScript taal. **Als je hier niet erg zeker over bent, raden we [een JavaScript tutorial](https://developer.mozilla.org/nl/docs/Web/JavaScript/A_re-introduction_to_JavaScript) aan om je niveau te testen** en om je in staat te stellen deze gids te volgen zonder te verdwalen. Misschien ben je er 30 minuten tot een uur mee bezig, maar hierdoor hoef je in ieder geval React en JavaScript niet tegelijkertijd te leren.

>Opmerking
>
>Deze gids gebruikt af en toe wat van de nieuwere JavaScript syntax in de voorbeelden.
Als je in de laatste paar jaar niet met JavaScript hebt gewerkt, zouden [deze drie aandachtspunten (Engels)](https://gist.github.com/gaearon/683e676101005de0add59e8bb345340c) je op weg moeten helpen.

## Laten We Beginnen! {#lets-get-started}

Als je wat naar beneden scrolt, zal je een link vinden naar het [volgende hoofdstuk van deze gids](/docs/introducing-jsx.html) net boven de voettekst van de website.

