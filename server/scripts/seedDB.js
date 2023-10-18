const { ApolloClient, InMemoryCache, gql } = require('@apollo/client/core');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');

const client = new ApolloClient({
  uri: 'http://192.168.0.10:3000/graphql',
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

const seedTen = (i) => {
  const categories = [
    '652959a34a399aba12878201',
    '65295d044a399aba12878206',
    '652965646691718274490be6',
    '652966106691718274490be9',
    '65296816d8eac7c4032399df',
    '65299904f9a581c0f5470a95',
    '65299b36f9a581c0f5470aa4',
  ];
  const pickACategory = Math.floor(Math.random() * 7);
  client
    .mutate({
      mutation: CREATE_RECIPE,
      variables: {
        input: {
          name: uuidv4().slice(0, -20),
          description: 'Delicious homemade chicken and dumplings in the crock pot',
          author: 'John Doe',
          cookTime: '5 hours',
          image: 'https://live.staticflickr.com/5161/5265796751_f75b6c160a_c.jpg',
          ingredients: [
            '1 chicken breast',
            '1 can of biscuits',
            '2 cups chicken broth',
            '2 cans cream of chicken soup',
            '1 or 2 cloves of garlic',
            'oregano',
            'bay leaves',
            'thyme',
            'salt and pepper to taste',
          ],
          instruction: [
            '1.Put everything in the crock pot but the biscuits for 4 hours on high.',
            '2.After 4 hours tear the biscuits into pieces and stir into the crock pot. Stir every 15 minutes.',
            '3. Leave on high for one more hour before serving.',
          ],
          curatorFavorited: i % 2 === 0 ? true : false,
          cheerCount: 0,
          categoryId: categories[pickACategory],
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
const seedOne = (i) => {
  client
    .mutate({
      mutation: CREATE_RECIPE,
      variables: {
        input: {
          name: 'Homestyle Chili',
          description: 'A hearty and delicious homemade chili recipe',
          author: 'John Doe',
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
  const seedTenRandom = true;
  console.log('Beginning seed function...');
  if (seedTenRandom)
    for (let i = 0; i < 10; i++) {
      seedTen(i);
    }
  else seedOne();
  console.log('Finished seed function.');
}

seedDB();
