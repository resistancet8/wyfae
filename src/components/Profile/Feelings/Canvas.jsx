import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const fabric = window.fabric

class DesignCanvas extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  static defaultProps = {
    width: 500,
    height: 500,
  }

  state = {
    canvas: null,
    textObject: null
  }

  componentWillReceiveProps(props) {
    // const rect = new fabric.IText(props.text, { left: 100, top: 100, fill: 'red', fontFamily: 'Arial' });
    // this.state.canvas.add(rect);
    let changed = false;

    if(props.text.trim().length > 0 && props.text.trim() !== this.state.textObject.text.trim()) {
      this.state.textObject.text = props.text;
      changed = true;
    }
    

    if(props.textAlign != this.state.textObject.textAlign) {
      this.state.textObject.set('textAlign', props.textAlign);
      changed = true;
    }

    if(props.fontSize != this.state.textObject.fontSize) {
      this.state.textObject.set('fontSize', props.fontSize);
      changed = true;
    }
    
    if(props.fontWeight != this.state.textObject.fontWeight) {
      this.state.textObject.set('fontWeight', props.fontWeight);
      changed = true;
    }

    if(props.fill != this.state.textObject.fill) {
      this.state.textObject.set('fill', props.textFill);
      changed = true;
    }
    
    if(props.fontFamily != this.state.textObject.fontFamily) {
      this.state.textObject.set('fontFamily', props.fontFamily);
      changed = true;
    }

    if(props.backgroundColor != this.state.textObject.backgroundColor) {
      this.state.canvas.set('backgroundColor', props.canvasBackground);
      changed = true;
    }

    if(!this.state.textObject.canvasBackgroundImage || props.canvasBackgroundImage != this.state.textObject.canvasBackgroundImage) {
      fabric.Image.fromURL(props.canvasBackgroundImage, (img) => {
        // add background image
        this.state.canvas.setBackgroundImage(img, this.state.canvas.renderAll.bind(this.state.canvas), {
          scaleX: this.state.canvas.width / img.width,
          scaleY: this.state.canvas.height / img.height
        });
        this.updateCanvas();
      });
    }

    this.updateCanvas();
    this.state.canvas.renderAll();
  }

  updateCanvas() {
    this.props.updateCanvas(this.state.canvas)
  }

  componentDidMount() {
    const canvas = new fabric.Canvas(this.c, {backgroundColor : "#ffffff"})

    canvas.on('object:moving', function (e) {
      var obj = e.target;
      // if object is too big ignore
      if (obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width) {
        return;
      }
      obj.setCoords();
      // top-left  corner
      if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
        obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
        obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
      }
      // bot-right corner
      if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height || obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width) {
        obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top);
        obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left);
      }
    });

    this.setState({ canvas }, () => {
      const textObject = new fabric.Textbox(this.props.text, { left: 10, top: 10, width: 480, height: 480, textAlign: this.props.textAlign, fontFamily: 'Courier New'});
      this.state.canvas.add(textObject);
      this.setState({
        textObject
      }, () => {
        this.updateCanvas();
      })
    })
  }

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        canvas: this.state.canvas
      });
    })

    const { width, height } = this.props
    return (
      <Fragment>
        <canvas ref={c => (this.c = c)} width={width} height={height} />
        {this.state.canvas && children}
      </Fragment>
    )
  }
}

export default DesignCanvas
