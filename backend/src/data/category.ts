import { CategoryDto } from "src/typeorm/category.entity";

export const CategoryData: CategoryDto[] = [
  {
    name: 'Entrées',
    children: [
      { name: 'Amuse-bouche' },
      { name: 'Salades', children: [] },
      { name: 'Soupes', children: [] },
      { name: 'Nachos', children: [] },
      { name: 'Egg rolls', children: [] },
    ],
  },
  {
    name: 'Plats Principaux',
    children: [
      {
        name: 'Viandes',
        children: [
          { name: 'Bœuf', children: [] },
          { name: 'Poulet', children: [] },
          { name: 'Porc', children: [] },
          { name: 'Agneau', children: [] },
          { name: 'Poisson', children: [] },
        ],
      },
      { name: 'Pâtes', children: [] },
      { name: 'Pizzas', children: [] },
      { name: 'Plats végétariens', children: [] },
      { name: 'Plats végétaliens', children: [] },
      { name: 'Plats sans gluten', children: [] },
    ],
  },
  {
    name: 'Accompagnements',
    children: [
      { name: 'Riz',  },
      { name: 'Pommes de terre', children: [] },
      { name: 'Légumes grillés', children: [] },
      { name: 'Frites', children: [] },
      { name: 'Légumes vapeur', children: [] },
    ],
  },
  {
    name: 'Petits Déjeuners',
    children: [
      { name: 'Omelettes', children: [] },
      { name: 'Pancakes', children: [] },
      { name: "Flocons d'avoine", children: [] },
      { name: 'Yaourts', children: [] },
      { name: 'Fruits frais', children: [] },
    ],
  },
  {
    name: 'Desserts',
    children: [
      { name: 'Gâteaux', children: [] },
      { name: 'Tartes', children: [] },
      { name: 'Glaces', children: [] },
      { name: 'Cookies', children: [] },
      { name: 'Puddings', children: [] },
    ],
  },
  {
    name: 'Boissons',
    children: [
      { name: 'Cafés', children: [] },
      { name: 'Thés', children: [] },
      { name: 'Jus de fruits', children: [] },
      { name: 'Smoothies', children: [] },
      { name: 'Cocktails', children: [] },
    ],
  },
  {
    name: 'Snacks',
    children: [
      { name: 'Chips', children: [] },
      { name: 'Popcorn', children: [] },
      { name: 'Fruits secs', children: [] },
      { name: 'Nuts', children: [] },
      { name: "Hors-d'œuvre", children: [] },
    ],
  },
  {
    name: 'Cuisine Internationale',
    children: [
      { name: 'Italienne', children: [] },
      { name: 'Mexicaine', children: [] },
      { name: 'Chinoise', children: [] },
      { name: 'Indienne', children: [] },
      { name: 'Japonaise', children: [] },
    ],
  },
  {
    name: 'Plats Traditionnels',
    children: [
      { name: 'Plats du terroir', children: [] },
      { name: 'Plats familiaux', children: [] },
      { name: 'Plats de fête', children: [] },
    ],
  },
  {
    name: 'Aliments Spéciaux',
    children: [
      { name: 'Bio', children: [] },
      { name: 'Sans sucre ajouté', children: [] },
      { name: 'Sans gluten', children: [] },
      { name: 'Végétalien', children: [] },
      { name: 'Casher', children: [] },
    ],
  },
  {
    name: 'Petit Déjeuner/Brunch',
    children: [
      { name: 'Café et thés', children: [] },
      { name: 'Viennoiseries', children: [] },
      { name: 'Œufs', children: [] },
      { name: 'Yaourts', children: [] },
      { name: 'Fruits frais', children: [] },
    ],
  },
  {
    name: 'Repas Rapides',
    children: [
      { name: 'Hamburgers', children: [] },
      { name: 'Sandwichs', children: [] },
      { name: 'Pizzas', children: [] },
      { name: 'Salades à emporter', children: [] },
    ],
  },
];
