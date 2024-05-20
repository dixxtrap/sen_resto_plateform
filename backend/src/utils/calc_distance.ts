import { CoordonatesDto } from 'src/typeorm/coordonates.entity';

export const calcDistance = ({
  from,
  to,
}: {
  from: CoordonatesDto;
  to: CoordonatesDto;
}) => {
  const φ1 = (from.latitude * Math.PI) / 180,
    φ2 = (to.latitude * Math.PI) / 180,
    Δλ = ((from.longitude - to.longitude) * Math.PI) / 180,
    R = 6371e3;
  const d =
    Math.acos(
      Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ),
    ) * R;
  return d;
};
