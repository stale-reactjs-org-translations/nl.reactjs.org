---
id: hooks-intro
title: Introductie tot Hooks
permalink: docs/hooks-intro.html
next: hooks-overview.html
---

*Hooks* zijn een nieuwe toevoeging in React 16.8. Ze maken het mogelijk om state en andere React features te gebruiken zonder dat je een class hoeft te schrijven.

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Declareer een nieuwe state variabele, die we "count" zullen noemen
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Je hebt {count} keer geklikt</p>
      <button onClick={() => setCount(count + 1)}>
        Klik op me
      </button>
    </div>
  );
}
```

De nieuwe functie `useState` is de eerste "Hook" waarover we zullen leren, maar dit voorbeeld is alleen een voorproefje. Maak je geen zorgen als het nog niet duidelijk is!

**Je kunt beginnen met leren over Hooks [op de volgende pagina](/docs/hooks-overview.html).** Op die pagina, zullen we verder gaan door uit te leggen waarom we Hooks aan React toevoegen en hoe ze kunnen helpen om goede applicaties te bouwen.

>Opmerking
>
<<<<<<< HEAD
>React 16.8.0 is de eerste release die Hooks ondersteunt. Vergeet niet alle packages te updaten wanneer je upgradet, inclusief React DOM. 
>React Native ondersteunt Hooks sinds [de 0.59 release van React Native (Engels)](https://reactnative.dev/blog/2019/03/12/releasing-react-native-059).
=======
>React 16.8.0 is the first release to support Hooks. When upgrading, don't forget to update all packages, including React DOM.
>React Native has supported Hooks since [the 0.59 release of React Native](https://reactnative.dev/blog/2019/03/12/releasing-react-native-059).
>>>>>>> 19aa5b4852c3905757edb16dd62f7e7506231210

## Introductievideo {#video-introduction}

Op React Conf 2018 hebben Sophie Alpert en Dan Abramov Hooks geïntroduceerd, gevolgd door Ryan Florence die gedemonstreerd heeft hoe je een applicatie refactort om ze te kunnen gebruiken. Bekijk de video hier:

<br>

<iframe width="650" height="366" src="//www.youtube.com/embed/dpw9EHDh2bM" frameborder="0" allowfullscreen></iframe>

## Geen Breaking Changes {#no-breaking-changes}

Merk voordat we verder gaan op: Hooks zijn:

* **Volledig opt-in.** Je kunt Hooks uitproberen in een paar componenten zonder bestaande code te herschrijven. Maar je hoeft niet nu meteen te leren hoe je Hooks moet gebruiken als je dat niet wilt.
* **100% backwards-compatible.** Hooks bevatten geen breaking changes.
* **Nu beschikbaar.** Hooks zijn nu beschikbaar met de release van v16.8.0.

**Er zijn geen plannen om classes te verwijderen uit React.** Je kunt meer lezen over de geleidelijke adoptiestrategie voor Hooks [onderaan](#gradual-adoption-strategy) deze pagina.

**Hooks vervangen niet je kennis van React concepten.** In plaats daarvan bieden Hooks een meer directe API voor de React concepten die je al kent: props, state, context, refs, en lifecycle. Zoals we later zullen laten zien bieden Hooks ook een nieuwe krachtige manier om ze te combineren.

**Als je enkel wilt beginnen met het leren van Hooks, voel je vrij om [direct naar de volgende pagina te springen!](/docs/hooks-overview.html)** Je kunt ook deze pagina blijven lezen om meer te leren over waarom we Hooks toevoegen en over hoe we ze gaan gebruiken zonder onze applicaties te herschrijven.

## Motivatie {#motivation}

Hooks lossen een breed scala van schijnbaar ongerelateerde problemen op in React die we tegen zijn gekomen gedurende de vijf jaar dat we tienduizenden componenten geschreven en onderhouden hebben. Of je nu React aan het leren bent, dagelijks gebruikt of zelfs een andere library prefereert met een vergelijkbaar component model, je zou sommige van deze problemen kunnen herkennen.

### Het is moeilijk om logica met state te hergebruiken in componenten {#its-hard-to-reuse-stateful-logic-between-components}

React biedt geen manier om herbruikbaar gedrag aan een component te "hechten" (bijvoorbeeld om het aan een store te koppelen). Als je al een tijd met React hebt gewerkt, zul je waarschijnlijk al bekend zijn met patronen zoals [render props](/docs/render-props.html) en [higher-order components](/docs/higher-order-components.html) die dat proberen op te lossen. Maar om deze patronen te kunnen gebruiken moet je je componenten herstructureren, wat lastig kan zijn, en het maakt je code moeilijk te volgen. Als je naar een typische React applicatie kijkt met React DevTools, zul je waarschijnlijk een "wrapper hell" van componenten vinden, die omringd zijn met providers, consumers, higher-order componenten, render props en andere abstracties. Hoewel we die [uit DevTools kunnen filteren (Engels)](https://github.com/facebook/react-devtools/pull/503), wijst dit op een dieper onderliggend probleem: React heeft een beter principe nodig om logica met state te delen.

Met Hooks kun je logica met state extraheren uit een component, zodat deze onafhankelijk kan worden getest en hergebruikt. **Hooks laten je logica met state hergebruiken zonder aanpassingen in je componenten hiërarchie.** Dit maakt het eenvoudig om Hooks te delen met componenten of met de community.

We zullen dit verder bespreken in [Bouw Je Eigen Hooks](/docs/hooks-custom.html).

### Complexe componenten worden moeilijk te begrijpen {#complex-components-become-hard-to-understand}

We hebben vaak componenten moeten onderhouden die eenvoudig begonnen, maar uitgroeiden tot een ononderhoudbare brei van logica met state en neveneffecten. Iedere lifecycle methode bevat vaak een mix van ongerelateerde logica. Bijvoorbeeld, componenten kunnen het ophalen van data uitvoeren in `componentDidMount` en `componentDidUpdate`. Echter, dezelfde `componentDidMount` methode kan ook ongerelateerde logica bevatten om event listeners op te zetten, met opruim-code die uitgevoerd wordt in `componentWillUnmount`. Wederzijds gerelateerde code die altijd gelijktijdig wordt aangepast, wordt dus gescheiden, terwijl volledig ongerelateerde code wordt gecombineerd in één enkele methode. Dit maakt dat er makkelijk bugs en inconsistenties kunnen worden geïntroduceerd.

In veel gevallen is het niet mogelijk om deze componenten op te splitsen in kleinere componenten omdat de logica met state overal verspreid is. Het is ook moeilijk om ze te testen. Dit is één van de redenen waarom veel mensen ervoor kiezen om React te combineren met een aparte state management library, maar dat introduceert vaak te veel abstractie. Je moet constant tussen verschillende bestanden heen en weer springen en het maakt hergebruik van componenten moeilijker.

Om dit op te lossen **laten Hooks je een component opsplitsen in kleinere functies gebaseerd op welke onderdelen gerelateerd zijn (zoals het opzetten van een subscription of het ophalen van data)**, in plaats van splitsingen te forceren op basis van lifecycle methoden. Je kunt er ook voor kiezen om de lokale state van een component te managen met een reducer, om hem voorspelbaarder te maken.

We zullen dit verder bespreken in [De Effect Hook](/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns).

### Classes verwarren zowel mensen als machines {#classes-confuse-both-people-and-machines}

<<<<<<< HEAD
Naast het moeilijker maken van hergebruik en organisatie van code hebben we gemerkt dat classes ook een groot obstakel kunnen zijn bij het leren van React. Je moet begrijpen hoe `this` werkt in JavaScript, wat heel afwijkend is van hoe dat werkt in de meeste andere talen. Je moet er aan denken om de event handlers te binden. Zonder instabiele [syntax voorstellen (Engels)](https://babeljs.io/docs/en/babel-plugin-transform-class-properties/) is de code erg breedsprakig. Mensen kunnen props, state en top-down data flow prima begrijpen maar toch worstelen met classes. Het verschil tussen functie- en class componenten in React en wanneer je welke moet gebruiken leidt tot onenigheid, zelfs onder ervaren React developers.
=======
In addition to making code reuse and code organization more difficult, we've found that classes can be a large barrier to learning React. You have to understand how `this` works in JavaScript, which is very different from how it works in most languages. You have to remember to bind the event handlers. Without [ES2022 public class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#public_instance_fields), the code is very verbose. People can understand props, state, and top-down data flow perfectly well but still struggle with classes. The distinction between function and class components in React and when to use each one leads to disagreements even between experienced React developers.
>>>>>>> 19aa5b4852c3905757edb16dd62f7e7506231210

Daarnaast is React er nu zo'n vijf jaar en willen we ervoor zorgen dat het de volgende vijf jaar relevant blijft. Zoals [Svelte (Engels)](https://svelte.dev/), [Angular (Engels)](https://angular.io/), [Glimmer (Engels)](https://glimmerjs.com/) en anderen laten zien, heeft [ahead-of-time compilation (Engels)](https://en.wikipedia.org/wiki/Ahead-of-time_compilation) van componenten veel toekomstig potentieel. Vooral als dat niet gelimiteerd is tot templates. Recentelijk hebben we geëxperimenteerd met [component folding (Engels)](https://github.com/facebook/react/issues/7323) gebruikmakend van [Prepack (Engels)](https://prepack.io/) en hebben we veelbelovende eerste resultaten gezien. Maar, we vonden dat class componenten onbedoelde patronen kunnen aanmoedigen, waardoor deze optimalisaties terugvallen naar een langzamer pad. Classes geven ook problemen met tools van vandaag de dag. Zo worden classes niet zo goed ge-minified, en maken ze "hot reloading" slordig en onbetrouwbaar. We willen een API presenteren die het aannemelijker maakt dat code op het optimaliseerbare pad blijft.

Om deze problemen op te lossen, **laten Hooks je meer van React's features gebruiken zonder classes.** Conceptueel gezien hebben React componenten altijd al dichter aangeleund tegen functies. Hooks omarmen functies, maar zonder de praktische aard van React op te offeren. Hooks bieden toegang tot imperatieve ontsnappingsluiken en vereisen niet dat je complexe functional of reactive programmeertechnieken leert.

>Voorbeelden
>
>[Hooks een Overzicht](/docs/hooks-overview.html) is een goede plek om te beginnen met het leren over Hooks.

## Geleidelijke Adoptiestrategie {#gradual-adoption-strategy}

>**TLDR: Er zijn geen plannen om classes uit React te verwijderen.**

We weten dat React developers gefocused zijn op producten maken en niet de tijd hebben om zich te verdiepen in iedere nieuwe API die wordt uitgebracht. Hooks zijn heel nieuw, en het is misschien beter om te wachten op meer voorbeelden en tutorials, voordat je overweegt ze te leren of te gebruiken.

<<<<<<< HEAD
We begrijpen ook dat de lat voor het toevoegen van een nieuw principe aan React extreem hoog ligt. Voor nieuwsgierige lezers hebben we een [uitgebreide RFC (Engels)](https://github.com/reactjs/rfcs/pull/68) gemaakt die in meer detail duikt in de motivatie, en extra perspectief biedt op de specifieke ontwerpbeslissingen en stand van de techniek.

**Belangrijker, Hooks werken zij-aan-zij met bestaande code, dus kun je ze geleidelijk adopteren.** Er is geen haast om te mirgeren naar Hooks. We raden aan om "groot herschrijven" te voorkomen, vooral voor bestaande, complexe class componenten. Er is een kleine omslag nodig om te gaan "denken in Hooks". Onze ervaring leert, dat de beste manier is om Hooks eerst te gebruiken in niet-kritische componenten, en zeker te stellen dat iedereen in je team zich er comfortabel mee voelt. Voel je vrij om, nadat je Hooks hebt uitgeprobeert, [ons feedback te sturen (Engels)](https://github.com/facebook/react/issues/new), positief of negatief.
=======
We also understand that the bar for adding a new primitive to React is extremely high. For curious readers, we have prepared a [detailed RFC](https://github.com/reactjs/rfcs/pull/68) that dives into the motivation with more details, and provides extra perspective on the specific design decisions and related prior art.

**Crucially, Hooks work side-by-side with existing code so you can adopt them gradually.** There is no rush to migrate to Hooks. We recommend avoiding any "big rewrites", especially for existing, complex class components. It takes a bit of a mind shift to start "thinking in Hooks". In our experience, it's best to practice using Hooks in new and non-critical components first, and ensure that everybody on your team feels comfortable with them. After you give Hooks a try, please feel free to [send us feedback](https://github.com/facebook/react/issues/new), positive or negative.
>>>>>>> 19aa5b4852c3905757edb16dd62f7e7506231210

Onze intentie is dat Hooks alle bestaande use cases van classes overlappen, maar **we zullen class componenten blijven ondersteunen in de voorzienbare toekomst.** Bij Facebook, hebben we tienduizenden componenten geschreven als classes, en we hebben absoluut geen plannen die te herschrijven. In plaats daarvan, beginnen we Hooks te gebruiken in nieuwe code zij-aan-zij met classes.

## Veel Gestelde Vragen (FAQ) {#frequently-asked-questions}

We hebben een [Hooks FAQ pagina](/docs/hooks-faq.html) gemaakt die de meest algemene vragen over Hooks beantwoordt.

## Volgende Stappen {#next-steps}

Aan het einde van deze pagina, zou je een globaal idee moeten hebben welke problemen Hooks oplossen, maar veel details zijn waarschijnlijk nog niet helder. Geen zorgen! **Laten we naar [de volgende pagina](/docs/hooks-overview.html) gaan waar we beginnen met leren over Hooks aan de hand van voorbeelden.**
