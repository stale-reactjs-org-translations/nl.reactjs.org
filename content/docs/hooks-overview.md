---
id: hooks-overview
title: Hooks een Overzicht
permalink: docs/hooks-overview.html
next: hooks-state.html
prev: hooks-intro.html
---

*Hooks* zijn een nieuwe toevoeging in React 16.8. Ze maken het mogelijk om state en andere React voorzieningen te gebruiken zonder dat je een class hoeft te schrijven.

Hooks zijn [backwards-compatible](/docs/hooks-intro.html#no-breaking-changes). Deze pagina geeft een overzicht van Hooks voor ervaren React gebruikers. Dit is een hoog-tempo overzicht. Als je in de war raakt, zoek een gele box zoals deze:

>Uitgebreide Uitleg
>
>Lees de [Motivatie](/docs/hooks-intro.html#motivation) om te leren waarom we Hooks toevoegen aan React.

**↑↑↑ Elk hoofdstuk eindigt met een gele box zoals deze.** Ze linken naar uitgebreide uitleg.

## 📌 State Hook {#state-hook}

Dit voorbeeld rendert een counter. Als je op de knop klikt, verhoogd het de waarde:

```js{1,4,5}
import React, { useState } from 'react';

function Example() {
  // Declareer een nieuwe state variabele, die we "count" zullen noemen
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Je klikte {count} keer</p>
      <button onClick={() => setCount(count + 1)}>
        Klik op me
      </button>
    </div>
  );
}
```

Hier is `useState` een *Hook* (we bespreken zo meteen wat dit betekent). We roepen hem aan binnen een functie component om er lokale state aan toe te voegen. React will preserve this state between re-renders. `useState` returns a pair: the *current* state value and a function that lets you update it. You can call this function from an event handler or somewhere else. It's similar to `this.setState` in a class, except it doesn't merge the old and new state together. (We zullen een voorbeeld laten zien waarin `useState` met `this.state` vergeleken wordt in [De State Hook](/docs/hooks-state.html).)

Het enige argument van `useState` is de initiële state. In het voorbeeld hierboven, is dat `0` omdat onze teller vanaf nul begint. Merk op dat in tegenstelling tot `this.state`, de state hier geen object hoeft te zijn -- alhoewel dat wel mag als je dat wilt. Het initiële state argument wordt alleen gebruikt tijdens de eerste render.

#### Maak meerdere state variabelen {#declaring-multiple-state-variables}

Je kunt de State Hook meer dan eens gebruiken in één component:

```js
function ExampleWithManyStates() {
  // Declareer meerdere state variabelen!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banaan');
  const [todos, setTodos] = useState([{ text: 'Leer Hooks' }]);
  // ...
}
```

De [array destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring) syntax laat ons verschillende namen geven aan de state variabelen die we declareerden door `useState` aan te roepen. Deze namen zijn geen onderdeel van de `useState` API. In plaats daarvan, neemt React aan dat als je `useState` vaker aanroept, je dit steeds in dezelfde volgorde doet tijdens iedere render. We zullen er later op terug komen waarom dit werkt en wanneer dit nuttig is.

#### Maar wat is een Hook? {#but-what-is-a-hook}

Hooks zijn functies die je laten aanhaken (“hook into”) aan de React state en lifecycle voorzieningen vanuit functie componenten. Hooks werken niet binnen classes -- ze laten je React gebruiken zonder classes. (We [raden niet aan](/docs/hooks-intro.html#gradual-adoption-strategy) om je bestaande componenten meteen te herschrijven maar je kan beginnen met het gebruiken van Hooks in je nieuwe componenten als je dat wilt.)

React voorziet een paar ingebouwde Hooks zoals `useState`. Je kunt ook je eigen Hooks maken om stateful gedrag te hergebruiken tussen verschillende componenten. We zullen eerst de ingebouwde Hooks bekijken.

>Uitgebreide Uitleg
>
>Je kunt meer over de State Hook leren op een daarvoor bestemde pagina: [De State Hook](/docs/hooks-state.html).

## ⚡️ Effect Hook {#effect-hook}

Je hebt waarschijnlijk wel eens data opgehaald, met subscriptions gewerkt, of handmatig de DOM gewijzigd vanuit React componenten. We noemen deze operaties  "neven effecten" (of kort "effecten") omdat ze andere componenten kunnen beïnvloeden en niet uitgevoerd kunnen worden tijdens het renderen.

De Effect Hook, `useEffect`, voegt de mogelijkheid toe om neven effecten uit te voeren vanuit een functie component. Het dient hetzelfde doel als `componentDidMount`, `componentDidUpdate`, en `componentWillUnmount` in React classes, maar dan samengevoegd in één enkele API. (We zullen voorbeelden laten zie die `useEffect` met deze methoden vergelijken in [De Effect Hook](/docs/hooks-effect.html).)

Bijvoorbeeld, dit component stelt de titel van het document in nadat React de DOM heeft geüpdate:

```js{1,6-10}
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Vergelijkbaar met componentDidMount en componentDidUpdate:
  useEffect(() => {
    // Wijzig de document title met behulp van de browser API
    document.title = `Je klikte ${count} keer`;
  });

  return (
    <div>
      <p>Je klikte {count} keer</p>
      <button onClick={() => setCount(count + 1)}>
        Klik op me
      </button>
    </div>
  );
}
```

Als je `useEffect` aanroept, vraag je React om je "effect" functie uit te voeren na het wegsluisen van DOM wijzigingen. Effecten worden gedeclareerd binnen het component dus hebben ze toegang tot hun props en state. Standaard voert React de effecten uit na iedere render -- *inclusief* de initiële render. (We zullen meer bespreken over hoe dit zich verhoud tot class lifecycles in [De Effect Hook](/docs/hooks-effect.html).)

Effecten kunnen optioneel ook specificeren hoe er achter ze schoongemaakt kan worden door een functie terug te geven. Bijvoorbeeld, dit component gebruikt een effect om een subscription op te zetten op een vriend zijn online status, en schoont deze ook weer op:

```js{10-16}
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Bezig met laden...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

In dit voorbeeld, zou React unsubscribe van onze `ChatAPI` als het component unmount, en daarnaast opnieuw uitgevoerd te worden door een daaropvolgende render. (Als je wilt is er een manier om [React te laten weten om het opnieuw subscriben over te slaan](/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects) wanneer de `props.friend.id` die we meegaven aan `ChatAPI` niet veranderden.)

Net als met `useState`, kun je meer dan één effect in een component gebruiken:

```js{3,8}
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `Je klikte ${count} keer`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  // ...
```

Hooks laten je neven effecten organiseren binnen een component door welke onderdelen gerelateerd zijn (zoals het toevoegen en verwijderan van een subscription), in plaats van splitsen gebaseerd op lifecycle methoden te forceren.

>Uitgebreide Uitleg
>
>Je kunt meer over `useEffect` leren op een daarvoor bestemde pagine: [De Effect Hook](/docs/hooks-effect.html).

## ✌️ Regels van Hooks {#rules-of-hooks}

Hooks zijn JavaScript functies, maar ze dringen twee exta regels op:

* Roep alleen Hooks aan **op het hoogste niveau**. Roep geen Hooks aan binnen loops, condities of geneste functies.
* Roep alleen Hooks aan **vanuit React functie componenten**. Roep geen Hooks aan vanuit normale JavaScript functies. (Er is maar één valide andere plaats om Hooks aan te roepen -- je eigen custom Hooks. Daarover zullen we zometeen leren.)

We geven een [linter plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks) om deze regels automatisch te handhaven. We begrijpen dat deze regels op het eerste gezicht misschien beperkend of verwarrend lijken, maar ze zijn essentieel om Hooks goed te laten werken.

>Uitgebreide Uitleg
>
>Je kunt meer leren over deze regels op een daarvoor bestemde pagina: [Regels van Hooks](/docs/hooks-rules.html).

## 💡 Bouw Je Eigen Hooks {#building-your-own-hooks}

Soms willen we stateful logica hergebruiken voor meerdere components. Voorheen waren er twee populaire oplossingen voor dit probleem: [higher-order components](/docs/higher-order-components.html) en [render props](/docs/render-props.html). Custom Hooks maken het mogelijk dit te doen, maar dan zonder meer componenten aan je component-tree toe te voegen.

Eerder op deze pagina hebben we een `FriendStatus` component laten zien die de `useState` en `useEffect` Hooks aanroept om een subscribtion op te zetten op een vriend zijn online status. Laten we zeggen dat we deze subscription logica willen hergebruiken in een ander component.

Eerst zullen we de logica er uit halen en in een custom Hook met de naam `useFriendStatus` stoppen:

```js{3}
import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

Deze neemt `friendID` als een argument en geeft terug of onze vriend online is.

Nu kunnen we dit gebruiken vanuit beide componenten:


```js{2}
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Bezig met laden...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

```js{2}
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

De state van deze componenten is volledig onafhankelijk. Hooks zijn een manier *stateful logica* te hergebruiken, niet de state zelf. In feite heeft iedere *aanroep* naar een Hook has een volledig geïsoleerde state -- dus je kunt zelfs dezelfde custom Hook twee keer gebruiken in één component.

Custom Hooks zijn meer een conventie dan een voorziening. Als een functienaam begint met "`use`" en het roept andere Hooks aan, zeggen we dat het een custom Hook is. De `useSomething` naamgevingsconventie is waarmee onze linter plugin in staat is om bugs te vinden in de code die Hooks gebruikt.

Je kunt custom Hooks schrijven die een breed scala aan use cases afdekken zoals form handling, animatie, declaratieve subscriptions, timers, en mogelijk nog veel meer die we nog niet overwogen hadden. We zijn benieuwd te zien welke custom Hooks de React community nog zal bedenken.

>Uitgebreide Uitleg
>
>Je kunt meer leren over custom Hooks op een daarvoor bestemde pagina: [Bouw Je Eigen Hooks](/docs/hooks-custom.html).

## 🔌 Andere Hooks {#other-hooks}

Er zijn een paar minder vaak gebruikte ingebouwde Hooks die je handig zou kunnen vinden. Bijvoorbeeld, met [`useContext`](/docs/hooks-reference.html#usecontext) krijg je een subscription  op een React context zonder dat je nesting introduceert:

```js{2,3}
function Example() {
  const locale = useContext(LocaleContext);
  const theme = useContext(ThemeContext);
  // ...
}
```

En [`useReducer`](/docs/hooks-reference.html#usereducer) laat je de lokale state van complexe componenten beheren met een reducer:

```js{2}
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer);
  // ...
```

>Uitgebriede Uitleg
>
>Je kunt meer leren over alle ingebouwde Hooks op een daarvoor bestemde pagina: [Hooks API Reference](/docs/hooks-reference.html).

## Volgende Stappen {#next-steps}

Phew, dat was snel! Als sommige dingen niet echt logisch leken, of als je meer details wilt leren, kun je de volgende paginas lezen, beginnend met de [State Hook](/docs/hooks-state.html) documentatie.

Je kunt ook [Hooks API reference](/docs/hooks-reference.html) bekijken en de [Hooks FAQ](/docs/hooks-faq.html).

Tot slot, mis de [introductie pagina](/docs/hooks-intro.html) niet, die uitlegt *waarom* we Hooks toevoegen en hoe we ze gaan gebruiken zij-aan-zij met classes -- zonder onze apps te herschrijven.
