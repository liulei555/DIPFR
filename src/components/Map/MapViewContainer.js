/**
 * Created by Sun on 2018/4/19
 */
import React from 'react';
import PropTypes from 'prop-types';

class MapViewContainer extends React.Component {
    getIframeStatus() {
        const iframeWindow = this.iframeNode.contentWindow;
        const message = this.props.data;
        const callback = this.props.callback;
        window.addEventListener("message", function (ev) {
            let data = ev.data;
            if (!data) return;
            if (data === "loaded") {
                console.log("sending...");
                iframeWindow.postMessage(message, "*");
            }
            if (data.type && typeof callback[data.type] === "function") {
                callback[data.type](data.payload);
            }
        });
    }

    componentWillReceiveProps(newProps) {
        // console.log("action received");
        this.iframeNode.contentWindow.postMessage(newProps.data, "*");
    };

    componentDidMount() {
        console.log("try to send...");
        this.getIframeStatus();
    };

    render() {
        const mapViewContainer = {
            width: "100%",
            height: "100%",
            margin: 0,
            padding: 0
        };
        return (
            <iframe style={mapViewContainer} src={this.props.src} ref={node => this.iframeNode = node} title="mapViewContainer"/>
        )
    }
}

MapViewContainer.propTypes = {
    src: PropTypes.string.isRequired,
    data: PropTypes.shape({
        type: PropTypes.oneOf(["layer", "locate", "locus"]),
        payload: PropTypes.any
    }),
    callback: PropTypes.shape({
        select: PropTypes.func,
        // locus: PropTypes.func
    })
};

export default MapViewContainer;