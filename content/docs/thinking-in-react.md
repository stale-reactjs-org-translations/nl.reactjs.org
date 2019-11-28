---
id: thinking-in-react
title: Denken in React
permalink: docs/thinking-in-react.html
redirect_from:
  - 'blog/2013/11/05/thinking-in-react.html'
  - 'docs/thinking-in-react-zh-CN.html'
prev: composition-vs-inheritance.html
---

React is, volgens ons, de beste manier om grote, snelle Web apps te bouwen met JavaScript. Het schaalt heel goed met ons mee bij Facebook en Instagram.

Eén van de vele goede aspecten van React is hoe het je laat denken over apps terwijl je ze bouwt. In dit document lopen we met je door het denkproces voor het bouwen van een doorzoekbare produkttabel met React.

## Begin Met Een Mock {#start-with-a-mock}

Stel je voor dat we al een JSON API hebben en een mockup van onze designer. The mockup ziet er zo uit:

![Mockup](../images/blog/thinking-in-react-mock.png)

Onze JSON API geeft data die er als volgt uit ziet:

```
[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
```

## Stap 1: Splits De UI In Een Componenten Hiërarchie {#step-1-break-the-ui-into-a-component-hierarchy}

Het eerste dat je wilt doen is vakken in de mockup tekenen rond iedere component (en subcomponent) en die namen geven. Als je met een designer werkt, hebben ze dat misschien al gedaan, dus ga met ze praten! Hun Photoshop layer namen zouden best kunnen eens de namen van jou React componenten kunnen worden!

Maar hoe weet je wat zijn eigen component zou moeten zijn? Precies dezelfde technieken als voor het beslissen of je een nieuw object of nieuwe functie moet maken. One such technique is the [single responsibility principe](https://en.wikipedia.org/wiki/Single_responsibility_principle), die luid dat een component idealiter maar één ding zou moeten doeng. Als hij later groeit, zou het ontbonden moeten worden in kleinere subcomponeneten.

Omdat je vaak een JSON datamodel weergeeft, zul je zien dat als je model correct is opgebouwd, de UI (en dus de componentstructuur) het netjes indeelt. Dat is omdat UI- en datamodellen de neiging hebben zich te houden aan dezelfde *informatie architectuur*, wat inhoud dat het werk van het scheiden van de UI in componenten vaak triviaal is. Breek het gewoon op in componenten die precies één stuk van het datamodel weergeven.

![Component diagram](../images/blog/thinking-in-react-components.png)

Je zult zien dat we vijf componenten hebben in onze simplele app. We hebben de data die de component vertegenwoordigd schuin gedrukt.

  1. **`FilterableProductTable` (oranje):** bevat het gehele voorbeeld
  2. **`SearchBar` (blauw):** ontvangt alle *user input*
  3. **`ProductTable` (groen):** toont en filters de *data set* op basis van de *user input*
  4. **`ProductCategoryRow` (turquoise):** toont een kop voor elke *category*
  5. **`ProductRow` (red):** toont een rij vooer elk *product*

Als je kijkt naar de `ProductTable`, zie je dat de tabel-header (die de labels "Name" en "Price" bevat) niet een zelfstandig component is. Dit is een kwestie van voorkeur, en je kunt een betoog voeren voor beide mogelijkheden. In dit voorbeeld, hebben we het als onderdeel van de `ProductTable` gelaten, omdat het een onderdeel is van het renderen van de *data collectie*, waarvoor de `ProductTable` verantwoordelijk is. Echter, als deze header complex wordt (bijvoorbeeld als we sorteermogelijkheden toevoegen), zou het zeker logisch zijn om er een zelfstandig `ProductTableHeader` component van te maken.

Nu we de componenten in onze mockup hebben geïdentificeerd gaan we ze in een hiërarchie rangschikken. Dat is makkelijk. Componenten die, in de mockup, binnenin een ander component staan moeten als child in de hiërarchie staan:

  * `FilterableProductTable`
    * `SearchBar`
    * `ProductTable`
      * `ProductCategoryRow`
      * `ProductRow`

## Stap 2: Bouw Een Statische Versie in React {#step-2-build-a-static-version-in-react}

<p data-height="600" data-theme-id="0" data-slug-hash="BwWzwm" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen">Bekijk de Pen <a href="https://codepen.io/gaearon/pen/BwWzwm">Denken In React: Stap 2</a> op <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Nu je je component hiërarchie hebt, is het tijd om je app te implementeren. De makkelijkste manier is om een versie te bouwen die je datamodel accepteert en de UI rendert, maar geen interactiviteit heeft. Het is het beste om deze processen the ontkoppelen, omdat voor het bouwen van een statische versie veel typewerk en weinig denkwek nodig is. We zullen zien waarom.

Om een statische versie van je app te bouwen die je datamodel rendert, wil je componenten bouwen die andere componenten hergebruiken en data doorgeven in *props*. *props* zijn een methode om data door te geven van parent naar child. Mocht je bekend zijn met het concept *state*, **gebruik helemaal geen state** om deze statische versie te bouwen. State is voorbehouden voor interactiviteit, dat wil zeggen, gegevens in die loop van de tijd veranderen. Omdat dit een statische versie van de app is, heb je het niet nodig.

Je kunt top-down of bottom-up bouwen. Dat wil zeggen, je kunt beginnen met het opbouwen van de componenten hoger in de hiërarchie (dus beginnend met `FilterableProductTable`) of met degenen lager daarin (`ProductRow`). In eenvoudigere voorbeelden, is het doorgaans makkelijker top-down te werken, en bij grotere projecten, is het makkelijker om bottom-up te werken en tests te schrijven terwijl je bouwt.

Aan het einde van deze stap, heb je een bibliotheek van herbruikbare componenten die je datamodel renderen. De componenten hebben alleen een `render()` methode hebben omdat dit een statische versie is van je app. De component bovenaan de hiërarchie (`FilterableProductTable`) accepteerd je datamodel als een prop. Als je een aanpassing doet in het onderliggende datamodel en `ReactDOM.render()` render opnieuw aanroept, wordt de UI bijgewerkt. Het is makkelijk in te zien hoe je UI wordt bijgewerkt and waar je wijzigingen moet maken omdat er niets ingewikkelds gebeurt. React's **one-way data flow** (ookwel *one-way binding*) houdt alles modulair en snel.

Raadpleeg gewoon de [React docs](/docs/) als je hulp nodig hebt bij het uitvoeren van deze stap.

### Een Kort Intermezzo: Props versus State {#a-brief-interlude-props-vs-state}

Er zijn twee typen "model" data in React: props en state. Het is belangrijk het verschil tussen die twee te begrijpen; blader door [de officiële React docs](/docs/interactivity-and-dynamic-uis.html) als je er niet zeker van bent wat het verschil is.

## Stap 3: Bepaal De Minimale (maar complete) Weergave Van De UI State {#step-3-identify-the-minimal-but-complete-representation-of-ui-state}

Om je UI interactief te maken moet je in staat zijn veranderingen te veroorzaken in je onderliggende data model. React maakt dit makkelijk met **state**.

Om je app correct te bouwen, moet je eerst denken aan de minimale set van veranderlijke state die je app nodig heeft. De sleutel is hier [DRY: *Don't Repeat Yourself*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Zoek uit wat de absolute minimale state vertegenwoordigt die je applicatie nodig heeft en bereken de benodigde rest on-demand. Bijvoorbeeld, als je een TODO lijst aan het bouewen bent, For example, if you're building a TODO list, hou gewoon een array met TODO items bij; hou geen aparte state variable voor het aantal items bij. Neem in plaats daarvan, als je de count wilt renderen, gewoon de lengte van de array met TODO items.

Denk aan alle stukjes data in onze voorbeeld applicatie. We hebben:

  * De oorspronkelijke lijst met produkten
  * De zoektekst die de gebruiker heeft ingevoerd
  * De waarde van de checkbox
  * De gefilterde lijst met met produkten

Laten we ze één voor één aflopen en uitzoeken welke state zijn. Stel eenvoudigweg drie vragen over elke stukje data:

  1. Wordt het doorgegeven vanuit een parent via props? Als dat zo is betreft het geen state.
  2. Blijft het ongewijzigd bij het verlopen van de tijd? Als dat zo is betreft het waarschijnlijk geen state.
  3. Kun je het berekenen uit andere state of props in je component? Als dat zo is betreft het geen state.

De oorspronkelijke lijst met produkten wordt doorgegeven als props, dus dat is geen state. De zoektekst en de checkbox lijken state te zijn om dat ze op enig moment kunnen veranderen en niet uit iets anders kunnen worden berekend. En ten slotte, is de gefilterde lijst met produkten geen state omdat die berekend kan worden door de oorspronkelijke lijst met produkten te combineren met de zoektekst en de waarde van de checkbox.

Dus uiteindelijke is onze state:

  * De zoektekst die de gebruiker heeft ingevoerd
  * De waarde van de checkbox

## Stap 4: Bepaal Waar Jou State Zou Moeten Wonen {#step-4-identify-where-your-state-should-live}

<p data-height="600" data-theme-id="0" data-slug-hash="qPrNQZ" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen">Bekijk de Pen <a href="https://codepen.io/gaearon/pen/qPrNQZ">Denken In React: Stap 4</a> op <a href="https://codepen.io">CodePen</a>.</p>

OK, we hebben dus bepaald wat de minimale set aan app state is. Vervolgens, moeten we identificeren welke component deze state aanpast of bezit (own). we need to identify which component mutates, or *owns*, this state.

Onthoud: In React draait alles om de eenrichtingsstroom gegevensstroom (one-way data flow) naar beneden door de componenten hiërarchie. Het is soms niet meteen duidelijk welke component de state zou moeten bezitten. **Dit is vaak het  meest uitdagende gedeelte om te begrijpen voor nieuwkomers,** volg dus de volgende stappen om dat uit te zoeken:

Voor elk stukje state in je applicatie:

  * Indentificeer iedere component die iets rendert op basis van die state.
  * Vindt een gemeenschappelijk owner component (een enkele component boven alle componenten in de hiërarchie die deze state nodig hebben).
  * Of de gemeenschappelijke owner, of een component hoger in de hiërarchie zou eigenaar moeten zijn van de state.
  * Als je geen component kunt vinden die logischerwijs eigenaar van de state kan zijn, creëer een nieuwe component simpelweg om de state van te houden en voeg het ergens boven de gemeenschappelijke owner component in de hiërarchie toe.

Laten we door deze strategie voor onze applicatie heen lopen:

  * `ProductTable` moet de lijst met produkten filteren met behulp van state en `SearchBar` moet de zoektekst en de waarde van de checkbox weergeven.
  * De gemeenschappelijke owner component is `FilterableProductTable`.
  * Het is conceptueel logisch dat de tekst van het filter en de checkbox waarden wonen in `FilterableProductTable`

Cool, we hebben dus besloten dat onze state woont in `FilterableProductTable`. Voeg eerst een instance property `this.state = {filterText: '', inStockOnly: false}` toe aan `FilterableProductTable`'s `constructor` om de initiële state van onze applicatie is. Geef dan `filterText` en `inStockOnly` door aan `ProductTable` en `SearchBar` als een prop. Ten slotte, gebruik deze props om de rijen van de `ProductTable` te filteren en stel de waarden van de velden van het formulier van `SearchBar` in.

Je kunt nu langzaam inzien hoe je applicatie zich zal gedragen: stel `filterText` in op `"ball"` en ververs je app. Je zult zien dat de data tabel correct wordt aangepast.

## Stap 5: Voeg Inverse Data Flow Toe {#step-5-add-inverse-data-flow}

<p data-height="600" data-theme-id="0" data-slug-hash="LzWZvb" data-default-tab="js,result" data-user="rohan10" data-embed-version="2" data-pen-title="Thinking In React: Step 5" class="codepen">Bekijk de Pen <a href="https://codepen.io/gaearon/pen/LzWZvb">Denken In React: Stap 5</a> op <a href="https://codepen.io">CodePen</a>.</p>

Tot zover hebben we een app gebouwd die correct rendert als een functie van de props en state die naar beneden stroomt door de hiërarchie. Nu is het tijd om data flow in de andere richting te ondersteunen: de form componenten diep in de hiërarchie moeten de state in `FilterableProductTable` kunnen aanpassen.

React maakt deze data flow expliciet om makkelijker te begrijpen te maken how je programma werkt, maar het vereist wel iets meer typewerk dan bij traditionele two-way data binding.

Als je probeert de input of the checkbox aan te passen wordt je invoer in de huidige versie genegeerd. Dat is met opzet, omdat we de `value` prop van de `input` altijd gelijk aan de `state` doorgeven vanuit `FilterableProductTable`.

Laten we eens nadenken over wat we willen dat er gebeurd. We willen er voor zorgen dat telkens als de gebruiker het form wijzigt, we de state aanpassen zodat die de invoer weergeeft. Omdat componenten alleen hun eiegen state moeten aanpassen, zal `FilterableProductTable` callbacks doorgeven aan `SearchBar` die aangeroepen worden wanneer de status aangepast moet worden. We kunnen het `onChange` event van de inputs gebruiken om daarvan op de hoogte te worden gebracht. De callbacks doorgegeven door `FilterableProductTable` zullen `setState()` aanroepen, de app wordt bijgewerkt.

Hoewel dit ingewikkeld klinkt, is het in feite maar een paar regels code. En het is echt expliciet hoe je data door je hele app stroomt.

## En Dat Is Het {#and-thats-it}

Hopelijk geeft dit je een idee hoe je moet nadenken over het bouwen van componenten en applicaties in React. Hoewel het misschien wat meer typewerk is dan je gewend bent, onthoud dan dat code veel meer wordt gelezen dan geschreven, en het is uiterst eenvoudig om deze modulaire, expliciete code te lezen. Wanneer je begint met het bouwen van grote bibliotheken van componenten, zul je deze explicietheid en modulariteit waarderen, en met hergebruik van code zal het gebruikte aantal regels code beginnen te slinken. :)
