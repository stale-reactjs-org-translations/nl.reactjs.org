---
id: hooks-state
title: De State Hook
permalink: docs/hooks-state.html
next: hooks-effect.html
prev: hooks-overview.html
---

*Hooks* zijn een nieuwe toevoeging in React 16.8. Ze maken het mogelijk om state en andere React voorzieningen te gebruiken zonder dat je een class hoeft te schrijven.

De [introductiepagina](/docs/hooks-intro.html) gebruikte dit voorbeeld om vertrouwd te raken met Hooks:

```js{4-5}
import React, { useState } from 'react';

function Example() {
  // Declareer een nieuwe state variabele, die we "count" zullen noemen
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Je klikte {count} keer</p>
      <button onClick={() => setCount(count + 1)}>
        Klik me
      </button>
    </div>
  );
}
```

We zullen beginnen met het leren ovwer Hooks door deze code te vergelijken met een equivalent class component voorbeeld.

## Equivalent Class Voorbeeld {#equivalent-class-example}

Als je al eerder classes hebt gebruikt in React, zou de volgende code je bekend voor moeten komen:

```js
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>Je klikte {this.state.count} keer</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Klik me
        </button>
      </div>
    );
  }
}
```

De state begint als `{ count: 0 }`, en we verhogen `state.count` als de gebruiker op een knop druk door `this.setState()` aan te roepen. We zullen stukjes van deze class her en der in de pagina gebruiken.

>Opmerking
>
>Je vraagt je wellicht af waarom we hier een counter gebruiken in plaats van een realistischer voorbeeld. Dit helpt ons te focussen op de API terwijl we toch onze eerste stappen zetten met Hooks.

## Hooks en Functie Componenten {#hooks-and-function-components}

Ter herinnering, functie componenten in React zien er zo uit:

```js
const Example = (props) => {
  // Je kunt hier Hooks gebruiken!
  return <div />;
}
```

of zo:

```js
function Example(props) {
  // Je kunt hier Hooks gebruiken!
  return <div />;
}
```

Je zou deze voorheen kunnen kennen als "stateless" componenten. We introduceren nu de mogelijkheid om React state te gebruiken vanuit zulke componenten, daarom verkiezen we de naam "functie componenten".

Hooks werken **niet** binnen classes. Maar je kunt ze wel gebruiken in plaats van het schrijven van classes.

## Wat is een Hook? {#whats-a-hook}

Ons nieuwe voorbeeld begint met het importeren van de `useState` Hook van React:

```js{1}
import React, { useState } from 'react';

function Example() {
  // ...
}
```

**Wat is een Hook?** Een Hook is een speciale functie die je laat "aanhaken" (of "hook into") React voorzieningen. Bijvoorbeeld `useState` is een Hook die je React state laat toevoegen aan functie componenten. We zullen later andere Hooks leren.

**Wanner zou ik een Hook moeten gebruiken?** Als je een functie component schrijft en je je realiseert dat je er een state aan toe moet voegen, voorheen had je hem dan moeten converteren naar een class. Nu kan je een Hook gebruiken binnen het bestaande functie component. We gaan dat nu doen!

>Opmerking:
>
>Er zijn wat speciale regels die bepalen waar je wel of juist geen Hooks mag gebruiken binnen een component. We zullen ze leren in [Regels van Hooks](/docs/hooks-rules.html).

## Maak een State Variabele {#declaring-a-state-variable}

In een class initialiseren we de `count` state op `0` door `this.state` op `{ count: 0 }` te zetten in de constructor:

```js{4-6}
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
```

In een function component, hebben we geen `this`, dus kunnen we er ook niet aan toekennen of `this.state` uitlezen. In plaats daarvan roepen we de `useState` Hook direct binnen ons component aan:

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Maak een nieuww state variabele, die we "count" zullen noemen
  const [count, setCount] = useState(0);
```

**Wat doet het aaroepen van `useState`?** Het declareert een "state variabele". Onze variabele heeft de naam `count` maar we hadden hem iedere andere naam kunnen geven, zoals `banaan`. Dit is een manier om wat waarden te "bewaren" tussen de functie aanroepen — `useState` is een nieuwe manier om precies dezelfde capaciteit te gebruiken waarin `this.state` voorziet in een class. Normaal gesproken "verdwijnt" een variabele waneer de function eindigd maar state variabelen worden door React bewaard.

**Wat geven we door aan `useState` als een argument?** Het enige argument naar de `useState()` Hook is de initiele state. In tegenstelling tot bij classes hoeft de state geen object te zijn. We kunnen het bij een number of string houden, als dat alles is wat we nodig hebbem. In ons voorbeeld, willen we alleen maar een getal voor het aantal keren dat de user heeft geklikt, dus geven we `0` als initiele state voor onze variabele. (Als we twee verschillende waarden hadden willen opslaan in state, zouden we `useState()` twee keer aanroepen.)

**Wat geeft `useState` terug?** Het geeft een paar met waarden terug: de huidige state en een functie om die aan te passen. Dat is waarom we `const [count, setCount] = useState()` schrijven. Dit lijkt op `this.state.count` en `this.setState` in een class, behalve dat je ze in een paar terug krijgt. Al je niet bekend bent met de syntax die we gebruikten, we komen er op terug [onderaan deze pagina](/docs/hooks-state.html#tip-what-do-square-brackets-mean).

Nu we weten wat de `useState` Hook doet, zou ons voorbeeld helderder moeten zijn:

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Declareer een nieuwe state variabele, die we "count" zullen noemen
  const [count, setCount] = useState(0);
```

We declareren een state variabele met de naam `count`, en zetten die op `0`. React zal zijn huidige waarde onthouden tussen de re-renders door, en zal onze functie van de recentste waarde geven. Als we de huidige `count` willen aanpassen kunnen we `setCount` aanroepen.

>Opmerking
>
>Je vraagt je misschien af: waarom heet `useState` niet `createState`?
>
>"Create" zou niet heel precies zijn, omdat de state alleen de eerste keer dat ons component rendert wordt aangemaakt. Tijdens daarop volgende renders geeft `useState` ons de huidige state. Anders zou het helemaal geen "state" zijn! Er is ook een reden waarom namen van Hooks *altijd* beginnen met `use`. We leren later waarom is de [Regels van Hooks](/docs/hooks-rules.html).

## State Lezen {#reading-state}

Wanneer we de huidige count willen weergeven in een class, lezen we `this.state.count`:

```js
  <p>Je klikte {this.state.count} keer</p>
```

In een functie, kun je `count` direct gebruiken:


```js
  <p>Je klikte {count} keer</p>
```

## State Aanpassen {#updating-state}

In een class, moeten we `this.setState()` aanroepen om de `count` state aan te passen:

```js{1}
  <button onClick={() => this.setState({ count: this.state.count + 1 })}>
    Klik me
  </button>
```

In een functie hebben we `setCount` en `count` al als variabelen dus hebben we `this` niet nodig:

```js{1}
  <button onClick={() => setCount(count + 1)}>
    Klik me
  </button>
```

## Samenvatting {#recap}

Laten we nu **regel-voor-regel samenvatten wat we hebben geleerd** en ons begrip ervan controleren.

<!--
  I'm not proud of this line markup. Please somebody fix this.
  But if GitHub got away with it for years we can cheat.
-->
```js{1,4,9}
 1:  import React, { useState } from 'react';
 2:
 3:  function Example() {
 4:    const [count, setCount] = useState(0);
 5:
 6:    return (
 7:      <div>
 8:        <p>Je klikte {count} keer</p>
 9:        <button onClick={() => setCount(count + 1)}>
10:         Klik me
11:        </button>
12:      </div>
13:    );
14:  }
```

* **Regel 1:** We importeren `useState` Hook van React. Het laat ons lokale state bewaren in een functie component.
* **Regel 4:** Binnen het `Example` component, declareren we een nieuwe state variabele door de `useState` Hook aan te roepen. Dat geeft twee waarden als paar terug, waaraan we namen geven. We noemen onze variabele `count`, omdat hij het aantal button kliks bevat. We initialiseren hem met nul door `0` door te geven als het enige argument naar `useState`. Het tweede teruggegeven item is zelf een functie. Het laat ons `count` aanpassen dus noemen we die `setCount`.
* **Regel 9:** Wanneer de gebruiker klikt roepen we `setCount` aan met een nieuwe waarde. React zal het `Example` component dan re-renderen, daarbij wordt de nieuwe `count` waarde doorgegeven.

Dit lijkt in het begin misschien wat veel om te verwerken. Niet haasten! Als je verdwaald raakt in de uitleg, kijk dan opnieuw naar de code erboven en probeer het van boven naar beneden te lezen. We beloven dat het, zodra je probeert te "vergeten" hoe state werkt in classes, en met frisse blik naar deze code kijkt, allemaal duidelijk zal worden.

### Tip: Wat Betekenen De Vierkante Haken? {#tip-what-do-square-brackets-mean}

Misschien heb je de vierkante haken opgemerkt als we de state variabele declareren:

```js
  const [count, setCount] = useState(0);
```

De namen aan de linkerkant maken geen deel uit van de React API. Je kunt je eigen state variabelen zelf een naam geven:

```js
  const [fruit, setFruit] = useState('banaan');
```

Deze JavaScript syntax heet ["array destructuring"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring). Het betekent dat we twee variabelen aanmaken, `fruit` en `setFruit`, waar `fruit` wordt gezet op de eerste door `useState` teruggegeven waarde, en `setFruit` op de tweede. Dit is vergelijkbaar met de volgende code:

```js
  var fruitStateVariable = useState('banaan'); // Geeft een twee waarden in een paar terug
  var fruit = fruitStateVariable[0]; // Eerste item in het paar
  var setFruit = fruitStateVariable[1]; // Tweede item in het pair
```

Wanneer we een state variabele declareren met `useState`, geeft dat een paar terug — een array met twee items. De eerste is de huidige waarde, en de tweede is een functie die je de waarde laat aanpassen. De index `[0]` en `[1]` gebruiken om ze te benaderen is een beetje verwarrend omdat ze verschillende specifieke betekenissen hebben. Dat is waarom we 
in plaats daarvan array destructuring gebruiken.

>Opmerking
>
>Misschien ben je benieuwd hoe React weet van welk component de `useState` aanroep komt omdat we niet zoiets als `this` meegeven naar React. We zullen  [deze vraag](/docs/hooks-faq.html#how-does-react-associate-hook-calls-with-components) en vele anderen beantwoorden in de FAQ.

### Tip: Meerdere State Variabelen Gebruiken {#tip-using-multiple-state-variables}

Het declareren van variabelen als een paar van `[something, setSomething]` is ook handig omdat je zo  *verschillende* namen kunt geven aan verschillende state variabelen als we er meer dan één willen gebruiken:

```js
function ExampleWithManyStates() {
  // Declareer meerdere state variabelen!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banaan');
  const [todos, setTodos] = useState([{ text: 'Leer Hooks' }]);
```

In het bovenstaande component hebben we `age`, `fruit`, en `todos` als lokale variabelen, en kunnen we ze individueel aanpassen:

```js
  function handleOrangeClick() {
    // Vergelijkbaar met this.setState({ fruit: 'sinaasappel' })
    setFruit('sinaasappel');
  }
```

Je **hoeft niet per se** veel state variabelen te gebruiken. State variabelen kunnen ook prima objecten en arrays bevatten, dus je kunt nog steeds gerelateerde data groeperen. Maar, in tegenstelling tot `this.setState` in een class,wordt een state variabele altijd *replaces* als hij wordt aangepast in plaats van ge-merged.

We geven meer aanbevelingen over het splitsen van onafhankelijke state variabelen [in de FAQ](/docs/hooks-faq.html#should-i-use-one-or-many-state-variables).

## Volgende Stappen {#next-steps}

Op deze pagina hebben we geleerd over een van de Hooks die React bied: `useState`. We zullen er soms ook naar verwijzen als de "State Hook". Het laat ons lokale state toevoegen aan React functie componenten -- wat we nu voor de eerste keer gedaan hebben!
