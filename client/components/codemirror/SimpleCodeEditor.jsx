import dynamic from 'next/dynamic'
import 'codemirror/lib/codemirror.css'
import PropTypes from 'prop-types';
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button';
import { useState } from 'react';
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
        return <CodeM  {...props} />
    }
}, {ssr: false})

const SimpleCodeEditor = ({value, onChange , mode, theme}) => {
    return (
        <div>
            <CodeMirror
            value={value}
            options={{
                disableInput: false, //수정불가
                theme: theme, //테마
                lineNumbers: true,
                mode: mode
            }}
            onChange={(editor, data, val) => {
                onChange(val)
            }}
        />
        </div>
    )
}

export default SimpleCodeEditor
SimpleCodeEditor.propTypes={
    mode:PropTypes.string,
    theme:PropTypes.string,
}
SimpleCodeEditor.defaultProps = {
    mode:'css',
    theme:'eclipse',
};
