import React from 'react';
import cn from 'classnames';
import styles from './styles.less';

interface IProps {
    onChange: (e: (React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>)) => void
    value: string
    invalid?: boolean
    multiline?: boolean
    disabled?: boolean
    className?: string
    onBlur?: () => void
    inputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement>
    onKeyPress?: () => void
    spellCheck?: boolean
}

export default class Input extends React.Component<IProps> {

    render() {
        const {invalid, className, inputRef, multiline, ...rest} = this.props;
        return multiline
            ? <textarea
                {...rest}
                className={cn(styles.root, className, {[styles.invalid]: invalid})}
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            />
            : <input
                {...rest}
                className={cn(styles.root, className, {[styles.invalid]: invalid})}
                ref={inputRef as React.RefObject<HTMLInputElement>}
            />;
    }
}
