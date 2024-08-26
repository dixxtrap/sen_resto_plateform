import { ModalProps, PopoverProps } from "@mantine/core"

export const  multiSelectStyle= {
    dropdown:
      { backgroundColor: 'light-dark(white, rgb(var(--color-dark-dropdown))' },
    pill: { backgroundColor: 'light-dark( rgba(0,0,0, 0.08), rgba(255,255,255, 0.08))' },
  input: { backgroundColor: 'light-dark(white, rgb(107 114 128 / 0.1))' },
    "option:hover":{backgroundColor: 'light-dark( rgba(0,0,0, 0.08), rgba(0,0,0, 0.2))'}
  }

  export const poppoverStyle:PopoverProps={position:'bottom-end', withArrow:true,styles:{dropdown:{backgroundColor:'light-dark(white,rgb(var(--color-dark-dropdown)'}}, classNames:{dropdown:'backdrop-blur-lg shadow-sm'}}
  export const modalStyleProps:Omit<ModalProps,'opened'|'onClose'>={
    classNames:{header:'border-b border-gray-200 dark:border-gray-200/20'},
    styles: { header: {borderColor:"light-dark(rgb(var(--color-dark-dropdown) /.2),rgb(255 255 255 /.1))",backgroundColor: 'light-dark(white,rgb(var(--color-dark-dropdown)))' }, body: { backgroundColor: 'light-dark(white,rgb(var(--color-dark-dropdown)))' }, content: { backgroundColor: 'rgb(var(--color-dark-dropdown))' } },
  }