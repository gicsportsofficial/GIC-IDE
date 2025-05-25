import React from 'react';

import styles from './styles.less';
import { inject } from 'mobx-react';
import { TAB_TYPE, TabsStore } from '@stores';
import Link from '@components/Link';

const links = {
    Demotour: '',
    Docs: '',
    ['Env doc']: '',
    Community: '',
    git: 'https://github.com/gicsportsofficial/GIC-IDE'
};

interface IInjectedProps {
    tabsStore?: TabsStore
}

@inject('tabsStore')
class Footer extends React.Component<IInjectedProps> {

    openHotKeysPage = () => this.props.tabsStore!.openTutorialTab(TAB_TYPE.HOTKEYS);

    render() {
        return (
            <div className={styles.root}>
                <div className={styles.content}>
                    <div>
                        {Object.entries(links).filter(([name, link]) => name !== 'git' && link !== '')
                            .map(([name, link]) =>
                                <Link className={styles.link} href={link} key={name}>{name}</Link>)
                        }
                                <a className={styles.link} onClick={this.openHotKeysPage} >Hotkeys</a>
                    </div>
                    <div>
                        <Link className={styles.link} href={links.git}>Gic IDE on GitHub</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
