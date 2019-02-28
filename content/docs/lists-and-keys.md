---
id: lists-and-keys
title: Lijsten En Keys
permalink: docs/lists-and-keys.html
prev: conditional-rendering.html
next: forms.html
---

Laten we beginnen met te bekijken hoe je lijsten transformeert in JavaScript.

In de code hieronder gebruiken we de [`map()` (Engels)](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/map) functie om een array van `numbers` en verdubbelt hun waarde.
We wijzen de array die door `map()` wordt teruggegeven toe aan de variabele `doubled` en loggen deze:

```javascript{2}
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

Deze code logt `[2, 4, 6, 8, 10]` in de console.

Het transformeren van arrays naar lijsten van [elementen](/docs/rendering-elements.html) in React is bijna identiek.

### Meerdere Componenten Renderen {#rendering-multiple-components}

Je kunt collecties van elementen opbouwen en [in JSX gebruiken](/docs/introducing-jsx.html#embedding-expressions-in-jsx) met behulp van accolades `{}`.

In het voorbeeld hieronder doorlopen we de `numbers` array met de JavaScript [`map()`](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/map) functie.
Voor ieder item geven we een `<li>` element terug.
Ten slotte wijzen we de array van elementen toe aan `listItems`:

```javascript{2-4}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

We gebruiken de hele `listItems` array in een `<ul>` element en [renderen het naar het DOM](/docs/rendering-elements.html#rendering-an-element-into-the-dom):

```javascript{2}
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

[**Probeer het op CodePen**](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)

Deze code toont een lijst met nummers van 1 tot en met 5.

### Simpele Lijst Component {#basic-list-component}

Gewoonlijk render je lijsten in een [component](/docs/components-and-props.html).

We kunnen het eerdere voorbeeld ombouwen naar een component die een array van `numbers` ontvangt en een lijst van elementen weergeeft.

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

Als je deze code start, krijg je een waarschuwing dat er een "key" nodig is voor de lijst items.
Een "key" is een speciaal string attribuut dat je moet toevoegen als je lijsten van elementen maakt.
In de volgende sectie zullen we uitleggen waarom dat belangrijk is.

Laten we een `key` toevoegen aan onze lijst items in `numbers.map()` en daarmee het probleem van de missende keys oplossen.

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

Keys helpen React om items, die veranderd, toegevoegd of verwijderd zijn, te identificeren.
De elementen in een array moeten keys krijgen om ze een stabiele identiteit te geven:

```js{3}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

De beste keuze voor een key is een string die het item op unieke wijze identificeert in de lijst.
Meestal zul je hier IDs uit je data voor gebruiken:

```js{2}
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

Als je geen stabiele IDs hebt voor gerenderde items, kun je als laatste redmiddel ook de item index als key gebruiken:

```js{2,3}
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

We raden het af om indices als keys te gebruiken als de volgorde van items kan veranderen. 
Dit heeft een negatieve invloed op de performance en kan problemen met de component state veroorzaken.
Lees Robin Pokornys artikel voor een [diepgaande uitleg van de negatieve effecten van het gebruik van een index als key (Engels)](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318).
Als je er voor kiest om geen expliciete key aan lijst items te geven, zal React standaard indices gebruiken als keys.

Als je er meer over wilt leren, vind je hier een [diepgaande uitleg waarom keys nodig zijn](/docs/reconciliation.html#recursing-on-children).

### Componenten Met Keys Opsplitsen {#extracting-components-with-keys}

Keys zijn alleen logisch in de context van de omliggende array.

Als je bijvoorbeeld een `ListItem` component wilt [extraheren](/docs/components-and-props.html#extracting-components), moet je de key op de `<ListItem />` elementen in de array houden en niet op het `<li>` element in het `ListItem` zelf.

**Voorbeeld: Foutief Gebruik Van Keys**

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

**Voorbeeld: Correct Gebruik Van Keys**

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

### Keys Moeten Uniek Zijn Ten Opzichte Van Siblings {#keys-must-only-be-unique-among-siblings}
### Keys Must Only Be Unique Among Siblings {#keys-must-only-be-unique-among-siblings}

Keys die in arrays gebruikt worden moeten uniek zijn ten op zichte van hun siblings.
Ze hoeven echter niet uniek te zijn in de hele applicatie. 
We kunnen dezelfde keys gebruiken als we twee verschillende arrays maken:

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

Keys geven een hint aan React maar ze worden niet doorgegeven aan je componenten.
Als je de waarde nodig hebt in je component, moet je deze expliciet als een prop met een andere naam doorgeven.

```js{3,4}
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

In het voorbeeld hierboven kan de `Post` component `props.id` lezen, maar `props.key` niet.

### Map() Gebruiken In JSX {#embedding-map-in-jsx}

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

JSX staat toe dat we [elke expressie gebruiken](/docs/introducing-jsx.html#embedding-expressions-in-jsx) tussen accolades, dus  we zouden het `map()` resultaat ook direct kunnen gebruiken:

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

Soms levert dit beter leesbare code, maar deze manier kan ook misbruikt worden.
Net als in JavaScript is het aan jou om te bepalen of het loont om een variabele te gebruiken voor de leesbaarheid.
Het kan een goed idee zijn om [een component op te splitsen](/docs/components-and-props.html#extracting-components)  als de `map()` body te diep genest is.
