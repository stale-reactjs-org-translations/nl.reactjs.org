---
id: hooks-state
title: Using the Effect Hook
permalink: docs/hooks-effect.html
next: hooks-rules.html
prev: hooks-state.html
---

*Hooks* zijn een nieuwe toevoeging in React 16.8. Ze maken het mogelijk om state en andere React voorzieningen te gebruiken zonder dat je een class hoeft te schrijven.

De *Effect Hook* laat je neven effecten uitveoren in functie componenten:

```js{1,6-10}
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Vergelijkbaar met componentDidMount en componentDidUpdate:
  useEffect(() => {
    // Wijzig de document title door de browser API te gebruiken
    document.title = `Je klikte ${count} keer`;
  });

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

Dit stuk code is gebaseerd op het [counter voorbeeld van de vorige pagina](/docs/hooks-state.html), maar we hebben een nieuwe eigenschap toegevoegd: we stellen de document titel in op een aangepast bericht dat het aantal clicks bevat.

Data ophalen, het opzetten van een subscription, en het handmatig aanpassen van de DOM in React componenten zijn allemaal voorbeelden van neven effecten. Of je al of niet bekend bent met het aanroepen van deze operaties "neven effecten" (of gewoon "effecten"), je hebt ze waarschijnlijk al eens uitgevoerd in jou componenten.

>Tip
>
>Als je bekend bent met de React class lifecycle methoden, kun je je `useEffect` Hook voorstellen als `componentDidMount`, `componentDidUpdate`, en `componentWillUnmount` gecombineerd.

Er zijn twee veelvoorkomende typen van neven effecten in React componenten: effecten die geen opruim-code nodig hebben, en effecten die dat wèl nodig hebben. Laten we eens in meer detail naar dit onderscheid kijken.

## Effects Zonder Cleanup {#effects-without-cleanup}

Soms willen we **wat extra code uitvoeren nadat React DOM heeft aangepast.** Netwerk requests,handmatige DOM wijzigingen, en logging zijn veelvoorkomende voorbeelden van effecten die geen cleanup nodig hebben. We bedoelen daarmee dat we ze kunnen uitvoeren en meteen kunnen vergeten. Laten we eens vergelijken hoe classes en Hooks ons hun neveneffecten laten uitdrukken.

### Voorbeeld Met Classes {#example-using-classes}

In React class componenten zou `render` methode zelf geen neveneffecten moeten veroorzaken. Het zou te vroeg zijn -- normaal gesproken willen we onze effecten pas uitvoeren *nadat* React de DOM heeft aangepast.

Dat is waarom we in React classes de neveneffecten in `componentDidMount` en `componentDidUpdate` stoppen. Terugkomend op ons voorbeeld, hier is de React counter class component die de titel van het document aanpast, net nadat React de DOM bijwerkt:

```js{9-15}
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = `Je klikte ${this.state.count} keer`;
  }

  componentDidUpdate() {
    document.title = `Je klikte ${this.state.count} keer`;
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

Merk op dat **we de code moeten herhalen voor deze twee lifecycle methoden in de class.**

Dat is omdat we in veel gevallen hetzelfde neveneffect willen uitvoeren of het component nou gemount wordt, of dat er een aanpassing is geweest. Inhoudelijk willen we dat het gebeurt na iedere render -- maar React class componenten hebben niet zo een methode. We zouden er een aparte methode van kunnen maken, maar die zouden we dan nog steeds vanaf twee plaatsen moeten aanroepen.

Laten we eens kijken hoe we hetzelfde kunnen bereiken met de `useEffect` Hook.

### Voorbeeld Met Hooks {#example-using-hooks}

We hebben dit voorbeeld als gezien bovenaan de pagina, maar laten we het nog eens beter bekijken:

```js{1,6-8}
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Je klikte ${count} keer`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Klik op me
      </button>
    </div>
  );
}
```

**Wat doet `useEffect`?** Door deze Hook te gebruiken laat je React weten dat jouw component iets moet doen na een render. React zal de functie die je meegaf onthouden (we zullen die ons "effect" noemen), en die later aanroepen na de DOM wijzigingen te hebben uitgevoerd. In dit effect stellen we de document titel in, maar we zouden ook data kunnen ophalen of een andere imperatieve API aanroepen.

**Waarom wordt `useEffect` aangeroepen binnen een component?** Het plaatsen van `useEffect` binnen de component geeft ons toegang tot de `count` state variabele (en de props) rechtstreeks vanuit het effect. We hebben geen speciale API nodig om hem te lezen -- hij is al binnen de functie scope. Hooks omarmt JavaScript closures en voorkomt het introduceren van React-specifieke APIs waar JavaScript al in een oplossing voorziet.

**Wordt `useEffect` uitgevoerd na iedere render?** Ja! Standaard wordt hij zowel na de eerste render *en* na elke update uitgevoerd. (We zullen er later over spreken [hoe je dit kunt aanpassen](#tip-optimizing-performance-by-skipping-effects).) In plaats van te denken in termen van "mounting" en "updating", vindt je het misschien eenvoudiger bedenken dat effecten gebeuren "na het renderen". React garandeert dat het DOM is bijgewerkt tegen de tijd dat het de effecten uitvoert.

### Uitgebreide Uitleg {#detailed-explanation}

Nu we meer over effecten weten, zouden de volgende regels duidelijk moeten zijn:

```js
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Je klikte ${count} keer`;
  });
}
```

We declareren de `count` state variabele en dan laten we React weten dat we een effect nodig hebben. We geven een functie door aan de `useEffect` Hook. Deze functie die we doorgeven *is* ons effect. Binnen ons effect stellen we de document titel in door de `document.title` browser API te gebruiken. We kunnen de recentste `count` lezen binnen het effect om dat het in de scope zit van onze functie. Als React ons component rendert, onthoudt het, het door ons gebruikte effect, en voert het effect dan uit na het bijwerken van het DOM. Dit gebeurt bij iedere render, inclusief de eerste.

Ervaren JavaScript ontwikkelaars zouden op kunnen merken dat de funtie die aan `useEffect` doorgegeven wordt iedere render een andere is. Dat is de bedoeling ook. Eigenlijk kunnen we juist daardoor de `count` waarde lezen van binnenin het effect zonder ons zorgen over of de waarde verouderd is. Eidere keer dat we opnieuw renderen plannen we een _ander_ effect, die de vorige vervangt. Dit zorgt er in zekere zin voor dat de effecten zich meer gedragen als een deel van het renderresultaat -- elk effect "hoort" bij één bepaalde render. Waarom dit nuttig is zullen we [later op deze pagina](#explanation-why-effects-run-on-each-update) duidelijker zien.

>Tip
>
>Anders dan `componentDidMount` of `componentDidUpdate` blokkeren effecten die met `useEffect` ingesteld zijn de browser niet om het scherm bij te werken. Dit maakt dat je app sneller (responsive) aanvoelt. De meeste effecten hoeven niet synchroon te gebeuren. In de zeldzame gevallen dat dat wel moet (zoals het meten van de layout) is er een afzonderlijke [`useLayoutEffect`](/docs/hooks-reference.html#uselayouteffect) Hook met een identieke API als `useEffect`.

## Effecten met Cleanup {#effects-with-cleanup}

Eerder hebben we bekeken hoe je neveneffecten kunt beschrijven die niet hoeven te worden opgeschoond. Maar bij sommige effecten moet dat wel. Bijvoorbeeld **we willen misschien een subscription opzetten** op een externe gegevensbron. In dat geval is het belangrijk om op te schonen zodat we geen geheugenlek introduceren! Laten we eens vergelijken hoe we dat kunnen doen met classes en met Hooks.

### Voorbeeld met Classes {#example-using-classes-1}

In een React class zou je gewoonlijk een subscription opzetten in `componentDidMount` en die opschonen in `componentWillUnmount`. Bijvoorbeeld, laten we zeggen dat we een `ChatAPI` module hebben waarmee we ons kunnen aanmelden (subscribe) op een vriend zijn online status. Hier is hoe we kunnen aanmelden en de status weergeven met een class:

```js{8-26}
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return 'Bezig met laden...';
    }
    return this.state.isOnline ? 'Online' : 'Offline';
  }
}
```

Merk op hoe `componentDidMount` en `componentWillUnmount` elkaar moeten spiegelen. Lifecycle methoden dwingen on deze logica te splitsen hoewel conceptueel de code in beiden gerelateerd is met hetzelfde effect.

>Opmerking
>
>Lezers met arendsogen kunnen opmerken dat dit voorbeeld ook een `componentDidUpdate`-methode nodig heeft om volledig correct te zijn. We zullen dit voorlopig negeren, maar komen er in een [later gedeelte](#explanation-why-effects-run-on-each-update) van deze pagina op terug.

### Voorbeeld met Hooks {#example-using-hooks-1}

Laten we kijken hoe we deze component kunnen schrijven met Hooks.

Je zou denken dat we een afzonderlijk effect nodig hebben om de cleanup uit te voeren. Maar code voor het toevoegen en verwijderen van een subscription is zo nauw met elkaar verbonden dat `useEffect` ontworpen is om ze samen te houden. Als jou effect een functie teruggeeft zal React die uitvoeren zodra het tijd is voor de cleanup:

```js{6-16}
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

**Waarom gaven we een functie terug van ons effect?** Dit is het optionele cleanup mechanisme voor effecten. Ieder effect kan een functie teruggeven die achter hem opruimd. Dit maakt het mogelijk om de logica voor het toevoegen en verwijderen van subscriptions dicht bi elkaar te houden. Ze zijn onderdeel van één en hetzelfde effect!

**Wanneer precies voert React het opschonen van een effect uit?** React voert de cleanup uit wanneer de component unmount. Maar - zoals we eerder zagen - worden effecten uitgevoerd bij iedere render en niet maar één keer. Dat is waarom React *ook* de cleanup van effecten van de vorige redener doet voordat de effecten nog een keer worden uitgevoerd. We zullen hieronder later bespreken [waarom dit helpt bugs te voorkomen](#explanation-why-effects-run-on-each-update) en [hoe je dit gedrag kunt voorkomen indien het prestatieproblemen veroorzaakt](#tip-optimizing-performance-by-skipping-effects) later below.

>Opmerking
>
>We hoeven de funtie die het effect teruggeeft geen naam te geven. We hebben hem `cleanup` genoemd om zijn doel te verduidelijken, maar je zou ook een arrow funcite kunnen teruggeven of hem anders kunnen noemen.

## Samenvatting {#recap}

We hebben geleerd dat `useEffect` ons verschillende vormen van neven effecten laat beschrijven nadat een component rendert. Sommige effecten kunnen vereisen een opschoning dus geven die een functie terug:

```js
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

Andere effecten hebben misschien geen cleanup fase en geven niets terug.

```js
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
```

De Effect Hook voegt beide use cases samen in één enkele API.

-------------

**Als je nu het gevoel hebt een behoorlijk idee hebt hoe de Effect Hook werkt, of als je je overweldigt voelt, kan je nu naar de [volgende pagina over Regels van Hooks](/docs/hooks-rules.html) gaan.**

-------------

## Tips voor het Gebruik van Effecten {#tips-for-using-effects}

We zullen nu doorgaan met een diepgaande blik op enkele aspecten `useEffect` waar ervaren React-gebruikers waarschijnlijk nieuwsgierig naar zijn. Voel je niet verplicht om daar nu in te duiken. Je kunt altijd terugkomen naar deze pagina om verdere details over de Effect Hook te leren.

### Tip: Gebruik Meerdere Effecten om Zaken te Scheiden {#tip-use-multiple-effects-to-separate-concerns}

Eén van de problemen die we hebben beschreven in de [Motivatie](/docs/hooks-intro.html#complex-components-become-hard-to-understand) voor Hooks is dat class lifecycle methoden vaak niet-gerlateerde logica bevatten, en gerelateerde logica wordt opgesplitst in verschillende methoden. Hier is een component die de logica van de teller en de status indicator uit de vorige voorbeelden combineert:

```js
class FriendStatusWithCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.title = `Je klikte ${this.state.count} keer`;
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate() {
    document.title = `Je klikte ${this.state.count} keer`;
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
  // ...
```

Merk op hoe de logica die de `document.title` instelt is verdeeld over `componentDidMount` en `componentDidUpdate`. De subscription logica is ook verspreid over `componentDidMount` anden `componentWillUnmount`. En `componentDidMount` bevat code voor beide taken.

Dus hoe kunnen we dit probleem oplossen met Hooks? Net zoals [je de *State* Hook meer dan één keer kun gebruiken](/docs/hooks-state.html#tip-using-multiple-state-variables), kun je ook meerdere effecten gebruiken. Dit stelt ons in staat niet-gerelateerde logica te scheiden in twee aparte effecten:

```js{3,8}
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `Je klikte ${count} keer`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```

**Hooks maken het ons mogelijk de code te splitsen gebaseerd op wat het doet** in plaats van op basis van de naam van een lifecycle methode. React zal *elk* effect toepassen dat wordt gebruikt door de component in de volgorde waarin ze zijn gespecificeerd.

### Uitleg: Waarom Effecten Uitgevoerd Worden bij Elke Update {#explanation-why-effects-run-on-each-update}

Als je gewend bent aan classes vraag je je misschien af waarom de cleanup een effect na iedere render gebeurt en niet maar één keer tijden het unmounten. Laten we eens kijken naar een praktisch voorbeeld om te begrijpen waarom dit opzet ons helpt componenten te maken met minder bugs.

[Eerder op deze pagina](#example-using-classes-1) introduceerden we een `FriendStatus` component voorbeeld dat weergeeft of een vriend online is of niet. Onze class leest `friend.id` uit `this.props`, meldt zich aan voor status updates van de vriend nadat de component mount, meldt zich af tijdens het unmounten:

```js
  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```

**Maar wat gebeurt er als de `friend` prop wijzigt** terwijl de component op het scherm staat? Ons component zou de online status van een andere vriend blijven weergeven. Dit is een bug. We zouden ook een geheugenlek veroorzaken of een crash tijdens het unmounten omdat de unsubscribe aanroep het verkeerde vriend-ID zou gebruiken.

In een class component, zouden we een `componentDidUpdate` moeten toevoegen om dit juist af te handelen:

```js{8-19}
  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate(prevProps) {
    // Unsubscribe van de vorige friend.id
    ChatAPI.unsubscribeFromFriendStatus(
      prevProps.friend.id,
      this.handleStatusChange
    );
    // Subscribe op de volgende friend.id
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```

Vergeten om `componentDidUpdate` correct af te handelen is een veelvoorkomende bron van fouten in React-applications.

Beschouw nu de versie van deze component die Hooks gebruikt:

```js
function FriendStatus(props) {
  // ...
  useEffect(() => {
    // ...
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

De bug doet zich hier niet voor. (Maar we hebben er ook geen wijzigingen in aangebracht.)

Er is geen aparte code voor het afhandelen van updates omdat `useEffect` deze *standaard* afhandelt. Het schoont de vorige effecten op voordat de volgende effecten worden toegepast. Om dit te illustreren is hier een opeenvolging van aan- en afmeldingsaanroepen die deze component in de loop van de tijd zou kunnen produceren:

```js
// Mount met { friend: { id: 100 } } props
ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // Uitvoeren eerste effect

// Update met { friend: { id: 200 } } props
ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // Cleanup vorige effect
ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // Uitvoeren volgende effect

// Update with { friend: { id: 300 } } props
ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // Cleanup vorige effect
ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // Uitvoeren volgende effect

// Unmount
ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // Cleanup laatste effect
```

Dit gedrag zorgt standaard voor consistentie en voorkomt bugs die veel voorkomen in class componenten vanwege ontbrekende updatelogica.

### Tip: Perstatie Optimaliseren door het Overslaan van Effecten {#tip-optimizing-performance-by-skipping-effects}

In some cases, cleaning up or applying the effect after every render might create a performance problem. In class components, we can solve this by writing an extra comparison with `prevProps` or `prevState` inside `componentDidUpdate`:

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

This requirement is common enough that it is built into the `useEffect` Hook API. You can tell React to *skip* applying an effect if certain values haven't changed between re-renders. To do so, pass an array as an optional second argument to `useEffect`:

```js{3}
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes
```

In the example above, we pass `[count]` as the second argument. What does this mean? If the `count` is `5`, and then our component re-renders with `count` still equal to `5`, React will compare `[5]` from the previous render and `[5]` from the next render. Because all items in the array are the same (`5 === 5`), React would skip the effect. That's our optimization.

When we render with `count` updated to `6`, React will compare the items in the `[5]` array from the previous render to items in the `[6]` array from the next render. This time, React will re-apply the effect because `5 !== 6`. If there are multiple items in the array, React will re-run the effect even if just one of them is different.

Dit werkt ook voor effecten die een cleanup fase hebben:

```js{10}
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // Alleen opnieuw subscriben als props.friend.id verandert
```

In de toekomst kan het tweede argument misschien automatisch toegevoegd worden door een build-time transformatie.

>Opmerking
>
>If you use this optimization, make sure the array includes **all values from the component scope (such as props and state) that change over time and that are used by the effect**. Otherwise, your code will reference stale values from previous renders. Learn more about [how to deal with functions](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) and [what to do when the array changes too often](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often).
>
>If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array (`[]`) as a second argument. This tells React that your effect doesn't depend on *any* values from props or state, so it never needs to re-run. This isn't handled as a special case -- it follows directly from how the dependencies array always works.
>
>If you pass an empty array (`[]`), the props and state inside the effect will always have their initial values. While passing `[]` as the second argument is closer to the familiar `componentDidMount` and `componentWillUnmount` mental model, there are usually [better](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) [solutions](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often) to avoid re-running effects too often. Also, don't forget that React defers running `useEffect` until after the browser has painted, so doing extra work is less of a problem.
>
>We recommend using the [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) rule as part of our [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) package. It warns when dependencies are specified incorrectly and suggests a fix.

## Volgende Stappen {#next-steps}

Gefeliciteerd! Dit was een lange pagina, maar hopelijk waren tegen het einde ervan je meeste vragen over effecten beantwoord. Je nu over zowel de State Hook als de Effect Hook geleerd, en er is *veel* wat je kunt doen met die beide samen. Ze dekken de meeste use cases voor classes af -- en waar ze dat niet doen, vind je misschien de [overige Hooks](/docs/hooks-reference.html) behulpzaam.

We beginnen ook te zien hoe Hooks de problemen oplossen die we geschetst hebben in de [motivatie](/docs/hooks-intro.html#motivation). We hebben gezien hoe effect cleanup dubbele code voorkomt in `componentDidUpdate` en `componentWillUnmount`, gerelateerde code dichter bij elkaar brengt, en ons helpt bugs te voorkomen. We hebben ook gezien hoe we effecten uit elkaar kunnen halen door hun doel, wat iets is dat we met classes helemaal niet konden.

Op dit punt vraag je je misschien af hoe Hooks werken. Hoe kan React weten welke `useState` aanroep hoort bij welke state variabele tussen de re-renders door? Hoe "matched" React vorige en volgende effecten bij iedere update? **Op de volgende pagina zullen we leren over de [Rules of Hooks](/docs/hooks-rules.html) -- ze zijn essentieel om Hooks goed te laten werken.**
