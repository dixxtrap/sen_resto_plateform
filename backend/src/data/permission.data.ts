// import { PermissionDto } from 'src/dto/permission.dto';

export const permissions = [
  {
    type: 'CREATE',
    label: 'Creer un nouveau utilisation',
    code: 'USER',
  },
  {
    type: 'READ',
    code: 'USER',
    label: 'Lister les utilisateurs',
  },
  {
    type: 'UPDATE',
    code: 'USER',
    label: 'Modifier un utilisateur',
  },
  {
    type: 'DELETE',
    code: 'USER',
    label: 'Supprimer un utilisateur',
  },
  {
    type: 'DETAILS',
    code: 'USER',
    label: "Voir les details  d'un  utilisateur",
  },
  //   Role
  {
    type: 'CREATE',
    label: 'Creer un role',
    code: 'ROLE',
  },
  {
    type: 'READ',
    code: 'ROLE',
    label: 'Lister les roles',
  },
  {
    type: 'UPDATE',
    code: 'ROLE',
    label: 'Modifier un role',
  },
  {
    type: 'DELETE',
    code: 'ROLE',
    label: 'Supprimer un role',
  },
  //   Company
  {
    type: 'CREATE',
    code: 'COMPANY',
    label: 'Creer une  compagnie',
  },
  {
    type: 'READ',
    code: 'COMPANY',
    label: 'Lister les  compagnies',
  },
  {
    type: 'UPDATE',
    code: 'COMPANY',
    label: 'Modifier une  compagnie',
  },

  //   RESTAURANT
  {
    type: 'CREATE',
    code: 'RESTAURANT',
    label: 'Creer un restaurant',
  },
  {
    type: 'READ',
    code: 'RESTAURANT',
    label: 'Lister les restaurants',
  },
  {
    type: 'UPDATE',
    code: 'RESTAURANT',
    label: 'Modifier un restaurant',
  },
  {
    type: 'DELETE',
    code: 'RESTAURANT',
    label: 'Supprimer un restaurant',
  },
  //   ORDER
  {
    type: 'CREATE',
    code: 'ORDER',
    label: 'Creer une commande',
  },
  {
    type: 'READ',
    code: 'ORDER',
    label: 'Lister les Commandes',
  },
  {
    type: 'UPDATE',
    code: 'ORDER',
    label: 'Modifier une Commande',
  },
  {
    type: 'DELETE',
    code: 'ORDER',
    label: 'Supprimer une Commande',
  },
  //   PLATE

  {
    type: 'CREATE',
    code: 'PLATE',
    label: 'Creer  un plat',
  },
  {
    type: 'READ',
    code: 'PLATE',
    label: 'Lister  les plats',
  },
  {
    type: 'UPDATE',
    code: 'PLATE',
    label: 'Modifier  un plat',
  },
  {
    type: 'DELETE',
    code: 'PLATE',
    label: 'Modifier  un plat',
  },
  //   TAGS
  {
    type: 'CREATE',
    code: 'TAGS',
    label: 'Creer un tag',
  },
  {
    type: 'READ',
    code: 'TAGS',
    label: 'Lister les tags',
  },
  {
    type: 'UPDATE',
    code: 'TAGS',
    label: 'Modifier un tag',
  },
  {
    type: 'DELETE',
    code: 'TAGS',
    label: 'Supprimer un tags',
  },
  //   PERMISSION_ROLE
  {
    type: 'CREATE',
    code: 'PERMISSION_ROLE',
    label: 'Ajouter des permission à un role',
  },
  {
    type: 'READ',
    code: 'PERMISSION_ROLE',
    label: "Lister les  permissions d'un  role",
  },
  {
    type: 'UPDATE',
    code: 'PERMISSION_ROLE',
    label: "Modifier les permissions d'un role",
  },
  {
    type: 'DELETE',
    code: 'PERMISSION_ROLE',
    label: 'Supprimer des  permissions à un role',
  },
  //   PERMISSION_USER
  {
    type: 'CREATE',
    code: 'PAYMENT_TYPE',
    label: 'Creer un methode de paiement',
  },
  {
    type: 'READ',
    code: 'PAYMENT_TYPE',
    label: 'Lister les methodes de paiement',
  },
  {
    type: 'UPDATE',
    code: 'PAYMENT_TYPE',
    label: 'Modifier un methode de paiement',
  },
  {
    type: 'DELETE',
    code: 'PAYMENT_TYPE',
    label: 'Supprimer un methode de paiement',
  },
  {
    type: '*',
    code: 'SECURITY',
    label: 'Acceder au parametrage',
  },
  {
    type: '*',
    code: 'Permission',
    label: 'Manager les permission',
  },
];
