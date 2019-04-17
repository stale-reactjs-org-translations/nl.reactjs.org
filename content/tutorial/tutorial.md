---
id: tutorial
title: "Tutorial: Intro to React"
layout: tutorial
sectionid: tutorial
permalink: tutorial/tutorial.html
redirect_from:
  - "docs/tutorial.html"
  - "docs/why-react.html"
  - "docs/tutorial-ja-JP.html"
  - "docs/tutorial-ko-KR.html"
  - "docs/tutorial-zh-CN.html"
---

Deze tutorial vereist geen voorbestaande React kennis.

## Voordat we beginnen {#before-we-start-the-tutorial}


We zullen een klein spelletje bouwen in deze tutorial. **Misschien ben je geneigd om dit over te slaan aangezien je geen games maakt -- maar probeer het.** De technieken die je zal leren in deze tutorial zijn fundamenteel om React applicaties te bouwen, eens je deze onder de knie krijgt, heb je een diep inzicht in React. 

>Tip
>
>Deze tutorial is bedoelt voor degene die het liefst **al doende leren**. Indien je liever concepten vanuit de basis leert, neem dan een kijkje naar de [stapsgewijze documentatie](/docs/hello-world.html).

De tutorial is opgedeeld in verschillende onderdelen:

* [Setup voor de Tutorial](#setup-for-the-tutorial) geeft je *een beginpunt* om de tutorial te volgen.
* [Overzicht](#overview) leert je de **fundamentele concepten** van React: componenten (components), eigenschappen (props), en staat (state).
* [Het spel afwerken](#completing-the-game) leert je de **meest voorkomende technieken** in React development.
* [Tijdreizen toevoegen](#adding-time-travel) zal je **een dieper inzicht** geven in de unieke voordelen van React

Het is niet noodzakelijk om alle onderdelen in één keer te voltooien. Probeer zo ver mogelijk te komen -- zelfs al is het een of twee onderdelen.

Je kan code copy-pasten terwijl je de tutorial volgt, maar we raden je aan om de code zelf uit te typen. Dit helpt je om gewoontes te creëren en geeft je een dieper inzicht. 

### Wat gaan we maken? {#what-are-we-building}

In deze tutorial, zullen we tonen hoe een interactieve tic-tac-toe (boter-kaas-eieren) spel maken met React.

Je kan een kijkje nemen naar wat we zullen maken: **[Afgewerkt Resultaat](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**. Als de code nog geen steek houdt of je syntax nog niet kent, is dat geen probleem. Het doel van deze tutorial is je React en de syntax aan te leren.

We raden aan dat een kijkje neemt naar het tic-tac-toe spel voordat je verdergaat met de tutorial. Een van de eigenschappen dat je zal opmerken is dat er een genummerde lijst is aan de rechterkant van het spel. Deze lijst geeft je een geschiedenis van alle zetten die in het spel zijn voorgekomen, en deze wordt geupdate tijdens het spel.

Eens je vertrouwd bent met het tic-tac-toe spel, kan je het afsluiten. We zullen vanuit een simpelere template starten voor deze tutorial. 
Onze volgende stap is jouw setup in te stellen zodat je het spel kan beginnen te bouwen.

### Vereisten {#prerequisites}

We gaan ervanuit dat je enigzins vertrouwd bent met HTML en Javascript, maar het is mogelijk om deze tutorial te volgen, zelfs als je van een andere programmeer taal komt. We gaan er ook vanuit dat je vertrouwd bent met programmeer concepten zoals functies (functions), objecten (objects), arrays en in mindere mate met klasses (classes).

Als je Javascript wil herhalen, raden we [deze handleiding](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript).
We gebruiken ook sommige functies van ES6 -- een recente versie van Javscript. In deze tutorial zullen we [arrow functies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), en [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) statements gebruiken.
Je kan de [Babel REPL](babel://es5-syntax-example) gebruiken om de controleren hoe ES6 code compileert.

## Setup voor de Tutorial {#setup-for-the-tutorial}

There are two ways to complete this tutorial: you can either write the code in your browser, or you can set up a local development environment on your computer.

### Setup Optie 1: Schrijf Code in de Browser {#setup-option-1-write-code-in-the-browser}

Dit is de snelste manier om te starten!

Eerst, open deze **[Starter Code](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)** in een nieuwe tab. De nieuwe tab toont een leeg tic-tac-toe bord en React Code. We zullen de React code aanpassen in deze tutorial.

Je kan de tweede setup optie overslaan en dadelijk naar het [overzicht](#overview) hoofstuk voor een overzicht van React.

### Setup Optie 2: Local Development Environment {#setup-option-2-local-development-environment}

Dit is volledig optioneel en niet vereist voor deze tutorial!
<br>

<details>

<summary><b>Optioneel: Instructies om lokaal te volgen met je favoriete text editor</b></summary>

Deze setup vereist meer werk maar laat je toe om de volledige tutorial af te werken met je favoriete text editor. Hier zijn de stappen om te volgen:

1. Zorg ervoor dat je een recente versie van [Node.js](https://nodejs.org/en/) geïnstalleerd hebt.
2. Volg de [installatie instructies voor Create React App](/docs/create-a-new-react-app.html#create-react-app) om een nieuw project aan te maken.

```bash
npx create-react-app my-app
```

3. Verwijder alle bestanden in de map `src/` van het nieuwe project.

> Nota:
>
>**Don't delete the entire `src` folder, just the original source files inside it.** We'll replace the default source files with examples for this project in the next step.
**Verwijder niet de gehele `src` map, enkel de bestanden in de map (de source files)** We zullen voor dit project de standaard bestanden met voorbeelden vervangen in de volgende stap.


```bash
cd my-app
cd src

# Voor Mac of Linux gebruikers:
rm -f *

# Of voor Windows gebruikers:
del *

# Ga dan terug naar de project map
cd ..
```

4. Voeg een bestand toe met de naam `index.css` in de map `src/` met [deze CSS code](https://codepen.io/gaearon/pen/oWWQNa?editors=0100).

5.  Voeg een bestand toe met de naam `index.js` in de map `src/` met  [deze JS code](https://codepen.io/gaearon/pen/oWWQNa?editors=0010).

6. Voeg deze drie lijnen toe aan het begin van `index.js` in de map `src`:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
```

Als je nu `npm start` in de map van het project gebruikt en `http://localhost:3000` in je browser opent, zie je een leeg tic-tac-toe veld.

We raden [deze instructies](https://babeljs.io/docs/editors/) om de *syntax highlighting* in te stellen in je editor.
</details>

### Help, ik zit vast! {#help-im-stuck}

If you get stuck, check out the [community support resources](/community/support.html). In particular, [Reactiflux Chat](https://discord.gg/0ZcbPKXt5bZjGY5n) is a great way to get help quickly. If you don't receive an answer, or if you remain stuck, please file an issue, and we'll help you out.
Als je vast zit, ga dan naar de [community support resources](/community/support.html).  [Reactiflux Chat](https://discord.gg/0ZcbPKXt5bZjGY5n) in het bijzonder is een geweldige manier om snel hulp te verkrijgen. Als je geen antwoord krijgt, of je vast blijft te zitten, open dan een *issue*, en we helpen je verder.

## Overzicht {#overview}

Nu dat je setup klaar is, tijd voor een overzicht van React!

### Wat Is React? {#what-is-react}

React is een declaratieve, efficiente, en flexibele Javascript bibliotheek (library) om gebruikersinterfaces (user interfaces of UI) te bouwen. Het laat je toe om complexe UIs te maken met kleine en geisoleerde deeltjes code die componenten (components) genoemd worden.

React heeft verschillende soorten componenten, maar we zullen starten met de `React.Component` subklasse:

```javascript
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

// Example usage: <ShoppingList name="Mark" />
```

We komen zodadelijk tot de rare XML-achtige tags. We gebruiken componenten om React te vertellen wat we op het scherm willen zien. Wanneer onze data verandert, zal React op een efficiente manier onze componenten updaten en opnieuw renderen.

In het voorbeeld is ShoppingList een **React component class**, of ook ** React component type**. Een component krijgt parameter, `props` (kort voor "properties") genaamd en returned een hierarchie van views om weer te geven via de `render` methode.

De `render` methode gebruikt een *beschrijving* van wat je wilt zien om het scherm. React neemt deze beschrijving en geeft het resultaat weer. In het bijzonder, `render` returned een **React element**, een lichte beschrijving van wat te renderen. De meeste React ontwikkelaars gebruiken een speciale syntax "JSX" dat het toelaat om deze structuren gemakkelijker schrijven. De `<div />` syntax wordt tijdens de *build time* omgezet naar `React.createElement('div')`. 
Het voorgaande voorbeeld is equivalent aan:

```javascript
return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... h1 children ... */),
  React.createElement('ul', /* ... ul children ... */)
);
```

[De volledige uitgebreide versie.](babel://tutorial-expanded-version)

Als je nieuwsgierig bent, `createElement()` wordt in meer detail omschreven in de [API referentie](/docs/react-api.html#createelement), maar we zullen het niet gebruiken in deze tutorial. In de plaats hiervan zullen we JSX blijven gebruiken.

JSX komt met de volledige functionaliteit van Javascript. Je kan *elke* Javascript expressie gebruiken binnen haakjes in JSX. Elk React element is een Javascript object dat je kan opslaan in een variabele of doorgeven in je programma.

Het `ShoppingList` component van hierboven rendert enkel in de ingebouwde DOM componenten zoals `<div />` en `<li />`. Maar je kan ook custom React componenten aanmaken en renderen. Bijvoorbeeld. we kunnen nu naar de hele *shopping list* refereren met `<ShoppingList />`.
Elk React component is ingekapseld en kan onafhankelijk bestaan; dit laat ons toe om complexe UIs te maken van eenvoudige componenten.

## De Start Code Inspecteren {#inspecting-the-starter-code}

Als je **in je browser** aan de tutorial zal werken, open deze code in een nieuwe tab: **[Start Code](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)**. Als je **lokaal** aan de tutorial werkt, open dan `src/index.js` in je project map (je hebt dit bestand reeds aangemaakt tijdens de [setup](#setup-option-2-local-development-environment)).

Deze Start Code is de basis van wat we gaan maken. Wij hebben reeds de CSS styling bezorgd zodat je je enkel hoeft te concentreren op het leren van React en het programmeren van het tic-tac-toe spel

Bij het inspecteren van de code zal je opmerken dat we drie React componenten hebben:

* Square
* Board
* Game

Het Square component rendert een `<button>` en het Board component rendert 9 vierkante vakken Het Game component rendert een bord met een and the Board renders 9 squares met placeholder waardes die we later zullen aanpassen. Momenteel zijn er geen interactieve componenten.

### Data doorgeven door middel van Props {#passing-data-through-props}

Om te beginnen, proberen we data van het Board component naar het Square component door te geven.

Pas de code aan in de `renderSquare` methode van het Board component om een prop met de naam `value` door te geven aan Square.

```js{3}
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
```

Pas de `render` methode aan van Square door `{/* TODO */}` te vervangen door `{this.props.value}`:

```js{5}
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}
```

Voor:

![React Devtools](../images/tutorial/tictac-empty.png)

Na: Je zal normaal een nummer in elk vierant van de gerenderde output zien.

![React Devtools](../images/tutorial/tictac-numbers.png)

**[De volledige code tot zover](https://codepen.io/gaearon/pen/aWWQOG?editors=0010)**

Gefeliciteerd, je het zojuist een prop van de parent Board doorgegeven aan het child Square component door gegeven. 
Props doorgeven is hoe informatie vloeit in React applicaties, van parents naar children.

### Interactieve Componenten maken {#making-an-interactive-component}

Laten we het Square component met een "X" vullen wanneer we dit aanklikken.
Eerst, verander de button tag die gereturned wordt door de `render()` functie van het Square component:

```javascript{4}
class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={function() { alert('click'); }}>
        {this.props.value}
      </button>
    );
  }
}
```

Als we nu een Square aanklikken, dan krijgen we een alert in onze browser.

>Nota
>
>Om minder uit te typen en [het verwarrende gedrag van `this`](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/) te vermijden, zullen we de [arrow function syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) gebruiken voor event handlers :
>
>```javascript{4}
>class Square extends React.Component {
>  render() {
>    return (
>      <button className="square" onClick={() => alert('click')}>
>        {this.props.value}
>      </button>
>    );
>  }
>}
>```
>

> Merk op dat hoe we met `onClick={() => alert('click')}` een *functie* doorgeven als de `onClick` prop. Het zal enkel in werking treden bij na een click. Een veelvoorkomende fout is het vergeten van `() =>` en het schrijven van `onClick={alert('click')}`, dit zal het alert tonen elke keer dat het component her-rendert.

Als een volgende stap, willen we dat het Square component "onthoudt" dat het aangeklikt werd, en het vullen met een "X". Om dingen te "onthouden" gebruiken componenten **state**.

React componenten kunnen een state verkrijgen door `this.state` in hun constructor in te stellen. `this.state` zou als privaat in het component waarin het gedefiniëerd werd, aanschouwd moeten worden. Laten we de huidige waarde van het Square component opslaan in `this.state`, en dit veranderen wanneer het Square component aangeklikt word.

Eerst voegen we een constructor toe aan de class om de state te initializeren.

```javascript{2-7}
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => alert('click')}>
        {this.props.value}
      </button>
    );
  }
}
```

>Nota
>
>In [JavaScript klasses](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), moet je altijd `super` aanhalen wanneer je de constructor van een subklasse definieerd. Alle react component klasses die een `constructor` hebben moeten starten met een `super(props)` call.

Nu passen we de `render` methode van het Square component aan om de huidige staat weer te geven wanneer het aangeklikt wordt.


* Vervang `this.props.value` door `this.state.value` binnen de `<button>` tag.
* Vervang de `() => alert()` event handler met `() => this.setState({value: 'X'})`.
* Zet de `className` en `onClick` props op apparte lijnen voor betere leesbaarheid.

Na deze veranderingen, zal de `<button>` tag die gereturned is door de `render` methode van Square er zo uitzien:

```javascript{12-13,15}
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({value: 'X'})}
      >
        {this.state.value}
      </button>
    );
  }
}
```

Door het *callen* van `this.setState` van een `onClick` handler in de `render` methode van Square, zeggen we aan React om dat Square component te her-renderen wanneer zijn `<button>` is aangeklikt. Na de update, is de `this.state.value` van het Square component gelijk aan "`X`" en zien we `X` op het bord. Als je eender welk Square component aanklikt zal er een `X` tevoorschijn komen.

Wanneer je `setState` called in een component, zal React automatisch de child componenten die het vervat ook updaten.

**[De volledige code tot zover](https://codepen.io/gaearon/pen/VbbVLg?editors=0010)**

### Developer Tools {#developer-tools}

De React Devtools extensie voor [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) en [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) laat je toe om een React component tree te inspecteren samen met je browser's developer tools.

<img src="../images/tutorial/devtools.png" alt="React Devtools" style="max-width: 100%">

De React DevTools laat je toe om de props en state van je React componenten te controleren

Na het installeren van React DevTools, kan je op elk element rechts klikken en met "Inspect" open je de developer tools. De React tab zal als de laatste rechts tevoorschijn komen.

**Hoewel, let op, er zijn extra stappen nodig om dit in CodePen werkend te krijgen:**

1. Log in of registreer en bevestig je email (vereist om spam te vermijden).
2. Klik "Fork" knop.
3. Klik "Change View" en kies dan "Debug mode".
4. In de nieuwe tab die opent, de devtools, zou je nu een React tab hebben.

## Het spel afwerken {#completing-the-game}

We hebben nu de basis bouwblokken voor het tic-tac-toe spel. Om het spel te vervolledigen, hebben we een afwisselende "X" en "O" plaatsing nodig op het bord, en we hebben een manier nodig om een winner te determineren.

### Lifting State Up {#lifting-state-up}

Momenteel, bevat elk Square component de staat van het spel. Om op een winnaar te controleren, onderhouden we de waarda van elk van de 9 vakken op één locatie.

We zouden kunnen denken dat het Board component elk Square component de staat van Square kan vragen. Hoewel dit mogelijk is in React, raden we dit af omdat de code hierdoor moeilijk te begrijpen is, vatbaar is voor bugs en moeilijk te herstructureren is.
Het is de beste benadering om de staat van het spel in het parent component Board op te slaan in plaats van in elk Square component. Het Board component kan elk Square zeggen wat te tonen door een prop door te geven, [net zoals hoe we het deden toen we een nummer aan elk Square doorgaven](#passing-data-through-props).

**Om data van meerdere children te verzamelen, of om twee child componenten met elkaar te laten communiceren, moeten we de shared state declareren in hun parent component. Het parent component kan de staat terug naar de child componenten doorgeven door middel van props; dit houdt de child componenten gesynchroniseerd met elkaar en met het parent component.**


*Lifting state* naar een parent component is veelvoorkomend wanneer React componenten herstructureerd worden -- laten we deze mogelijkheid nemen om dit uit te proberen. We zullen een constructor aan het Board component toevoegen en zetten de initiële state van Board zodat het een array van 9 nullen bevat. Deze 9 nullen staat gelijk aan de 9 Squares:

```javascript{2-7}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

We vullen het bord later in, het bord zal er zo ongeveer uitzien:

```javascript
[
  'O', null, 'X',
  'X', 'X', 'O',
  'O', null, null,
]
```

De `renderSquare` methode van Board ziet er momenteel zo uit:

```javascript
  renderSquare(i) {
    return <Square value={i} />;
  }
```
In het begin, [gaven we de prop `value` van Board door](#passing-data-through-props)om nummers van 0 tot 8 te tonen in elk Square component.
In een andere vorige stap, vervingen we de nummers met een "X", dat [gedetermineerd werd door het Square component zijn eigen state](#making-an-interactive-component). Dit is waarom het Square component momenteel de `value` prop die door het bord wordt doorgegeven negeert.

We zullen nu weer het prop doorgevings mechanisme gebruiken.
We passen het Board component aan om aan ieder Square component zijn huidige waarde te informeren (`'X'`, `'O'`, of `null`). We hebben reeds de `squares` array gedefinieerd in de Board constructor en we zullen de Board `renderSquare` methode aanpassen om dit te lezen:

```javascript{2}
  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
  }
```

**[De volledige code tot zover](https://codepen.io/gaearon/pen/gWWQPY?editors=0010)**

Elk Square component zal nu een `value` prop ontvangen met als waarde `'X'`, `'O'`, of `null` voor lege vakken.

Vervolgens moeten we veranderen wat er gebeurt wanneer een Square component aangeklikt wordt. Het Board component slaat op welk vierkant reeds gevuld is. We moeten een manier creëren waarop het Square component de state van Board kan updaten. Aangezien state een private is van een component waarin het gedefinieerd is, kunnen we het Board state niet rechtstreeks van Square aanpassen.

Om de privacy van de state van het Board component te behouden, zullen we een functie doorgeven van het Board component naar het Square component. Deze functie wordt gebruikt wanneer een Square component aangeklikt word. We veranderen de `renderSquare` methode in Board naar:

```javascript{5}
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
```

>Nota
>
> We splitsen het gereturnde element in verschillende lijnen voor leesbaarheid, en we voegen haakjes toe zodat Javascript geen puntcomma invoegt na `return` en zo onze code breekt.

Nu zijn we twee props door aan het geven van Board naar Square: `value` en `onClick`. De `onClick` prop is een functie die het Square component can oproepen wanneer het aangeklikt wordt. We maken de volgende veranderingen aan Square:

* Vervang `this.state.value` met `this.props.value` in de Square `render` methode
* Vervang `this.setState()` met `this.props.onClick()` in de Square `render` methode
* Delete de `constructor` van Square want Square houdt niet langer de staat van het spel bij

Na de veranderingen ziet het Square component er zo uit:

```javascript{1,2,6,8}
class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}
```

Wanneer een Square aangeklikt wordt, wordt de functie `onClick`, die door Board bezorgd is opgeroepen. Hier is een overzicht van hoe dit wordt toegepast:

1. De `onClick` prop in het ingebouwde DOM `<button>` component zegt aan React om een click event listener op te zetten.
2. Wanneer de knop aangeklikt wordt, roept React de `onClick` event handler die gedefinieerd is in de `render()` methode van Square.
3. Deze event handler roept `this.props.onClick()` op. De prop `onClick` prop van Square is gespecifieerd door Board.
4. Aangezien Board `onClick={() => this.handleClick(i)}` aan Square doorgaf, roept Square `this.handleClick(i)` wanneer het aangeklikt wordt.
5. We hebben de methode `handleClick()` nog niet gedefinieerd dus onze code crashed.

>Nota
>
>Het DOM element `<button>` zijn `onClick` attribuut heeft een speciale betekenis voor React want het is een ingebouwd component. Voor custom componenten zoals Square, is het aan jou om dit te benoemen. We kunnen `onClick` van Square en `handleClick` van Board anders benoemen, maar in React is het de gewoonte om `on[Event]` te gebruiken voor props die events representeren en `handle[Event]` voor de methodes die events handhaven.

Wanneer we een Square proberen aan te klikken, krijgen we een error omdat we `handleClick` nog niet hebben gedefinieerd. We zullen nu `handleClick` aan de Board klasse toevoegen:

```javascript{9-13}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

**[De volledige code tot zover](https://codepen.io/gaearon/pen/ybbQJX?editors=0010)**

Na deze veranderingen zijn hebben we de mogelijkheid weer om de Square componenten aan te klikken om deze op te vullen. Maar nu is de state in het Board component opgeslagen in plaats van in de individuele Square componenten. Wanneer de state van Board verandert zullen de Square componenten automatisch her-renderen. Het opslaan van de state van alle Square componenten in het Board component staat toe om later een winner uit te roepen.

Aangezien de Square componenten niet langer de state bevatten, de Square componenten waardes ontvangen van het Board component en het Board component informeren wanneer ze aangeklikt worden. In de React terminologie, zijn deze nu **controlled components**. Het Board component heeft volledige controle over hen.

Merk op hoe in `handleClick` we `.slice()` oproepen om een kopie van de `squares` array te modifieeren in plaats van de bestaande array. We bespreken in hetvolgende hoofstuk waarom we een kopie van de `squares` array maken.

### Waarom Immutability Belangrijk Is {#why-immutability-is-important}

In het vorige code voorbeeld, hebben we aangeraden dat je de `.slice()` operator gebruikt om een kopie van de `squares` array creeert, om deze aan te passen. We bespreken immutability en waarom het belangrijk is om immutability te leren.

Er zijn in het algemeen twee manieren om data aan te passen. De eerste manier is om de data direct te *muteren* door de data direct aan te passen. De tweede manier is de data te vervangen met een nieuwe kopie die de gewenste veranderingen bevat.

#### Data Change door Mutation {#data-change-with-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};
player.score = 2;
// Now player is {score: 2, name: 'Jeff'}
```

#### Data Change zonder Mutation {#data-change-without-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
// Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}

// Or if you are using object spread syntax proposal, you can write:
// var newPlayer = {...player, score: 2};
```

Het eindresultaat is hetzelfde maar door het niet-muteren (of veranderen van onderliggende data) verkrijgen we enkele voordelen.

#### Complex Features worden Simpel {#complex-features-become-simple}

Immutability maakt complex features veel gemakkelijker om toe te passen. Later in deze tutorial zullen we een "time travel" feature toepassen dat ons toelaat de spel geschiedenis te bekijken en "terug te springen" naar een vorige zet. Deze functionaliteit is niet specifiek voor spelletjes -- de mogelijkheid om zekere acties ongedaan of terug te zetten is een normale vereiste in applicaties. Directe data mutatie vermijden laat ons toe verschillende versies van de spel geschiedenis intact te houden en later te gebruiken.

#### Veranderingen detecteren {#detecting-changes}

Veranderingen detecteren in mutable objects is moeilijk want ze worden direct gewijzigdt. Deze detectie vereist dat het mutable object zelf vergelijkt wordt met vorige kopiën van zichzelf en de volledige object tree die gevolgd werd.

Veranderingen detecteren in immutable objects is aanzienlijk gemakkelijker. Als het immutable object dat gerefereerd word anders is dan het vorige dan is het object veranderd.

#### Bepalen wanneer te herrenderen in React {#determining-when-to-re-render-in-react}

Het belangrijkste voordeel van immutability is dat het je helpt _pure components_ te maken in React. Immutable data kan gemakkelijk bepalen of veranderingen zijn gemaakt, wat op zich helpt determineren of een component her-rendert hoeft te worden.

Je kan meer leren over `shouldComponentUpdate()` en hoe *pure components* te bouwen door [Optimizing Performance](/docs/optimizing-performance.html#examples) te lezen.

### Function Components {#function-components}

We zullen nu Square verandere in een **function component**.

In React, zijn **function components** een simpelere manier om componenten aan te maken die enkel een `render` methode hebben en geen eigen state hebben. In plaats van een classe te definiere die `React.Component` extend, schrijven we een functie die `props` als input neemt en wat gerendered moet returned. Function components zijn minder langdradig om te schrijven dan classes en vele componenten kunnen zo geschreven worden.

Vervang Square class met deze functie:

```javascript
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```

We veranderden `this.props` in `props` beide keren dat het voorkwam.

**[De volledige code tot zover](https://codepen.io/gaearon/pen/QvvJOv?editors=0010)**

>Nota
>
>Wanneer we het Square component in een function component veranderden, veranderde we ook `onClick={() => this.props.onClick()}` in het kortere `onClick={props.onClick}` (merk op: het weglaten van haakjes aan *beide* kanten). In een klasse, gebruiken we een arrow function om toegang te krijgen tot de correcte `this` waarde, maar in een function component moeten we geen zorgen maken over `this`.

### Beurten nemen {#taking-turns}

We moeten een voordehand liggende fout herstellen in ons tic-tac-toe spel: de "0"-en kunnen niet op het bord aangeduid worden.

We zetten de eerste zet als "X". We kunnen dit instellen door de initial state aan te passen in de Board constructor.

```javascript{6}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
```

Elke keer dat een speler een zet maakt zal `xIsNext` (een boolean) veranderen om te determineren welke speler de volgende zet maakt en de state van het spel wordt opgeslagen. We updaten de `handleClick` functie van het Board Component om de waarde van `xIsNext` aan te passen::

```javascript{3,6}
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
```

Met deze verandering, kunnen "X" and "O" beurten nemen. Laten we ook de "status" text in de `render` van Board zodat het zal weergeven welke speler de volgende zet heeft:

```javascript{2}
  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      // the rest has not changed
```

Na deze veranderingen heb je normaal, dit Board component:

```javascript{6,11-16,29}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

**[De volledige code tot zover](https://codepen.io/gaearon/pen/KmmrBy?editors=0010)**

### Een winnaar aanduiden {#declaring-a-winner}

Nu dat we tonen welke speler de volgende zet heeft, kunnen we ook tonen wanneer het spel gewonnen is en er geen volgende beurten zijn. We kunnen een winnaar aanduiden door deze helper functie toe te voegen aan het einde van het bestand:

```javascript
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
```

We roepen `calculateWinner(squares)` op in de `render` functie van Board om te controleren of een speler gewonnen heeft. Als een speler gewonnen heeft kunnen we text "Winner: X" of "Winner: O" weergeven. We verplacen de `status` declaratie in de `render` functie van Board met devolgende code:

```javascript{2-8}
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      // the rest has not changed
```
We kunnen nu de `handleClick` functie van Board aanpassen om vroegtijdig te returnen als iemand het spel heeft gewonnen of een Square reeds opgevuld is:

```javascript{3-5}
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
```

**[De volledige code tot zover](https://codepen.io/gaearon/pen/LyyXgK?editors=0010)**

Gefeliciteerd! Je hebt nu een werkend tic-tac-toe spel. En je ook zojuist de basis van React geleerd. Dus eigenlijk ben *jij* de echte winnaar.

## Time Travel toevoegen {#adding-time-travel}

Als een laatste opgave, gaan we het mogelijk maken om "terug in de tijd" te gaan naar vorige zetten in het spel.

### Opslaan van de Geschiedenis van de Zetten in het Spel {#storing-a-history-of-moves}

Als we de `squares` array muteren, zou het implementeren van time travel zeer moeilijk zijn.

Maar in plaats hiervan hebben we `slice()` gebruikt om een nieuwe kopie van de `squares` array aan te maken na elke zet en aanschouwen we het als [immutable](#why-immutability-is-important). Dit laat ons toe om elke vorige versie van het `squares` array op te slaan en te navigeren naar alle verleden zetten.

We zullen de vorige `squares` arrays opslaan in een andere array `history`. De `history` array representeerd alle states van het Board component. Van de eerste tot laatste zet, en ziet er zo uit:

```javascript
history = [
  // Before first move
  {
    squares: [
      null, null, null,
      null, null, null,
      null, null, null,
    ]
  },
  // After first move
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, null,
    ]
  },
  // After second move
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, 'O',
    ]
  },
  // ...
]
```

Nu moeten we beslissen welk component de `history` state bevat.

### De staat verheffen (lifting state), nogmaals {#lifting-state-up-again}

We willen dat het top-level Game component een lijst van vorige zetten toont.
Hiervoor heeft het component toegang nodig tot `history` en dus zetten we de `history` state in het top-level Game component.

Het plaatsen van de `history` state in het Game component laat ons toe om de `squares` state te verwijderen van het child component, Board. Net [zoals we de state verheften ("lifted state up")](#lifting-state-up) van het Square component naar het Board component, gaan we het nu verheffen van het Board element naar het top-level Game component. Dit geeft het Game component volledige controle over de data van Board en laat het toe om het Board component vorige zetten te renderen.

Eerst, we zetten de initiële state van het Game component in zijn constructor:

```javascript{2-10}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
```

Vervolgens zullen we het Board component de props `squares` en `onClick` doorgeven vanuit het Game component.
Aangezien we nu een enkelvoudige click handler hebben in Board voor de vele Squares, moeten we ook de locatie van elke Square doorgeven in de `onClick` handler, om aan te duiden welke Square aangeklikt werd. Hier zijn de nodige stappen om het Board component te veranderen:

* Verwijder de `constructor` in Board.
* Vervang `this.state.squares[i]` met `this.props.squares[i]` in  `renderSquare` van Board.
* Vervang `this.handleClick(i)` met `this.props.onClick(i)` in van `renderSquare` Board.

Het Board component luidt nu:

```javascript{17,18}
class Board extends React.Component {
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

We updaten de `render` functie van het Game component om de meest recente geschiedenis ingave te gebruiken, om de status van het spel te determineren en renderen:

```javascript{2-11,16-19,22}
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
```

Aangezien het Game component nu de spelstatus rendert, kunnen we de overeenkomstige code verwijderen van de de Board `render` methode. Na het herstructureren, ziet de Board `render` functie er zo uit:

```js{1-4}
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
```

Om af te sluiten, moeten we de Board `handleClick` methode verplaatsen naar het Game component. We moeten ook `handleClick` aanpassen omdat de state van het Game component anders gestructureerd is. Binnen de `handleClick` methode concateneren we de nieuwe geschiedenis ingaves in `history`.

```javascript{2-4,10-12}
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
```

>Nota
>
> Tot tegenstelling van de array `push()` methode, waar je misschien meer vertrouwd met bent, muteerd de `concat()` methode de originele array niet, en wordt daarom verkozen.

Op dit moment heeft het Board component enkel de `renderSquare` en `render` methodes nodig. De staat van het spel en de `handleClick` methode zouden in het Game component zijn.

**[De volledige code tot zover](https://codepen.io/gaearon/pen/EmmOqJ?editors=0010)**

### Tonen van Vorige Zetten {#showing-the-past-moves}

Aangezien we de geschiedenis van het tic-tac-toe spel opnemen, kunnen we nu een lijst van vorige zetten aan de speler tonen.

We hebben eerder geleerd dat React elementen eerste klasse Javascript objecten zijn; we kunenn ze doorgeven in onze applicaties. Om meerdere items te renderen kunnen we een array van elementen gebruiken.

In Javascript hebben arrays een [`map()` methode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) dat doorgaans gebruikt wordt om data naar andere data te mappen, bijvoorbeeld:

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2); // [2, 4, 6]
```

Door de `map` methode te gebruiken kunnen we de zetten geschiedenis naar React elementen (gerepresenteerd door knoppen op het scherm) mappen, en kunnen we een lijst van knoppen tonen om naar vorige zetten te "springen".

Laten we de `history` in de Game `render` methode "`map`pen":

```javascript{6-15,34}
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
```

**[De volledige code tot zover](https://codepen.io/gaearon/pen/EmmGEa?editors=0010)**

Voor elke zet in de tic-tac-toe spel geschiedenis, creëeren we een list item `<li>` die een knop `<button>` bevat. De knop heeft een `onClick` handler die de `this.jumpTo()` methode oproept. We hebben de `this.jumpTo()` methode nog niet geïmplementeerd. Tot zover zien we een lijst van zetten die zijn gemaakt in het spel en een waarschuwing in de developer tools console:

>  Warning:
>  Each child in an array or iterator should have a unique "key" prop. Check the render method of "Game".

Laten we bespreken wat deze waarschuwing betekend.

### Picking a Key {#picking-a-key}

Wanner we een lijst renderen, slaat React informatie op over elk gerendered element (list element). Wanneer we een llijst updaten, moet React beslissen wat veranderd moet worden. We zouden lijst elementen kunnen ingevoeg, verwijderen, herordenen of updaten.


Beeld je in om overtegaan van:

```html
<li>Alexa: 7 tasks left</li>
<li>Ben: 5 tasks left</li>
```

naar

```html
<li>Ben: 9 tasks left</li>
<li>Claudia: 8 tasks left</li>
<li>Alexa: 5 tasks left</li>
```
Naast de geupdate getallen, zou een mens die dit leest waarschijnlijk beweren dat we de rangschikking van Alexa en Ben veranderd hebben, en Claudia tussen Alexa en Ben hebben ingevoegd.
Maar React is een computer programma en weet niet wat onze bedoeling is. Omdat React onze intenties niet kan weten, moeten we een *key* property definiëren voor elk element uit de lijst, om het van zijn siblings te kunnen onderscheiden. Een optie zou zijn om de strings `alexa`, `ben` en `claudia` te gebruiken. Indien we data uit een database gebruiken, dan kunnen we de database IDs gebruiken als keys.

```html
<li key={user.id}>{user.name}: {user.taskCount} tasks left</li>
```

Waneer een lijst her-rendered wordt, neemt React elk de key van elk lijst element en zoekt naar een overeenkomende key in de vorige lijst elementen. Als de huidige lijst een key bevat die voorgaand niet bestond, maakt React een component. Als de de lijst een key ontbreekt die bestond in de vorige lijst, dan vernietigd React het vorige component. Als twee keys overeenkomen, dan wordt het overeenkomende element overgezet. Keys vertellen aan React over de identiteit van elk component en laat React toe om de state te behouden tijdens een her-render. Als een key van een component veranderd, zal het component vernietigd worden en hercreëerd worden met een nieuwe state.

`key` is een speciaal en gereserveerd property in React (samen met `ref`, een geavanceerde feature). Wanneer een element gecreëerd wordt, leidt React de `key` property af en slaat de key dadelijk op in het gereturnde element. Hoewel het lijkt alsof `key` behoort in de `props`, kunnen we `this.props.key` niet gebruiken om naar `key` te refereren. React gebruikt `key` automatisch om te beslissen welke componenten up te daten. Een component kan niet vragen naar zijn `key`.

**Het is sterk aangeraden dat je gepaste keys toeschrijft wanneer je dynamische lijsten aanmaakt.** Als je geen gepaste keys hebt, kan je overwegen om je data te herschikken totdat je er wel hebt.

Als geen key wordt bepaald, zal React een waarschuwing tonen en bij verstek de array index gebruiken. De array index als key gebruiken is problematisch wanneer je de lijst elementen probeert te herordenen of elementen invoegt/verwijderd. Expliciet `key={i}` toewijzen verzwijgt de waarschuwing maar heeft dezelfde problemen als de array indexen en is niet aan te raden in de meeste toepassingen.

keys hoeven niet globaal uniek te zijn; ze moeten enkel uniek zijn ten opzichte van componenten en hun siblings.


### Time Travel toepassen {#implementing-time-travel}

In de tic-tac-toe spel geschiedenis krijgt elke zet een unieke ID toegewezen. Het is een geordende nummer van de zet. De zetten worden nooit herordend, verwijderd of in het midden ingevoegd, en is het veilig om de index van de zet te gebruiken als key.

In de `render` methode van het Game component kunnen we de key als `<li key={move}>` toevoegen, de waarschuwing van React over de keys zou dan moeten verdwijnen:

```js{6}
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
```

**[De volledige code tot zover](https://codepen.io/gaearon/pen/PmmXRE?editors=0010)**

Enige knop van de lijst elementen aanklikken toont een fout aangezien de `jumpTo` methode ongedefiniëerd is. Voordat we `jumpTo` implementeren, voegen we `stepNumber` toe aan de state van het Game component om aan te duiden welke stap momenteel bekijken.

Voeg eerst `stepNumber: 0` toe aan de initiële state in de Game`constructor`:

```js{8}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }
```

Vervolgens definiëren we de `jumpTo` methode in Game om `stepNumber` up te daten. We zetten ook `xIsNext` naar `true` als het nummer dat we aan `stepNummer` toewijzen even is:

```javascript{5-10}
  handleClick(i) {
    // this method has not changed
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    // this method has not changed
  }
```

We maken nu enkele veranderingen aan de Game `handleClick` methode, opgeroept wordt wanneer je een Square aanklikt.

De `stepNumber` state die we hebben toegevoegd bevat de zet die aan de gebruiker getoont wordt. Nadat we een nieuwe zet maken, moeten we `stepNumber` toevoegen door `step.Number: history.length` te gebruiken als deel van het `this.setState` argument. Dit verzekert dat we nooit dezelfde zet tonen wanneer een nieuwe gemaakt is. 

We zullen ook het lezen van `this.state.history` vervangen met `this.state.history.slice(0, this.state.stepNumber + 1)`. Dit verzekert dat als we "terug in de tijd gaan" en een nieuwe zet maken vanaf dit punt, we alle "toekomstige" geschiedenis verwijderen aangezien deze foutief wordt.

```javascript{2,13}
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
```

Om af te sluiten, passen we de `render` methode aan van het Game component om in plaats van de laatste zet te renderen, de huidig geselecteerde zet (volgens `stepNumber`) te renderen.

```javascript{3}
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // the rest has not changed
```

Als we een stap in de spel geschiedenis aanklikken, zou het tic-tac-toe bord onmiddelijk updaten om het bord te tonen zoals het eruit ziet net nadat de zet gemaakt is.

**[De volledige code tot zover](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**

### Tot slot {#wrapping-up}

Gefeliciteerd! Je hebt zojuist een tic-tac-toe game gemaakt dat:

* Je tic-tac-toe laat spelen
* Aantoont wanneer een speler gewonnen heeft
* De geschiedenis van alle zetten opslaat 
* Spelers toe laat om de geschiedenis van alle zetten en versies van het bord te bekijken

Mooi zo! We hopen dat je nu een goed overzicht hebt gekregen van hoe React werkt.

Bekijk het eind resultaat: **[Eind Resultaat](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**.

Als je nog extra tijd hebt of je React vaardigheden wat meer wil oefenen, zijn hieronder nog wat ideëen voor verbeteringen die je kan aanbrengen op het tic-tac-toe spel, in opgaande moeilijkheid:

1. Toon de locatie van elke zet in het formaat (kolom, rij) in de geschiedenislijst van de zetten.
2. Zet het huidig geselecteerde item in de geschiedenislijst in het vet.
3. Herschrijf het Board component, gebruik makend van twee loops om de vierkanten te maken ipv deze te hardcoden.
4. Voeg een wisselknop toe die toelaat om de geschiedenislijst in opgaande of afnemede volgorde te schikken.
5. Wanneer iemand wint, duid de vakken aan die de overwinning hebben gebracht.
6. Wanneer er geen winnaar is, toon een boodschap die de een gelijkspel vermeld.


In deze tutorial hebben we React concepten leren kennen, elements, components, props en state. Voor een meer gedetailleerde uitleg over elk van deze onderwerpen, lees dan [de rest van de documentatie](/docs/hello-world.html). Om meer te leren over het definiëren van componenten, lees de [`React.Component` API referentie](/docs/react-component.html).
