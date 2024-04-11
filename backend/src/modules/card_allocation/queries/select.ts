import { CardAllocation } from 'src/typeorm/card_allocation.entity';
import { FindOptionsSelect } from 'typeorm';
export const cardAllocDetailsSelect: FindOptionsSelect<CardAllocation> = {
  id: true,
  label: true,
  motif: true,
  rejectionMotif: true,
  acceptedById: true,
  status: true,
  quantity: true,
  startSerial: true,
  endSerial: true,
  card: true,
  acceptedBy: {
    id: true,
    firstname: true,
    lastname: true,
    phone: true,
    email: true,
  },
  details: {
    createdAt: true,
    updatedAt: true,
    by: {
      id: true,
      firstname: true,
      lastname: true,
      phone: true, 
      email: true,
    },
  },
};
