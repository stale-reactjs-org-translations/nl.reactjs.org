---
id: faq-ajax
title: AJAX en APIs
permalink: docs/faq-ajax.html
layout: docs
category: FAQ
---

### Hoe kan ik een AJAX verzoek maken? {#how-can-i-make-an-ajax-call}

Je kan eender welke AJAX library gebruiken met React. Enkele veelgebruikte zijn [Axios](https://github.com/axios/axios), [jQuery AJAX](https://api.jquery.com/jQuery.ajax/), en  [window.fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) die ingebouwd is in de browser.

### Waar in de component levenscyclus moet ik een AJAX verzoek maken? {#where-in-the-component-lifecycle-should-i-make-an-ajax-call}
Je zou een component van data moeten voorzien aan de hand van een AJAX verzoek in de [`componentDidMount`](/docs/react-component.html#mounting) levenscyclus methode. Op deze manier kan je gebruik maken van `setState` om de component te updaten als de data is ontvangen.

### Voorbeeld: Een AJAX resultaat gebruiken om de lokale staat te veranderen{#example-using-ajax-results-to-set-local-state}

Onderstaande component geeft weer hoe je een AJAX verzoek maakt in `componentDidMount` om de lokale staat van data te voorzien. 

Ons voorbeeld API verzoek geeft onderstaand JSON object terug:

```
{
  "items": [
    { "id": 1, "name": "Apples",  "price": "$2" },
    { "id": 2, "name": "Peaches", "price": "$5" }
  ] 
}
```

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.name}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
      );
    }
  }
}
```
