import React from 'react';
import PIXI from 'pixi.js';
import d3 from 'd3';

export class MultiTrackContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state =  {
            width: 448,     // should be changeable on resize
            height: 40,     // should change in response to the addition of new tracks
                            // or user resize
            tracks: []
        };

        this.animate = this.animate.bind(this);
        this.zoom = d3.behavior.zoom().on('zoom', () => { console.log('zoomed'); }) ;
    }

    handleResize(newDimensions) {
        this.setState (
                {
                    width: newDimensions.width,
                    height: newDimensions.height
                });
    }

    componentDidMount() {
        this.renderer = PIXI.autoDetectRenderer(this.state.width, 
                                                this.state.height, 
                                                { view: this.canvas,
                                                  antialiased: true, 
                                                  transparent: true } )
        this.stage = new PIXI.Container();
        this.stage.interactive = true;

        this.animate();
        d3.select(this.bigDiv).call(this.zoom);
    }

    animate() {
        this.renderer.render(this.stage);
        this.frame = requestAnimationFrame(this.animate);
    }

    render() {
        let divStyle = { height: this.state.height, 
                         width: this.state.width,
                         position: 'relative' }
        let imgStyle = { right: 10,
                         bottom: 10,
                         position: 'absolute' }
        let canvasStyle = { top: 0,
                            left: 0,
                            width: this.width,
                            height: this.height };

        return(
            <div style={divStyle} ref={(c) => this.bigDiv = c}>
                <canvas ref={(c) => this.canvas = c} style={canvasStyle}/>
                <img src="images/plus.svg" width="20px" style={imgStyle}/>
            </div>
        );
    }
}
