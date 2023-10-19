const { ApolloClient, InMemoryCache, gql } = require('@apollo/client/core');
const fetch = require('node-fetch');
const seedData = require('./seedData');

const client = new ApolloClient({
  uri: 'https://easy-recipes-lyart.vercel.app/graphql',
  cache: new InMemoryCache(),
  fetch,
});

const CREATE_RECIPE = gql`
  mutation CreateRecipe($input: AddRecipeInput!) {
    addRecipe(input: $input) {
      id
    }
  }
`;

const seedTen = (seed) => {
  client
    .mutate({
      mutation: CREATE_RECIPE,
      variables: {
        input: seed
      },
    })
    .then((result) => {
      console.log(result.data);
    })
    .catch((error) => {
      console.error('Mutation error:', error);
    });
};
const seedOne = () => {
  client
    .mutate({
      mutation: CREATE_RECIPE,
      variables: {
        input: {
          name: 'Homestyle Chili',
          description: 'A hearty and delicious homemade chili recipe',
          author: 'user',
          cookTime: '4 hours',
          image: 'https://live.staticflickr.com/8298/7818571354_8e0c5ee56e_b.jpg',
          ingredients: [
            '1 lb ground beef',
            '1 onion, chopped',
            '1 red bell pepper, diced',
            '2 cans (15 oz each) of kidney beans, drained and rinsed',
            '1 can (28 oz) crushed tomatoes',
            '1 can (8 oz) tomato sauce',
            '2 cloves of garlic, minced',
            '2 tablespoons chili powder',
            '1 teaspoon cumin',
            '1/2 teaspoon paprika',
            'Salt and pepper to taste',
            'Shredded cheddar cheese (for topping)',
            'Sour cream (for topping)',
            'Chopped green onions (for topping)',
            'Sliced jalapeños (for topping)',
          ],
          instruction: [
            '1. In a large skillet, cook the ground beef over medium heat until browned. Drain excess fat.',
            '2. Add chopped onions and red bell pepper to the skillet. Sauté until the vegetables are tender.',
            '3. Transfer the beef and vegetable mixture to a slow cooker.',
            '4. Add kidney beans, crushed tomatoes, tomato sauce, minced garlic, chili powder, cumin, paprika, salt, and pepper to the slow cooker. Stir to combine.',
            '5. Cover and cook on low for 4 hours, or until the chili is heated through and flavors meld.',
            '6. Serve hot, garnished with shredded cheddar cheese, a dollop of sour cream, chopped green onions, and sliced jalapeños.',
          ],
          curatorFavorited: true,
          cheerCount: 0,
          categoryId: '652959a34a399aba12878201',
        },
      },
    })
    .then((result) => {
      console.log(result.data);
    })
    .catch((error) => {
      console.error('Mutation error:', error);
    });
};

function seedDB() {
  const seedItUp = true;
  console.log('Beginning seed function...');
  if (seedItUp) {
    for (seed of seedData) {
      seedTen(seed);
    }
  } else seedOne();
  console.log('Finished seed function.');
}

seedDB();
