import  { ReactNode } from 'react'


    
export const Img = ({
        hasImg = false,
      
    
        imgPath,
        icon,
        label,
        className,
      }: {
        hasImg: boolean;
        small?: boolean;
        imgPath?: string;
        icon?: ReactNode;
        label?: ReactNode;
        className?:string
      
      }) => {
        return (
          <>
           
              {hasImg ? (
                <img
                  className={className+ " rounded-md"}
                  alt="djig"
                  src={`${imgPath}`}
                />
              ) : (
                <span >
                   {icon}
                </span>
             

              )}
          
          { label&& <span > {label}</span>}
          </>
        );
      };

