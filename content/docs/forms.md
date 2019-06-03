---
id: forms
title: Forms
permalink: docs/forms.html
prev: lists-and-keys.html
next: lifting-state-up.html
redirect_from:
  - "tips/controlled-input-null-value.html"
  - "docs/forms-zh-CN.html"
---

HTML form elementen werken een beetje anders dan andere DOM elementen in React omdat form elementen zelf een interne staat bijhouden.
Bijvoorbeeld, onderstaande `form` in gewone HTML neemt een enkele naam aan:

```html
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

Deze `form` heeft het standaard HTML `form` gedrag van het browsen naar een nieuwe pagina wanneer een gebruiker de `form` verzendt.
Als je dit gedrag wilt in React, werkt het gewoon zo.
Maar in de meeste gevallen is het handig om een JavaScript functie te hebben die het verzenden van een `form` afhandelt en die toegang heeft tot de data die de gebruiker in de `form` ingevuld heeft.
De standaard manier om dit te implementeren is met een techniek die "aangestuurde componenten" (in het Engels: "controlled components") wordt genoemd.

## Gecontroleerde Componenten {#controlled-components}

In HTML behouden form elementen zoals `<input>`, `<textarea>`, en `<select>` typisch hun eigen state en werken ze deze bij op basis van gebruikersinput.
In React wordt veranderlijke state typisch bijgehouden in de state eigenschap van componenten en enkel bijgewerkt via de functie [`setState()`](/docs/react-component.html#setstate).

We kunnen beiden combineren door de React state de "enkele bron van waarheid" te maken.
Het React component dat een form rendert, beslist ook wat er gebeurt in die form bij volgende gebruikersinput.
Een input form element waarvan de value op deze manier gecontroleerd is door React wordt een "gecontroleerde component" genoemd.

Bijvoorbeeld, als we in het vorige voorbeeld de naam willen loggen in de console wanneer ze doorgestuurd wordt, kunnen we de form schrijven als een gecontroleerd component:

```javascript{4,10-12,24}
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[**Probeer Het Op CodePen**](https://codepen.io/gaearon/pen/VmmPgp?editors=0010)

Aangezien het `value` attribuut gezet is op ons form element, zal de weergegeven waarde altijd `this.state.value` zijn, waarbij de React state de enkele bron van waarheid is.
Aangezien `handleChange` loopt bij elke toetsaanslag om de React state bij te werken, zal de weergegeven waarde bijgewerkt worden wanneer de gebruiker typt.

Met een gecontroleerd component zal elke verandering van state een geassocieerde handler functie hebben.
Dit maakt het heel eenvoudig om gebruikersinput te veranderen of te valideren.
Bijvoorbeeld, als we willen afdwingen dat namen geschreven worden met alleen hoofdletters, kunnen we `handleChange` als volgt schrijven:

```javascript{2}
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```

## De textarea Tag {#the-textarea-tag}

In HTML definieert een `<textarea>` element zijn tekst via zijn children:

```html
<textarea>
  Hello there, this is some text in a text area
</textarea>
```

In React, daarentegen, gebruikt een `<textarea>` een `value` attribuut.
Op deze manier kan een form dat een `<textarea>` gebruikt gelijkaardig worden geschreven als een form dat een enkele lijn input gebruikt.

```javascript{4-6,12-14,26}
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

Merk op dat `this.state.value` geïnitialiseerd werd in de constructor, waardoor de text area begint met wat tekst erin.

## De select Tag {#the-select-tag}

In HTML creëert `<select>` een drop-down lijst.
Bijvoorbeeld, deze HTML creëert een drop-down lijst van smaken:

```html
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```

Merk op dat de Coconut optie initieel geselecteerd is omwille van het `selected` attribuut.
React, daarentegen, gebruikt, in plaats van dit `selected` attribuut, een `value` attribuut op de root `select` tag.
Dit is gemakkelijker bij een gecontroleerd component omdat je het maar op één plaats moet bijwerken.
Bijvoorbeeld:

```javascript{4,10-12,24}
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[**Probeer Het Op CodePen**](https://codepen.io/gaearon/pen/JbbEzX?editors=0010)

In het algemeen zorgt dit ervoor dat `<input type="text">`, `<textarea>`, en `<select>` allemaal op een zeer vergelijkbare manier functioneren - ze accepteren allemaal een `value` attribuut dat je kan gebruiken om een gecontroleerd component te implementeren.

> Opmerking
>
> Je kan een array doorgeven aan het `value` attribuut, wat je toelaat om meerdere opties te selecteren in een `select` tag:
>
>```js
><select multiple={true} value={['B', 'C']}>
>```

## De file input Tag {#the-file-input-tag}

In HTML, laat een `<input type="file">` de gebruiker één of meerdere bestanden kiezen uit de opslag van hun apparaat om geüpload te worden naar een server of gemanipuleerd te worden door JavaScript via de [File API](https://developer.mozilla.org/nl/docs/Web/API/File/Using_files_from_web_applications).

```html
<input type="file" />
```

Omdat zijn waarde read-only is, is het een **ongecontroleerd** component in React.
Het wordt samen met ongecontroleerde componenten besproken [later in de documentatie](/docs/uncontrolled-components.html#the-file-input-tag).

## Meerdere Inputs Afhandelen {#handling-multiple-inputs}

Wanneer je meerdere gecontroleerde `input` elementen moet afhandelen, kan je een `name` attribuut toevoegen aan elk element en de handler functie laten kiezen wat te doen op basis van de waarde van `event.target.name`.

Bijvoorbeeld:

```javascript{15,18,28,37}
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

[**Probeer Het Op CodePen**](https://codepen.io/gaearon/pen/wgedvV?editors=0010)

Merk op hoe we de ES6 [computed property name](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) syntax gebruikt hebben om de state key overeenkomstig met de gegeven input name bij te werken:

```js{2}
this.setState({
  [name]: value
});
```

Dit is equivalent aan deze ES5 code:

```js{2}
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

Ook, omdat `setState()` [automatisch gedeeltelijke state samenvoegt met de huidige state](/docs/state-and-lifecycle.html#state-updates-are-merged), moesten we deze functie enkel aanroepen met de veranderde delen.

## Gecontroleerde Input Null Value {#controlled-input-null-value}

De value prop specificeren in een [gecontroleerd component](/docs/forms.html#controlled-components) weerhoudt de gebruiker van het veranderen van de input tenzij wanneer jij dit wilt.
Als je een `value` gespecificeerd hebt maar de input nog steeds bewerkbaar is, zou het kunnen dat je per ongeluk de `value` hebt gezet op `undefined` of `null`.

De volgende code demonstreert dit. (De input is eerst geblokkeerd maar wordt dan bewerkbaar na een kleine vertraging.)

```javascript
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);

```

## Alternatieven Voor Gecontroleerde Componenten {#alternatives-to-controlled-components}

Het kan soms vermoeiend zijn om aangestuurde componenten te gebruiken, omdat je een event handler moet schrijven voor elke manier waarop jouw data kan veranderen en alle input staat door het React component heen moet sturen.
Dit kan in het bijzonder vervelend worden wanneer je een bestaande _codebase_ naar React aan het omzetten bent, of een React applicatie aan het integreren bent met een niet-React library.
In deze situaties wil je misschien [niet-aangestuurde componenten](/docs/uncontrolled-components.html) bekijken als alternatieve techniek om `input forms` te implementeren.

## Volwaardige Oplossingen {#fully-fledged-solutions}

Als je zoekt naar een volwaardige oplossing inclusief validatie, het bijhouden van bezochte velden en het afhandelen van het verzenden van `forms`, is [Formik](https://jaredpalmer.com/formik) één van de populaire keuzes.
Het is echter gemaakt met dezelfde principes van aangestuurde componenten en het beheren van staat - het is dus zeker zinvol om daarover te leren.
