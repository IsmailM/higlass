import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import slugid from 'slugid';

import {ResizeSensor,ElementQueries} from 'css-element-queries';
import {TiledPlot} from './TiledPlot.jsx';

export class SearchableTiledPlot extends React.Component {
    constructor(props) {
        super(props);

        this.uid = slugid.nice();
        this.div = null;

        this.state = {
            genomePositionSearchBoxVisible: true
        }
    }

    componentDidMount() {
    }

    render() {

        return (
                <div 
                ref={c => this.div = c}
                style={{flex: 1, display: "flex", flexDirection: "column"}} >
                    { this.props.children }
                </div>
               )
    }
}

SearchableTiledPlot.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number
}
