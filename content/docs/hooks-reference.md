---
id: hooks-reference
title: Hooks API Reference
permalink: docs/hooks-reference.html
prev: hooks-custom.html
next: hooks-faq.html
---

*Hooks* zijn een nieuwe toevoeging in React 16.8. Ze maken het mogelijk om state en andere React voorzieningen te gebruiken zonder dat je een class hoeft te schrijven.

Deze pagina beschrijft de APIs voor de ingebouwde Hooks in React.

Als Hooks nieuw voor je zijn, wil je misschien liever eerst [het overzicht](/docs/hooks-overview.html) bekijken. Je kunt ook nuttige informatie vinden in het hoofdstuk [veel gestelde vragen](/docs/hooks-faq.html).

- [Basis Hooks](#basic-hooks)
  - [`useState`](#usestate)
  - [`useEffect`](#useeffect)
  - [`useContext`](#usecontext)
- [Overige Hooks](#additional-hooks)
  - [`useReducer`](#usereducer)
  - [`useCallback`](#usecallback)
  - [`useMemo`](#usememo)
  - [`useRef`](#useref)
  - [`useImperativeHandle`](#useimperativehandle)
  - [`useLayoutEffect`](#uselayouteffect)
  - [`useDebugValue`](#usedebugvalue)

## Basis Hooks {#basic-hooks}

### `useState` {#usestate}

```js
const [state, setState] = useState(initialState);
```

Retourneert een toestandswaarde, en een funtie om deze te wijzigen.

Tijdens de eerste render, heeft de teruggegeven state (`state`) dezelfde waarde als die is meegegeven als het eerste argument (`initialState`).

De `setState` functie wordt gebruikt om state aan te passen. Hij accepteert een nieuwe state waarde en plaatst een re-render opdracht van het component in de wachtrij.

```js
setState(newState);
```

Tijdens daarop volgende re-renders, zal de eerste waarde die wordt teruggegeven door `useState` altijd de meest recente state zijn na het uitvoeren van wijzigingen.

>Note
>
>React guarantees that `setState` function identity is stable and won't change on re-renders. This is why it's safe to omit from the `useEffect` or `useCallback` dependency list.

#### Functie wijziginen {#functional-updates}

Als de nieuwe state wordt berekend waarbij de vorige state gebruikt, kun je een funtie doorgeven aan `setState`. De functie zal de vorige waarde ontvangen, en de gewijzigde waarde terug geven. Hier is een voorbeeld van een counter component die beide vormen van `setState` gebruikt:

```js
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
```

De "+" and "-" knoppen gebruiken de funtie vorm, omdat de gewijzigde waarde gebaseerd is op de vorige waarde. Maar de "Reset" knop gebruikt de normale vorm, omdat die altijd count terug op 0 zet.

If your update function returns the exact same value as the current state, the subsequent rerender will be skipped completely.

> Opmerking
>
> In tegenstelling tot de `setState` methode in class componenten, `useState` does not automatically merge update objects. You can replicate this behavior by combining the function updater form with object spread syntax:
>
> ```js
> setState(prevState => {
>   // Object.assign zou ook werken
>   return {...prevState, ...updatedValues};
> });
> ```
>
> Een andere mogelijkheid is `useReducer`, die is beter geschikt om state objecten te beheren die meerdere sub-waarden bevatten.

#### Lazy initiele state {#lazy-initial-state}

Het `initialState` argument is de state die tijdens de initiele render gebruikt wordt. In daarop volgende renders, wordt het genegeerd. Als de initiele state het resultaat is van een dure berekening, kan je in plaats van de waarde, een functie meegeven, die zal alleen gedurende de initiele render worden uitgevoerd:

```js
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

#### Afbreken van een state wijziging {#bailing-out-of-a-state-update}

Als je een wijzigt State Hook naar dezelfde waarde als de huidige state, zal React afbreken zonder de children te renderen of effects af te vuren. (React gebruikt het [`Object.is` vergelijkings algoritme](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description).)

Note that React may still need to render that specific component again before bailing out. That shouldn't be a concern because React won't unnecessarily go "deeper" into the tree. If you're doing expensive calculations while rendering, you can optimize them with `useMemo`.

### `useEffect` {#useeffect}

```js
useEffect(didUpdate);
```

Accepteert een functie die imperatieve, mogelijk effectvolle code bevat.

Mutaties, subscriptions, timers, logging, en andere neveneffecten zijn niet toegestaan binnen de main body van een functie component (ook wel React's _render phase_). Als je dat wel doet, zal dat leiden tot verwarrende bugs en inconsistenties in de UI.

In plaats daarvan, gebruik je `useEffect`. De functie meegegeven naar `useEffect` zal uitgevoerd worden nadat de render naar het scherm is gestuurd. Denk aan effecten als een ontsnappingsluik uit Reacts pure functionele wereld naar de imperatieve wereld.

Standaard, worden effecten uitgevoerd na elke afgeronde render, maar je kunt ervoor kiezen ze alleen af te vuren [als er bepaalde waarden wijzigen](#conditionally-firing-an-effect).

#### Een effect opruimen {#cleaning-up-an-effect}

Vaak creëeren effecten resources die opgeruimd moeten worden voordat het component het scherm verlaat, zoals een subscription of een timer ID. Om dit te doen kan de functie die naar  `useEffect` gestuurd wordt een opruim-functie teruggeven. Bijvoorbeeld, om een subscription te creëeren:

```js
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // De subscription opruimen
    subscription.unsubscribe();
  };
});
```

De opruim-functie wordt uitgevoerd voordat het component wordt verwijderd uit de UI om geheugen lekken te voorkomen. Daarnaast, als een component meerdere keren rendert (zoals ze vaak doen), wordt het **vorige effect opgeruimd voor het uitvoeren van het volgende effect**. In ons voorbeeld, betekent dit, dat er een nieuwe subscription wordt aangemaakt bij iedere wijziging. Om te voorkomen dat een effect wordt afgevuurd bij iedere wijziging, lees het volgende hoofdstuk.

#### Timing van effecten {#timing-of-effects}

In tegenstelling tot `componentDidMount` en `componentDidUpdate`, wordt de functie meegegeven naar `useEffect` afgevuurd **na** layout en paint, tijdens een uitgesteld event. Dit maakt het geschikt voor veel veelvoorkomende neven effecten, zoals het opzetten van subscriptions en event handlers, omdat de meeste typen werk de browser niet zouden moeten blokkeren het scherm bij te werken.

Hoewel, niet alle effecten kunnen worden uitgesteld. Bijvoorbeeld, een DOM wijziging die zichtbaar is voor de gebruiker moet synchroon uitgevoerd worden voor de volgende paint, zodat de gebruiker geen visuele inconsistentie waarneemt. (Het verschil is conceptueel vergelijkbaar met passieve versus actieve event listeners.) Voor deze typen van effecten, voorziet React een aanvullende Hook [`useLayoutEffect`](#uselayouteffect). Het heeft dezelfde signature als `useEffect`, en verschilt alleen in wanneer het wordt afgevuurd.

Hoewel `useEffect` wordt uitgesteld tot nadat de browser heeft gepaint, wordt ze gegarandeerd uitgevoerd vóór een eventuele nieuwe render. React zal altijd vorige render effecten opruimen voordat een nieuwe update wordt gestart.

#### Conditioneel afvuren van effecten {#conditionally-firing-an-effect}

Het standaard gedrag van effecten is om afgevuurd te worden na elke afgeronde render. Op die manier wordt een effect altijd opnieuw gemaakt als een van zijn dependencies wijzigt.

Dit kan echter in sommige gevallen een overkill zijn, zoals in het subscription voorbeeld uit het vorige hoofdstuk. We hoeven geen nieuwe subscription aan te maken bij elke wijziging, alleen wanneer de `source` props wijzigt.

Om dit te realiseren, geef je een tweede argument mee aan `useEffect` dat is de array van waarden waarvan het effect afhangt. Ons aangepaste voorbeeld ziet er nu zo uit:

```js
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],
);
```

Nu wordt de subscription alleen opnieuw aangemaakt als `props.source` wijzigt.

>Note
>
>If you use this optimization, make sure the array includes **all values from the component scope (such as props and state) that change over time and that are used by the effect**. Otherwise, your code will reference stale values from previous renders. Learn more about [how to deal with functions](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) and what to do when the [array values change too often](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often).
>
>If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array (`[]`) as a second argument. This tells React that your effect doesn't depend on *any* values from props or state, so it never needs to re-run. This isn't handled as a special case -- it follows directly from how the dependencies array always works.
>
>If you pass an empty array (`[]`), the props and state inside the effect will always have their initial values. While passing `[]` as the second argument is closer to the familiar `componentDidMount` and `componentWillUnmount` mental model, there are usually [better](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) [solutions](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often) to avoid re-running effects too often. Also, don't forget that React defers running `useEffect` until after the browser has painted, so doing extra work is less of a problem.
>
>
>We recommend using the [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) rule as part of our [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) package. It warns when dependencies are specified incorrectly and suggests a fix.

De array van dependencies wordt niet als argument doorgegeven aan de effect functie. Conceptueel, echter, is dat wèl wat ze voorstellen: iedere waarde waarnaar wordt gerefereerd binnenin de effect functie zou ook moeten voorkomen in de dependencies array. In de toekomst zou een geavanceerde compiler deze array automatisch kunnen genereren.

### `useContext` {#usecontext}

```js
const value = useContext(MyContext);
```

Accepteert een context object (een value verkregen van `React.createContext`) en geeft de huidige context waarde voor die context. De huidige waarde wordt bepaald door de `value` prop van de dichtstbijzijnde `<MyContext.Provider>` boven de aanroepende component in de hiërarchie.

When the nearest `<MyContext.Provider>` above the component updates, this Hook will trigger a rerender with the latest context `value` passed to that `MyContext` provider. Even if an ancestor uses [`React.memo`](/docs/react-api.html#reactmemo) or [`shouldComponentUpdate`](/docs/react-component.html#shouldcomponentupdate), a rerender will still happen starting at the component itself using `useContext`.

Don't forget that the argument to `useContext` must be the *context object itself*:

 * **Correct:** `useContext(MyContext)`
 * **Incorrect:** `useContext(MyContext.Consumer)`
 * **Incorrect:** `useContext(MyContext.Provider)`

A component calling `useContext` will always re-render when the context value changes. If re-rendering the component is expensive, you can [optimize it by using memoization](https://github.com/facebook/react/issues/15156#issuecomment-474590693).

>Tip
>
>If you're familiar with the context API before Hooks, `useContext(MyContext)` is equivalent to `static contextType = MyContext` in a class, or to `<MyContext.Consumer>`.
>
>`useContext(MyContext)` only lets you *read* the context and subscribe to its changes. You still need a `<MyContext.Provider>` above in the tree to *provide* the value for this context.

**Putting it together with Context.Provider**
```js{31-36}
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```
This example is modified for hooks from a previous example in the [Context Advanced Guide](/docs/context.html), where you can find more information about when and how to use Context.

## Overige Hooks {#additional-hooks}

De volgende Hooks zijn ofwel varianten op de basis Hooks uit het vorige hoofdstuk, of zijn alleen in heel specifieke gevallen nodig. Don't stress about learning them up front. Doe niet te veel moeit om ze meteen al te leren.

### `useReducer` {#usereducer}

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

Een alternatief voor [`useState`](#usestate). Accepts a reducer of type `(state, action) => newState`, and returns the current state paired with a `dispatch` method. (If you're familiar with Redux, you already know how this works.)

`useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. `useReducer` also lets you optimize performance for components that trigger deep updates because [you can pass `dispatch` down instead of callbacks](/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down).

Hier is het counter voorbeeld uit het [`useState`](#usestate) hoofdstuk, herschreven om een reducer te gebruiken:

```js
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

>Note
>
>React guarantees that `dispatch` function identity is stable and won't change on re-renders. This is why it's safe to omit from the `useEffect` or `useCallback` dependency list.

#### Initiele state {#specifying-the-initial-state}

Er zijn twee verschillende manieren om de `useReducer` state te initialiseren. Je kan uit beide kiezen afhangend van de use case. De simpelste manier is om de initiele state door te geven als het tweede argument:

```js{3}
  const [state, dispatch] = useReducer(
    reducer,
    {count: initialCount}
  );
```

>Opmerking
>
>React doesn’t use the `state = initialState` argument convention popularized by Redux. The initial value sometimes needs to depend on props and so is specified from the Hook call instead. If you feel strongly about this, you can call `useReducer(reducer, undefined, reducer)` to emulate the Redux behavior, maar het wordt niet aangemoedigd.

#### Lazy initialization {#lazy-initialization}

You can also create the initial state lazily. To do this, you can pass an `init` function as the third argument. The initial state will be set to `init(initialArg)`.

It lets you extract the logic for calculating the initial state outside the reducer. This is also handy for resetting the state later in response to an action:

```js{1-3,11-12,19,24}
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

#### Bailing out of a dispatch {#bailing-out-of-a-dispatch}

If you return the same value from a Reducer Hook as the current state, React will bail out without rendering the children or firing effects. (React uses the [`Object.is` comparison algorithm](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description).)

Note that React may still need to render that specific component again before bailing out. That shouldn't be a concern because React won't unnecessarily go "deeper" into the tree. If you're doing expensive calculations while rendering, you can optimize them with `useMemo`.

### `useCallback` {#usecallback}

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

Returns a [memoized](https://en.wikipedia.org/wiki/Memoization) callback.

Pass an inline callback and an array of dependencies. `useCallback` will return a memoized version of the callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. `shouldComponentUpdate`).

`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.

> Note
>
> The array of dependencies is not passed as arguments to the callback. Conceptually, though, that's what they represent: every value referenced inside the callback should also appear in the dependencies array. In the future, a sufficiently advanced compiler could create this array automatically.
>
> We recommend using the [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) rule as part of our [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) package. It warns when dependencies are specified incorrectly and suggests a fix.

### `useMemo` {#usememo}

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

Returns a [memoized](https://en.wikipedia.org/wiki/Memoization) value.

Pass a "create" function and an array of dependencies. `useMemo` will only recompute the memoized value when one of the dependencies has changed. This optimization helps to avoid expensive calculations on every render.

Remember that the function passed to `useMemo` runs during rendering. Don't do anything there that you wouldn't normally do while rendering. For example, side effects belong in `useEffect`, not `useMemo`.

If no array is provided, a new value will be computed on every render.

**You may rely on `useMemo` as a performance optimization, not as a semantic guarantee.** In the future, React may choose to "forget" some previously memoized values and recalculate them on next render, e.g. to free memory for offscreen components. Write your code so that it still works without `useMemo` — and then add it to optimize performance.

> Note
>
> The array of dependencies is not passed as arguments to the function. Conceptually, though, that's what they represent: every value referenced inside the function should also appear in the dependencies array. In the future, a sufficiently advanced compiler could create this array automatically.
>
> We recommend using the [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) rule as part of our [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) package. It warns when dependencies are specified incorrectly and suggests a fix.

### `useRef` {#useref}

```js
const refContainer = useRef(initialValue);
```

`useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument (`initialValue`). The returned object will persist for the full lifetime of the component.

A common use case is to access a child imperatively:

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

Essentially, `useRef` is like a "box" that can hold a mutable value in its `.current` property.

You might be familiar with refs primarily as a way to [access the DOM](/docs/refs-and-the-dom.html). If you pass a ref object to React with `<div ref={myRef} />`, React will set its `.current` property to the corresponding DOM node whenever that node changes.

However, `useRef()` is useful for more than the `ref` attribute. It's [handy for keeping any mutable value around](/docs/hooks-faq.html#is-there-something-like-instance-variables) similar to how you'd use instance fields in classes.

This works because `useRef()` creates a plain JavaScript object. The only difference between `useRef()` and creating a `{current: ...}` object yourself is that `useRef` will give you the same ref object on every render.

Keep in mind that `useRef` *doesn't* notify you when its content changes. Mutating the `.current` property doesn't cause a re-render. If you want to run some code when React attaches or detaches a ref to a DOM node, you may want to use a [callback ref](/docs/hooks-faq.html#how-can-i-measure-a-dom-node) instead.


### `useImperativeHandle` {#useimperativehandle}

```js
useImperativeHandle(ref, createHandle, [deps])
```

`useImperativeHandle` customizes the instance value that is exposed to parent components when using `ref`. As always, imperative code using refs should be avoided in most cases. `useImperativeHandle` should be used with [`forwardRef`](/docs/react-api.html#reactforwardref):

```js
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

In this example, a parent component that renders `<FancyInput ref={inputRef} />` would be able to call `inputRef.current.focus()`.

### `useLayoutEffect` {#uselayouteffect}

The signature is identical to `useEffect`, but it fires synchronously after all DOM mutations. Use this to read layout from the DOM and synchronously re-render. Updates scheduled inside `useLayoutEffect` will be flushed synchronously, before the browser has a chance to paint.

Prefer the standard `useEffect` when possible to avoid blocking visual updates.

> Tip
>
> If you're migrating code from a class component, note `useLayoutEffect` fires in the same phase as `componentDidMount` and `componentDidUpdate`. However, **we recommend starting with `useEffect` first** and only trying `useLayoutEffect` if that causes a problem.
>
>If you use server rendering, keep in mind that *neither* `useLayoutEffect` nor `useEffect` can run until the JavaScript is downloaded. This is why React warns when a server-rendered component contains `useLayoutEffect`. To fix this, either move that logic to `useEffect` (if it isn't necessary for the first render), or delay showing that component until after the client renders (if the HTML looks broken until `useLayoutEffect` runs).
>
>To exclude a component that needs layout effects from the server-rendered HTML, render it conditionally with `showChild && <Child />` and defer showing it with `useEffect(() => { setShowChild(true); }, [])`. This way, the UI doesn't appear broken before hydration.

### `useDebugValue` {#usedebugvalue}

```js
useDebugValue(value)
```

`useDebugValue` kan gebruikt worden om een label weer te geven voor custom hooks in React DevTools.

Bijvoorbeeld, neem de `useFriendStatus` custom Hook beshreven in ["Bouw Je Eigen Hooks"](/docs/hooks-custom.html):

```js{6-8}
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  // Toon een label in DevTools naast deze Hook
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}
```

> Tip
>
> We don't recommend adding debug values to every custom Hook. It's most valuable for custom Hooks that are part of gedeelde bibliotheken.

#### Uitgestelde formattering debug waarden {#defer-formatting-debug-values}

In sommige gevallen kan het formatteren van een waarde een dure operatie zijn. Het is ook onnodig tenzij een Hook ook echt wordt geïnspecteerd.

Om deze reden accepteerd `useDebugValue` een formatting function als een optionele tweede parameter. Deze functie wordt alleen aangeroepen wanneer de Hooks worden geïnspecteerd. De functie ontvangt de debug waarde als een parameter en zou de geformatteerde weergave waarde moeten teruggeven.

Bijvoorbeeld een custom Hook die een `Date` waarde terug geeft kan voorkomen dat de `toDateString` functie onnodig wordt aangeroepen door de volgende formatter mee te geven:

```js
useDebugValue(date, date => date.toDateString());
```
