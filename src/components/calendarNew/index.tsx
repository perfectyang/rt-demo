import { Button, Space } from "@arco-design/web-react";
import {
  chunk,
  computedCalendar,
  computedWeek,
  getEndDay,
  getFirstWeek,
  getLastDate,
  renderText,
  ut,
} from "./utils";
import "./index.less";
import React, { useRef } from "react";

interface IRef {}

interface IProps {
  [key: string]: any;
}

const Calendar = React.forwardRef<IRef, IProps>((props, ref) => {
  const date = ut.DateTime();
  const [vals, setVals] = React.useState<any>({});
  const [days, setDays] = React.useState<any[]>([]);

  const weeks: string[] = [
    "周一",
    "周二",
    "周三",
    "周四",
    "周五",
    "周六",
    "周日",
  ];

  const todayDateRef = useRef({
    y: date.GetYear(),
    m: date.GetMonth(),
    d: date.GetDate(),
  });

  const randomId = () => Math.random().toString(36).substring(2);

  React.useImperativeHandle(ref, () => ({}));

  const markToday = (days) => {
    days.forEach((cur) => {
      if (
        cur.y === todayDateRef.current.y &&
        cur.m === todayDateRef.current.m
      ) {
        cur.cls = "arco-calendar-cell-date";
      } else {
        cur.cls = "arco-calendar-cell-date gray";
      }
      const isToday =
        cur.y === todayDateRef.current.y &&
        cur.m === todayDateRef.current.m &&
        cur.d === todayDateRef.current.d;
      if (isToday) {
        cur.cls = cur.cls + " action";
      }
    });
  };

  const prevWeekLogic = (curDays) => {
    const days = curDays.slice();
    const firstDay = days.slice(0, 7)[3];
    console.log("firstDay", firstDay);
    const { preWeek } = computedWeek(
      `${firstDay.y}-${firstDay.m}-${firstDay.d}`
    );
    const ret = preWeek();
    days.unshift(...ret);
    let i = 0;
    while (i < 7) {
      days.pop();
      i++;
    }
    markToday(days);
    return days;
  };

  const nextWeekLogic = (curDays) => {
    const days = curDays.slice();
    const lastDay = days[days.length - 3];
    console.log("lastDay", lastDay, days);
    const tmpDate = `${lastDay.y}-${lastDay.m}-${lastDay.d}`;
    const { nextWeek } = computedWeek(tmpDate);
    const ret = nextWeek();
    console.log("lastDay2", ret, tmpDate);
    days.push(...ret);
    let i = 0;
    while (i < 7) {
      days.shift();
      i++;
    }
    markToday(days);
    return days;
  };

  // 上一周
  const prevWeek = () => {
    setDays((days) => {
      console.log("sendddd", days);
      return [...prevWeekLogic(days)];
    });
  };

  // 下一周
  const nextWeek = () => {
    setDays((days) => {
      return [...nextWeekLogic(days)];
    });
  };

  // 初始化处理
  const initData = (toDate) => {
    const calendar = computedCalendar(toDate.y, toDate.m);
    console.log("aaaa", calendar);
    const groupCalendar = chunk(calendar, 7);
    // 找出当前日期排在第几行, 如果排在第二行之后，就要重置到第二行
    const row = groupCalendar.findIndex((group) => {
      return group.some(
        (gp) => gp.y === toDate.y && gp.m === toDate.m && gp.d === toDate.d
      );
    });
    let realCalendar = calendar;
    // 提升当前日期到第二行
    if (row > 1) {
      let page = row - 1;
      while (page--) {
        console.log("realCalendar", realCalendar);
        realCalendar = nextWeekLogic(realCalendar);
      }
    }
    setDays(realCalendar);
  };

  const pageCalendar = () => {
    return (
      <Space>
        <Button type="primary" onClick={prevWeek}>
          上一周
        </Button>
        <Button type="primary" onClick={nextWeek}>
          下一周
        </Button>
      </Space>
    );
  };

  const renderDate = () => {
    return [
      todayDateRef.current.y + "年",
      todayDateRef.current.m + "月",
      todayDateRef.current.d + "日",
    ];
  };
  const weekRender = () => {
    return (
      <>
        {weeks.map((item, idx) => {
          return (
            <div className="arco-calendar-cell-week" key={idx}>
              <p>{item}</p>
            </div>
          );
        })}
      </>
    );
  };
  const dayRender = () => {
    return (
      <>
        {days.map((item) => {
          const dateRender =
            props.dateRender &&
            props.dateRender({ y: item.y, m: item.m, d: item.d });
          return (
            <div
              className={item.cls}
              key={randomId()}
              onClick={() => {
                // checkDate({ y: item.y, m: item.m, d: item.d });
              }}
            >
              <p>
                <span className="text">{renderText(item)}</span>
              </p>
              <main>{dateRender}</main>
            </div>
          );
        })}
      </>
    );
  };

  const checkDate = ({ y, m, d }) => {
    const ymd = { y, m, d };
    setVals(ymd);
    props.onChange && props.onChange(ymd);
  };

  React.useEffect(() => {
    const toDate = {
      y: todayDateRef.current.y,
      m: todayDateRef.current.m,
      d: todayDateRef.current.d,
    };
    initData(toDate);
    setVals(toDate);
  }, []);

  return (
    <div className="arco-calendar je-ovh">
      <div className="arco-calendar-header je-ovh">
        <span className="date-show">{renderDate()}</span>
        <Button
          style={{ width: 100, marginRight: "10px" }}
          onClick={() => {
            initData({
              y: todayDateRef.current.y,
              m: todayDateRef.current.m,
              d: todayDateRef.current.d,
            });
          }}
        >
          今天
        </Button>
        {pageCalendar()}
      </div>
      <div style={{ width: "80%", margin: "10%" }}>
        <div className="arco-calendar-body je-ovh">
          <div className="arco-calendar-month je-ovh">
            <div className="arco-calendar-week je-ovh">{weekRender()}</div>
            <div className="arco-calendar-body je-ovh">{dayRender()}</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Calendar;
