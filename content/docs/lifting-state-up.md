---
id: lifting-state-up
title: Staat Omhoog Tillen
permalink: docs/lifting-state-up.html
prev: forms.html
next: composition-vs-inheritance.html
redirect_from:
  - "docs/flux-overview.html"
  - "docs/flux-todo-list.html"
---

Vaak moeten verschillende componenten dezelfde veranderende gegevens weergeven.
We raden aan de gedeelde staat op te heffen tot aan hun meest nabije gemeenschappelijke voorvader.
Laten we eens kijken hoe dit in actie werkt.

In dit gedeelte zullen we een temperatuurcalculator maken die berekent of water bij een bepaalde temperatuur kookt.

We zullen beginnen met een component genaamd `BiolingVerdict`.
Het accepteert de `Celsius` temperatuur als een prop en drukt in de console af of het voldoende is om water te koken:

```js{3,5}
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
```

Vervolgens zullen we een component genaamd `Calculator` maken.
Het rendert een `<input>` waar je de temperatuur kunt invoeren en houdt deze waarde bij in `this.state.temperature`.

Daarnaast rendert het de `BiolingVerdict` voor de huidige invoerwaarde.

```js{5,9,13,17-21}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
        <BoilingVerdict
          celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}
```

[**Probeer het op CodePen**](https://codepen.io/gaearon/pen/ZXeOBm?editors=0010)

## Een Tweede Input Toevoegen {#adding-a-second-input}

Onze nieuwe vereiste is dat we, naast een Celsius input, ook een Fahrenheit input voorzien en deze worden gesynchroniseerd.

We kunnen beginnen met een `TemperatureInput` component uit de `Calculator` af te zonderen.
We zullen er een `scale` prop aan toevoegen die ofwel`"c"` ofwel `"f"` kan zijn.

```js{1-4,19,22}
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

We kunnen de `Calculator` nu aanpassen opdat hij twee afzonderlijke temperatuur inputs rendert.

```js{5,6}
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```

[**Probeer het op CodePen**](https://codepen.io/gaearon/pen/jGBryx?editors=0010)

We hebben nu twee inputs, maar wanneer je een temperatuur ingeeft in één van beide, wordt de andere niet bijgewerkt.
Dit is in tegenspraak met onze vereiste: we willen ze gesynchroniseerd houden.

We kunnen ook de `BiolingVerdict` van `Calculator` niet weergeven.
De `Calculator` kent de huidige temperatuur niet omdat deze verborgen is in `TemperatureInput`.

## Conversiefuncties schrijven {#writing-conversion-functions}

Eerst zullen we twee functies schrijven om van Celsius naar Fahrenheit en terug te converteren:

```js
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

Deze twee functies converteren nummers.
We zullen een andere functie schrijven die een string `temperature` en een conversiefunctie als argumenten heeft en een string teruggeeft.
We zullen deze gebruiken om de waarde van een input te berekenen op basis van een andere input.

De functie geeft een lege string terug bij een ongeldige `temperature` en ze houdt de output afgerond tot de derde decimaal na de komma.

```js
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

Bijvoorbeeld, `tryConvert('abc, toCelsius)` geeft een lege string terug en `tryConvert('10.22', toFahrenheit)` `'50.396'`.

## Staat Omhoog Tillen {#lifting-state-up}

Momenteel houden beide `TemperatureInput` componenten afzonderlijk hun waarden bij in hun lokale staat:

```js{5,9,13}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...  
```

We willen echter deze twee inputs met elkaar gesynchroniseerd houden.
Wanneer we de Celsius input bijwerken, moet de Fahrenheit input de geconverteerde temperatuur weerspiegelen en vice versa.

In React wordt staat gedeeld door deze te verplaatsen naar de meest nabije gemeenschappelijke voorvader van de componenten die ze nodig hebben.
Dit wordt "staat omhoog tillen" genoemd.
We zullen de lokale staat van de `TemperatureInput` verwijderen en ze verplaatsen naar de `Calculator`.

Als de `Calculator` een gedeelde staat heeft, wordt het de "enige bron van waarheid" voor de huidige temperatuur voor beide inputs.
Het kan er voor zorgen dat beiden waarden hebben die consistent zijn met elkaar.
Omdat de props van beide `TemperatureInput` componenten van dezelfde ouder `Calculator` afkomstig zijn, zullen de twee inputs altijd gesynchroniseerd zijn.

Laten we eens kijken dit werkt stap voor stap.

Eerst zullen we `this.state.temperature` vervangen door `this.props.temperature` in de `TemperatureInput` component.
Laten we voorlopig doen alsof `this.props.temperature` al bestaat, hoewel we het in de toekomst zullen moeten doorgeven aan de `Calculator`.

```js{3}
  render() {
    // Before: const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    // ...
```

We weten dat [props read-only zijn](/doccs/components-and-props.html#props-are-read-only).
Wanneer de `temperature` in de lokale staat zat, kon de `TemperatureInput` gewoon `this.setState()` aanroepen om ze te veranderen.
Echter, nu dat de `temperature` afkomstig is uit de ouder als een prop, heeft de `TemperatureInput` er geen controle meer over.

In React wordt dit doorgaans opgelost door de component "aangestuurd" te maken.
Net zoals het DOM `<input>` zowel een `value` als een `onChange` prop accepteert, kan de `TemperatureInput` zowel een `temperature` als een `onTemperatureChange` prop accepteren van zijn ouder `Calculator`.

Wanneer de `TemperatureInput` nu zijn temperatuur wil bijwerken, roept het `this.props.onTemperatureChange` aan:

```js{3}
  handleChange(e) {
    // Before: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
    // ...
```

>Opmerking:
>
>Er is geen speciale betekenis voor de namen van de `temperature` en `onTemperatureChange` props in aangepaste componenten. We hadden ze een andere naam kunnen geven, zoals `value` en `onChange`, wat een veel voorkomende conventie is.

De `onTemperatureChange` prop zal samen met de `temperature` prop door de ouder `Calculator` worden voorzien.
Het zal de wijziging afhandelen door de eigen lokale staat aan te passen, waardoor beide inputs opnieuw worden weergegeven met de nieuwe waarden.
We zullen zeer binnenkort naar de nieuwe `Calculator`-implementatie kijken.

Laten we voordat we ingaan op de wijzigingen in de `Calculator` onze wijzigingen in de component `TemperatureInput` herhalen.
We hebben er de lokale staat van verwijderd en in plaats van `this.state.temperature` te lezen, lezen we nu `this.props.temperature`.
In plaats van `this.setState()` aan te roepen wanneer we een wijziging willen aanbrengen, roepen we nu `this.props.onTemperatureChange()` aan, die wordt voorzien door de `Calculator`:

```js{8,12}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

Laten we nu kijken naar de `Calculator` component.

We zullen de `temperature` en `scale` van de huidige input bijhouden in de lokale staat.
Dit is de staat die we "omhoog getild" hebben uit de inputs en deze zal dienen als de "bron van waarheid" voor beiden.
Het is de minimale representatie van alle gegevens die we moeten kennen om beide ingangen weer te geven.

Als we bijvoorbeeld 37 invoeren in de Celsius input, is de staat van de `Calculator` component:

```js
{
  temperature: '37',
  scale: 'c'
}
```

Als we later het Fahrenheit veld veranderen in 212, is de staat van de `Calculator`:

```js
{
  temperature: '212',
  scale: 'f'
}
```

We hadden de waarde van beide inputs kunnen opslaan, maar dat blijkt overbodig. Het is voldoende om de waarde van de meest recent gewijzigde input en de schaal die deze vertegenwoordigt op te slaan. We kunnen dan de waarde van de andere input afleiden uit de huidige `temperature` en `scale`.

De inputs blijven gesynchroniseerd omdat hun waarden worden berekend uit dezelfde staat:

```js{6,10,14,18-21,27-28,31-32,34}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```

[**Probeer het op CodePen**](https://codepen.io/gaearon/pen/WZpxpz?editors=0010)

Nu worden, ongeacht welke input je bewerkt, `this.state.temperature` en `this.state.scale` in de `Calculator` bijgewerkt.
Eén van de inputs krijgt de waarde zoals deze is, dus elke gebruikersinvoer wordt behouden en de andere input waarde wordt altijd opnieuw berekend op basis van deze invoer.

Laten we samenvatten wat er gebeurt als je een input bewerkt:

* React roept de functie aan die is gespecificeerd als `onChange` op de DOM `<input>`.
In ons geval is dit de `handleChange` methode in de component `TemperatureInput`.
* De `handleChange` methode in de `TemperatureInput` component roept `this.props.onTemperatureChange()` aan met de nieuwe gewenste waarde.
De props, waaronder `onTemperatureChange`, werden voorzien door de bovenliggende component, de `Calculator`.
* Toen het eerder werd gerenderd, heeft de `Calculator` gespecificeerd dat `onTemperatureChange` van de Celsius `TemperatureInput` de `Calculator`'s `handleCelsiusChange` methode is en `onTemperatureChange` van de Fahrenheit `TemperatureInput` de `Calculator`'s `handleFahrenheitChange` methode.
Dus één van beide methoden wordt aangeroepen afhankelijk van welke input bewerkt wordt.
* Binnen deze methoden vraagt de `Calculator` component React om zichzelf opnieuw te renderen door `this.setState()` aan te roepen met de nieuwe input waarde en de huidige schaal van de input die we zojuist hebben bewerkt.
* React roept de `render` methode van `Calculator` aan om te leren hoe de gebruiksersinterface eruit moet zien.
De waarden van beide inputs worden opnieuw berekend op basis van de huidige temperatuur en de actieve schaal.
De temperatuurconversie wordt hier uitgevoerd.
* React roept de `render` methoden aan van de individuele `TemperatureInput` componenten met hun nieuwe props gespecificeerd door de `Calculator`.
Het leert hoe hun gebruikersinterface eruit moet zien.
* React roept de `render` methode van de `BoilingVerdict` component aan, waarbij de temperatuur in Celsius als prop wordt doorgegeven.
* React DOM werkt de DOM bij met het boiling verdict en zodat de gewenste input waarden getoond worden.
De input die we zojuist hebben bewerkt, ontvangt de huidige waarde en de andere input wordt bijgewerkt naar de temperatuur na de conversie.

Elke update gaat door deze zelfde stappen zodat de inputs gesynchroniseerd blijven.

## Les Geleerd {#lessons-learned}

Er moet een enkele "bron van waarheid" zijn voor alle gegevens die veranderen in een React applicatie.
Gewoonlijk wordt de staat eerst toegevoegd aan de component die deze nodig heeft voor zijn weergave.
Als dan andere componenten ze ook nodig hebben, kan je ze omhoog tillen naar hun meest nabije gemeenschappelijke voorvader.
In plaats van de staat tussen verschillende componenten proberen te synchroniseren, zou je moeten vertrouwen op de [top-down data flow](/docs/state-and-lifecycle.html#the-data-flows-down).

Het tillen van staat houdt het schrijven van meer "boilerplate" code in dan bidirectionele bindingsbenaderingen, maar als voordeel, kost het minder moeite om bugs to vinden en te isoleren.
Aangezien elke staat in een bepaalde component "leeft" en alleen die component ze kan veranderen, wordt de kans op fouten aanzienlijk verminderd.
Bovendien kun je aangepaste logica implementeren om gebruikersinvoer te weigeren of te transformeren.

Als iets kan afgeleid worden van props of state, zou het waarschijnlijk niet thuis horen in de state.
Bijvoorbeeld, in plaats van zowel `celsiusValue` als `fahrenheitValue` op te slaan, houden we enkel de laatst bewerkte `temperature` en de daarbij horende `scale` bij.
De waarde van de andere input kan altijd worden berekend met de `render()` methode.
Dit laat ons toe om afronding op het andere veld aan en uit te zetten zonder enige precisie van de gebruikersinvoer te verliezen.

Wanneer je iets verkeerd ziet in de gebruikersinterface, kun je [React Developer Tools](https://github.com/facebook/react-devtools) gebruiken om props te inspecteren en omhoog te gaan doorheen de boomstructuur totdat je de component vindt die verantwoordelijk is voor het bijwerken van de staat.
Hiermee kun je de bugs naar hun bron traceren:

<img src="../images/docs/react-devtools-state.gif" alt="Staat Controleren in React DevTools" max-width="100%" height="100%">
