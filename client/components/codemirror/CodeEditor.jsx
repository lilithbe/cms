import dynamic from 'next/dynamic'
import 'codemirror/lib/codemirror.css'
import PropTypes from 'prop-types';
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button';
const CodeMirror = dynamic(async () => {
    import('codemirror/mode/xml/xml')
    import('codemirror/mode/javascript/javascript')
    import('codemirror/mode/css/css')
    import('codemirror/mode/markdown/markdown')
    import('codemirror/mode/python/python')
    import('codemirror/mode/php/php')
    import('codemirror/mode/jsx/jsx')

    import('codemirror/theme/3024-day.css')
    import('codemirror/theme/3024-night.css')
    import('codemirror/theme/abcdef.css')
    import('codemirror/theme/ambiance.css')
    import('codemirror/theme/base16-dark.css')
    import('codemirror/theme/base16-light.css')
    import('codemirror/theme/bespin.css')
    import('codemirror/theme/blackboard.css')
    import('codemirror/theme/cobalt.css')
    import('codemirror/theme/colorforth.css')
    import('codemirror/theme/dracula.css')
    import('codemirror/theme/duotone-dark.css')
    import('codemirror/theme/duotone-light.css')
    import('codemirror/theme/eclipse.css')
    import('codemirror/theme/elegant.css')
    import('codemirror/theme/erlang-dark.css')
    import('codemirror/theme/hopscotch.css')
    import('codemirror/theme/icecoder.css')
    import('codemirror/theme/isotope.css')
    import('codemirror/theme/lesser-dark.css')
    import('codemirror/theme/liquibyte.css')
    import('codemirror/theme/material.css')
    import('codemirror/theme/mbo.css')
    import('codemirror/theme/mdn-like.css')
    import('codemirror/theme/midnight.css')
    import('codemirror/theme/monokai.css')
    import('codemirror/theme/neat.css')
    import('codemirror/theme/neo.css')
    import('codemirror/theme/night.css')
    import('codemirror/theme/panda-syntax.css')
    import('codemirror/theme/paraiso-dark.css')
    import('codemirror/theme/paraiso-light.css')
    import('codemirror/theme/pastel-on-dark.css')
    import('codemirror/theme/railscasts.css')
    import('codemirror/theme/rubyblue.css')
    import('codemirror/theme/seti.css')
    import('codemirror/theme/solarized.css')
    import('codemirror/theme/the-matrix.css')
    import('codemirror/theme/tomorrow-night-bright.css')
    import('codemirror/theme/tomorrow-night-eighties.css')
    import('codemirror/theme/ttcn.css')
    import('codemirror/theme/twilight.css')
    import('codemirror/theme/vibrant-ink.css')
    import('codemirror/theme/xq-dark.css')
    import('codemirror/theme/xq-light.css')
    import('codemirror/theme/yeti.css')
    import('codemirror/theme/zenburn.css')

    const { UnControlled : CodeM } = await import('react-codemirror2');
    return function comp({ forwardedRef, ...props }) {
        return <CodeM  {...props} 
   />
    }


}, {ssr: false})

const CodeEditor = ({disable, value, onChange , theme, mode, onThemeChange, onModeChange,className,fileName, directory ,isCopy}) => {
  
    return (
        <div className='my-lg-5 my-md-2 card'>
            <div className='card-header p-0'>
           
            <div className='d-flex justify-content-between'>
                    <div>
                        <span>{directory}</span>
                        <span>{fileName}</span>
                    </div>
                    {isCopy?
                      <div>
                      <Button className='p-button-outlined' icon="bi bi-box-arrow-up-right"/>
                  </div>:null
                  }
                  
                </div>
            </div>
            <div className='card-body p-0'>
            <CodeMirror              
                className={className}
                value={value}
                options={{
                    disableInput:disable, //수정불가
                    theme:theme, //테마
                    lineNumbers: true,
                    mode: mode
                }}
                onChange={(editor,data,value) => {
                    onChange(value)
                }}
            />
            </div>
            <div className='card-footer p-0'>
                <div className='d-flex justify-content-between'>
                    <div>
                        <Dropdown
                        className='p-inputtext-sm'
                        options={options}
                        optionLabel="label"
                        optionValue="value"
                        value={theme}
                        onChange={onThemeChange}
                        />
                        <Dropdown
                            className='p-inputtext-sm'
                            options={modeOptions}
                            optionLabel="label"
                            optionValue="value"
                            value={mode}
                            onChange={onModeChange}
                        />
                    </div>
                  
                </div>
               
            </div>
            
        </div>
    )
  };
  CodeEditor.propTypes = {
    disable:PropTypes.bool,
    mode:PropTypes.string,
    theme:PropTypes.string,
    className:PropTypes.string,
    isCopy:PropTypes.bool,
  };
  CodeEditor.defaultProps={
    disable:true,
    mode:'xml',
    theme:'ambiance',
    className:'auto-height',
    isCopy:true,
  }
  export default CodeEditor
  const options=[
    {label:'default',value:'default'},
    {label:'3024-day',value:'3024-day'},
    {label:'3024-night',value:'3024-night'},
    {label:'abcdef',value:'abcdef'},
    {label:'ambiance',value:'ambiance'},
    {label:'base16-dark',value:'base16-dark'},
    {label:'base16-light',value:'base16-light'},
    {label:'bespin',value:'bespin'},
    {label:'blackboard',value:'blackboard'},
    {label:'cobalt',value:'cobalt'},
    {label:'colorforth',value:'colorforth'},
    {label:'dracula',value:'dracula'},
    {label:'duotone-dark',value:'duotone-dark'},
    {label:'duotone-light',value:'duotone-light'},
    {label:'eclipse',value:'eclipse'},
    {label:'elegant',value:'elegant'},
    {label:'erlang-dark',value:'erlang-dark'},
    {label:'hopscotch',value:'hopscotch'},
    {label:'icecoder',value:'icecoder'},
    {label:'isotope',value:'isotope'},
    {label:'lesser-dark',value:'lesser-dark'},
    {label:'liquibyte',value:'liquibyte'},
    {label:'material',value:'material'},
    {label:'mbo',value:'mbo'},
    {label:'mdn-like',value:'mdn-like'},
    {label:'midnight',value:'midnight'},
    {label:'monokai',value:'monokai'},
    {label:'neat',value:'neat'},
    {label:'neo',value:'neo'},
    {label:'night',value:'night'},
    {label:'panda-syntax',value:'panda-syntax'},
    {label:'paraiso-dark',value:'paraiso-dark'},
    {label:'paraiso-light',value:'paraiso-light'},
    {label:'pastel-on-dark',value:'pastel-on-dark'},
    {label:'railscasts',value:'railscasts'},
    {label:'rubyblue',value:'rubyblue'},
    {label:'seti',value:'seti'},
    {label:'solarized dark',value:'solarized dark'},
    {label:'solarized light',value:'solarized light'},
    {label:'the-matrix',value:'the-matrix'},
    {label:'tomorrow-night-bright',value:'tomorrow-night-bright'},
    {label:'tomorrow-night-eighties',value:'tomorrow-night-eighties'},
    {label:'ttcn',value:'ttcn'},
    {label:'twilight',value:'twilight'},
    {label:'vibrant-ink',value:'vibrant-ink'},
    {label:'xq-dark',value:'xq-dark'},
    {label:'xq-light',value:'xq-light'},
    {label:'yeti',value:'yeti'},
    {label:'zenburn',value:'zenburn'},
  ]
  const modeOptions=[
    {label:'Html/XML', value:'xml'},
    {label:'Java script', value:'javascript'},
    {label:'CSS', value:'css'},
    {label:'MARKDWON', value:'markdown'},
    {label:'PYTHON', value:'python'},
    {label:'PHP', value:'php'},
    {label:'REACT JSX', value:'jsx'},
  ]