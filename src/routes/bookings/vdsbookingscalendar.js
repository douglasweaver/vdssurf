import { useEffect, useRef, useContext, useMemo } from 'react';

import { BookingsContext } from './vdsBookingsContext'

import VDSBookingsCalendarDay from './vdsbookingscalendarday';
import '../../App.css'

import Fader from '../../components/fader'
import Typography from '@mui/material/Typography';

import { dayjsPR } from '../../components/vdsdayjspr';
import dayjs from 'dayjs';
var isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);

function createAllDates(startDate, bookings) {

  const endDate = bookings.length > 0 ? dayjsPR(bookings[0].checkOut).day(6) : startDate.day(6)

  const dates = [];
  for (let q = startDate; q.isSameOrBefore(endDate, "d"); q = q.add(1, "d")) {
    dates.push({ date: q, bookings: [] });
  }

  bookings.forEach((bk) => {
    for (let i = Math.max(0, dayjsPR(bk.checkIn).diff(dates[0].date, 'day'));
      i <= Math.max(dayjsPR(bk.checkOut).diff(dates[0].date, 'day'));
      i++) {
      dates[i].bookings.push(bk)
    }
  })

  const weeks = [];
  for (let iSun = 0; iSun < dates.length; iSun = iSun + 7) {
    let week = dates.slice(iSun, iSun + 7)
    weeks.push(week)
  }

  const months = []
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

  return months

};

export default function VDSBookingsCalendar({
  startDate,
  editBooking,
}) {


  const contextValues = useContext(BookingsContext);

  const scrollBoxRef = useRef(null);

  const initFocusRef = useRef(null);
  const focusDate = useRef(dayjsPR().startOf("d").day(0))

  const months = useMemo(() => {
    return contextValues.bookingsLoading ? [] :
      createAllDates(startDate, contextValues.bookings)
  }, [startDate, contextValues.bookings, contextValues.bookingsLoading])


  useEffect(() => {
    if (focusDate.current && initFocusRef.current) {
      focusDate.current = null
      initFocusRef.current?.scrollIntoView()
    }
  }, []);

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
      }}
    >

      {contextValues.error && (
        <div>
          <p>{contextValues.error.message}</p>
        </div>
      )}


      {contextValues.bookingsLoading &&
        <Typography className="blinking" variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', }}>
          ✌ PADDLING OUT 🏄
        </Typography>
      }

      <div
        style={{
          // mb: 2,
          display: "flex",
          flexDirection: "row",
          borderBottom: '1px solid black',
          height: 'auto',
        }}
      >

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

      {
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
                    inDelay={2000}
                    outDelay={1000}
                  // ref={((node) => {
                  //     if (node) monthObserverRef.current?.observe(node);
                  // })}
                  />

                  {
                    month.weeks.map((week, idx) => {
                      const myRefProps =
                        week[0].date.isSame(focusDate.current) ? {
                          ref: initFocusRef,
                          id: "vdsFocusDate"
                        } : {};
                      return (
                        <div
                          key={idx}
                          {...myRefProps}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            height: '100%',
                            borderLeft: '1px solid black',
                            // background: (myRefProps.id === week[0].date.format("MMM DD YYYY")) ? 'red' : '',
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
        </div>
      }
    </div>
  )
}



