---
id: hooks-intro
title: Introductie tot Hooks
permalink: docs/hooks-intro.html
next: hooks-overview.html
---

*Hooks* zijn een nieuwe toevoeging in React 16.8. Ze maken het mogelijk om state en andere React voorzieningen te gebruiken zonder dat je een class hoeft te schrijven.

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

Deze nieuwe functie `useState` is de eerste "Hook" waarover we zullen leren, maar dit voorbeeld is maar een lokkertje. Geeft niks als je het nog niet begrijpt!

**Je kunt beginnen met leren over Hooks [op de volgende pagina](/docs/hooks-overview.html).** Op die pagina, zullen we verder gaan door uit te leggen waarom we Hooks aan React toevoegen en hoe ze kunnen helpen om goede applicaties te maken.

>Opmerking
>
>React 16.8.0 is de eerste release die Hooks ondersteund. Vergeet niet alle packages te updaten als je upgrade, ook React DOM. React Native zal Hooks ondersteunen in de volgende stable release.

## Video Introductie {#video-introduction}

Op React Conf 2018, hebben Sophie Alpert en Dan Abramov Hooks geïntroduceerd, gevolgd door Ryan Florence die demonstreert hoe je een applicatie refactored om ze te gebruiken. Bekijk de video hier:

<br>

<iframe width="650" height="366" src="//www.youtube.com/embed/dpw9EHDh2bM" frameborder="0" allowfullscreen></iframe>

## Geen Breaking Changes {#no-breaking-changes}

Voor we verder gaan, Hooks zijn:

* **Volledig opt-in.** Je kunt Hooks uit proberen in een paar componenten zonder code te herschrijven. Maar je hoeft niet nu meteen te leren hoe je Hooks moet gebruiken als je dat niet wilt.
* **100% backwards-compatible.** Hooks bevatten geen breaking changes.
* **Nu beschikbaar.** Hooks zijn nu beschikbaar met de release van v16.8.0.

**Er zijn geen plannen om classes te verwijderen uit React.** Je kunt meer lezen over geleidelijke adoptie strategie voor Hooks [onderaan](#gradual-adoption-strategy) deze pagina.

**Hooks vervangen niet je kennis van React concepten.** In plaats daarvan geven Hooks een meer directe API naar de React concepten die je al kent: props, state, context, refs, en lifecycle. Zoals we later zullen laten zien bieden Hooks ook een nieuwe krachtige manier om ze te combineren.

**Als je enkel wilt beginnen met het leren van Hooks, voel je vrij om [direct naar de volgende pagina te springen!](/docs/hooks-overview.html)** Je kunt ook deze pagina blijven lezen om te leren over waarom we Hooks toevoegen, en hoe we gaan beginnen ze te gebruiken zonder onze applicaties te herschrijven.

## Motivatie {#motivation}

Hooks lossen een breed scala van schijnbaar ongerelateerde problemen op in React die we tegen zijn gekomen gedurende de vijf jaar dat we tienduizenden componenten geschreven en onderhouden hebben. Of je nu React aan het leren bent, dagelijks gebruikt, of zelfs een andere bibliotheek prefereert met een vergelijkbaar component model, zou je sommige van deze problemen kunnen herkennen.

### Het is moeilijk om logica met state te hergebruiken tussen componenten{#its-hard-to-reuse-stateful-logic-between-components}

React biedt geen manier om herbruikbaar gedrag aan een component te "knopen" (bijvoorbeeld, om het aan een store te koppelen). Als je al een tijd met React werkt, zou je al bekend kunnen zijn patronen zoals [render props](/docs/render-props.html) en [higher-order components](/docs/higher-order-components.html) die dit proberen op te lossen. Maar om deze patronen te kunnen gebruiken moet je je componenten herstructureren, wat lastig kan zijn en code moeilijk te volgen maken. Als je naar een typische React applicatie kijkt met React DevTools, zul je waarschijnlijk een "wrapper hell" van componenten vinden die omringd zijn met providers, consumers, higher-order componenten, render props, en andere abstracties. Hoewel we die [uit DevTools kunnen filteren](https://github.com/facebook/react-devtools/pull/503), wijst dit op een dieper onderliggend probleem: React heeft een beter principe nodig om logica met state te delen.

Met Hooks kun je stateful logica extraheren uit een component zodat die onafhankelijk kan worden getest en hergebruikt. **Hooks laten je stateful logica hergebruiken zonder aanpassingen in je componenten hiërarchie.** Dit maakt het eenvoudig om Hooks te delen met componenten of met de community.

We zullen dit verder bespreken in [Bouw Je Eigen Hooks](/docs/hooks-custom.html).

### Complexe componenten worden moeilijk te begrijpen {#complex-components-become-hard-to-understand}

We hebben vaak componenten moeten onderhouden die eenvoudig begonnen maar uitgroeiden tot een ononderhoudbare brei van stateful logica en neven effecten. Iedere lifecycle methode bevat vaak een mix van ongerelateerde logica. Bijvoorbeeld, componenten kunnen het ophalen data uitvoeren in `componentDidMount` en `componentDidUpdate`. Echter, dezelfde `componentDidMount` methode kan ook ongerelateerde logica bevatten om event listeners op te zetten, met opruim-code die uitgevoerd wordt in `componentWillUnmount`. Wederzijds gerelateerde code die altijd gelijktijdig wordt aangepast, wordt dus gescheiden, en volledig ongerelateerde code wordt dus gecombineerd in één enkele methode. Dit maakt dat er makkelijk bugs en inconsistenties kunnen geïntroduceerd.

In veel gevallen is het niet mogelijk om deze componenten op te splitsen in kleinere componenten omdat de stateful logica overal verspreid is. Het is ook moeilijk ze te testen. Dit is één van de redenen waarom veel mensen er de voorkeur aan geven om React te combineren met een separate state management bibliotheek. Maar dat introduceert vaak te veel abstractie, je moet steeds tussen vershillende bestanden heen en weer springen, en het maakt hergebruik van componenten moeilijker.

Om dit op te lossen **laten Hooks je een component splitsen in kleinere functies gebaseerd op welke onderdelen gerelateerd zijn (zoals het opzetten van een subscription of het ophalen van data)**, in plaats van splitsing te forceren op basis van lifecycle methoden. Je kunt ook opteren om de component zijn lokale state te managen met een reducer om hem voorspelbaarder te maken.

We zullen dit verder bespreken in [De the Effect Hook](/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns).

### Classes verwarren zowel mensen als machines {#classes-confuse-both-people-and-machines}

Behalve dat het hergebruik en code organisatie moeilijke maakt, hebben we gemerkt dat classes ook een groot obstakel kunnen zijn bij het leren van React. Je moet begrijpen hoe `this` werkt in JavaScript, wat heel afwijkend is van hoe dat werkt in de meeste andere talen. Je moet er aan denken om de event handlers te binden. Zonder instabiele [syntax voorstellen](https://babeljs.io/docs/en/babel-plugin-transform-class-properties/), is de code erg breedsprakig. Mensen kunnen props, state, en top-down data flow prima begrijpen maar toch worstelen met classes. Het verschil tussen functie en class componenten in React en wanneer wat te gebruiken leidt tot onenigheid zelfs onder ervaren React developers.

Daarnaast, React is er nu zo'n vijf jaar, en we willen ervoor zorgen dat het de volgende vijf jaar relevant blijft. Zoals [Svelte](https://svelte.technology/), [Angular](https://angular.io/), [Glimmer](https://glimmerjs.com/), en anderen laten zien, heeft [ahead-of-time compilation](https://en.wikipedia.org/wiki/Ahead-of-time_compilation) van componenten veel toekomstig potentieel. Vooral als niet gelimiteerd is tot templates. Recentelijk hebben we geëxperimenteerd met [component folding](https://github.com/facebook/react/issues/7323) gebruik makend van [Prepack](https://prepack.io/), en we hebben veelbelovende eerste resultaten gezien. Maar, we vonden dat class componenten onbedoelde patronen kan aanmoedigen waardoor deze optimalisaties terugvallen naar een langzamer pad. Classes geven ook problemen tools van vandaag de dag. Bijvoorbeeld, classes worden niet erg goed ge-minified, en ze maken hot reloading slordig en onbetrouwbaar. We willen een API presenteren die het aannemelijker maakt dat code op het optimaliseerbare pad blijft.

Om deze problemen op te lossen, **laten Hooks je meer van React's voorzieningen gebruiken zonder classes.** Conceptueel gezien zijn React componenten altijd al meer een soort functies geweest. Hooks embrace functions, but without sacrificing the practical spirit of React. Hooks provide access to imperative escape hatches and don't require you to learn complex functional or reactive programming techniques.

>Voorbeelden
>
>[Hooks een Overzicht](/docs/hooks-overview.html) is een goede plek om te beginnen met het leren over Hooks.

## Geleidelijke Adoptie Strategie {#gradual-adoption-strategy}

>**TLDR: Er zijn geen plannen om classes uit React te verwijderen.**

We weten dat React developers gefocused zijn op products maken en niet de tijd hebben om zich te verdiepen in iedere nieuwe API die wordt uitgebracht. Hooks zijn heel nieuw, en het is misschien beter om te wachten op meer voorbeelden en tutorials voordat je overweegt ze te leren of te adopteren.

We begrijpen ook dat de lat voor het toevoegen van een nieuw principe aan React extreem hoog ligt. Voor nieuwsgierige lezers, hebben we een [uitgebreide RFC](https://github.com/reactjs/rfcs/pull/68) gemaakt die in meer detail duikt in de motivatie, en extra perspectief biedt op de specifieke ontwerp beslissingen en gerelateerde eerder werk.

**Belangrijker, Hooks werken zij-aan-zij met bestaande code, dus kun je ze geleidelijk adopteren.** Er is geen haast om the mirgeren naar Hooks. We raden aan om "groot herschrijven" te voorkomen, vooral voor bestaande, complexe class componenten. Er is een kleine omslag nodig om te gaan "denken in Hooks". Onze ervaring leert, dat de beste manier is om Hooks eerst te gebruiken in niet-kritische componenten, en zeker te stellen dat iedereen in je team zich er comfortabel mee voelt. Voel je vrij om, nadat je Hooks hebt uitgeprobeert, [ons feedback te sturen](https://github.com/facebook/react/issues/new), positief of negatief.

Onze intentie is dat Hooks alle bestaande use cases van classes overlappen, maar **we zullen class componenten blijven ondersteunen in de voorzienbare toekomst.** Bij Facebook, hebben we tienduizenden componenten geschreven als classes, en we hebben absoluut geen plannen die te herschrijven. In plaats daarvan, beginnen we Hooks te gebruiken in nieuwe code zij-aan-zij met classes.

## Veel Gestelde Vragen (FAQ) {#frequently-asked-questions}

We hebben een [Hooks FAQ pagina](/docs/hooks-faq.html) gemaakt die de meest algemene vragen over Hooks beantwoort.

## Volgende Stappen {#next-steps}

Aan het einde van deze pagina, zou je een ruw idee moeten hebben welke problemen Hooks oplossen, maar veel details zijn waarschijnlijk nog niet helder. Geen zorgen! **Laten we naar [de volgende pagina](/docs/hooks-overview.html) gaan waar we beginnen met leren over Hooks aan de hand van voorbeelden.**
