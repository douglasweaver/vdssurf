import { useState, useEffect, useRef, useContext } from 'react';

import { BookingsContext } from '../BookingsContext'

import useOnScreen from '../useOnScreen';

import VDSBookingsCalendarDay from './vdsbookingscalendarday';
import '../../App.css'

import Fader from '../../components/fader'

import Button from '@mui/material/Button';

import dayjs from 'dayjs';
import { CropLandscapeOutlined, Moped, StarBorderTwoTone } from '@mui/icons-material';
import useTopBottomIntersection from '../useTopBottomIntersection';
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
var isBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isBefore);
var minMax = require('dayjs/plugin/minMax')
dayjs.extend(minMax)
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)


function createAllDates(startDate, endDate) {

  const dates = [];
  for (let q = startDate; q.isSameOrBefore(endDate, 'd'); q = q.add(1, 'd')) {
    dates.push({ date: q });
  }

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

const renderWindowMonths = 4
const todayPR = dayjs().tz("America/Puerto_Rico").startOf("d")
const months = createAllDates(
  dayjs('2015-03-01').tz("America/Puerto_Rico").startOf("d").day(0),
  todayPR.add(+28, "month").day(6))



export default function VDSBookingsCalendar({
  // vdsBookings,
  editBooking,
}) {


  const {bookings, setEarliestCheckOut, bookingsLoading, errorDiv} = useContext(BookingsContext);

  const scrollBoxRef = useRef(null);
  const initFocusRef = useRef(null);

  // const [initFocus, setInitFocus] = useState(true)

  const observerRef = useRef(null);

  const [midDateState, setMIdDateState] = useState(todayPR.day(0))
  const midDate = useRef(todayPR.day(0))

  useEffect(() => {
    console.log("init focus ref", initFocusRef.current)
    if (midDateState.isSame(todayPR.day(0)) && initFocusRef.current) {
      initFocusRef.current?.scrollIntoView()
    }
  }, []);

  const addIntObserver = ((node, nodeId) => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        const isInter = entries.find((e) => e.isIntersecting)
        if (isInter) { intersecting(isInter) }
      },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.1
        }
      )
    }
    observerRef.current?.observe(node)
  })

  const intersecting = ((element) => {
    if (element.target.id) {
      const diffWeeks = dayjs(element.target.id).diff(midDate.current, "week")
      if (diffWeeks < -6) {
        console.log("UP WITH ID", dayjs(element.target.id))
        midDate.current = dayjs(element.target.id)
        // midDate.current = midDate.current.add(-renderWindowMonths, "month").day(0)
        setMIdDateState(midDate.current)
        setEarliestCheckOut(midDate.current.add(-2, "months"))
        observerRef.current.unobserve(element.target)
      } else if (diffWeeks > 6) {
        console.log("DOWN WITH ID", dayjs(element.target.id))
        midDate.current = dayjs(element.target.id)
        // midDate.current = midDate.current.add(+renderWindowMonths, "month").day(0)
        setMIdDateState(midDate.current)
        observerRef.current.unobserve(element.target)
      } else {
        observerRef.current.unobserve(element.target)
      }
    } else {
      console.log("INTERSECTING NULL ID", element.target.id)
    }
  })


  const columns = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const dateRangeStart = midDateState.add(-renderWindowMonths, "months").day(0)
  const dateRangeEnd = midDateState.add(renderWindowMonths, "months").day(6)
  const renderStart = Math.max(0, months.findIndex((mo) =>
    dateRangeStart.isBetween(mo.weeks[0][0].date, mo.weeks[mo.weeks.length - 1][6].date, 'day', '[]')) - 1)
  const renderEnd = months.findIndex((mo) =>
    dateRangeEnd.isBetween(mo.weeks[0][0].date, mo.weeks[mo.weeks.length - 1][6].date, 'day', '[]')) + 2

  // console.log("bookings", vdsBookings.bookings.length, "months", months.length)
  // console.log("renderStart", renderStart, "renderEnd", renderEnd)
  // console.log("midDareState", midDateState, "midDate", midDate.current)
  console.log("RERENDER", bookings?.length)

  var wIndex = 0
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

      {errorDiv()}

      {bookingsLoading && (
            <div>
                <p>LOADING BOOKINGS</p>
            </div>
        )
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
              // border: "1px solid #ccc",
            }}
          >

            {
              months.map((month, midx) => {
                const fullRender = (midx >= renderStart && renderEnd >= midx)
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
                        const myRefProps =
                          (wIndex % 12 === 0 &&
                            week[0].date.isBetween(midDateState.add(-6, 'M'),
                              midDateState.add(+6, 'M'))) ? {
                            ref: (node) => {
                              node && addIntObserver(node,
                                week[0].date.format("MMM DD YYYY"))
                            },
                            id: week[0].date.format("MMM DD YYYY")
                          } :
                            week[0].date.isSame(midDateState) ? {
                              ref: initFocusRef,
                              // ref: (node) => { node && scrollToMid(node) },
                              id: "vdsMidDate"
                            } : {};
                        wIndex += 1
                        return (
                          <div
                            key={idx}
                            {...myRefProps}
                            style={{
                              // mb: 2,
                              display: "flex",
                              flexDirection: "row",
                              height: '100%',
                              background: (myRefProps.id === week[0].date.format("MMM DD YYYY")) ? 'red' : '',
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
                                      fullRender={fullRender}
                                      bookings={bookings}
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



