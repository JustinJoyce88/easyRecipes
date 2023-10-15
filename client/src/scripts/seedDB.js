const { ApolloClient, InMemoryCache, gql } = require('@apollo/client/core');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');

const client = new ApolloClient({
  uri: 'http://192.168.0.10:4000/',
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

const handlCreateRecipe = (i) => {
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

function seedDB() {
  console.log('Beginning seed function...');
  for (let i = 0; i < 10; i++) {
    handlCreateRecipe(i);
  }
  console.log('Finished seed function.');
}

seedDB();
