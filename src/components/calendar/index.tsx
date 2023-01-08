import { Select, Button } from "@arco-design/web-react";
import { ut } from "./utils";
import "./index.less";
import React from "react";

interface IRef {
  getDays: (val: any) => any;
}

interface IProps {
  [key: string]: any;
}

const Calendar = React.forwardRef<IRef, IProps>((props, ref) => {
  const date = ut.DateTime();
  const weeks: string[] = [
    "周一",
    "周二",
    "周三",
    "周四",
    "周五",
    "周六",
    "周日",
  ];
  const [vals, setVals] = React.useState<any>({});
  const [checked, setChecked] = React.useState<any>({});
  const [years, setYears] = React.useState<any[]>([]);
  const [months, setMonths] = React.useState<any[]>([]);
  const [days, setDays] = React.useState<any[]>([]);

  const randomId = () => Math.random().toString(36).substring(2);
  const eachDays = (yd: number, md: number) => {
    let count = 0;
    const firstWeek = new Date(yd, md - 1, 1).getDay() || 7;
    const prevM = ut.prevMonth(yd, md);
    const nextM = ut.nextMonth(yd, md);
    const prevDaysNum = ut.getDaysNum(yd, prevM.m);
    const thisDaysNum = ut.getDaysNum(yd, md);
    const daysArr: any[] = [];
    const leftNum = 0;
    const tmp = new Date(yd, md - 1, 1).getDay();
    const dateLeft = !isNaN(tmp) ? (tmp == 0 ? 6 : tmp - 1) : 0;

    console.log("0000", yd, md);
    console.log("firstWeek", firstWeek, thisDaysNum);

    //上一月剩余天数
    // for (var p = prevDaysNum - firstWeek + 1; p <= prevDaysNum; p++, count++) {
    //   daysArr.push({
    //     cls: "arco-calendar-cell-date prev",
    //     y: prevM.y,
    //     m: prevM.m,
    //     d: p,
    //     day: ut.digit(p),
    //   });
    // }
    //本月的天数
    for (let b = 1; b <= thisDaysNum - leftNum + dateLeft; b++, count++) {
      let cls = "";
      const curD = b + leftNum - dateLeft;
      console.log("checked", checked);
      const today = `${checked.y}-${checked.m}-${checked.d}`;
      const renderDay = `${yd}-${md}-${curD}`;
      if (today === renderDay) {
        cls = "arco-calendar-cell-date action";
      } else {
        cls = "arco-calendar-cell-date";
      }
      console.log("yd", yd, md, b);
      daysArr.push({
        cls,
        y: yd,
        m: md,
        d: curD <= 0 ? "" : curD,
        day: ut.digit(curD),
      });
    }
    console.log("count", count - dateLeft);
    console.log(
      "thisDaysNum",
      thisDaysNum,
      dateLeft,
      count - dateLeft,
      prevDaysNum
    );
    //下一月开始天数
    // for (var n = 1, nlen = 42 - count; n <= nlen; n++) {
    //   daysArr.push({
    //     cls: "arco-calendar-cell-date next",
    //     y: nextM.y,
    //     m: nextM.m,
    //     d: n,
    //     day: ut.digit(n),
    //   });
    // }
    setDays(daysArr);
  };

  React.useImperativeHandle(ref, () => ({
    getDays: () => {
      return days;
    },
  }));

  const yearRender = () => {
    return (
      <Select
        value={vals.y}
        style={{ width: 100, marginRight: "10px" }}
        onChange={(value) => {
          const day = { ...vals, y: value };
          setVals(day);
          checkDate(day);
        }}
      >
        {years.map((item, index) => (
          <Select.Option key={`year-${item.value}`} value={item.value}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    );
  };
  const monthRender = () => {
    return (
      <Select
        value={vals.m}
        style={{ width: 100, marginRight: "10px" }}
        onChange={(value) => {
          const day = { ...vals, m: value };
          setVals(day);
          checkDate(day);
        }}
      >
        {months.map((item, index) => (
          <Select.Option key={`month-${item.value}`} value={item.value}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    );
  };
  const weekRender = () => {
    return (
      <>
        {weeks.map((item) => {
          return (
            <div className="arco-calendar-cell-week" key={randomId()}>
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
              onClick={() => checkDate({ y: item.y, m: item.m, d: item.d })}
            >
              <p>{item.d}</p>
              <main>{dateRender}</main>
            </div>
          );
        })}
      </>
    );
  };

  const checkDate = ({ y, m, d }) => {
    const ymd = { y, m, d };
    setChecked(ymd);
    setVals(ymd);
    props.onChange && props.onChange(ymd);
  };

  React.useEffect(() => {
    eachDays(vals.y, vals.m);
  }, [vals]);
  React.useEffect(() => {
    eachDays(checked.y, checked.m);
  }, [checked]);

  React.useEffect(() => {
    setYears(() => {
      const list: any[] = [];
      for (let y = 2010; y <= date.GetYear() + 8; y++) {
        list.push({ name: `${y}年`, value: y });
      }
      return list;
    });
    setMonths(() => {
      const list: any[] = [];
      for (let m = 1; m <= 12; m++) {
        list.push({ name: `${m}月`, value: m });
      }
      return list;
    });
    // const toDate = { y: date.GetYear(), m: date.GetMonth(), d: date.GetDate() };
    const toDate = { y: 2023, m: 1, d: 10 };
    console.log("toDate", toDate);
    setVals(toDate);
    setChecked(toDate);
  }, []);

  return (
    <div className="arco-calendar je-ovh">
      <div className="arco-calendar-header je-ovh">
        {yearRender()}
        {monthRender()}
        <Button
          style={{ width: 100, marginRight: "10px" }}
          onClick={() =>
            checkDate({
              y: date.GetYear(),
              m: date.GetMonth(),
              d: date.GetDate(),
            })
          }
        >
          今天
        </Button>
      </div>
      <div className="arco-calendar-body je-ovh">
        <div className="arco-calendar-month je-ovh">
          <div className="arco-calendar-week je-ovh">{weekRender()}</div>
          <div className="arco-calendar-body je-ovh">{dayRender()}</div>
        </div>
      </div>
    </div>
  );
});

export default Calendar;
