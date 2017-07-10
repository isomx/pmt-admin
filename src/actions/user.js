export const types = {
  SHOW_LOGIN: 'USER_SHOW_LOGIN',
  LOGIN: 'USER_LOGIN',
  LOGOUT: 'USER_LOGOUT',
  LOGOUT_FULFILLED: 'USER_LOGOUT_FULFILLED',
  LOGOUT_REJECTED: 'USER_LOGOUT_REJECTED',
  LOGIN_PROCESSING: 'USER_LOGIN_PROCESSING',
  LOGIN_REJECTED: 'USER_LOGIN_REJECTED',
  LOGIN_FULFILLED: 'USER_LOGIN_FULFILLED',
  CREATE: 'USER_CREATE',
  CREATE_PROCESSING: 'USER_CREATE_PROCESSING',
  CREATE_FULFILLED: 'USER_CREATE_FULFILLED',
  CREATE_REJECTED: 'USER_CREATE_REJECTED',
  CHECK_USERNAME_AVAILABILITY: 'USER_CHECK_USERNAME_AVAILABILITY',
  CHECK_EMAIL_AVAILABILITY: 'USER_CHECK_EMAIL_AVAILABILITY',
  CHECK_AVAILABILITY_PROCESSING: 'USER_CHECK_AVAILABILITY_PROCESSING',
  CHECK_AVAILABILITY_FULFILLED: 'USER_CHECK_AVAILABILITY_FULFILLED',
  CHECK_AVAILABILITY_REJECTED: 'USER_CHECK_AVAILABILITY_REJECTED',
}

/**
 class Something extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			raised: true,
			flat: false,
			visible: false,
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		this.setState({raised: !this.state.raised, flat: !this.state.flat, visible: !this.state.visible });
	}

	render(){
	this.state.visible
		return(
		<div>
			<Button raised={this.state.raised} flat={this.state.flat} primary label="My Label" onClick={this.handleClick} />
		<Dialog id="LoginForm" visible={this.state.visible} title="PleaseLogin" modal>
			<Button raised={this.state.raised} flat={this.state.flat} primary label="My Label" onClick={this.handleClick} />
			</Dialog>
			</div>
			);
	}

}
 **/