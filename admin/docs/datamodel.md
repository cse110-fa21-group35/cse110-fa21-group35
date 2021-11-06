# Firebase Data Model
- This documentation is in progress. 

```json
{
  "12345": {
    "name": "Jeff Huevos",
    "recipeCount": "99",
    "recipes": {
      "12345-97": {
        "public": false,
        "@context": "https://schema.org",
        "@type": "Recipe",
        "author": "Jake  Smith",
        "cookTime": "PT2H",
        "datePublished": "2015-05-18",
        "description": "Your recipe description goes here",
        "image": "http://www.example.com/images.jpg",
        "recipeIngredient": {
          "ingredient 1": "banana",
          "ingredient 2": "bread crumbs",
          "ingredient 3": "pudding",
          "ingredient 4": "brown sugar",
          "ingredient 5": "flour"
        },
        "interactionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": "http://schema.org/Comment",
          "userInteractionCount": "5"
        },
        "name": "Rand's Cookies",
        "nutrition": {
          "@type": "NutritionInformation",
          "calories": "1200 calories",
          "carbohydrateContent": "12 carbs",
          "proteinContent": "9 grams of protein",
          "fatContent": "9 grams fat"
        },
        "prepTime": "PT15M",
        "recipeInstructions": "This is the long part, etc.",
        "recipeYield": "12 cookies"
      },
      "12345-98": {
        "public": true,
        "@context": "https://schema.org",
        "@type": "Recipe",
        "author": "Jake  Smith",
        "cookTime": "PT2H",
        "datePublished": "2015-05-18",
        "description": "Your recipe description goes here",
        "image": "http://www.example.com/images.jpg",
        "recipeIngredient": {
          "ingredient 1": "banana",
          "ingredient 2": "bread crumbs",
          "ingredient 3": "pudding",
          "ingredient 4": "brown sugar",
          "ingredient 5": "flour"
        },
        "interactionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": "http://schema.org/Comment",
          "userInteractionCount": "5"
        },
        "name": "Rand's Cookies",
        "nutrition": {
          "@type": "NutritionInformation",
          "calories": "1200 calories",
          "carbohydrateContent": "12 carbs",
          "proteinContent": "9 grams of protein",
          "fatContent": "9 grams fat"
        },
        "prepTime": "PT15M",
        "recipeInstructions": "This is the long part, etc.",
        "recipeYield": "12 cookies"
      }
    }
  },
  "22345": {
    "name": "Jeff Nuevos",
    "recipeCount": "99",
    "recipes": {
      "12345-97": {
        "public": true
        "@context": "https://schema.org",
        "@type": "Recipe",
        "author": "Jake  Smith",
        "cookTime": "PT2H",
        "datePublished": "2015-05-18",
        "description": "Your recipe description goes here",
        "image": "http://www.example.com/images.jpg",
        "recipeIngredient": {
          "ingredient 1": "banana",
          "ingredient 2": "bread crumbs",
          "ingredient 3": "pudding",
          "ingredient 4": "brown sugar",
          "ingredient 5": "flour"
        },
        "interactionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": "http://schema.org/Comment",
          "userInteractionCount": "5"
        },
        "name": "Rand's Cookies",
        "nutrition": {
          "@type": "NutritionInformation",
          "calories": "1200 calories",
          "carbohydrateContent": "12 carbs",
          "proteinContent": "9 grams of protein",
          "fatContent": "9 grams fat"
        },
        "prepTime": "PT15M",
        "recipeInstructions": "This is the long part, etc.",
        "recipeYield": "12 cookies"
      },
      "12345-98": {
        "public": true,
        "@context": "https://schema.org",
        "@type": "Recipe",
        "author": "Jake  Smith",
        "cookTime": "PT2H",
        "datePublished": "2015-05-18",
        "description": "Your recipe description goes here",
        "image": "http://www.example.com/images.jpg",
        "recipeIngredient": {
          "ingredient 1": "banana",
          "ingredient 2": "bread crumbs",
          "ingredient 3": "pudding",
          "ingredient 4": "brown sugar",
          "ingredient 5": "flour"
        },
        "interactionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": "http://schema.org/Comment",
          "userInteractionCount": "5"
        },
        "name": "Rand's Cookies",
        "nutrition": {
          "@type": "NutritionInformation",
          "calories": "1200 calories",
          "carbohydrateContent": "12 carbs",
          "proteinContent": "9 grams of protein",
          "fatContent": "9 grams fat"
        },
        "prepTime": "PT15M",
        "recipeInstructions": "This is the long part, etc.",
        "recipeYield": "12 cookies"
      }
    }
  }
}
```