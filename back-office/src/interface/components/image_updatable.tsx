import  { ReactNode } from 'react'


    
export const Img = ({
        hasImg = false,
      
    
        imgId,
        icon,
        label,
        className,
      }: {
        hasImg: boolean;
        small?: boolean;
        imgId?: number;
        icon?: ReactNode;
        label?: ReactNode;
        className?:string
      
      }) => {
        return (
          <>
           
              {hasImg ? (
                <img
                  className={className}
                  alt="djig"
                  src={`/v1/document/file/${imgId}`}
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

