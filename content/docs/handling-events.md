---
id: handling-events
title: Omgaan Met Events
permalink: docs/handling-events.html
prev: state-and-lifecycle.html
next: conditional-rendering.html
redirect_from:
  - "docs/events-ko-KR.html"
---

Omgaan met events met React-elementen lijkt sterk op omgaan met events met DOM-elementen. Er zijn wel enkele verschillen in de syntax:

* De naam van React events wordt in camelCase geschreven in plaats van kleine letters.
* Met JSX geef je een functie door als de event handler in plaats van een string.

Als voorbeeld, de HTML:

```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

verschilt lichtelijk in React:

```js{1}
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

<<<<<<< HEAD
Een ander verschil is dat je `false` niet kan teruggeven om standaard gedrag te voorkomen in React. Je moet `preventDefault` expliciet aanroepen. In eenvoudige HTML kun je bijvoorbeeld, om de standaard manier waarop links in een nieuwe pagina worden geopend te voorkomen, schrijven:
=======
Another difference is that you cannot return `false` to prevent default behavior in React. You must call `preventDefault` explicitly. For example, with plain HTML, to prevent the default form behavior of submitting, you can write:
>>>>>>> 38bf76a4a7bec6072d086ce8efdeef9ebb7af227

```html
<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>
```

In React zou dit het volgende kunnen zijn:

```js{3}
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

<<<<<<< HEAD
Hier is `e` een synthetisch event. React definieert deze synthetische events volgens de [W3C-specificatie (Engels)](https://www.w3.org/TR/DOM-Level-3-Events/), zodat je je geen zorgen hoeft te maken over cross-browser compatibiliteit. Zie de referentiegids [`SyntheticEvent`](/docs/events.html) voor meer informatie.
=======
Here, `e` is a synthetic event. React defines these synthetic events according to the [W3C spec](https://www.w3.org/TR/DOM-Level-3-Events/), so you don't need to worry about cross-browser compatibility. React events do not work exactly the same as native events. See the [`SyntheticEvent`](/docs/events.html) reference guide to learn more.
>>>>>>> 38bf76a4a7bec6072d086ce8efdeef9ebb7af227

Wanneer je React gebruikt, hoef je over het algemeen `addEventListener` niet aan te roepen om listeners toe te voegen aan een DOM-element nadat het is aangemaakt. Voorzie in plaats daarvan alleen een listener wanneer het element voor het eerst wordt gerenderd.

Wanneer je een component definieert met een [ES6-klasse](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Classes), is een algemeen patroon dat een event handler een methode van de klasse is. Dit `Toggle`-component rendert bijvoorbeeld een knop waarmee de gebruiker kan wisselen tussen "ON"- en "OFF"-toestanden:

```js{6,7,10-14,18}
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

[**Probeer het op CodePen**](https://codepen.io/gaearon/pen/xEmzGg?editors=0010)

Je moet voorzichtig zijn met de betekenis van `this` in JSX callbacks. In JavaScript zijn klassenmethoden standaard niet [gebonden (Engels)](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Function/bind). Als je vergeet om `this.handleClick` te binden en het door te geven aan `onClick`, zal `this` `undefined` zijn wanneer de functie daadwerkelijk wordt aangeroepen.

Dit gedrag is niet specifiek aan React; het is een onderdeel van [hoe functies werken in JavaScript (Engels)](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/). Over het algemeen, als je verwijst naar een methode zonder `()` erachter, zoals in `onClick = {this.handleClick}`, moet je deze methode binden.

<<<<<<< HEAD
Als `bind` aanroepen je ergert, zijn er twee manieren om dit te omzeilen. Als je de experimentele [public class fields syntax (Engels)](https://babeljs.io/docs/plugins/transform-class-properties/) gebruikt, kan je class fields gebruiken om callbacks correct te binden:
=======
If calling `bind` annoys you, there are two ways you can get around this. You can use [public class fields syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#public_instance_fields) to correctly bind callbacks:
>>>>>>> 38bf76a4a7bec6072d086ce8efdeef9ebb7af227

```js{2-6}
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  handleClick = () => {
    console.log('this is:', this);
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

Deze syntax is standaard beschikbaar in [Create React App](https://github.com/facebookincubator/create-react-app).

Als je de class fields syntax niet gebruikt, kan je een [pijlfunctie](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Functions/Arrow_functions) gebruiken in de callback:

```js{7-9}
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```

Het probleem van deze syntax is dat elke keer dat de `LoggingButton` wordt gerenderd een andere callback wordt aangemaakt. In de meeste gevallen is dit prima. Echter, als deze callback wordt doorgegeven als prop naar lagere componenten, is het mogelijk dat deze componenten een extra re-render uitvoeren. Over het algemeen raden we aan te binden in de constructor of de class fields syntax te gebruiken om dit soort performance problemen te voorkomen.

## Argumenten Doorgeven Aan Event Handlers {#passing-arguments-to-event-handlers}

Binnen een loop is het gebruikelijk om een extra parameter te willen doorgeven aan een event handler. Als `id` bijvoorbeeld de rij-ID is, zou elk van de volgende werken:

```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

De bovenstaande twee regels zijn equivalent en gebruiken respectievelijk [pijlfuncties](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Functions/Arrow_functions) en [`Function.prototype.bind`](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

In beide gevallen wordt het `e`-argument dat de React event vertegenwoordigt als een tweede argument doorgegeven na de ID. Met een pijlfunctie moeten we het expliciet doorgeven, maar met `bind` worden verdere argumenten automatisch doorgestuurd.
