'use strict'

const e = React.createElement

class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            liked: false
        }
    }

    componentDidMount() {
        console.log('react rocks')
    }

    render() {
        if (this.state.liked) {
            return 'you liked this'
        }

        return e(
            'button',
            {
                onClick: () => this.setState({liked: true})
            },
            'Button'
        )
    }
}

const domContainer = document.querySelector('#button_container')
ReactDOM.render(e(Button), domContainer)