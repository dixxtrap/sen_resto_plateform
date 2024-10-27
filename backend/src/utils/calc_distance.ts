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
    R = 6371;
  const d =
    Math.acos(
      Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ),
    ) * R;
  return d;
};
export const getNearestPoint = ({
  froms,
  to,
}: {
  froms: Array<{ id: number; coordonate: CoordonatesDto }>;
  to: CoordonatesDto;
}) => {
  var minId: number = froms[0].id;
  var minDistance: number|undefined;
  console.log("-----------------------------les distances----------------", froms)

  froms.forEach((elm) => {if(elm.coordonate.longitude!==0 &&elm.coordonate.latitude!==0)
     {const distance = calcDistance({ from: elm.coordonate, to: to });
     console.log(distance);
     if((distance<=minDistance && distance>0)||minDistance===undefined){ minId=elm.id;minDistance=distance}}
  });
  return {minId, minDistance};
};
