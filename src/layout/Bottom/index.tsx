import React from 'react';
import { autorun, IReactionDisposer } from 'mobx';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';

import {
    FilesStore,
    ReplsStore,
    SettingsStore,
    UIStore,
    TBottomTabKey,
    CompilationStore, TestsStore
} from '@stores';

import { Repl } from './Repl';
import Tab from './Tab/Tab';
import styles from './styles.less';
import { IResizableProps, withResizableWrapper } from '@components/HOC/ResizableWrapper';
import Compilation from './Compilation';
import Tests from './Tests';
import RideRepl from './RideRepl';
import Toolbar from '@components/ToolBar';

interface IInjectedProps {
    filesStore?: FilesStore
    replsStore?: ReplsStore
    settingsStore?: SettingsStore,
    uiStore?: UIStore,
    compilationStore?: CompilationStore,
    testsStore?: TestsStore
}

interface IProps extends IInjectedProps, IResizableProps {
}

@inject('filesStore', 'settingsStore', 'replsStore', 'uiStore', 'compilationStore', 'testsStore')
@observer
class Bottom extends React.Component<IProps> {

    private blockchainReplRef = React.createRef<Repl>();

    private consoleEnvUpdateDisposer?: IReactionDisposer;

    private handleTabClick = (key: TBottomTabKey) => () => {
        this.props.uiStore!.replsPanel.activeTab = key;
        if (!this.props.isOpened) this.props.handleExpand();
    };

    componentDidMount() {
        const {settingsStore, filesStore} = this.props;
        const blockchainReplInstance = this.blockchainReplRef.current;

        //consoleEnvUpdateReaction
        this.consoleEnvUpdateDisposer = autorun(() => {
            blockchainReplInstance && blockchainReplInstance.updateEnv(
                settingsStore!.consoleEnv
            );
        }, {name: 'consoleEnvUpdateReaction'});

        blockchainReplInstance && blockchainReplInstance.updateEnv({
            file: filesStore!.getFileContent
        });
    }

    componentWillUnmount() {
        this.consoleEnvUpdateDisposer && this.consoleEnvUpdateDisposer();
    }

    render() {
        const currentActiveTabKey = this.props.uiStore!.replsPanel.activeTab;
        const testsStore = this.props.testsStore!;
        const {compilation, compilationLabel, isCompilationError} = this.props.compilationStore!;
        const testsStatsLabel = `${testsStore.info.passed}/${testsStore.info.total}`;
        const expanderClassName = cn(styles.expander, {[styles.expander__isOpened]: this.props.isOpened});

        const consoleTheme = this.props.settingsStore!.theme;

        return (
            <div className={styles.root}>
                <div className={expanderClassName} onClick={this.props.handleExpand}/>
                <div className={styles.tabs}>
                    <Tab name={'Console'} onClick={this.handleTabClick('Console')}
                         active={currentActiveTabKey === 'Console'}/>
                    <Tab name={'Compilation'} label={compilationLabel} isError={isCompilationError}
                         onClick={this.handleTabClick('Compilation')}
                         active={currentActiveTabKey === 'Compilation'}/>
                    <Tab name={'Tests'} label={testsStatsLabel} onClick={this.handleTabClick('Tests')}
                         active={currentActiveTabKey === 'Tests'}/>
                    <Tab name={'RideREPL'} onClick={this.handleTabClick('RideREPL')}
                         active={currentActiveTabKey === 'RideREPL'}/>
                </div>
                <div className={styles.tabsContent}>

                    <div style={{display: currentActiveTabKey === 'Console' ? 'inherit' : 'none'}}>
                        <Toolbar text={this.props.settingsStore!.contextInfo}/>
                        <div className={styles.repl}>
                            <Repl ref={this.blockchainReplRef} theme={consoleTheme}/>
                        </div>
                    </div>
                    <div style={{display: currentActiveTabKey === 'Compilation' ? 'inherit' : 'none'}}>
                        <Compilation compilation={compilation}/>
                    </div>
                    <div style={{display: currentActiveTabKey === 'Tests' ? 'inherit' : 'none'}}>
                        <Tests/>
                    </div>
                    <div style={{display: currentActiveTabKey === 'RideREPL' ? 'inherit' : 'none'}}>
                        <RideRepl/>
                    </div>
                </div>
            </div>
        );
    }
}

export default withResizableWrapper(Bottom);
