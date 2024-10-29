import { locationSelect } from 'src/select/location.select';
import { CompanyRestaurantBase } from 'src/typeorm/company_restaurant.entity';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

export const selectDefault: FindOptionsSelect<CompanyRestaurantBase> = {
  id: true,
  backgroundPath: true,
  imagePath: true,
  name: true,address:true,
  shortname: true,
  isActive: true,isOpen:true,
  closingTime: true,
  openingTime: true,
  description: true,
  location: { longitude:true, latitude:true},
  children: { id: true, location: { longitude:true, latitude:true} },
};
