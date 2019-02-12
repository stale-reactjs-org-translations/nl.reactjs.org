---
id: introducing-jsx
title: Introducing JSX
permalink: docs/introducing-jsx.html
prev: hello-world.html
next: rendering-elements.html
---

Kijk eens naar de volgende variabele toewijzing:

```js
const element = <h1>Hello, world!</h1>;
```

Deze rare tag syntax is noch een string, noch HTML.

Dit heet JSX en het is een syntax uitbreiding voor JavaScript.
Wij raden aan om het samen met React te gebruiken om te beschrijven hoe de UI er uit moet zien.
JSX doet je misschien denken aan een template taal, maar het heeft de alle voordelen van JavaScript.

JSX produceert React "elementen". In het [volgende hoofdstuk](/docs/rendering-elements.html) zullen we gaan kijken naar hoe ze in de DOM gerenderd worden.
Hieronder vind je de basis van JSX die je nodig hebt om te beginnen.

### Waarom JSX? {#why-jsx}

React omarmt het feit dat de logica voor het renderen vanzelfsprekend gekoppeld is met andere UI logica: hoe events worden afgehandeld, hoe de state veranderd na een tijdje en hoe de data wordt voorbereid voor weergave.

In plaats van kunstmatig de *technologieën* te scheiden door opmaak en logica in verschillende bestanden te plaatsen, gebruikt React los gekoppelde eenheden genaamd "componenten" waar beide in zitten om de [verantwoordelijkheden te scheiden<sup>EN</sup>](https://nl.wikipedia.org/wiki/Separation_of_concerns). 
In een [latere sectie](/docs/components-and-props.html) komen we terug op componenten, maar als je het nog ongemakkelijk vindt om opmaak in JavaScript te schrijven, kan [deze presentatie<sup>EN</sup>](https://www.youtube.com/watch?v=x7cQ3mrcKaY) je misschien nog overtuigen.

Het is in React [niet verplicht](/docs/react-without-jsx.html) om JSX te gebruiken, maar de meesten vinden het handig als visueel hulpmiddel bij het werken aan de UI in JavaScript code. Tevens zorgt het voor meer bruikbare foutmeldingen en waarschuwingen.

Nu we dat gehad hebben, is het tijd om te beginnen!

### Expressies gebruiken in JSX {#embedding-expressions-in-jsx}

In het onderstaande voorbeeld, wijzen we de variabele `name` toe en gebruiken deze vervolgens in de JSX code door hem tussen accolades te plaatsen.

```js{1,2}
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

Je kunt elke valide [JavaScript expressie <sup>[EN]</sup>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators) tussen accolades in JSX plaatsen. Bijvoorbeeld, `2 + 2`, `user.firstName` of `formatName(user)` zijn allemaal valide JavaScript expressies.

In het voorbeeld hieronder voegen we het resultaat van het aanroepen van een JavaScript functie, `formatName(user)` in in een `<h1>` element.

```js{12}
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[Probeer het op CodePen](codepen://introducing-jsx)

We schrijven JSX over meerdere regels voor de leesbaarheid. Hoewel het niet vereist is, wordt het aanbevolen om er haakjes omheen te zetten als je JSX over meerdere regels schrijft. Hiermee voorkom je de valkuilen van [automatische puntkomma invoeging<sup>EN</sup>](https://stackoverflow.com/q/2846283)

### JSX is Ook Een Expression {#jsx-is-an-expression-too}

Na compilatie worden JSX expressies gewone JavaScript functie aanroepen die een JavaScript object terug geven.

Dit betekent dat je JSX kan gebruiken in een `if` statement en `for` loops. Ook kun je het toewijzen aan variabelen, als argumenten meegeven aan een functie of als uitvoer van een functie teruggeven:

```js{3,5}
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

### Attributen specificeren met JSX {#specifying-attributes-with-jsx}

Je kunt aanhalingstekens gebruiken om string literals als attributen te specificeren:

```js
const element = <div tabIndex="0"></div>;
```

Je kunt ook accolades gebruiken om een JavaScript expressie in een attribuut te plaatsen:

```js
const element = <img src={user.avatarUrl}></img>;
```

Zet geen aanhalingstekens om accolades als je een JavaScript expressie wilt gebruiken in een attribuut. Je gebruikt òf aanhalingstekens (voor string waarden) òf accolades (voor expressies), maar niet beide in hetzelfde attribuut.

>**Waarschuwing:**
>
>Aangezien JSX meer op JavaScript lijkt dan op HTML, gebruikt React DOM de `camelCase` property naamgevingsconventie in plaats van HTML attribuutnamen.
>
>Bijvoorbeeld, `class` wordt [`className` <sup>EN</sup>](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) in JSX. `tabindex` wordt [`tabIndex` <sup>EN</sup>](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex)

### Children specificeren in JSX {#specifying-children-with-jsx}

Als een tag leeg is, kun je hem direct sluiten met `/>`, net als in XML:

```js
const element = <img src={user.avatarUrl} />;
```

JSX tags kunnen ook children (= geneste JSX tags) bevatten:

```js
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

### JSX Voorkomt Injectie Aanvallen {#jsx-prevents-injection-attacks}

Het is veilig om invoer van gebruikers in JSX te gebruiken:

```js
const title = response.potentiallyMaliciousInput;
// Dit is veilig:
const element = <h1>{title}</h1>;
```

React DOM [escapet <sup>EN</sup>](http://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html) alle waarden die ingevoegd worden in JSX voordat ze gerenderd worden. 
Hiermee wordt verzekerd dat je nooit code kan injecteren dat niet expliciet in je applicatie is geschreven. 
Alles wordt omgezet naar een string voordat het gerenderd wordt. Dit helpt om [XSS (cross-site-scripting)](https://nl.wikipedia.org/wiki/Cross-site_scripting) aanvallen te voorkomen.

### JSX Vertegenwoordigt Objecten {#jsx-represents-objects}

Babel compileert JSX naar `React.createElement()` aanroepen.

Deze twee voorbeelden zijn identiek:

```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

`React.createElement()` voert een aantal checks uit om jou te helpen met het schrijven van code zonder bugs maar in essentie maakt het een object zoals dit:

```js
// Opmerking: deze structuur is vereenvoudigd 
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

Deze objecten worden "React elementen" genoemd.
Je kunt ze zien als beschrijvingen van wat je wilt zien op het scherm.
React leest deze objecten en gebruikt ze om het DOM op te bouwen and bij te werken.

We zullen het renderen van React elementen naar het DOM in het volgende hoofdstuk verder bekijken.

>**Tip:**
>
>We bevelen het je aan om de ["Babel" taal definitie <sup>EN</sup>](http://babeljs.io/docs/editors) voor je favoriete editor te gebruiken zodat zowel ES6 als JSX code de juiste highlighting heeft. Deze website gebruikt het compatibele [Oceanic Next <sup>EN</sup>](https://labs.voronianski.com/oceanic-next-color-scheme/) kleurenschema.
