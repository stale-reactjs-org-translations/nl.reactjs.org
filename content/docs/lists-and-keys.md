---
id: lists-and-keys
title: Lijsten en Keys
permalink: docs/lists-and-keys.html
prev: conditional-rendering.html
next: forms.html
---

Laten we allereerst bekijken hoe je lijsten transformeert in JavaScript.

In de code hieronder gebruiken we de [`map()` (Engels)](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/map) functie op een array van `numbers` waarmee hun waarde wordt verdubbeld. De nieuwe array die door `map()` wordt teruggegeven wijzen we toe aan de variabele `doubled` waarna deze wordt gelogd:

```javascript{2}
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

Deze code logt `[2, 4, 6, 8, 10]` naar de console.

In React is het transformeren van arrays naar lijsten van [elementen](/docs/rendering-elements.html) bijna identiek aan het voorgaande.

### Meerdere Componenten Renderen {#rendering-multiple-components}

Je kunt collecties van elementen maken en [in JSX opnemen](/docs/introducing-jsx.html#embedding-expressions-in-jsx) met behulp van accolades `{}`.

Hieronder doorlopen we de array van `numbers` gebruik makende van de JavaScript [`map()` (Engels)](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/map) functie. Voor ieder item geven we een `<li>` element terug. Ten slotte wijzen we de array van elementen toe aan `listItems`:

```javascript{2-4}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

We nemen de hele `listItems` array op in een `<ul>` element en [renderen het naar het DOM](/docs/rendering-elements.html#rendering-an-element-into-the-dom):

```javascript{2}
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

[**Probeer het op CodePen**](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)

Deze code toont een lijst met opsommingstekens met nummers van 1 tot en met 5.

### Eenvoudige Lijst Component {#basic-list-component}

Het is gebruikelijk om je lijsten in een [component](/docs/components-and-props.html) te renderen.

We kunnen het vorige voorbeeld omschrijven naar een component die een array van `numbers` aanneemt en een lijst van elementen teruggeeft.

```javascript{3-5,7,13}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

Als je deze code uitvoert, krijg je een waarschuwing dat een "key" nodig is voor lijst elementen. Een "key" is een speciaal text attribuut dat je moet toevoegen als je lijsten van elementen maakt. In de volgende sectie zullen we uitleggen waarom dat belangrijk is.

Laten we een `key` toevoegen aan onze lijst elementen in `numbers.map()` en daarmee het probleem dat deze ontbreken oplossen.

```javascript{4}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[**Probeer het op CodePen**](https://codepen.io/gaearon/pen/jrXYRR?editors=0011)

## Keys {#keys}

Keys helpen React om te identificeren welke elementen zijn veranderd, zijn toegevoegd of zijn verwijderd. De elementen in een array zullen keys moeten krijgen om ze een stabiele identiteit te geven:

```js{3}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

De beste keuze voor een key is een string die het item op unieke wijze identificeert in de lijst. Meestal zul je hier IDs uit je data voor gebruiken:

```js{2}
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

Als je geen stabiele IDs hebt voor gerenderde items, kun je als laatste redmiddel ook de index van het element in de lijst als key gebruiken:

```js{2,3}
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

We raden het af om indices als keys te gebruiken als de volgorde van elementen kan veranderen, omdat dit een negatieve invloed heeft op de performance en problemen met de component state kan veroorzaken. Lees Robin Pokornys artikel voor een [diepgaande uitleg van de negatieve effecten van het gebruik van een index als key (Engels)](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318). Als je er voor kiest om geen expliciete key aan lijst elementen te geven gebruikt React standaard de indices als keys.

Als je er meer over wilt leren, vind je hier een [diepgaande uitleg waarom keys nodig zijn](/docs/reconciliation.html#recursing-on-children).

### Componenten met Keys Extraheren {#extracting-components-with-keys}

Keys zijn alleen logisch in de context van de omliggende array.

Als je bijvoorbeeld een `ListItem` component wilt [extraheren](/docs/components-and-props.html#extracting-components), moet je de key op de `<ListItem />` elementen in de array houden en niet op het `<li>` element in het `ListItem` zelf.

**Voorbeeld: Foutief Gebruik van Keys**

```javascript{4,5,14,15}
function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Wrong! The key should have been specified here:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

**Voorbeeld: Correct Gebruik van Keys**

```javascript{2,3,9,10}
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[**Probeer het op CodePen**](https://codepen.io/gaearon/pen/ZXeOGM?editors=0010)

Een goede vuistregel is dat de elementen binnen een `map()` aanroep keys nodig hebben.

### Keys Moeten Alleen Uniek Zijn Ten Opzichte Van Siblings {#keys-must-only-be-unique-among-siblings}

Keys die in arrays gebruikt worden moeten uniek zijn ten op zichte van hun siblings. Ze hoeven echter niet uniek te zijn in de hele applicatie. We kunnen dezelfde keys gebruiken als we twee verschillende arrays maken:

```js{2,5,11,12,19,21}
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

[**Probeer het op CodePen**](https://codepen.io/gaearon/pen/NRZYGN?editors=0010)

Keys dienen als hint aan React maar ze worden niet doorgegeven aan je componenten. Als je dezelfde waarde nodig hebt in je component, moet je deze expliciet als een prop met een andere naam doorgeven.

```js{3,4}
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

In het voorbeeld hierboven kan de `Post` component `props.id` lezen, maar `props.key` niet.

### Map() Gebruiken in JSX {#embedding-map-in-jsx}

In de eerdere voorbeelden maakten we een aparte `listItems` variabele die we in JSX gebruikten:

```js{3-6}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

JSX staat [elke expressie](/docs/introducing-jsx.html#embedding-expressions-in-jsx) toe tussen accolades, dus we zouden het `map()` resultaat ook direct kunnen gebruiken:

```js{5-8}
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```

[**Probeer het op CodePen**](https://codepen.io/gaearon/pen/BLvYrB?editors=0010)

Soms levert dit beter leesbare code op, maar deze stijl kan ook misbruikt worden. Net als in JavaScript is het aan jou om te bepalen of het loont om een variabele te gebruiken voor de leesbaarheid. Het kan een goed idee zijn om [een component te extraheren](/docs/components-and-props.html#extracting-components)  als de expressie in `map()` te diep genest is.
