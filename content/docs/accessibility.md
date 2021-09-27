---
id: accessibility
title: Accessibility
permalink: docs/accessibility.html
---

## Waarom je website toegankelijk maken? {#why-accessibility}

Webtoegankelijkheid (ook wel [**a11y**](https://en.wiktionary.org/wiki/a11y) genoemd) is het ontwerpen en maken van websites die door iedereen kunnen worden gebruikt. Toegankelijkheidsondersteuning is nodig om assisterende technologie webpagina's te laten interpreteren.

React ondersteunt het bouwen van toegankelijke websites volledig, vaak met behulp van standaard HTML-technieken.

## Normen en richtlijnen {#standards-and-guidelines}

### WCAG {#wcag}

De [Richtlijnen voor Toegankelijkheid van Webcontent](https://www.w3.org/WAI/intro/wcag) zijn richtlijnen voor het maken van toegankelijke websites.

De volgende WCAG-checklists geven een overzicht:

- [WCAG checklist van Wuhcag](https://www.wuhcag.com/wcag-checklist/)
- [WCAG checklist van WebAIM](https://webaim.org/standards/wcag/checklist)
- [Checklist van The A11Y Project](https://a11yproject.com/checklist.html)

### WAI-ARIA {#wai-aria}

Het document [Web Accessibility Initiative - Accessible Rich Internet Applications](https://www.w3.org/WAI/intro/aria) bevat technieken voor het bouwen van volledig toegankelijke JavaScript-widgets.

Merk op dat alle `aria-*` HTML-attributen volledig worden ondersteund in JSX. Terwijl de meeste DOM-eigenschappen en attributen in React camelCased zijn, moeten deze attributen een koppelteken bevatten (ook bekend als kebab-case, lisp-case, enz.) zoals ze in gewone HTML zijn:

```javascript{3,4}
<input
  type="text"
  aria-label={labelText}
  aria-required="true"
  onChange={onchangeHandler}
  value={inputValue}
  name="name"
/>
```

## Semantische HTML {#semantic-html}

Semantische HTML is de basis van toegankelijkheid in een webapplicatie. Door gebruik te maken van de verschillende HTML-elementen om de betekenis van de informatie op onze websites te versterken, komt er vaak vanzelf toegangelijkheidsondersteuning bij kijken.

- [MDN HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

Soms breken we HTML-semantiek wanneer we `<div>`-elementen aan onze JSX toevoegen om onze React-code te laten werken, vooral wanneer we werken met lijsten (`<ol>`, `<ul>` en `<dl>`) en de HTML `<tabel>`.
In deze gevallen zouden we liever [React Fragments](/docs/fragments.html) gebruiken om meerdere elementen te groeperen.

Bijvoorbeeld:

```javascript{1,5,8}
import React, { Fragment } from 'react';

function ListItem({ item }) {
  return (
    <Fragment>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  );
}

function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        <ListItem item={item} key={item.id} />
      ))}
    </dl>
  );
}
```

Je kan een verzameling items toewijzen aan een reeks fragmenten, net als elk ander type element:

```javascript{6,9}
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Fragments should also have a `key` prop when mapping collections
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```

Als je geen props op de Fragment-tag nodig hebt, kun je de [korte syntax](/docs/fragments.html#short-syntax) gebruiken, als je tooling dit ondersteunt:

```javascript{3,6}
function ListItem({ item }) {
  return (
    <>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </>
  );
}
```

Voor meer informatie, bekijk [de Fragments documentatie](/docs/fragments.html).

## Toegankelijkheidsformulieren {#accessible-forms}

### Labeling {#labeling}

Elk HTML-formulierbesturingselement, zoals `<input>` en `<textarea>`, moet toegankelijk worden gelabeld. We moeten beschrijvende labels leveren die ook zichtbaar zijn voor schermlezers.

De volgende bronnen laten ons zien hoe we dit kunnen doen:

- [De W3C laat ons zien hoe we elementen kunnen labelen](https://www.w3.org/WAI/tutorials/forms/labels/)
- [WebAIM laat ons zien hoe we elementen kunnen labelen](https://webaim.org/techniques/forms/controls)
- [De Paciello Group legt toegankelijke namen uit](https://www.paciellogroup.com/blog/2017/04/what-is-an-accessible-name/)

Hoewel deze standaard HTML-praktijken direct in React kunnen worden gebruikt, moet u er rekening mee houden dat het `for`-attribuut wordt geschreven als `htmlFor` in JSX:

```javascript{1}
<label htmlFor="namedInput">Name:</label>
<input id="namedInput" type="text" name="name"/>
```

### De gebruiker op de hoogte stellen van fouten {#notifying-the-user-of-errors}

Foutsituaties moeten door alle gebruikers worden begrepen. De volgende link laat ons zien hoe we foutteksten ook aan schermlezers kunnen tonen:

- [De W3C demonstreert gebruikersmeldingen](https://www.w3.org/WAI/tutorials/forms/notifications/)
- [WebAIM kijkt naar formuliervalidatie](https://webaim.org/techniques/formvalidation/)

## Focus controle {#focus-control}

Zorg ervoor dat je webtoepassing volledig met het toetsenbord kan worden bediend:

- [WebAIM praat over toetsenbordtoegankelijkheid](https://webaim.org/techniques/keyboard/)

### Toetsenbordfocus en focus omlijning {#keyboard-focus-and-focus-outline}

Toetsenbordfocus verwijst naar het huidige element in de DOM dat is geselecteerd om invoer van het toetsenbord te accepteren. We zien het overal als een focus omlijning vergelijkbaar met dat in de volgende afbeelding:

<img src="../images/docs/keyboard-focus.png" alt="Blue keyboard focus outline around a selected link." />

Gebruik alleen CSS die deze omlijning verwijdert, bijvoorbeeld door `outline: 0` in te stellen, als je het vervangt door een vergelijkbare focus omlijning-implementatie.

### Mechanismen om naar de gewenste inhoud te gaan {#mechanisms-to-skip-to-desired-content}

Bied een mechanisme waarmee gebruikers eerdere navigatiesecties in je toepassing kunnen overslaan, omdat dit de toetsenbordnavigatie ondersteunt en versnelt.

Skiplinks of Skip Navigation Links zijn verborgen navigatielinks die alleen zichtbaar worden wanneer toetsenbordgebruikers interactie hebben met de pagina. Ze zijn heel eenvoudig te implementeren met interne pagina-ankers en wat styling:

- [WebAIM - Skip Navigation Links](https://webaim.org/techniques/skipnav/)

Gebruik ook landmark-elementen en -rollen, zoals `<main>` en `<aside>`, om paginagebieden af te bakenen, aangezien ondersteunende technologie de gebruiker in staat stelt snel naar deze secties te navigeren.

Lees hier meer over het gebruik van deze elementen om de toegankelijkheid te vergroten:

- [Toegankelijke Landmarks](https://www.scottohara.me/blog/2018/03/03/landmarks.html)

### Programmatisch de focus beheren {#programmatically-managing-focus}

Onze React-applicaties wijzigen de HTML DOM continu tijdens runtime, wat er soms toe leidt dat de toetsenbordfocus verloren gaat of wordt ingesteld op een onverwacht element. Om dit te herstellen, moeten we de toetsenbordfocus programmatisch in de goede richting duwen. Bijvoorbeeld door de toetsenbordfocus opnieuw in te stellen op een knop die een popup heeft geopend nadat die popup terug gesloten is geweest.

MDN Web Docs bekijkt dit en beschrijft hoe we [toetsenbord-navigeerbare JavaScript-widgets] kunnen bouwen (https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets).

Om de focus in React in te stellen, kunnen we [Refs naar DOM elements](/docs/refs-and-the-dom.html) gebruiken.

Hiermee maken we eerst een ref (staat voor referentie) naar een element in de JSX van een componentklasse:

```javascript{4-5,8-9,13}
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // Maak een ref om het textInput DOM-element op te slaan
    this.textInput = React.createRef();
  }
  render() {
    // Gebruik de `ref` callback om een verwijzing naar het tekstinvoer
    // DOM-element op te slaan in een instantieveld (bijvoorbeeld
    // this.textInput).
    return (
      <input
        type="text"
        ref={this.textInput}
      />
    );
  }
}
```

Dan kunnen we het indien nodig ergens anders in onze component concentreren:

 ```javascript
 focus() {
   // Focus expliciet op de tekstinvoer met behulp van de onbewerkte DOM API
   // Opmerking: we hebben toegang tot "current" ("huidig") om de DOM-node te krijgen
   this.textInput.current.focus();
 }
 ```

Soms moet een bovenliggende component de focus instellen op een element in een onderliggende component. We kunnen dit doen door [DOM-refs bloot te stellen aan bovenliggende componenten](/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-componenten) via een speciale prop op het onderliggende component die de bovenliggende ref doorverwijst naar de onderliggende DOM-node.

```javascript{4,12,16}
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }
  render() {
    return (
      <CustomTextInput inputRef={this.inputElement} />
    );
  }
}

// Nu kun je de focus instellen wanneer dat nodig is.
this.inputElement.current.focus();
```

Bij gebruik van een HOC om componenten uit te breiden, wordt aanbevolen om [de ref door te sturen](/docs/forwarding-refs.html) naar de ingepakte component met behulp van de `forwardRef`-functie van React. Als een HOC van een derde partij ref forwarding niet implementeert, kan het bovenstaande patroon nog steeds als fallback worden gebruikt.

Een goed voorbeeld van focusbeheer is de [react-aria-modal](https://github.com/davidtheclark/react-aria-modal). Dit is een relatief zeldzaam voorbeeld van een volledig toegankelijk popup. Het stelt niet alleen de initiële focus op de annuleerknop (waardoor wordt voorkomen dat de toetsenbordgebruiker per ongeluk de succesactie activeert) en de toetsenbordfocus in de popup vasthoudt, het stelt ook de focus terug naar het element dat de popup aanvankelijk activeerde.

>Opmerking:
>
>Hoewel dit een zeer belangrijke toegankelijkheidsfunctie is, is het ook een techniek die oordeelkundig moet worden gebruikt. Gebruik het om de focusstroom van het toetsenbord te herstellen wanneer deze wordt verstoord, niet om te proberen te anticiperen op hoe gebruikers applicaties willen gebruiken.

## Muis- en aanwijzergebeurtenissen {#mouse-and-pointer-events}

Zorg ervoor dat alle functionaliteit die wordt weergegeven via een muis- of aanwijzergebeurtenis ook toegankelijk is via het toetsenbord. Afhankelijk zijn van alleen de aanwijzer zal leiden tot veel gevallen waarin toetsenbordgebruikers je toepassing niet kunnen gebruiken.

Laten we om dit te illustreren eens kijken naar een veelvoorkomend voorbeeld van verbroken toegankelijkheid veroorzaakt door klikgebeurtenissen. Dit is het externe klikpatroon, waarbij een gebruiker een geopende popover kan uitschakelen door buiten het element te klikken.

<img src="../images/docs/outerclick-with-mouse.gif" alt="Een schakelknop die een popover-lijst opent, geïmplementeerd met het 'buiten klikken' patroon en bediend met een muis om aan te geven dat de sluitactie werkt." />

Dit wordt meestal geïmplementeerd door een `click`-gebeurtenis toe te voegen aan het `window`-object dat de popover sluit:

```javascript{12-14,26-30}
class OuterClickExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.toggleContainer = React.createRef();

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  onClickOutsideHandler(event) {
    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    return (
      <div ref={this.toggleContainer}>
        <button onClick={this.onClickHandler}>Select an option</button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    );
  }
}
```

Dit kan prima werken voor gebruikers met aanwijsapparaten, zoals een muis, maar als u dit alleen met het toetsenbord doet, leidt dit tot defecte functionaliteit bij het tabben naar het volgende element, aangezien het `window`-object nooit een `click`-gebeurtenis ontvangt. Dit kan leiden tot verduisterde functionaliteit waardoor gebruikers uw applicatie niet kunnen gebruiken.

<img src="../images/docs/outerclick-with-keyboard.gif" alt="Een schakelknop die een popover-lijst opent, geïmplementeerd met het 'buiten klikken' patroon en bediend met het toetsenbord dat aangeeft dat de popover niet wordt gesloten bij blur en dat andere schermelementen worden verdoezeld." />

Dezelfde functionaliteit kan worden bereikt door in plaats daarvan de juiste gebeurtenishandlers te gebruiken, zoals `onBlur` en `onFocus`:

```javascript{19-29,31-34,37-38,40-41}
class BlurExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.timeOutId = null;

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  // We sluiten de popover bij het volgende vinkje met behulp
  // van setTimeout. Dit is nodig omdat we eerst moeten controleren
  // of een ander onderliggend element van het element focus heeft
  // gekregen als het blur event wordt geactiveerd voorafgaand aan
  // het nieuwe focus event.
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    });
  }

  // Als een onderliggend element focus krijgt, sluit de popover
  // dan niet.
  onFocusHandler() {
    clearTimeout(this.timeOutId);
  }

  render() {
    // React helpt ons door de blur en focus events door te
    // geven aan het bovenliggende element.
    return (
      <div onBlur={this.onBlurHandler}
           onFocus={this.onFocusHandler}>
        <button onClick={this.onClickHandler}
                aria-haspopup="true"
                aria-expanded={this.state.isOpen}>
          Select an option
        </button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    );
  }
}
```

Deze code stelt de functionaliteit bloot aan zowel aanwijzer- als toetsenbordgebruikers. Let ook op de toegevoegde `aria-*` props om gebruikers van schermlezers te ondersteunen. Omwille van de eenvoud zijn de toetsenbordgebeurtenissen om 'pijltoets'-interactie van de popover-opties mogelijk te maken niet geïmplementeerd.

<img src="../images/docs/blur-popover-close.gif" alt="Een popover-lijst die correct sluit voor zowel muis- als toetsenbordgebruikers." />

Dit is een voorbeeld van één van de vele gevallen waarin, afhankelijk van alleen aanwijzer- en muisgebeurtenissen, de functionaliteit voor toetsenbordgebruikers wordt verbroken. Altijd testen met het toetsenbord zal onmiddellijk de probleemgebieden markeren die vervolgens kunnen worden opgelost door toetsenbordbewuste gebeurtenishandlers te gebruiken.

## Meer complexe Widgets {#more-complex-widgets}

Een complexere gebruikerservaring mag niet leiden tot een minder toegankelijke. Terwijl toegankelijkheid het gemakkelijkst wordt bereikt door zo dicht mogelijk bij HTML te coderen, kan zelfs de meest complexe widget toegankelijk worden gecodeerd.

Hier hebben we kennis nodig van [ARIA-rollen](https://www.w3.org/TR/wai-aria/#roles) en van [ARIA-states en properties](https://www.w3.org/TR/wai-aria/#states_and_properties).
Dit zijn toolboxen gevuld met HTML-attributen die volledig worden ondersteund in JSX en ons in staat stellen om volledig toegankelijke, zeer functionele React-componenten te bouwen.

Elk type widget heeft een specifiek ontwerppatroon en wordt verwacht op een bepaalde manier te functioneren door zowel gebruikers als user agents:

- [WAI-ARIA Authoring Practices - Ontwerp Patronen en Widgets](https://www.w3.org/TR/wai-aria-practices/#aria_ex)
- [Heydon Pickering - ARIA voorbeelden](https://heydonworks.com/article/practical-aria-examples/)
- [Inclusive Components](https://inclusive-components.design/)

## Andere aandachtspunten {#other-points-for-consideration}

### De taal instellen {#setting-the-language}

Geef de menselijke taal van paginateksten aan, aangezien schermlezersoftware dit gebruikt om de juiste steminstellingen te selecteren:

- [WebAIM - Document Language](https://webaim.org/techniques/screenreader/#language)

### De documenttitel instellen {#setting-the-document-title}

Stel het document `<title>` in om de huidige pagina-inhoud correct te beschrijven, aangezien dit ervoor zorgt dat de gebruiker op de hoogte blijft van de huidige paginacontext:

- [WCAG - Het begrijpen van de Document Title vereiste](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-title.html)

We kunnen dit instellen in React met behulp van de [React Document Title Component](https://github.com/gaearon/react-document-title).

### Kleurcontrast {#color-contrast}

Zorg ervoor dat alle leesbare tekst op uw website voldoende kleurcontrast heeft om maximaal leesbaar te blijven voor slechtziende gebruikers:

- [WCAG - Het begrijpen van de kleurcontrast vereiste](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)
- [Alles over kleurcontrast en waarom je het zou moeten heroverwegen](https://www.smashingmagazine.com/2014/10/color-contrast-tips-and-tools-for-accessibility/)
- [A11yProject - Wat is kleurcontrast](https://a11yproject.com/posts/what-is-color-contrast/)

Het kan vervelend zijn om handmatig de juiste kleurencombinaties voor alle gevallen op uw website te berekenen, dus in plaats daarvan kunt u [een volledig toegankelijk kleurenpalet berekenen met Colorable](https://jxnblk.com/colorable/).

Zowel de Axe als de WAVE tools die hieronder worden genoemd, bevatten ook kleurcontrasttests en rapporteren over contrastfouten.

Als u uw mogelijkheden voor contrasttesten wilt uitbreiden, kunt u deze hulpmiddelen gebruiken:

- [WebAIM - Kleurcontrast-nakijker](https://webaim.org/resources/contrastchecker/)
- [The Paciello Group - Kleurcontrast-analysator](https://www.paciellogroup.com/resources/contrastanalyser/)

## Ontwikkelings- en testtools {#development-and-testing-tools}

Er zijn een aantal tools die we kunnen gebruiken om te helpen bij het maken van toegankelijke webapplicaties.

### Het toetsenbord {#the-keyboard}

Veruit de gemakkelijkste en ook een van de belangrijkste controles is om te testen of je hele website alleen met het toetsenbord kan worden bereikt en gebruikt. Doe dit door:

1. Uw muis loskoppelen.
1. Gebruik `Tab` en `Shift+Tab` om te bladeren.
1. Gebruik `Enter` om elementen te activeren.
1. Gebruik waar nodig de pijltoetsen op het toetsenbord om te communiceren met bepaalde elementen, zoals menu's en dropdowns.

### Ontwikkelingshulp {#development-assistance}

We kunnen enkele toegankelijkheidsfuncties rechtstreeks in onze JSX-code controleren. Vaak zijn intellisense-controles al voorzien in JSX-bewuste IDE's voor de ARIA-rollen, -statussen en -eigenschappen. We hebben ook toegang tot de volgende tool:

#### eslint-plugin-jsx-a11y {#eslint-plugin-jsx-a11y}

De [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) plug-in voor ESLint biedt AST-lintende feedback over toegankelijkheidsproblemen in uw JSX. Met veel IDE's kunt u deze bevindingen rechtstreeks integreren in code-analyse en broncodevensters.

[Create React App](https://github.com/facebookincubator/create-react-app) heeft deze plug-in met een subset van regels geactiveerd. Als u nog meer toegankelijkheidsregels wilt inschakelen, kunt u een `.eslintrc`-bestand in de hoofdmap van uw project maken met deze inhoud:

  ```json
  {
    "extends": ["react-app", "plugin:jsx-a11y/recommended"],
    "plugins": ["jsx-a11y"]
  }
  ```

### Toegankelijkheid testen in de browser {#testing-accessibility-in-the-browser}

Er bestaan een aantal tools die toegankelijkheidscontroles kunnen uitvoeren op webpagina's in uw browser. Gebruik ze in combinatie met andere toegankelijkheidscontroles die hier worden genoemd, omdat ze alleen de technische toegankelijkheid van uw HTML kunnen testen.

#### aXe, aXe-core en react-axe {#axe-axe-core-and-react-axe}

Deque Systems biedt [aXe-core](https://github.com/dequelabs/axe-core) voor geautomatiseerde en end-to-end toegankelijkheidstests van uw applicaties. Deze module bevat integraties voor Selenium.

[The Accessibility Engine](https://www.deque.com/products/axe/) of aXe, is een browserextensie voor toegankelijkheidsinspecteurs gebouwd op `aXe-core`.

U kunt ook de module [react-axe](https://github.com/dylanb/react-axe) gebruiken om deze toegankelijkheidsbevindingen rechtstreeks aan de console te rapporteren tijdens het ontwikkelen en debuggen.

#### WebAIM WAVE {#webaim-wave}

De [Web Accessibility Evaluation Tool](https://wave.webaim.org/extension/) is een andere toegankelijkheidsbrowserextensie.

#### Toegankelijkheidsinspecteurs en de toegankelijkheidsstructuur {#accessibility-inspectors-and-the-accessibility-tree}

[De toegankelijkheidssructuur](https://www.paciellogroup.com/blog/2015/01/the-browser-accessibility-tree/) is een subset van de DOM-tree die toegankelijke objecten bevat voor elk DOM-element dat moet worden weergegeven tot ondersteunende technologie, zoals schermlezers.

In sommige browsers kunnen we gemakkelijk de toegankelijkheidsinformatie bekijken voor elk element in de toegankelijkheidsstructuur:

- [Met de toegankelijkheidsinspecteur in Firefox](https://developer.mozilla.org/en-US/docs/Tools/Accessibility_inspector)
- [Met de toegankelijkheidsinspecteur in Chrome](https://developers.google.com/web/tools/chrome-devtools/accessibility/reference#pane)
- [Met de toegankelijkheidsinspecteur in OS X Safari](https://developer.apple.com/library/content/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html)

### Schermlezers {#screen-readers}

Testen met een schermlezer moet deel uitmaken van uw toegankelijkheidstests.

Houd er rekening mee dat combinaties van browser / schermlezer van belang zijn. Het wordt aanbevolen om uw toepassing te testen in de browser die het best geschikt is voor uw schermlezer naar keuze.

### Veelgebruikte schermlezers {#commonly-used-screen-readers}

#### NVDA in Firefox {#nvda-in-firefox}

[NonVisual Desktop Access](https://www.nvaccess.org/) of NVDA is een open source Windows-schermlezer die veel wordt gebruikt.

Raadpleeg de volgende handleidingen over hoe u NVDA het beste kunt gebruiken:

- [WebAIM - NVDA gebruiken om Webtoegankelijkheid te evalueren](https://webaim.org/articles/nvda/)
- [Deque - NVDA Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts)

#### VoiceOver in Safari {#voiceover-in-safari}

VoiceOver is een geïntegreerde schermlezer op Apple-apparaten.

Raadpleeg de volgende handleidingen voor het activeren en gebruiken van VoiceOver:

- [WebAIM - VoiceOver gebruiken om Webtoegankelijkheid te evalueren](https://webaim.org/articles/voiceover/)
- [Deque - VoiceOver voor OS X Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts)
- [Deque - VoiceOver voor iOS Shortcuts](https://dequeuniversity.com/screenreaders/voiceover-ios-shortcuts)

#### JAWS in Internet Explorer {#jaws-in-internet-explorer}

[Job Access With Speech](https://www.freedomscientific.com/Products/software/JAWS/) of JAWS, is een veelgebruikte schermlezer op Windows.

Raadpleeg de volgende handleidingen over hoe u JAWS het beste kunt gebruiken:

- [WebAIM - JAWS gebruiken om Webtoegankelijkheid te evalueren](https://webaim.org/articles/jaws/)
- [Deque - JAWS Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts)

### Andere schermlezers {#other-screen-readers}

#### ChromeVox in Google Chrome {#chromevox-in-google-chrome}

[ChromeVox](https://www.chromevox.com/) is een geïntegreerde schermlezer op Chromebooks en is beschikbaar [als een extensie](https://chrome.google.com/webstore/detail/chromevox/kgejglhpjiefppelpmljglcjbhoiplfn?hl=nl) voor Google Chrome.

Raadpleeg de volgende handleidingen over hoe u ChromeVox het beste kunt gebruiken:

- [Google Chromebook Help - De ingebouwde schermlezer gebruiken](https://support.google.com/chromebook/answer/7031755?hl=en)
- [ChromeVox Classic Keyboard Shortcuts Reference](https://www.chromevox.com/keyboard_shortcuts.html)
