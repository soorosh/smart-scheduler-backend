
const getSchedule = (req, res) => {
    console.log("[getSchedule] schedule data requested")
    const scheduleData = [
        {
            Id: 1,
            Subject: 'Explosion of Betelgeuse Star',
            Location: 'Space Center USA',
            StartTime: '2022-11-15T04:00:00.000Z',
            EndTime: '2022-11-15T05:30:00.000Z',
            CategoryColor: '#1aaa55',
        },
        {
            Id: 2,
            Subject: 'Thule Air Crash Report',
            Location: 'Newyork City',
            StartTime: '2022-11-16T06:30:00.000Z',
            EndTime: '2022-11-16T08:30:00.000Z',
            CategoryColor: '#357cd2',
        },
    ]
    res.json(scheduleData)
    console.log("[getSchedule] schedule data sent")
}

const automateSchedule = (req, res) => {
    console.log("[automateSchedule] automate schedule data requested")
    // add logic 
    // testing 
    // update db 
    console.log("[automateSchedule] automate schedule data sent")
}
module.exports = { getSchedule, automateSchedule }