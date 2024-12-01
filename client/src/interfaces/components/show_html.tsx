import './show_html.css'
export const ShowHtml = ({content}:{content:string}) => {
  return (
    <div className='prose '>
    <div dangerouslySetInnerHTML={{__html:content}} ></div>

    </div>
  )
}
