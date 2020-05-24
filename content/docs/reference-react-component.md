---
id: react-component
title: React.Component
layout: docs
category: Reference
permalink: docs/react-component.html
redirect_from:
  - "docs/component-api.html"
  - "docs/component-specs.html"
  - "docs/component-specs-ko-KR.html"
  - "docs/component-specs-zh-CN.html"
  - "tips/UNSAFE_componentWillReceiveProps-not-triggered-after-mounting.html"
  - "tips/dom-event-listeners.html"
  - "tips/initial-ajax.html"
  - "tips/use-react-with-other-libraries.html"
---

Deze pagina bevat een uitgebreide API reference van de React component class. Er wordt ervan uitgegaan dat je bekend bent met fundamentele React concepten, zoals [Componenten en Props](/docs/components-and-props.html), evenals [State en Lifecycle](/docs/state-and-lifecycle.html). Als je dat niet bent, lees er dan eerst over.

## Overzicht {#overview}

React laat je componenten definiëren als classes of functies. Componenten die als classes gedefinieerd zijn bieden momeenteel meer mogelijkheden en die worden op deze pagina in detail beschreven. Om een React component class te definiëren moet je `React.Component` uitbreiden:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hallo, {this.props.name}</h1>;
  }
}
```

De enige methode die gedefinieerd *moet* worden in een subclass van `React.Component` is [`render()`](#render). Alle andere beschreven methoden op deze pagina zijn optioneel.

**We raden sterk af om je eigen basis class te creëeren.** In React componenten, [wordt hergebruik van code hoofdzakelijk bereikt door compositie in plaats van inheritance](/docs/composition-vs-inheritance.html).

>Opmerking:
>
>React dwingt je niet om de ES6 class syntax te gebruiken. Als je die probeert te vermijden, kun je, in plaats daarvan, de `create-react-class` module gebruiken of een vergelijkbare aangepaste abstractie. Kijk maar eens naar [Gebruik React zonder ES6](/docs/react-without-es6.html) als je er meer van wilt weten.

### De Lifecycle Van Componenten {#the-component-lifecycle}

Iedere component heeft verschillende "lifecycle methods" die je kunt overriden om op specifieke momenten in het process code uit te voeren. **Je kunt [dit lifecycle diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) gebruiken als spiekbrief** In de onderstaande lijst zijn alledaags gebruikte methoden in **bold** weergegeven. De overigen bestaan voor relatief zeldzame gevallen.

#### Aankoppelen (Mounting) {#mounting}

Deze methoden worden in de volgorde hieronder aangeroepen wanneer er een instance van de component wordt aangemaakt en in de DOM gevoegd wordt:

- [**`constructor()`**](#constructor)
- [`static getDerivedStateFromProps()`](#static-getderivedstatefromprops)
- [**`render()`**](#render)
- [**`componentDidMount()`**](#componentdidmount)

>Opmerking:
>
>De volgende methoden worden als verouderd beschouwd en je moet [ze vermijden](/blog/2018/03/27/update-on-async-rendering.html) in nieuwe code:
>
>- [`UNSAFE_componentWillMount()`](#unsafe_componentwillmount)

#### Bijwerken (Updating) {#updating}

Bijwerken kan veroorzaakt worden door veranderingen in props of state. Deze methoden worden in de volgorde hieronder aangeroepen wanneer de component opnieuw gerenderd wordt:

- [`static getDerivedStateFromProps()`](#static-getderivedstatefromprops)
- [`shouldComponentUpdate()`](#shouldcomponentupdate)
- [**`render()`**](#render)
- [`getSnapshotBeforeUpdate()`](#getsnapshotbeforeupdate)
- [**`componentDidUpdate()`**](#componentdidupdate)

>Opmerking:
>
>De volgende methoden worden als verouderd beschouwd en je moet [ze vermijden](/blog/2018/03/27/update-on-async-rendering.html) in nieuwe code:
>
>- [`UNSAFE_componentWillUpdate()`](#unsafe_componentwillupdate)
>- [`UNSAFE_componentWillReceiveProps()`](#unsafe_componentwillreceiveprops)

#### Afkoppelen (Unmounting) {#unmounting}

Deze medthode wordt aangeroepen wanneer een component uit de DOM verwijderd wordt:

- [**`componentWillUnmount()`**](#componentwillunmount)

#### Fout Afhandeling {#error-handling}

Deze methoden worden aangeroepen wanneer er een fout optreedt tijdens het renderen, in een lifecycle methode, of in de constructor van een child component.

- [`static getDerivedStateFromError()`](#static-getderivedstatefromerror)
- [`componentDidCatch()`](#componentdidcatch)

### Andere APIs {#other-apis}

Iedere component heeft ook APIs anders dan voor de lifecylce:

  - [`setState()`](#setstate)
  - [`forceUpdate()`](#forceupdate)

### Class Properties {#class-properties}

  - [`defaultProps`](#defaultprops)
  - [`displayName`](#displayname)

### Instance Properties {#instance-properties}

  - [`props`](#props)
  - [`state`](#state)

* * *

## Reference {#reference}

### Vaak Gebruikte Lifecycle Methoden {#commonly-used-lifecycle-methods}

De methoden in dit hoofdstuk dekken de grote meerderheid van gevallen die je tegenkomt bij het maken van React componenten. **Bekijk voor een visuele referentie [dit lifecycle diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/).**

### `render()` {#render}

```javascript
render()
```

De `render()` methode is de enige vereiste methode in een class component.

Wanneer hij wordt aangeroepen, zou hij `this.props` en `this.state` moeten bekijken en één van de volgende typen moeten teruggeven:

- **React elementen.** Gebruikelijk aangemaakt met [JSX](/docs/introducing-jsx.html). Bijvoorbeeld, `<div />` en `<MyComponent />` zijn React elementen, die geven React de opdracht geven om respektievelijk een DOM node, of een user-defined component, te renderen.
- **Arrays en fragments.** Laten je meerde elementen teruggeven vanuit render. Bekijk de documentatie over [fragments](/docs/fragments.html) voor meer details.
- **Portals**. Laten je children renderen in een andere DOM subtree. Bekijk de documentatie over [portals](/docs/portals.html) voor meer informatie.
- **String and numbers.** Deze worden gerenderd als tekst nodes in de DOM.
- **Booleans or `null`**. Renderen niets. (Bestaan voornamelijk om het `return test && <Child />` patroon te ondersteunen, waar `test` een boolean is.)

De `render()` functie moet puur zijn, daarmee wordt bedoelt dat hij de state niet aanpast, hij geeft steeds hetzelfde resulaat iedere keer als hij wordt aangeroepen, en heeft geen directe interactie met de browser.

Als je interactie met de browsert nodig hebt, voer je, in plaats daarvan, dat werk uit in `componentDidMount()` of de andere lifecycle methoden. Het puur houden van `render()` maakt componenten eenvoudiger om over na te denken.

> Opmerking
>
> `render()` wordt niet aangeroepen wanneer [`shouldComponentUpdate()`](#shouldcomponentupdate) false teruggeeft.

* * *

### `constructor()` {#constructor}

```javascript
constructor(props)
```

**Als je geen state initialiseert en geen methoden bind hoef je geen constructor te implementeren voor je React component.**

De constructor voor een React component wordt aangeroepen voordat het aangekoppeld (gemount) wordt. Wanneer je de constructor voor een `React.Component` subclass implementeert, moet je `super(props)` aanroepen voor ieder ander statement. Anders zal `this.props` ongedefineerd zijn in de constructor, en dat kan leiden to bugs.

Gewoonlijk worden constructors in React maar om twee redenen gebruikt:

* Het initialiseren van de [lokale state](/docs/state-and-lifecycle.html) door een object toe te wijzen aan `this.state`.
* Het binden van [event handler](/docs/handling-events.html) methoden aan de instance.

Je **moet `setState()` niet aanroepen** in de `constructor()`. In plaats daarvan wijs je, als je component lokale state gebruikt, **de initiële state aan `this.state` toe** meteen in de constructor:

```js
constructor(props) {
  super(props);
  // this.setState() niet aanroepen hier!
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```

De constructor is de enige plek waar je `this.state` direct mag toewijzen. In alle andere methoden moet je in plaats daarvan `this.setState()` gebruiken.

Voorkom het introduceren van neveneffecten of subscriptions in de constructor. Gebruik in plaats daarvan voor die zaken `componentDidMount()`.

>Opmerking
>
>**Voorkom het kopieren van props naar de state! Dit is een veelvoorkomende fout:**
>
>```js
>constructor(props) {
>  super(props);
>  // Niet doen!
>  this.state = { color: props.color };
>}
>```
>
>Het probleem is dat het zowel onnodig is (je kunt `this.props.color` direct gebruiken), als bugs creëert (aanpassingen aan `color` prop worden niet weerspiegeld in de state).
>
>**Gebruik die patroon alleen als je opzettelijk prop aanpassingen wilt negeren.** In dat geval is het zinvol de naam van de prop de wijzigen in `initialColor` of `defaultColor`. Je kunt dan de state van een component indien nodig "resetten" door [zijn `key`] te wijzigen (/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key).
>
>Lees onze [blogpost over het voorkomen van afgeleide state](/blog/2018/06/07/you-probably-dont-need-derived-state.html) om te leren over wat je moet doen als je denk dat je een state nodig hebt die afhangt van de props.


* * *

### `componentDidMount()` {#componentdidmount}

```javascript
componentDidMount()
```

`componentDidMount()` wordt aangeroepen onmiddelijk nadat een component is gemount (toegevoegd aan de boomstructuur). Initialisatie die DOM nodes nodig heeft moet hier komen, Als je data moet inladen van een extern endpoint, is dit een goede plek om het netwerkverzoek te initialiseren.

Deze methode is een goede plaats om subscriptions op te zetten. Als je dat doet, vergeet dan niet dat weer ongedaan te maken in `componentWillUnmount()`.

Je **kunt `setState()` onmiddelijk aanroepen** in `componentDidMount()`. Het zal een extra render starten, maar dat zal gebeuren voordat de browser het scherm bijwerkt. Dit garandeert dat, hoewel de `render()` in dit geval twee keer aangeroepen is, de gebruiker de tussentoestand niet zal zien. Gebruik dit patroon met voorzichtigheid omdat het vaak tot performance problemen kan leiden. In de meeste gevallen zou je in staat moeten zijn om de initiële state toe te wijzen in de `constructor()`. Het kan echter noodzakelijk zijn, voor gevallen zoals modals en tooltips, wanneer je eerst een DOM node moet opmeten, voordat je iets rendert dat afhangt van de grootte of positie ervan.

* * *

### `componentDidUpdate()` {#componentdidupdate}

```javascript
componentDidUpdate(prevProps, prevState, snapshot)
```

`componentDidUpdate()` wordt onmiddelijk aangeroepen nadat een aanpassing plaatsvindt. Deze methode wordt niet aangeroepen voor de initiële render.

Gebruik deze gelegenheid om de DOM te bewerken wanneer de component gewijzigd is. Dit is ook een goede plek om netwerkverzoeken te doen zo lang je de huidge props met de vorige vergelijkt (e.g. een netwerkverzoek is misschien onnodig als de props niet gewijzigd zijn).

```js
componentDidUpdate(prevProps) {
  // Normaal gebruik (vergeet niet de props te vergelijken):
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

Je **kunt `setState()` meteen aanroepen** in `componentDidUpdate()` maar merk op dat **binnen een conditie moet gebeuren** zoals in het voorbeeld hierboven, anders veroorzaak je een oneindige lus. Het zou ook een extra render tot gevolg hebben die, hoewel onzichtbaar voor de gebruiker, wel de performance van de component kan beïnvloeden. Als je probeert een state the spiegelen naar een prop die van boven komt, overweeg dan de prop direct te gebruiken. Lees meer over [waarom het kopiëren van props naar de state tot bugs kan leiden](/blog/2018/06/07/you-probably-dont-need-derived-state.html).

Als je component de `getSnapshotBeforeUpdate()` lifecycle methode implementeert (wat zeldzaam is), zal de waarde die het teruggeeft als derde "snapshot" parameter worden doorgegeven aan `componentDidUpdate()`. Zo niet zal deze parameter ongedefinieerd zijn.

> Opmerking
>
> `componentDidUpdate()` wordt niet aangeroepen als [`shouldComponentUpdate()`](#shouldcomponentupdate) false teruggeeft.

* * *

### `componentWillUnmount()` {#componentwillunmount}

```javascript
componentWillUnmount()
```

`componentWillUnmount()` wordt aangeroepen vlak voor een component wordt ge-unmount en destroyed. Voer alle benodigde opruim-code uit in deze methode, zoals het annuleren van timers, afbreken van netwerkverzoeken, of het ongedaan maken van subscriptions die gemaakt zijn in `componentDidMount()`.

Je **moet `setState()` niet aanroepen** in `componentWillUnmount()` omdat de component nooit opnieuw rendert. Zodra een component instance ge-unmount is, zal deze nooit meer worden ge-mount.

* * *

### Zelden Gebruikte Lifecycle Methoden {#rarely-used-lifecycle-methods}

De methoden in dit hoofdstuk hebben te maken met ongewone gevallen. Ze zijn heel soms handig, maar je meeste componenten hebben ze waarschijnlijk niet nodig. **Je kunt de meeste methoden hieronder zien in [dit lifecycle diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) als je klikt op de "Show less common lifecycles" checkbox bovenaan.**


### `shouldComponentUpdate()` {#shouldcomponentupdate}

```javascript
shouldComponentUpdate(nextProps, nextState)
```

Gerbruik `shouldComponentUpdate()` om React te laten weten of een component zijn output niet beïnvloed wordt door de huidige wijziging van state of props. Het standaardgedrag is om opnieuw te renderen bij iedere state wijziging, en in het merendeel van de gevallen zou je op dit gedrag moeten vertrouwen.

`shouldComponentUpdate()` wordt aangeroepen voor het renderen wanneer nieuwe props of state worden ontvangen. Geeft standaard `true` terug. Deze methode wordt niet aangroepen bij de initiële render of wanneer `forceUpdate()` wordt gebruikt.

Deze methode bestaat alleen als een **[performance optimalisatie](/docs/optimizing-performance.html).** Vertrouw er niet op dat het een render zal "voorkomen", omdat dit tot fouten kan leiden. **Overweeg de ingebouwde [`PureComponent`](/docs/react-api.html#reactpurecomponent)** te gebruiken, in plaats van met de hand een `shouldComponentUpdate()` implementatie te schrijven. `PureComponent` voert shallow vergelijking uit van props en state, en verlaagt de kans dat je een benodigde update mist.

Als je er zeker van bent dat je het met de hand wilt schrijven, kun je `this.props` met `nextProps` en `this.state` met `nextState` vergelijken en `false` teruggeven om React te vertellen dat de update overgeslagen kan worden. Merk op dat `false` teruggeven niet verhindert dat child componenten opnieuw renderen wanner *hun* state wijzigt.

We raden niet aan om `deep equality checks` of `JSON.stringify()` te gebruiken in `shouldComponentUpdate()`. Dat is heel inefficient en zal de performances schaden.

Momenteel worden, wanneer `shouldComponentUpdate()` `false` teruggeeft, [`UNSAFE_componentWillUpdate()`](#unsafe_componentwillupdate), [`render()`](#render), en [`componentDidUpdate()`](#componentdidupdate) niet aangeroepen. In de toekomst behandeld React `shouldComponentUpdate()` mogelijk alleen als een hint in plaats van een strikte opdracht, en kan `false` teruggeven nog steeds resulteren in het opnieuw renderen van de component.

* * *

### `static getDerivedStateFromProps()` {#static-getderivedstatefromprops}

```js
static getDerivedStateFromProps(props, state)
```

`getDerivedStateFromProps` wordt aangeroepen net voor het aanroepen van de render methode, zowel bij de initiële mount als bij de volgende updates. Het moet een object teruggeven om de state bij te werken, of null om niets bij te werken.

Deze methode bestaat voor [zeldzame gevallen](/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state) waar de state afhangt van veranderingen van props in de tijd. Het zou bijvoorbeeld handig kunnen zijn voor het implementeren van een `<Transition>` component dat de vorige en volgende children vergelijkt om te beslissen welke in of uit te animeren.

State afleiden leidt tot veel code en maakt je compnenten moeilijk te begrijpen.  
[Wees er zeker van dat je bekend bent met eenvoudigere alternatieven:](/blog/2018/06/07/you-probably-dont-need-derived-state.html)

* Als je een **neveneffect moet uitvoeren** (bijvoorbeeld, het ophalen van data of een animatiedata) in reactie op een verandering van de props, gebruik dan liever de [`componentDidUpdate`](#componentdidupdate) lifecycle.

* Als je **data wilt herberekenen alleen wanneer een prop wijzigt**, [gebruik dan eerder een memoization helper](/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization).

* Als je **een state wilt "resetten" wanneer een prop wijzigt**, overweeg dan om ofwel een [fully controlled](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) component e maken, of een [fully uncontrolled component met een `key`](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) te maken.

Deze methode heeft geen toegang tot de instantie van de component. Als je wilt, kun je wat code hergebruiken tussen `getDerivedStateFromProps()` en de andere class methoden, door pure functies van de props en state van het component uit de class definitie te halen.

Merk op dat deze methode afgevuurd wordt bij *iedere* render, ongeacht de oorzaak ervan. Dit in tegenstelling tot `UNSAFE_componentWillReceiveProps`, die alleen af gaat als de  parent de re-render veroorzaakt en niet als gevolg van een lokale `setState`.

* * *

### `getSnapshotBeforeUpdate()` {#getsnapshotbeforeupdate}

```javascript
getSnapshotBeforeUpdate(prevProps, prevState)
```

`getSnapshotBeforeUpdate()` wordt aangeroepen vlak voordat de meest recente gerenderde output wordt overhandigd aan bijvoorbeeld de DOM. Het stelt je component in staat om informatie uit de DOM op te vangen (bijvoorbeeld de scroll positie) voordat die eventueel wordt gewijzigd. Elke waarde die door deze lifecycle teruggegeven wordt, zal worden doorgegeven als een parameter naar `componentDidUpdate()`.

Dit geval is niet gebruikelijk, maar kan voorkomen bij UIs die de scroll positie op een speciale manier moeten behandelen, zoals bij chat-threads.

Er moet een snapshot waarde (of `null`) worden teruggegeven.

Bijvoorbeeld:

`embed:react-component-reference/get-snapshot-before-update.js`

In het bovenstaande voorbeeld is het belangrijk om de `scrollHeight` property te lezen in `getSnapshotBeforeUpdate`, omdat er vertragingen kunnen zijn tussen de "render" fase lifecycles (zoals `render`) en "commit" fase lifecycles (zoals `getSnapshotBeforeUpdate` en `componentDidUpdate`).

* * *

### Error boundaries {#error-boundaries}

[Error boundaries](/docs/error-boundaries.html) zijn React componenten die JavaScript fouten afvangen overal in hun child componenten boom, ze loggen deze fouten, en geven een fallback UI weer in plaats van de component die ge-crashed is. Error boundaries vangen fouten af tijdens het renderen, in de lifecycle methoden, en in constructors van de hele boom onder hen.

Een class component wordt een error boundary als het één (of beide) van de lifecycle methoden `static getDerivedStateFromError()` en `componentDidCatch()` implementeert. De state aanpassing vanuit deze lifecycle methoden geeft je de mogelijkheid om een onafgehandelde JavaScript fout af te vangen in de boom er beneden en een fallback UI weer te geven.

Gebruik error boundaries alle om van onverwachte exceptions te herstellen; **probeer ze niet te gebruiken om de flow te besturen.**

Voor meer details, bekijk [*Fout Afhandeling in React 16*](/blog/2017/07/26/error-handling-in-react-16.html).

> Opmerking
> 
> Error boundaries vangen alleen founten af in de components **onder** hen in de boom. Een error boundary kan geen fout in zichzelf afvangen.

### `static getDerivedStateFromError()` {#static-getderivedstatefromerror}
```javascript
static getDerivedStateFromError(error)
```

Deze lifecycle methode wordt aangeroepen nadat er een fout is opgetreden in een descendant component.
Het ontvangt de fout die opgetreden is als een parameter en moet een waarde terug geven om de state mee aan te passen.

```js{7-10,13-16}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Pas de state aan zodat de volgende render de fallback UI toont.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // Je kunt elke aangepaste fallback UI tonen
      return <h1>Er ging iets mis.</h1>;
    }

    return this.props.children; 
  }
}
```

> Opmerking
>
> `getDerivedStateFromError()` wordt aangeroepen tijdens de "render" fase, dus neveneffecten zijn niet toegestaan.
Gebruik voor die gevallen in plaats daarvan `componentDidCatch()`.

* * *

### `componentDidCatch()` {#componentdidcatch}

```javascript
componentDidCatch(error, info)
```

Deze lifecycle methode wordt aangeroepen nadat er een fout is opgetreden door een descendant component.
Het ontvangt twee parameters:

1. `error` - De fout die optrad.
2. `info` - Een object met een `componentStack` veld met [informatie over in welk component de fout optrad](/docs/error-boundaries.html#component-stack-traces).


`componentDidCatch()` wordt aangeroepen gedurende de "commit" fase, dus zijn neveneffecten toegestaan.
Het moet gebruikt worden voor zaken als het loggen van fouten:

```js{12-19}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Pas de state aan zodat de volgende render de fallback UI toont.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Voorbeeld "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    logComponentStackToMyService(info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // Je kunt elke aangepaste fallback UI tonen
      return <h1>Er ging iets mis.</h1>;
    }

    return this.props.children; 
  }
}
```

> Opmerking
> 
> In het geval van een fout kun je een fallback UI renderen met `componentDidCatch()` door `setState` aan te roepen, maar dit zal uitgefaseerd worden in een toekomstige release.
> Gebruik in plaats daarvan `static getDerivedStateFromError()` om een fallback te renderen.

* * *

### Verouderde Lifecycle Methoden {#legacy-lifecycle-methods}

De lifecycle methoden hieronder zijn gemarkeerd als "legacy". Ze werken nog steeds, maar we raden aan om ze niet te gebruiken in nieuwe code. Je kunt meer te weten komen over het migreren van legacy lifecycle methoden in [deze blog](/blog/2018/03/27/update-on-async-rendering.html).

### `UNSAFE_componentWillMount()` {#unsafe_componentwillmount}

```javascript
UNSAFE_componentWillMount()
```

> Opmerking
>
> Deze lifecycle methode heette voorheen `componentWillMount`. Die naam zal blijven werken tot versie 17. Gebruik de [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) om je componenten automatisch bij te werken.

`UNSAFE_componentWillMount()` wordt aangeroepen vlak voordat het mounten plaatsvindt. Het wordt aangeroepen voor `render()`, daarom zal het synchroon aanroepen van `setState()` in deze methode geen extra render veroorzaken. In het algemeen, raden we aan om in plaats daarvan, de `constructor()` te gebruiken om de state te initialiseren.

Voorkom het introduceren van neveneffecten of subscriptions in deze methode. Gebruik in die gevallen in plaats daarvan `componentDidMount()`.

Dit is de enige lifecycle methode die aangeroepen wordt in geval van renderen op een server.

* * *

### `UNSAFE_componentWillReceiveProps()` {#unsafe_componentwillreceiveprops}

```javascript
UNSAFE_componentWillReceiveProps(nextProps)
```

> Opmerking
>
> This lifecycle was previously named `componentWillReceiveProps`. That name will continue to work until version 17. Use the [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) to automatically update your components.

> Opmerking:
>
> Using this lifecycle method often leads to bugs and inconsistencies
>
> * If you need to **perform a side effect** (for example, data fetching or an animation) in response to a change in props, use [`componentDidUpdate`](#componentdidupdate) lifecycle instead.
> * If you used `componentWillReceiveProps` for **re-computing some data only when a prop changes**, [use a memoization helper instead](/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization).
> * If you used `componentWillReceiveProps` to **"reset" some state when a prop changes**, consider either making a component [fully controlled](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) or [fully uncontrolled with a `key`](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) instead.
>
> For other use cases, [follow the recommendations in this blog post about derived state](/blog/2018/06/07/you-probably-dont-need-derived-state.html).

`UNSAFE_componentWillReceiveProps()` is invoked before a mounted component receives new props. If you need to update the state in response to prop changes (for example, to reset it), you may compare `this.props` and `nextProps` and perform state transitions using `this.setState()` in this method.

Note that if a parent component causes your component to re-render, this method will be called even if props have not changed. Make sure to compare the current and next values if you only want to handle changes.

React doesn't call `UNSAFE_componentWillReceiveProps()` with initial props during [mounting](#mounting). It only calls this method if some of component's props may update. Calling `this.setState()` generally doesn't trigger `UNSAFE_componentWillReceiveProps()`.

* * *

### `UNSAFE_componentWillUpdate()` {#unsafe_componentwillupdate}

```javascript
UNSAFE_componentWillUpdate(nextProps, nextState)
```

> Opmerking
>
> This lifecycle was previously named `componentWillUpdate`. That name will continue to work until version 17. Use the [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) to automatically update your components.

`UNSAFE_componentWillUpdate()` is invoked just before rendering when new props or state are being received. Use this as an opportunity to perform preparation before an update occurs. This method is not called for the initial render.

Note that you cannot call `this.setState()` here; nor should you do anything else (e.g. dispatch a Redux action) that would trigger an update to a React component before `UNSAFE_componentWillUpdate()` returns.

Typically, this method can be replaced by `componentDidUpdate()`. If you were reading from the DOM in this method (e.g. to save a scroll position), you can move that logic to `getSnapshotBeforeUpdate()`.

> Opmerking
>
> `UNSAFE_componentWillUpdate()` will not be invoked if [`shouldComponentUpdate()`](#shouldcomponentupdate) returns false.

* * *

## Other APIs {#other-apis-1}

Unlike the lifecycle methods above (which React calls for you), the methods below are the methods *you* can call from your components.

There are just two of them: `setState()` and `forceUpdate()`.

### `setState()` {#setstate}

```javascript
setState(updater, [callback])
```

`setState()` enqueues changes to the component state and tells React that this component and its children need to be re-rendered with the updated state. This is the primary method you use to update the user interface in response to event handlers and server responses.

Think of `setState()` as a *request* rather than an immediate command to update the component. For better perceived performance, React may delay it, and then update several components in a single pass. React does not guarantee that the state changes are applied immediately.

`setState()` does not always immediately update the component. It may batch or defer the update until later. This makes reading `this.state` right after calling `setState()` a potential pitfall. Instead, use `componentDidUpdate` or a `setState` callback (`setState(updater, callback)`), either of which are guaranteed to fire after the update has been applied. If you need to set the state based on the previous state, read about the `updater` argument below.

`setState()` will always lead to a re-render unless `shouldComponentUpdate()` returns `false`. If mutable objects are being used and conditional rendering logic cannot be implemented in `shouldComponentUpdate()`, calling `setState()` only when the new state differs from the previous state will avoid unnecessary re-renders.

The first argument is an `updater` function with the signature:

```javascript
(state, props) => stateChange
```

`state` is a reference to the component state at the time the change is being applied. It should not be directly mutated. Instead, changes should be represented by building a new object based on the input from `state` and `props`. For instance, suppose we wanted to increment a value in state by `props.step`:

```javascript
this.setState((state, props) => {
  return {counter: state.counter + props.step};
});
```

Both `state` and `props` received by the updater function are guaranteed to be up-to-date. The output of the updater is shallowly merged with `state`.

The second parameter to `setState()` is an optional callback function that will be executed once `setState` is completed and the component is re-rendered. Generally we recommend using `componentDidUpdate()` for such logic instead.

You may optionally pass an object as the first argument to `setState()` instead of a function:

```javascript
setState(stateChange[, callback])
```

This performs a shallow merge of `stateChange` into the new state, e.g., to adjust a shopping cart item quantity:

```javascript
this.setState({quantity: 2})
```

This form of `setState()` is also asynchronous, and multiple calls during the same cycle may be batched together. For example, if you attempt to increment an item quantity more than once in the same cycle, that will result in the equivalent of:

```javaScript
Object.assign(
  previousState,
  {quantity: state.quantity + 1},
  {quantity: state.quantity + 1},
  ...
)
```

Subsequent calls will override values from previous calls in the same cycle, so the quantity will only be incremented once. If the next state depends on the current state, we recommend using the updater function form, instead:

```js
this.setState((state) => {
  return {quantity: state.quantity + 1};
});
```

For more detail, see:

* [State and Lifecycle guide](/docs/state-and-lifecycle.html)
* [In depth: When and why are `setState()` calls batched?](https://stackoverflow.com/a/48610973/458193)
* [In depth: Why isn't `this.state` updated immediately?](https://github.com/facebook/react/issues/11527#issuecomment-360199710)

* * *

### `forceUpdate()` {#forceupdate}

```javascript
component.forceUpdate(callback)
```

By default, when your component's state or props change, your component will re-render. If your `render()` method depends on some other data, you can tell React that the component needs re-rendering by calling `forceUpdate()`.

Calling `forceUpdate()` will cause `render()` to be called on the component, skipping `shouldComponentUpdate()`. This will trigger the normal lifecycle methods for child components, including the `shouldComponentUpdate()` method of each child. React will still only update the DOM if the markup changes.

Normally you should try to avoid all uses of `forceUpdate()` and only read from `this.props` and `this.state` in `render()`.

* * *

## Class Properties {#class-properties-1}

### `defaultProps` {#defaultprops}

`defaultProps` kunnen gedefinieerd worden als een property van de component class zelf, om de standaard props waarden voor de class in te stellen. Die worden gebruikt voor undefined props, maar niet voor null props. Bijvoorbeeld:

```js
class CustomButton extends React.Component {
  // ...
}

CustomButton.defaultProps = {
  color: 'blue'
};
```

Als `props.color` niet is meegegeven, wordt hij op default waarde `'blue'` gezet:

```js
  render() {
    return <CustomButton /> ; // props.color will be set to blue
  }
```

Als `props.color` op null gezet wordt, zal hij null blijven:

```js
  render() {
    return <CustomButton color={null} /> ; // props.color zall null blijven
  }
```

* * *

### `displayName` {#displayname}

De string `displayName` wordt gebruikt in debug berichten. Normaal gesproken hoef je deze niet expliciet in te stellen, omdat hij afgeleid wordt van de naam van de functie of class die de component definieert. Mogelijk wil je hem expliciet instellen op een andere naam voor debug-doeleinden, of wanneer je een higher-order component maakt, zie [Wrap de Display Name om Makkelijk te Debuggen](/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging) voor details.

* * *

## Instance Properties {#instance-properties-1}

### `props` {#props}

`this.props` bevat de props die bepaald zijn door de aanroeper (caller) van deze component. Bekijk [Componenten en Props](/docs/components-and-props.html) voor een introductie over props.

In het bijzonder is `this.props.children` een speciale prop, meestal gedefinieerd door de child tags in de JSX-expressie in plaats van in de tag zelf.

### `state` {#state}

De state bevat data specifiek voor deze component die over te tijd kan wijzigen. De state wordt door de gebruiker gedefinieerd, en het moet een gewoon JavaScript object zijn.

Als een bepaalde waarde niet wordt gebruikt voor het renderen of dataflow (bijvoorbeeld, een ID van een timer), hoef je die niet in de state op te nemen. Zulke waarden kun je definiëren als velden op de component instance.

Bekijke [State and Lifecycle](/docs/state-and-lifecycle.html) voor meer informatie over de state.

Pas `this.state` nooit direct aan, omdat een aaroep van `setState()` daarna je aanpassing zou kunnen vervangen. Behandel `this.state` alsof het immutable is.
