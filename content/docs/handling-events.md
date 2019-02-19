---
id: handling-events
title: Omgaan met Events
permalink: docs/handling-events.html
prev: state-and-lifecycle.html
next: conditional-rendering.html
redirect_from:
  - "docs/events-ko-KR.html"
---

Omgaan met events met React-elementen lijkt sterk op omgaan met events met DOM-elementen.
Er zijn enkele syntactische verschillen:

* React events worden in camelCase benoemd in plaats van kleine letters.
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

Een ander verschil is dat je `false` niet kan teruggeven om standaard gedrag te voorkomen in React.
Je moet `preventDefault` expliciet aanroepen.
In eenvoudige HTML kun je bijvoorbeeld, om de standaard manier waarop links in een nieuwe pagina worden geopend te voorkomen, schrijven:

```html
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

In React zou dit het volgende kunnen zijn:

```js{2-5,8}
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

Hier is `e` een synthetisch event.
React definieert deze synthetische events volgens de [W3C-specificatie (Engels)](https://www.w3.org/TR/DOM-Level-3-Events/), zodat je je geen zorgen hoeft te maken over cross-browser compatibiliteit.
Zie de referentiegids [`SyntheticEvent`](/docs/events.html) voor meer informatie.

Wanneer je React gebruikt, zou je over het algemeen `addEventListener` niet moeten aanroepen om listeners toe te voegen aan een DOM-element nadat het is aangemaakt.
Voorzie in plaats daarvan alleen een listener wanneer het element voor het eerst wordt gerenderd.

Wanneer je een component definieert met een [ES6-klasse](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Classes), is een algemeen patroon dat een event handler een methode van de klasse is.
Dit `Toggle`-component rendert bijvoorbeeld een knop waarmee de gebruiker kan wisselen tussen "ON"- en "OFF"-toestanden:

```js{6,7,10-14,18}
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
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

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

[**Probeer het op CodePen**](http://codepen.io/gaearon/pen/xEmzGg?editors=0010)

Je bent best voorzichtig met de betekenis van `this` in JSX callbacks.
In JavaScript zijn klassenmethoden standaard niet [gebonden (Engels)](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
Als je vergeet om `this.handleClick` te binden en het door te geven aan `onClick`, zal `this` `undefined` zijn wanneer de functie daadwerkelijk wordt aangeroepen.

Dit gedrag is niet specifiek aan React; het is een onderdeel van [hoe functies werken in JavaScript (Engels)](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/).
Over het algemeen, als je verwijst naar een methode zonder `()` erachter, zoals in `onClick = {this.handleClick}`, moet je deze methode binden.

Als `bind` aanroepen je ergert, zijn er twee manieren om dit te omzeilen.
Als je de experimentele [public class fields syntax (Engels)](https://babeljs.io/docs/plugins/transform-class-properties/) gebruikt, kan je class fields gebruiken om callbacks correct te binden:

```js{2-6}
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

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
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```

Het probleem van deze syntax is dat elke keer dat de `LoggingButton` wordt gerenderd een andere callback wordt aangemaakt.
In de meeste gevallen is dit prima.
Echter, als deze callback wordt doorgegeven als prop naar lagere componenten, is het mogelijk dat deze componenten een extra re-render uitvoeren.
Over het algemeen raden we aan te binden in de constructor of de class fields syntax te gebruiken om dit soort performance problemen te voorkomen.

## Argumenten Doorgeven aan Event Handlers {#passing-arguments-to-event-handlers}

Binnen een loop is het gebruikelijk om een extra parameter te willen doorgeven aan een event handler.
Als `id` bijvoorbeeld de rij-ID is, zou elk van de volgende werken:

```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

De bovenstaande twee regels zijn equivalent en gebruiken respectievelijk [pijlfuncties](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Functions/Arrow_functions) en [`Function.prototype.bind`](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

In beide gevallen wordt het `e`-argument dat de React event vertegenwoordigt als een tweede argument doorgegeven na de ID.
Met een pijlfunctie moeten we het expliciet doorgeven, maar met `bind` worden verdere argumenten automatisch doorgestuurd.
