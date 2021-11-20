# Firebase Data Model

- Firebase persists data as JSON. We can think of the data in our domain as a collection of users keyed by an accountId, where each user has a name, recipeCount, and collection of recipes where each recipe is keyed by a recipeId.

- User accountId's are constructed automatically by firebase, they will be a 28 character string.
- Each user's recipeId is constructed using the accountId, and the user's total recipe creation count prior to insertion.

- NOTE: This is not a permanent structure of our data (i.e. may ommit or add additional fields), but we SHOULD all be on the same page as to the general structure and the basic data that's relevant.

```json
{
  "Br6v40acvTTGoMvvdbLLRBPplHF3": {
    "name": "Jeff Huevos",
    "recipeCount": "99",
    "recipes": {
      "Br6v40acvTTGoMvvdbLLRBPplHF3-97": {
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
      "Br6v40acvTTGoMvvdbLLRBPplHF3-98": {
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
  "Br6v40acvTTGoMvvdbLLRBPplLF5": {
    "name": "Jeff Nuevos",
    "recipeCount": "99",
    "recipes": {
      "Br6v40acvTTGoMvvdbLLRBPplLF5-97": {
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
      "Br6v40acvTTGoMvvdbLLRBPplLF5-98": {
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
