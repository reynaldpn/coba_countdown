import React from 'react'

import moment from 'moment'

const oneSecond = 1000
const oneMinute = 60 * oneSecond
const oneHour = 60 * oneMinute
const oneDay = 24 * oneHour

class App extends React.Component {
    dateTarget = moment('2020-04-10')

    state = {
        diffs: this.getDateDiffs()
    }

    componentDidMount() {
        this.updateDiffs()
    }

    render() {
        const {
            days,
            minutes,
            hours,
            seconds
        } = this.state.diffs

        return (
            <div
                className = 'container'
            >
                <h3>
                    The Date Target Is: {this.dateTarget.format('DD MMMM YYYY')}
                </h3>

                <h1
                    className = 'time-left-from-now-title'
                >
                    Time Left From Now
                </h1>

                <p
                    className = 'time-left-from-now'
                >
                    {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
                </p>
            </div>
        )
    }

    getDateDiffs() {
        const days = Math.round(Math.abs((this.dateTarget.toDate() - Date.now()) / oneDay))
        
        const tomorrow = new Date()

        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(0,0,0,0)

        const hours = Math.round(Math.abs((tomorrow - Date.now()) / oneHour)) - 1

        const nextHourDate = new Date()
        nextHourDate.setHours(nextHourDate.getHours() + 1)
        nextHourDate.setMinutes(0)

        const minutes = Math.round(Math.abs((nextHourDate - Date.now()) / oneMinute)) - 1

        const nextMinuteDate = new Date()
        nextMinuteDate.setMinutes(nextMinuteDate.getMinutes() + 1)
        nextMinuteDate.setSeconds(0)
        
        const seconds = Math.round(Math.abs((nextMinuteDate - Date.now()) / oneSecond))

        return {
            days,
            hours,
            minutes,
            seconds
        }
    }

    updateDiffs() {
        setTimeout(() => {
            console.log('tes')
            this.setState({diffs: this.getDateDiffs()})

            this.updateDiffs()
        }, 250)
    }
}

export default App