import CONSTANTS from "../util/constants";

export default class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: CONSTANTS.image.blank
    };
  }

  _renderCell() {
    return (<img id={this.props.id} src={this.state.img} onClick={() => this.props.handleClick(this)}/>);
  }

  _renderEnd() {
    if (this.props.isLost && !this.isClicked && this.props.isMine) {
      return (<img id={this.props.id} src={CONSTANTS.image.exposedBomb} />);
    }
    return (<img id={this.props.id} src={this.state.img} />);
  }

  render() {
    return (
      <td>
        { (this.props.isLost || this.props.isWon) ? this._renderEnd() : this._renderCell() }
      </td>
    );
  }
}
