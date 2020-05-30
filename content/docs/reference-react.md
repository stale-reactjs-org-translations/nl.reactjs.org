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

Create and return a new [React element](/docs/rendering-elements.html) of the given type. The type argument can be either a tag name string (such as `'div'` or `'span'`), a [React component](/docs/components-and-props.html) type (a class or a function), or a [React fragment](#reactfragment) type.

Code written with [JSX](/docs/introducing-jsx.html) will be converted to use `React.createElement()`. You will not typically invoke `React.createElement()` directly if you are using JSX. See [React Without JSX](/docs/react-without-jsx.html) to learn more.

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

`React.cloneElement()` is almost equivalent to:

```js
<element.type {...element.props} {...props}>{children}</element.type>
```

However, it also preserves `ref`s. This means that if you get a child with a `ref` on it, you won't accidentally steal it from your ancestor. You will get the same `ref` attached to your new element.

This API was introduced as a replacement of the deprecated `React.addons.cloneWithProps()`.

* * *

### `createFactory()` {#createfactory}

```javascript
React.createFactory(type)
```

Return a function that produces React elements of a given type. Like [`React.createElement()`](#createelement), the type argument can be either a tag name string (such as `'div'` or `'span'`), a [React component](/docs/components-and-props.html) type (a class or a function), or a [React fragment](#reactfragment) type.

This helper is considered legacy, and we encourage you to either use JSX or use `React.createElement()` directly instead.

You will not typically invoke `React.createFactory()` directly if you are using JSX. See [React Without JSX](/docs/react-without-jsx.html) to learn more.

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

> Note
>
> If `children` is a `Fragment` it will be treated as a single child and not traversed.

#### `React.Children.forEach` {#reactchildrenforeach}

```javascript
React.Children.forEach(children, function[(thisArg)])
```

Like [`React.Children.map()`](#reactchildrenmap) but does not return an array.

#### `React.Children.count` {#reactchildrencount}

```javascript
React.Children.count(children)
```

Returns the total number of components in `children`, equal to the number of times that a callback passed to `map` or `forEach` would be invoked.

#### `React.Children.only` {#reactchildrenonly}

```javascript
React.Children.only(children)
```

Verifies that `children` has only one child (a React element) and returns it. Otherwise this method throws an error.

> Note:
>
>`React.Children.only()` does not accept the return value of [`React.Children.map()`](#reactchildrenmap) because it is an array rather than a React element.

#### `React.Children.toArray` {#reactchildrentoarray}

```javascript
React.Children.toArray(children)
```

Returns the `children` opaque data structure as a flat array with keys assigned to each child. Useful if you want to manipulate collections of children in your render methods, especially if you want to reorder or slice `this.props.children` before passing it down.

> Note:
>
> `React.Children.toArray()` changes keys to preserve the semantics of nested arrays when flattening lists of children. That is, `toArray` prefixes each key in the returned array so that each element's key is scoped to the input array containing it.

* * *

### `React.Fragment` {#reactfragment}

The `React.Fragment` component lets you return multiple elements in a `render()` method without creating an additional DOM element:

```javascript
render() {
  return (
    <React.Fragment>
      Some text.
      <h2>A heading</h2>
    </React.Fragment>
  );
}
```

You can also use it with the shorthand `<></>` syntax. For more information, see [React v16.2.0: Improved Support for Fragments](/blog/2017/11/28/react-v16.2.0-fragment-support.html).


### `React.createRef` {#reactcreateref}

`React.createRef` creates a [ref](/docs/refs-and-the-dom.html) that can be attached to React elements via the ref attribute.
`embed:16-3-release-blog-post/create-ref-example.js`

### `React.forwardRef` {#reactforwardref}

`React.forwardRef` creates a React component that forwards the [ref](/docs/refs-and-the-dom.html) attribute it receives to another component below in the tree. This technique is not very common but is particularly useful in two scenarios:

* [Forwarding refs to DOM components](/docs/forwarding-refs.html#forwarding-refs-to-dom-components)
* [Forwarding refs in higher-order-components](/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components)

`React.forwardRef` accepts a rendering function as an argument. React will call this function with `props` and `ref` as two arguments. This function should return a React node.

`embed:reference-react-forward-ref.js`

In the above example, React passes a `ref` given to `<FancyButton ref={ref}>` element as a second argument to the rendering function inside the `React.forwardRef` call. This rendering function passes the `ref` to the `<button ref={ref}>` element.

As a result, after React attaches the ref, `ref.current` will point directly to the `<button>` DOM element instance.

For more information, see [forwarding refs](/docs/forwarding-refs.html).

### `React.lazy` {#reactlazy}

`React.lazy()` lets you define a component that is loaded dynamically. This helps reduce the bundle size to delay loading components that aren't used during the initial render.

You can learn how to use it from our [code splitting documentation](/docs/code-splitting.html#reactlazy). You might also want to check out [this article](https://medium.com/@pomber/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d) explaining how to use it in more detail.

```js
// This component is loaded dynamically
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```

Note that rendering `lazy` components requires that there's a `<React.Suspense>` component higher in the rendering tree. This is how you specify a loading indicator.

> **Note**
>
> Using `React.lazy`with dynamic import requires Promises to be available in the JS environment. This requires a polyfill on IE11 and below.

### `React.Suspense` {#reactsuspense}

`React.Suspense` lets you specify the loading indicator in case some components in the tree below it are not yet ready to render. Today, lazy loading components is the **only** use case supported by `<React.Suspense>`:

```js
// This component is loaded dynamically
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // Displays <Spinner> until OtherComponent loads
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```

It is documented in our [code splitting guide](/docs/code-splitting.html#reactlazy). Note that `lazy` components can be deep inside the `Suspense` tree -- it doesn't have to wrap every one of them. The best practice is to place `<Suspense>` where you want to see a loading indicator, but to use `lazy()` wherever you want to do code splitting.

While this is not supported today, in the future we plan to let `Suspense` handle more scenarios such as data fetching. You can read about this in [our roadmap](/blog/2018/11/27/react-16-roadmap.html).

>Note:
>
>`React.lazy()` and `<React.Suspense>` are not yet supported by `ReactDOMServer`. This is a known limitation that will be resolved in the future.
