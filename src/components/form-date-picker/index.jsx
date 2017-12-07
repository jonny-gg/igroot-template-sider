import { Component } from 'react'
import { DatePicker } from 'igroot'
import moment from 'moment'


export class FormDatePicker extends Component {

  state = {
    date: moment(),
    value: '',
    formatDate: 'YYYY-MM-DD'
  }

  componentWillMount() {
    const { formatDate } = this.state
    const { defaultValue, format } = this.props

    this.setState({
      value: defaultValue,
      formatDate: format || formatDate,
      date: defaultValue || moment(defaultValue, format || formatDate)
    })
  }

  componentWillReceiveProps(nextProps) {
    const { value, format } = nextProps
    const { formatDate } = this.state
    const date = value ? moment(`${value}`, format || formatDate) : null

    console.log(date, 'date')
    if ('value' in nextProps) {
      this.setState({
        value,
        format: format || formatDate,
        date
      })
    }
  }

  handleChange = (date, value) => {
    const { onChange } = this.props

    this.setState({
      date,
      value
    })

    onChange && onChange(value)
  }

  render() {
    const { date } = this.state
    return (
      <DatePicker {...this.props} value={date} onChange={this.handleChange} />
    )
  }
}
