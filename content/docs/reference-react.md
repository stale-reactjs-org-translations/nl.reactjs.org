---
id: react-api
title: React Top-Level API
layout: docs
category: Reference
permalink: docs/react-api.html
redirect_from:
  - "docs/reference.html"
  - "docs/clone-with-props.html"
  - "docs/top-level-api.html"
  - "docs/top-level-api-ja-JP.html"
  - "docs/top-level-api-ko-KR.html"
  - "docs/top-level-api-zh-CN.html"
---

`React` is het toegangspunt to de React bibliotheek. Als je React laad met een `<script>` tag, zijn deze top-level APIs beschikbaar op de `React` global. Als je ES6 begruikt met npm, kun je `import React from 'react'` schrijven. Als je ES5 gebruikt met npm, kun je `var React = require('react')` schrijven.

## Overzicht {#overview}

### Componenten {#components}

Met React componenten kun je de UI opsplitsen in onafhankelijke, herbruikbare stukken, en over elk stuk afzonderlijk nadenken. React componenten kunnen worden gedefinieerd door subclasses van `React.Component` of `React.PureComponent` te maken.

 - [`React.Component`](#reactcomponent)
 - [`React.PureComponent`](#reactpurecomponent)

Als je geen ES6 classes gebruikt, kun je in plaats daarvan de `create-react-class` module gebruiken. Zie [Gebruik React zonder ES6](/docs/react-without-es6.html) voor meer informatie.

React componenten kunnen ook worden gedefinieerd als functies die ge-wrapped kunnen worden:

- [`React.memo`](#reactmemo)

### React Elements Maken {#creating-react-elements}

We raden aan om [JSX te gebruiken](/docs/introducing-jsx.html) om te beschrijven hoe je UI er uit moet zien. Elk JSX element is slechts syntactic sugar voor het aanroepen van [`React.createElement()`](#createelement). Normaal gesproken zul je de volgende methoden niet aanroepen als je JSX gebruikt.

- [`createElement()`](#createelement)
- [`createFactory()`](#createfactory)

Zie [React zonder JSX gebruiken](/docs/react-without-jsx.html) voor meer informatie.

### Elementen Transformeren {#transforming-elements}

`React` biedt een aantal APIs om elementen te manipuleren:

- [`cloneElement()`](#cloneelement)
- [`isValidElement()`](#isvalidelement)
- [`React.Children`](#reactchildren)

### Fragments {#fragments}

`React` biedt ook een component om meerdere elementen zonder wrapper te renderen.

- [`React.Fragment`](#reactfragment)

### Refs {#refs}

- [`React.createRef`](#reactcreateref)
- [`React.forwardRef`](#reactforwardref)

### Suspense {#suspense}

Suspense laat componenten op iets "wachten" voor het renderen. Op dit moment ondersteunt Suspense maar een geval: [het dynamisch laden van componenten met `React.lazy`](/docs/code-splitting.html#reactlazy). In de toekomst zal het ook andere gevallen, zoals het ophalen van data, ondersteunen.

- [`React.lazy`](#reactlazy)
- [`React.Suspense`](#reactsuspense)

### Hooks {#hooks}

*Hooks* zijn nieuw toevoegd in React 16.8. Ze laten ons state en andere React eigenschappen gebruiken zonder class te schrijven. Hooks hebben een [speciale sectie in de docs](/docs/hooks-intro.html) en een separate API reference:

- [Basis Hooks](/docs/hooks-reference.html#basic-hooks)
  - [`useState`](/docs/hooks-reference.html#usestate)
  - [`useEffect`](/docs/hooks-reference.html#useeffect)
  - [`useContext`](/docs/hooks-reference.html#usecontext)
- [Overige Hooks](/docs/hooks-reference.html#additional-hooks)
  - [`useReducer`](/docs/hooks-reference.html#usereducer)
  - [`useCallback`](/docs/hooks-reference.html#usecallback)
  - [`useMemo`](/docs/hooks-reference.html#usememo)
  - [`useRef`](/docs/hooks-reference.html#useref)
  - [`useImperativeHandle`](/docs/hooks-reference.html#useimperativehandle)
  - [`useLayoutEffect`](/docs/hooks-reference.html#uselayouteffect)
  - [`useDebugValue`](/docs/hooks-reference.html#usedebugvalue)

* * *

## Reference {#reference}

### `React.Component` {#reactcomponent}

`React.Component` is de basis class voor React componenten als ze gedefinieerd worden met [ES6 classes](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes):

```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Hallo, {this.props.name}</h1>;
  }
}
```

Bekijk de [React.Component API Reference](/docs/react-component.html) voor een lijst van methoden en properties met betrekking tot de `React.Component` class.

* * *

### `React.PureComponent` {#reactpurecomponent}

`React.PureComponent` is vergelijkbaar met [`React.Component`](#reactcomponent). Het verschil tussen de twee is dat [`React.Component`](#reactcomponent) [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate) niet implementeert, maar `React.PureComponent` het implementeert met een ondiepe (shallow) prop and state vergelijking.

Als jouw React compnent zijn `render()` functie hetzelfde resultaat rendert voor een gegeven props en state kun je `React.PureComponent` gebruiken, voor een prestatieboost in sommige gevallen.

> Opmerking
>
> `React.PureComponent` zijn `shouldComponentUpdate()` vergelijkt de objecten alleen oppervlakkig. Als ze complexe datastructuren bevatten kan dat vals-negatieven opleveren voor diepere verschillen. Breid `PureComponent` alleen uit als je verwacht dat je eenvoudige props en state zult hebben, of gebruik [`forceUpdate()`](/docs/react-component.html#forceupdate) als je weet dat diepe datastructuren veranderd zijn. Of overweeg [immutable objects](https://facebook.github.io/immutable-js/) te gebruiken om snelle vergelijkingen van geneste data te faciliteren.
>
> Daarbovenop, slaat `React.PureComponent` zijn `shouldComponentUpdate()` prop aanpassingen over voor de gehele componenten subtree. Zorg ervoor dat alle child componenten ook "puur" zijn.

* * *

### `React.memo` {#reactmemo}

```javascript
const MyComponent = React.memo(function MyComponent(props) {
  /* render met props */
});
```

`React.memo` is een [hogere orde component](/docs/higher-order-components.html). Het is vergelijkbaar met [`React.PureComponent`](#reactpurecomponent) maar dan voor functie componenten in plaats van voor class componenten.

Als je functie component hetzelde resultaat rendert gegeven dezelfde props, kun je deze inpakken met een aanroep naar `React.memo` om in sommige gevallen een prestatieboost te bereiken door het resultaat te memoriseren. Dat betekent dat React het renderen van de component zal overslaan en het laatst gerenderde resultaat zal gebruikten.

`React.memo` controleert alleen op prop veranderingen. Als je functie component ingepakt in in `React.memo` een [`useState`](/docs/hooks-state.html) of een [`useContext`](/docs/hooks-reference.html#usecontext) Hook heeft in zijn implementatie zal het nog steeds opnieuw renderen als de state of de context veranderen.

Standaard zal het complexe objecten in het props object alleen oppervlakkig vergelijken. Als je controle wilt over de vergelijking kun je ook een aangepaste vergelijkingsfunctie meegegeven als het tweede argument.

```javascript
function MyComponent(props) {
  /* render met props */
}
function areEqual(prevProps, nextProps) {
  /*
  geef `true` terug als nextProps doorgeven aan
  render hetzelfde resultaat zou geven als het 
  doorgeven van prevProps aan render,
  geef `false` als dat niet zo is.
  */
}
export default React.memo(MyComponent, areEqual);
```

Deze methode bestaat alleen als een **[prestatieoptimalisatie](/docs/optimizing-performance.html).** Vertrouw hier niet op om een render te voorkomen, omdat dit fouten kan veroorzaken.

> Opmerking
>
> In tegenstelling tot de [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate) methode op class componenten, geeft de `areEqual` functie `true` terug als de props gelijk zijn en `false` als de props gelijk zijn. Dit is het omgekeerde van bij `shouldComponentUpdate`.

* * *

### `createElement()` {#createelement}

```javascript
React.createElement(
  type,
  [props],
  [...children]
)
```

Creëert en retourneert een nieuw [React element](/docs/rendering-elements.html) van het gegeven type. Het type argument kan ofwel de naam van een tag zijn (zoals `'div'` of `'span'`), een [React component](/docs/components-and-props.html)-type (een class of een functie), of een [React fragment](#reactfragment)-type.

Code geschreven met [JSX](/docs/introducing-jsx.html) wordt omgezet zodat het `React.createElement()` gebruikt. Normaal gesproken roep je `React.createElement()` niet direct aan als je JSX gebruikt. Zie [React zonder JSX](/docs/react-without-jsx.html) om hier meer over te leren.

* * *

### `cloneElement()` {#cloneelement}

```
React.cloneElement(
  element,
  [props],
  [...children]
)
```

Clone and return a new React element using `element` as the starting point. The resulting element will have the original element's props with the new props merged in shallowly. New children will replace existing children. `key` and `ref` from the original element will be preserved.

`React.cloneElement()` is bijna equivalent aan:

```js
<element.type {...element.props} {...props}>{children}</element.type>
```

However, it also preserves `ref`s. This means that if you get a child with a `ref` on it, you won't accidentally steal it from your ancestor. You will get the same `ref` attached to your new element.

Deze API werd geïntroduceerd als een vervanging van het verouderde `React.addons.cloneWithProps()`.

* * *

### `createFactory()` {#createfactory}

```javascript
React.createFactory(type)
```

Return a function that produces React elements of a given type. Like [`React.createElement()`](#createelement), the type argument can be either a tag name string (such as `'div'` or `'span'`), a [React component](/docs/components-and-props.html) type (a class or a function), or a [React fragment](#reactfragment) type.

Deze helper wordt als erfenis beschouwd en we raden je aan om in plaats hiervan ofwel JSX danwel rechtstreeks `React.createElement()` te gebruiken.

Je zal, normaal gesproken, `React.createFactory()` niet direct aanroepen als je JSX gebruikt. Zie [React zonder JSX](/docs/react-without-jsx.html) voor meer informatie.

* * *

### `isValidElement()` {#isvalidelement}

```javascript
React.isValidElement(object)
```

Verifies the object is a React element. Returns `true` or `false`.

* * *

### `React.Children` {#reactchildren}

`React.Children` provides utilities for dealing with the `this.props.children` opaque data structure.

#### `React.Children.map` {#reactchildrenmap}

```javascript
React.Children.map(children, function[(thisArg)])
```

Invokes a function on every immediate child contained within `children` with `this` set to `thisArg`. If `children` is an array it will be traversed and the function will be called for each child in the array. If children is `null` or `undefined`, this method will return `null` or `undefined` rather than an array.

> Opmerking
>
> Als `children` een `Fragment` is zal het als een enkel child worden behandeld en niet doorlopen worden.

#### `React.Children.forEach` {#reactchildrenforeach}

```javascript
React.Children.forEach(children, function[(thisArg)])
```

Hetzelfde als [`React.Children.map()`](#reactchildrenmap) maar geeft geen array terug.

#### `React.Children.count` {#reactchildrencount}

```javascript
React.Children.count(children)
```

Geeft het totale aantal componenten in `children`, gelijk aan het aantal keren dat een callback die aan `map` of `forEach` zou worden aangeroepen.

#### `React.Children.only` {#reactchildrenonly}

```javascript
React.Children.only(children)
```

Controleert dat `children` maar één child heeft (een React element) en geeft dat terug. Zo niet wordt er een fout gegenereerd.

> Opmerking:
>
>`React.Children.only()` accepteert niet we waarde teruggegeven door [`React.Children.map()`](#reactchildrenmap) omdat dat een array is in plaats van een React element.

#### `React.Children.toArray` {#reactchildrentoarray}

```javascript
React.Children.toArray(children)
```

Geeft de ondoorzichtige datastructuur `children` door als een platte array met sleutels toegewezen aan elk child. Handig als je collecties van children wilt manipuleren in je render-methoden, in het bijzonder als je `this.props.children` opnieuw wilt ordenen of ze op wilt delen voor je ze naar beneden doorgeeft.

> Opmerking:
>
> `React.Children.toArray()` wijzigt sleutels om de semantiek te behouden van geneste arrays terwijl de lijst van children plat wordt gemaakt. Dat wil zeggen, `toArray` voegt een prefix toe aan elke sleutel in de geretourneerde array, zodat de sleutel van elk element zich uitstrekt tot de invoerarray die deze bevat.

* * *

### `React.Fragment` {#reactfragment}

De `React.Fragment` component maakt het mogelijk dat je meerdere elementen kunt retourneren vanuit een `render()` methode, zonder een extra DOM-element te maken:

```javascript
render() {
  return (
    <React.Fragment>
      Wat tekst.
      <h2>Een kop</h2>
    </React.Fragment>
  );
}
```

Je kunt het ook gebruiken met kortschrift syntax `<></>`. Voor meer informatie, zie [React v16.2.0: Improved Support for Fragments](/blog/2017/11/28/react-v16.2.0-fragment-support.html).


### `React.createRef` {#reactcreateref}

`React.createRef` creëert een [ref](/docs/refs-and-the-dom.html) die verbonden kan worden met React elementen via het ref attribuut.
`embed:16-3-release-blog-post/create-ref-example.js`

### `React.forwardRef` {#reactforwardref}

`React.forwardRef` creëert een React component die het [ref](/docs/refs-and-the-dom.html) attribuut doorstuurd die het ontvangt naar een ander component eronder in de hiërarchie. Deze techniek wordt niet vaak gebruikt maar is bepaald handig in twee scenarios:

* [Doorsturen van refs naar DOM-componenten](/docs/forwarding-refs.html#forwarding-refs-to-dom-components)
* [Doorsuren van refs in higher-order-componenten](/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components)

`React.forwardRef` accepteert een render-functie als argument. React zal deze functie aanroepen met `props` en `ref` als de twee argumenten. De functie zou een React-node terug moeten geven.

`embed:reference-react-forward-ref.js`

In het bovenstaande voorbeeld geeft React een `ref` dat gegeven is aan het `<FancyButton ref={ref}>` element door als een tweede argument naar de render-function binnen de `React.forwardRef` aanroep. Deze render-functie geeft de `ref` door aan het `<button ref={ref}>` element.

Als resultaat - nadat React de ref verbindt - zal `ref.current` direct wijzen naar de `<button>`-DOM-element instantie.

Voor meer informatie, zie [forwarding refs](/docs/forwarding-refs.html).

### `React.lazy` {#reactlazy}

`React.lazy()` laat je een component definiëren dat dynamisch wordt geladen. Dit helpt de bundel-grootte te te reduceren door het laden van componenten uit te stellen die niet gebruikt worden tijdens de initiële render.

Je kunt leren hoe het te gebruiken in onze [code-split documentatie](/docs/code-splitting.html#reactlazy). Misschien wil je ook [dit artikel](https://medium.com/@pomber/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d) bekijken dat in meer detail uitlegt hoe het te gebruiken.

```js
// Deze component wordt dynamisch geladen
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```

Merk op dat het renderen van `lazy` componenten vereist dat er een `<React.Suspense>` component hoger in de render-hiërarchie is. Dat is hoe je een loading-indicator specificeert.

> **Opmerking**
>
> `React.lazy` gebruiken met dynamische import vereist het dat Promises beschikbaar zijn in de JS omgeving. Dit vereist een polyfill op IE11 en lager.

### `React.Suspense` {#reactsuspense}

`React.Suspense` maakt laat je loading-indicator specificeren voor het geval dat sommige componenten in de hiërarchie nog niet klaar zijn om gerenderd te worden. Op dit moment is het lazy-loaden van componenten de **enige** use case die ondersteund wordt door `<React.Suspense>`:

```js
// Deze component wordt dynamisch ingeladen
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // Toont <Spinner> totdat OtherComponent geladen is
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```

Het is gedocumenteerd in onze [code-splits-gids](/docs/code-splitting.html#reactlazy). Merk op dat `lazy` componenten diep binnen de `Suspense`-tree kunnen zitten -- hij hoeft niet om elke component apart heen. De beste werkwijze is om `<Suspense>` te plaatsen waar je een loading-indicator wilt zien, maar gebruik `lazy()` wanneer je code overal waar je code wilt splitsen.

Hoewel is nu nog niet ondesteund wordt hebben we het plan om in de toekomst `Suspense` meer scenarios te laten afhandelen, zoals data-fetching. Je kunt hierover lezen in [onze roadmap](/blog/2018/11/27/react-16-roadmap.html).

>Opmerking:
>
>`React.lazy()` en `<React.Suspense>` worden nog niet ondersteund door `ReactDOMServer`. Deze tekortkoming is bekend en zal in de toekomst opgelost worden
