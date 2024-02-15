import React from 'react';
import VDSBookingsCalendarDay from './vdsbookingscalendarday';
import '../../App.css'

import Fader from '../../components/fader'

import { useRef } from 'react';

import dayjs from 'dayjs';
var isBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isBefore);
var minMax = require('dayjs/plugin/minMax')
dayjs.extend(minMax)
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)


function createDates(bookings) {
    const dates = [];
    var startDate = dayjs().tz("America/Puerto_Rico").startOf("d")
    if (bookings.length > 0 && dayjs(bookings[0].checkOut).tz("America/Puerto_Rico").isBefore(startDate, "d")) {
        startDate = dayjs(bookings[0].checkOut).tz("America/Puerto_Rico").startOf("d")
    }
    startDate = startDate.day(0)
    var endDate = bookings.length > 1 ? dayjs(bookings.slice(-1)[0].checkOut).tz("America/Puerto_Rico").startOf("d") : startDate
    endDate = endDate.day(6)

    for (let q = startDate; q.isSameOrBefore(endDate, 'd'); q = q.add(1, 'd')) {
        dates.push({ date: q });
    }

    bookings.forEach(bk => {
        // '[]' includes start and end date
        const datesInBooking = dates.filter((d) =>
            d.date.isBetween(dayjs(bk.checkIn).tz("America/Puerto_Rico"),
                dayjs(bk.checkOut).tz("America/Puerto_Rico"), 'day', '[]'))
        datesInBooking.forEach(dt => {
            if (dt.bookings) {
                dt.bookings.push(bk)
            } else {
                dt.bookings = [bk]
            }
        })
    })

    const months = [];
    let currentMonth = -1
    let month = { key: "", weeks: [] }
    for (let iSun = 0; iSun < dates.length; iSun = iSun + 7) {
        let week = dates.slice(iSun, iSun + 7)
        if (currentMonth !== week[6].date.month()) {
            if (currentMonth !== -1) months.push(month)
            currentMonth = week[6].date.month()
            month = { key: week[6].date.format("MMM YYYY"), weeks: [] }
        }
        month.weeks.push(week)
    }
    months.push(month)

    return months;
};


export default function VDSBookingsCalendar({
    bookings,
    editBooking,
    loadMoreButton
}) {

    // const monthObserverRef = useRef(null);
    const scrollBoxRef = useRef(null);

    // const [showMonth, setShowMonth] = useState("LOADING");

    // useEffect(() => {

    //     monthObserverRef.current =
    //         new IntersectionObserver((entries, monthObserverRef) => {
    //             entries.forEach(entry => {
    //                 if (entry.isIntersecting) {
    //                     setShowMonth(entry.target?.innerText)
    //                 }
    //             })
    //         },
    //             {
    //                 root: scrollBoxRef.current,
    //                 rootMargin: '0px 0px -100% 0px',
    //                 threshold: 0
    //             }
    //         );
    // }, [scrollBoxRef]);

    const months = createDates(bookings);

    // useEffect(() => {
    //     setShowMonth(months[0].key)
    // }, []);

    const columns = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return (

        <div
            style={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                height: '100%',
                overflowX: "auto",
                overflowY: "hidden",
                // borderTop: '1px solid black',
                // borderLeft: '1px solid black',
            }}
        >
            <div
                style={{
                    // mb: 2,
                    display: "flex",
                    flexDirection: "row",
                    borderBottom: '1px solid black',
                    height: 'auto',
                }}


            >
                {/* <Fader
                    text={showMonth}
                    Size="p"
                    inDelay={1000}
                    outDelay={2000}
                >
                </Fader> */}

                {
                    columns.map((col, idx) => {
                        return (
                            <div key={idx}
                                style={{
                                    fontWeight: 'bold',
                                    flexBasis: 0,
                                    flexGrow: 1,
                                    textAlign: 'right',
                                    paddingRight: '5px', marginRight: 2,
                                }}>
                                {col}
                            </div>
                        )
                    })
                }

            </div>

            <div
                ref={scrollBoxRef}
                className="scrollable-element"
                style={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    overflowX: "auto",
                    overflowY: "scroll",
                    // border: "1px solid #ccc",
                }}
            >

                {
                    months.map((month, midx) => {
                        return (
                            <div key={midx}
                                style={{
                                    display: "flex",
                                    height: '100%',
                                    flexDirection: "column",
                                }}
                            >

                                <Fader
                                    text={month.key}
                                    Size="p"
                                    inDelay={1000}
                                    outDelay={2000}
                                // ref={((node) => {
                                //     if (node) monthObserverRef.current?.observe(node);
                                // })}
                                />
                                {
                                    month.weeks.map((week, idx) => {
                                        return (
                                            <div
                                                key={idx}
                                                style={{
                                                    // mb: 2,
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    height: '100%',
                                                    // overflowX: "auto",
                                                    // overflowY: "hidden",
                                                }}
                                            >

                                                {
                                                    week.map((day, cidx) => {
                                                        return (
                                                            <div key={cidx}
                                                                style={{
                                                                    display: "flex",
                                                                    flexBasis: 0, flexGrow: 1,
                                                                    align: 'center',
                                                                    borderRight: '1px solid black',
                                                                    borderBottom: '1px solid black',
                                                                    overflowX: "auto",
                                                                    overflowY: "hidden",
                                                                }}>


                                                                <VDSBookingsCalendarDay
                                                                    date={day.date}
                                                                    bookings={day.bookings}
                                                                    editBooking={editBooking}
                                                                />
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                {loadMoreButton()}
            </div>
        </div>
    )
}



