import './show_html.css'
export const ShowHtml = ({content, className}:{content:string, className?:string}) => {
  return (
    <div className='prose '>
    <div dangerouslySetInnerHTML={{__html:content}} className={className}></div>

    </div>
  )
}
