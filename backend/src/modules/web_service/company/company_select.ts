import { locationSelect } from 'src/select/location.select';
import { Company } from 'src/typeorm/partner/company.entity';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

export const selectCompanyDefaultItem: FindOptionsSelect<Company> = {
  id: true,
  backgroundPath: true, 
  imagePath: true,
  name: true,
  address:true,
  shortname: true, 
  isActive: true,
  closingTime: true,
  openingTime: true,
  description: true,
  location: { longitude:true, latitude:true},
  
};
