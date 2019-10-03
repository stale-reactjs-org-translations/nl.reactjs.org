---
id: add-react-to-a-website
title: Add React to a Website
permalink: docs/add-react-to-a-website.html
redirect_from:
  - "docs/add-react-to-an-existing-app.html"
prev: getting-started.html
next: create-a-new-react-app.html
---

Gebruik zo weinig of veel mogelijk React als nodig.

React is vanaf het begin ontworpen voor een groeiende implementatie en **je kunt zo weinig of veel mogelijk Reacht gebruiken als je nodig hebt**. Misschien wil je alleen een "sausje van interactiviteit" toevoegen aan een bestaande pagina. React componenten zijn een fantastische manier om dat te doen!

De meerderheid van website zijn niet, en hoeven geen Single Page Applicatie te zijn. Met **een paar regels code en zonder build tooling**, kun je React uitproberen op een klein deel van je website. Je kunt ofwel langzaamaan de aanwezigheid uitbreiden, of het beperkt houden tot een paar dynamische widgets.

---

- [React toevoegen binnen een minuut](#add-react-in-one-minute)
- [Optioneel: Probeer React met JSX](#optional-try-react-with-jsx) (no bundler necessary!)

## React toevoegen binnen een minuut {#add-react-in-one-minute}

In deze sectie laten we zien hoe je een React component kunt toevoegen aan een bestaande HTML pagina. Je kunt dit deel volgen met je eigen website, of een leeg HTML bestande aanmaken om te oefenen.

We hebben geen gecompliceerde tools of installaties nodig. -- **om deze sectie te voltooien, heb je alleen een internet verbinding en een minuutje van je tijd nodig**.

Optioneel: [Download het volledige voorbeeld (2KB zipped)](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605/archive/f6c882b6ae18bde42dcf6fdb751aae93495a2275.zip)

### Stap 1: Voeg een DOM Container toe aan de HTML {#step-1-add-a-dom-container-to-the-html}

Start met het openen van de HTML pagina die je wilt bewerken. Voeg een lege `<div>` tag toe om aan te geven waar je iets met React wilt weergeven. Bijvoorbeeld:

```html{3}
<!-- ... bestaande HTML ... -->

<div id="like_button_container"></div>

<!-- ... bestaande HTML ... -->
```

We hebben deze `<div>` een uniek `id` HTML attribuut. Hiermee kunnen het het element later met JavaScript vinden en een React component er in tonen.

>Tip
>
>Je kunt een "containter" `<div>` zoals deze **overal** binnen een `<body>` tag plaatsen. Je kunt zo veel onafhankelijke DOM containers op een pagina plaatsen als je nodig hebt. Meestal zijn ze leeg -- React vervangt de content binnen de DOM containers.

### Stap 2: Voeg de Script Tags toe {#step-2-add-the-script-tags}

Voeg vervolgens drie `<script>` tags teo aan de HTML pagina net boven de sluitende `</body>` tag:

```html{5,6,9}
  <!-- ... overige HTML ... -->

  <!-- Inladen React. -->
  <!-- Noot: Bij deployen, vervang "development.js" door "production.min.js". -->
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

  <!-- Inladen van ons React component. -->
  <script src="like_button.js"></script>

</body>
```

De eerste twee tags laden React in. De derde laad de component code in.

### Stap 3: Aanmaken van een React Component {#step-3-create-a-react-component}

Maak een bestand aan met de naam `like_button.js` in dezelfde map als de HTML pagina.

Open **[deze start code](https://cdn.rawgit.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js)** en plak die in het aangemaakte bestand.

>Tip
>
>Deze code definieert een React component genaamd `LikeButton`. Maak je geen zorgen wanneer je het nog niet begrijpt -- we behandelen de bouwblokken van React later in de [hands-on tutorial](/tutorial/tutorial.html) en [hoofdconcepten gids](/docs/hello-world.html). Voor nu gaan we het component tonen op het scherm!

Voeg, na **[de start code](https://cdn.rawgit.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js)**, twee regels toe onderaan het bestand `like_button.js`:

```js{3,4}
// ... de starter code die je hebt geplakt ...

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);
```

Deze twee regels code vinden de `<div>` tag die we hebben toegevoegd in de eerste stap en tonen onze "Like" knop React component daarbinnen. 

### Dat was alles! {#thats-it}

Er is geen stap vier. **Je hebt zojuist je eerste React component toegevoegd aan je website.**

Lees ook de volgende sectie voor meer tips bij het integreren van React.

**[Bekijk de volledige broncode](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605)**

**[Download het volledige voorbeeld (2KB zipped)](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605/archive/f6c882b6ae18bde42dcf6fdb751aae93495a2275.zip)**

### Tip: Hergebruik van een Component {#tip-reuse-a-component}

Over het algemeen wil je React componenten op meerdere plaatsen op de HTML pagina kunnen tonen. Dit is een voorbeeld dat de "Like" knop drie keer toont en wat data doorgeeft aan het component:

[Bekijk de volledige voorbeeld broncode](https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda)

[Download het volledige voorbeeld (2KB zipped)](https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda/archive/9d0dd0ee941fea05fd1357502e5aa348abb84c12.zip)

>Noot
>
>Deze strategie is het meest geschikt wanneer verschillende React gedreven onderdelen van de pagina geïsoleerd functioneren ten opzichte van elkaar. Binnen de React code is het veel makkelijker om [component compositie](/docs/components-and-props.html#composing-components) te gebruiken.

### Tip: Minify JavaScript voor Productie {#tip-minify-javascript-for-production}

Voordat je je website naar productie deployed, wees er van bewust van niet gecomprimeerde JavaScript de pagina aanzienlijk kan vertragen.

Wanneer je je applicatie script al comprimeerd, **is je site productie klaar** wanneer je er voor zorgt dat de gedeployde HTML de versies van React inlaadt die eindigen op `production.min.js`:

```js
<script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
```

Heb je geen compressie stap voor je scripts, [is dit een manier om dat op te zetten](https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3).

## Optioneel: Probeer React met JSX {#optional-try-react-with-jsx}

In de voorbeelden hierboven, hebben we gebruik gemaakt van de eigenschappen die standaard ondersteund worden door de browsers. Om deze reden gebruikten we een JavaScript functie om React te vertellen wat weer te geven:

```js
const e = React.createElement;

// Weergeven van de "Like" <button>
return e(
  'button',
  { onClick: () => this.setState({ liked: true }) },
  'Like'
);
```

React biedt ook een optie om [JSX](/docs/introducing-jsx.html) te gebruiken:

```js
// Weergeven van de "Like" <button>
return (
  <button onClick={() => this.setState({ liked: true })}>
    Like
  </button>
);
```

De twee code voorbeelden zijn vergelijkbaar. Hoewel **JSX [volledig optioneel](/docs/react-without-jsx.html) is**, vinden veel mensen het handig bij het schrijven van UI code -- met zowel React als andere libraries.

Je kunt JSX uitproberen door gebruik te maken van [deze online converter](https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=Q&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2%2Cstage-3&prettier=true&targets=Node-6.12&version=6.26.0&envVersion=).

### Snel JSX uitproberen {#quickly-try-jsx}

De snelste manier om JSX uit te proberen in je project is door het volgende `<script>` tag toe te voegen aan je pagina:

```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

Nu kun je JSX in ieder `<script>` tag gebruiken door het `type="text/babel"` attribuut toe te voegen. Hier is [een voorbeeld HTML bestand met JSX](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html) wat je kunt downloaden om mee te spelen.

Deze aanpak is prima om het te leren en eenvoudige demos mee te maken. Het nadeel is dat deze methode je website langzaam maakt en **niet geschikt is voor productie**. Wanneer je klaar bent om verder te gaan, verwijder dan het `<script>` tag en de `type="text/babel"` attributen die je toegevoegd hebt. In plaats daarvan, ga je in de volgende sectie een JSX preprocessor instellen om alle `<script>` tags automatisch om te zetten.

### Voeg JSX toe aan een Project {#add-jsx-to-a-project}

Het toevoegen van JSX aan een project vereist geen gecompliceerde tools zoals bundelers of een development server. In wezen is het toevoegen van JSX **vergelijkbaar met het toevoegen van een CSS preprocessor**. De enige vereiste is dat je [Node.js](https://nodejs.org/) geïnstalleerd hebt op je computer.

Ga naar je project map in de terminal and plak deze twee commandos:

1. **Stap 1:** Voer uit `npm init -y` (wanneer er een fout ontstaat, [vind je hier een oplossing](https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d))
2. **Stap 2:** Voer uit: `npm install babel-cli@6 babel-preset-react-app@3`

>Tip
>
>We gebruiken **gebruiken npm hier alleen om de JSX preprocessor te installeren;** je hebt het nergens anders voor nodig. Zowel React als de applicatie code kunnen in de `<script>` tags blijven staan, zonder wijzigingen.

Gefeliciteerd! Je hebt zojuist een **productieklare JSX instelling** toegevoegd aan je project.

### Uitvoeren van een JSX Preprocessor {#run-jsx-preprocessor}

Maak een map aan genaamd `src` en voer het volgende commando uit in de terminal:

```
npx babel --watch src --out-dir . --presets react-app/prod 
```

>Noot
>
>`npx` is geen typefout -- het is een [package runner tool wat bij npm 5.2+ hoort](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).
>
>Als je een foutmelding ziet met de melding "You have mistakenly installed the `babel` package", heb je misschien de [de vorige stap](#add-jsx-to-a-project) gemist. Voer die uit in dezelfde map, en probeer het dan opnieuw.

Je hoeft niet te wachten tot dit commando afgelopen is -- het start een geautomatiseerde watcher voor JSX.

Wanneer je nu een bestand aanmaakt, genaamd `src/like_button.js` met deze **[JSX start code](https://cdn.rawgit.com/gaearon/c8e112dc74ac44aac4f673f2c39d19d1/raw/09b951c86c1bf1116af741fa4664511f2f179f0a/like_button.js)**, zal de watcher een verwerkte versie `like_button.js` met standaard JavaScript genereren, die geschikt is voor de browser. Wanneer je de broncode van dit bestand met JSX bewerkt, wordt dit automatisch getransformeerd.

Als bonus, laat dit je ook moderne JavaSCript syntax eigenschappen gebruiken, zoals klassen, zonder dat je je zorgen hoeft te maken over het breken in oudere browsers. De tool die we hebben toegevoegd heet Babel, en je kunt meer leren over Babel uit [haar documentatie](https://babeljs.io/docs/en/babel-cli/).

Als je merkt dat je comfortabel gebruik maakt van de build tools en je wilt dat ze meer voor je gaan werken, beschrijft [de volgende sectie](/docs/create-a-new-react-app.html) een aantal van de meest populaire en laagdrempelige oplossingen. Zo niet -- die script tags werken ook prima!
