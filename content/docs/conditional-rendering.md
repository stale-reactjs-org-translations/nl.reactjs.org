id: conditional-rendering
title: Conditioneel Renderen
permalink: docs/conditional-rendering.html
prev: handling-events.html
next: lists-and-keys.html
redirect_from:
  - "tips/false-in-jsx.html"
---

In React kan je afzonderlijke componenten maken die gedrag inkapselen dat je nodig hebt. Vervolgens is het mogelijk om er slechts enkele van te renderen, afhankelijk van je applicatie.

Conditioneel renderen in React werkt op dezelfde manier als condities in JavaScript. Gebruik JavaScript operatoren zoals [`if`](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Statements/if...else) of de [conditionele operator](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) om elementen aan te maken die de huidige state voorstellen en laat React de UI bijwerken op basis hiervan.

Beschouw deze twee componenten:

```js
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```

We zullen een `Greeting` component maken die een van deze componenten weergeeft, afhankelijk van of een gebruiker is ingelogd:

```javascript{3-7,11,12}
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

const root = ReactDOM.createRoot(document.getElementById('root')); 
// Try changing to isLoggedIn={true}:
root.render(<Greeting isLoggedIn={false} />);
```

[**Probeer het op CodePen**](https://codepen.io/gaearon/pen/ZpVxNq?editors=0011)

Dit voorbeeld rendert een bepaalde begroeting afhankelijk van de waarde van de `isLoggedIn` prop.

### Element Variabelen {#element-variables}

Je kunt variabelen gebruiken om elementen op te slaan. Dit kan je helpen om een deel van de component conditioneel te renderen terwijl de rest van de uitvoer niet verandert.

Beschouw deze twee nieuwe componenten die de Logout- en Login-knoppen voorstellen:

```js
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```

In het onderstaande voorbeeld maken we een [stateful component](/docs/state-and-lifecycle.html#adding-local-state-to-a-class) genaamd `LoginControl`.

Het zal ofwel `<LoginButton />` ofwel `<LogoutButton />` renderen, afhankelijk van de huidige state. Het zal ook een `<Greeting />`, uit het vorige voorbeeld, renderen:


```javascript{20-25,29,30}
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<LoginControl />);
```

[**Probeer het op CodePen**](https://codepen.io/gaearon/pen/QKzAgB?editors=0010)

Hoewel het verklaren van een variabele en het gebruiken van een `if` instructie een prima manier is om een component conditioneel te renderen, wil je soms een kortere syntax gebruiken. Er zijn een paar manieren om op dezelfde lijn condities in te voeren in JSX, zoals hieronder uitgelegd.

### Inline If Met Logische && Operator {#inline-if-with-logical--operator}

<<<<<<< HEAD
Je kan [alle expressies insluiten in JSX](/docs/introducing-jsx.html#embedding-expressions-in-jsx) door ze in accolades in te sluiten. Hieronder valt ook de logische `&&`-operator uit JavaScript, waarmee je handig een element conditioneel kunt renderen.
=======
You may [embed expressions in JSX](/docs/introducing-jsx.html#embedding-expressions-in-jsx) by wrapping them in curly braces. This includes the JavaScript logical `&&` operator. It can be handy for conditionally including an element:
>>>>>>> 951fae39f0e12dc061f1564d02b2f4707c0541c4

```js{6-10}
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<Mailbox unreadMessages={messages} />);
```

[**Probeer het op CodePen**](https://codepen.io/gaearon/pen/ozJddz?editors=0010)

Dit werkt omdat in JavaScript `true && expression` altijd evalueert naar `expression` en `false && expression` altijd evalueert naar` false`.

Hierdoor verschijnt, als de conditie `true` is, het element meteen na `&&` in de uitvoer. Als ze `false` is, zal React ze negeren en overslaan.

<<<<<<< HEAD
### Inline If-Else Met Conditionele Operator {#inline-if-else-with-conditional-operator}
=======
Note that returning a falsy expression will still cause the element after `&&` to be skipped but will return the falsy expression. In the example below, `<div>0</div>` will be returned by the render method.

```javascript{2,5}
render() {
  const count = 0;
  return (
    <div>
      {count && <h1>Messages: {count}</h1>}
    </div>
  );
}
```

### Inline If-Else with Conditional Operator {#inline-if-else-with-conditional-operator}
>>>>>>> 951fae39f0e12dc061f1564d02b2f4707c0541c4

Een andere methode voor het inline conditioneel renderen van elementen is het gebruik van JavaScript's conditionele operator [`condition ? true : false`](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Operators/Conditional_Operator).

In het onderstaande voorbeeld gebruiken we het om een kleine blok tekst conditioneel te renderen.

```javascript{5}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

Het kan ook gebruikt worden voor grotere expressies, hoewel het minder voor de hand ligt wat er gebeurt:

```js{5,7,9}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }
    </div>
  );
}
```

Net als in JavaScript, is het aan jou om een geschikte stijl te kiezen op basis van wat jij en je team meer leesbaar vinden. Onthoud ook dat wanneer condities te ingewikkeld worden, het een goed moment kan zijn om een [component af te zonderen](/docs/components-and-props.html#extracting-components).

### Voorkomen Dat Een Component Rendert {#preventing-component-from-rendering}

In zeldzame gevallen wil je misschien dat een component zichzelf verbergt, ook al is het door een ander component gerenderd. Hiertoe geef je gewoon `null` terug in plaats van de normale renderuitvoer.

In het onderstaande voorbeeld wordt de `<WarningBanner />` gerenderd, afhankelijk van de waarde van de prop `warn`. Als de waarde van de prop `false` is, zal de component niet renderen:

```javascript{2-4,29}
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<Page />);
```

[**Probeer het op CodePen**](https://codepen.io/gaearon/pen/Xjoqwm?editors=0010)

Het teruggeven van `null` vanuit de `render`-methode van een component heeft geen invloed op de uitvoering van deze component zijn levenscyclusmethoden. Zo wordt `componentDidUpdate` nog steeds aangeroepen.
