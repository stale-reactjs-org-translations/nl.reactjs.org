---
id: components-and-props
title: Componenten en Props
permalink: docs/components-and-props.html
redirect_from:
  - "docs/reusable-components.html"
  - "docs/reusable-components-zh-CN.html"
  - "docs/transferring-props.html"
  - "docs/transferring-props-it-IT.html"
  - "docs/transferring-props-ja-JP.html"
  - "docs/transferring-props-ko-KR.html"
  - "docs/transferring-props-zh-CN.html"
  - "tips/props-in-getInitialState-as-anti-pattern.html"
  - "tips/communicate-between-components.html"
prev: rendering-elements.html
next: state-and-lifecycle.html
---

<<<<<<< HEAD
Met componenten splits je de UI in onafhankelijke, herbruikbare delen. Ook kun je over elk deel apart nadenken. Deze pagina introduceert het concept van componenten. Je vindt [hier de volledige component API referentie](/docs/react-component.html)
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [Your First Component](https://beta.reactjs.org/learn/your-first-component)
> - [Passing Props to a Component](https://beta.reactjs.org/learn/passing-props-to-a-component)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. This page provides an introduction to the idea of components. You can find a [detailed component API reference here](/docs/react-component.html).
>>>>>>> 63c77695a95902595b6c2cc084a5c3650b15210a

Conceptueel zijn componenten hetzelfde als JavaScript functies. Ze accepteren willekeurige invoerwaarden (deze noemen we "props") en geven React elementen terug die beschrijven wat er op het scherm moet verschijnen.

## Functie En Class Componenten {#function-and-class-components}

Een JavaScript functie is de eenvoudigste manier om een component te definiëren:

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

Deze functie is een geldig React component omdat ze een enkel "props" (dit is een verkorte vorm van "properties") object argument met data krijgt en een React element terug geeft. We noemen dit soort componenten "functie componenten" omdat ze letterlijk JavaScript functies zijn.

Je kunt ook een [ES6 class](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Classes) gebruiken om een component te definiëren:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

De twee bovenstaande componenten zijn gelijkwaardig vanuit Reacts oogpunt.

Function en Class componenten hebben beide wat extra features die we zullen bespreken in de [volgende hoofdstukken](/docs/state-and-lifecycle.html).

## Een Component Renderen {#rendering-a-component}

Tot nu toe hebben we alleen React elementen gezien die een DOM tag voorstellen:

```js
const element = <div />;
```

Maar elementen kunnen ook componenten vertegenwoordigen die door de gebruiker gedefinieerd zijn:

```js
const element = <Welcome name="Sara" />;
```

Als React een element ziet dat een door de gebruiker gedefinieerd component voorstelt, dan worden de JSX attributen en children doorgegeven aan deze component als een enkel object. We noemen dit object "props".

Deze code toont bijvoorbeeld "Hello, Sara" op de pagina:

```js{1,6}
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
const element = <Welcome name="Sara" />;
root.render(element);
```

<<<<<<< HEAD
[Probeer het op CodePen](codepen://components-and-props/rendering-a-component)
=======
**[Try it on CodePen](https://codepen.io/gaearon/pen/YGYmEG?editors=1010)**
>>>>>>> 63c77695a95902595b6c2cc084a5c3650b15210a

Laten we samenvatten wat er gebeurt in dit voorbeeld:

<<<<<<< HEAD
1. We roepen `ReactDOM.render() aan met het `<Welcome name="Sara" />` element.
2. React roept het `Welcome` component aan met `{name: 'Sara'}` als de props.
3. Onze `Welcome` component geeft een `<h1>Hello, Sara</h1>` element terug als resultaat.
4. Het React DOM werkt efficiënt het DOM bij zodat het `<h1>Hello, Sara</h1>` bevat.
=======
1. We call `root.render()` with the `<Welcome name="Sara" />` element.
2. React calls the `Welcome` component with `{name: 'Sara'}` as the props.
3. Our `Welcome` component returns a `<h1>Hello, Sara</h1>` element as the result.
4. React DOM efficiently updates the DOM to match `<h1>Hello, Sara</h1>`.
>>>>>>> 63c77695a95902595b6c2cc084a5c3650b15210a

>**Opmerking:** Begin component namen altijd met een hoofdletter.
>
>React ziet componenten die met een kleine letter beginnen als DOM tags. `<div />` is bijvoorbeeld een HTML div tag, maar `<Welcome />` is een component en heeft `Welcome` nodig in de scope.
>
>Om meer te leren over de redenen achter deze conventie, kun je [JSX Uitgediept](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized) lezen.

## Components Samenstellen {#composing-components}

Componenten kunnen andere componenten gebruiken in hun uitvoer. Hierdoor kunnen we dezelfde component abstractie gebruiken voor elk detailniveau. Een knop, een formulier, een dialoog, een scherm: in React applicaties worden deze gewoonlijk allemaal uitgedrukt als componenten. 

We kunnen bijvoorbeeld een `App` component maken die heel vaak `Welcome` op het scherm toont:

```js{8-10}
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
```

<<<<<<< HEAD
[Probeer het op CodePen](codepen://components-and-props/composing-components)
=======
**[Try it on CodePen](https://codepen.io/gaearon/pen/KgQKPr?editors=1010)**
>>>>>>> 63c77695a95902595b6c2cc084a5c3650b15210a

Normaal gesproken hebben React applicaties helemaal bovenin een enkele `App` component. Als je React echter integreert in een bestaande applicatie, kan het zijn dat je van onderaf begint met een kleine component, zoals een `Button`, en dan langzaam naar boven werkt in de view hiërarchie.

## Componenten Opsplitsen {#extracting-components}

Wees niet bang om componenten te splitsen in kleinere componenten.

Neem bijvoorbeeld dit `Comment` component:

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

<<<<<<< HEAD
[Probeer het op CodePen](codepen://components-and-props/extracting-components)
=======
**[Try it on CodePen](https://codepen.io/gaearon/pen/VKQwEo?editors=1010)**
>>>>>>> 63c77695a95902595b6c2cc084a5c3650b15210a

Het accepteert `author` (een object), `text` (een string) en `date` (een datum) als props en beschrijft een reactie op een social media website.

Het kan lastig zijn om deze component te veranderen door de gelaagdheid en het is ook lastig om indivuele delen ervan te hergebruiken. Laten we er een paar componenten uit halen. 

Als eerste gaan we `Avatar` eruit halen:

```js{3-6}
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

De `Avatar` hoeft niet te weten dat hij binnen een `Comment` wordt getoond. Daarom hebben we zijn prop een generieke naam, `user` gegeven, in plaats van `author`.

We raden aan om props een naam te geven vanuit het oogpunt van de component, in plaats van de context waarin de component gebruikt wordt.

We kunnen het `Comment` nu een beetje vereenvoudigen:

```js{5}
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

Vervolgens extraheren we een `UserInfo` component, die een `Avatar` en de naam van de gebruiker naast elkaar rendert:

```js{3-8}
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

Hierdoor kunnen we `Comment` nog verder vereenvoudigen:

```js{4}
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

<<<<<<< HEAD
[Probeer het op CodePen](codepen://components-and-props/extracting-components-continued)
=======
**[Try it on CodePen](https://codepen.io/gaearon/pen/rrJNJY?editors=1010)**
>>>>>>> 63c77695a95902595b6c2cc084a5c3650b15210a

Componenten extraheren lijkt misschien zwaar werk in het begin, maar een palet van herbruikbare componenten is de moeite waard in grotere applicaties. Een goede vuistregel is: als een deel van je UI vaker gebruikt wordt (`Button`, `Panel`, `Avatar`) of complex genoeg is van zichzelf (`App`, `FeedStory`, `Comment`), dan is het een goede kandidaat om te extraheren naar een herbruikbare component.

## Props Zijn Read-Only {#props-are-read-only}

Of je een component nu als een [functie of een class](#function-and-class-components) definieert, hij mag nooit zijn eigen props wijzigen. Neem bijvoorbeeld deze `sum` functie:

```js
function sum(a, b) {
  return a + b;
}
```

Dit soort functies worden ["pure"](https://en.wikipedia.org/wiki/Pure_function) genoemd, omdat ze niet proberen om hun invoerwaarden te wijzigen en altijd hetzelfde resultaat terug geven voor dezelfde invoerwaarden.

In tegenstelling hiermee is deze functie niet pure omdat ze haar eigen invoerwaarden aanpast: 

```js
function withdraw(account, amount) {
  account.total -= amount;
} 
```

React is behoorlijk flexibel, maar heeft een enkele strikte regel:

**Alle React componenten moeten zich als pure functies gedragen ten opzichte van hun props.**

Natuurlijk zijn applicatie UIs dynamisch en veranderen ze in de loop der tijd. In het [volgende hoofdstuk](/docs/state-and-lifecycle.html) zullen we het concept van "state" introduceren. Met state kunnen React componenten hun uitvoer in de loop der tijd wijzigen als reactie op acties van de gebruiker, netwerk reacties en andere acties, zonder deze regel te overtreden.
