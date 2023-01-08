import { Select, Button } from "@arco-design/web-react";
import { getEndDay, getFirstWeek, getLastDate, renderText, ut } from "./utils";
import "./index.less";
import React from "react";
import classname from "classname";

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
    console.log("object", yd, md);
    const lastMonEndDay = getEndDay(yd, md - 1); // 上个月的最后一天
    const curMonEndDay = getEndDay(yd, md); // 当前月的最后一天
    const week = getFirstWeek(yd, md); // 当前月的第一天是周几
    let lastWeekNum = week - 1; // 上个月占几个格子
    lastWeekNum = week === 0 ? 6 : lastWeekNum;
    // 渲染几行几行
    const row = 6;
    const column = 7;

    const daysArr: Record<string, any>[] = [];
    let prevStartDate = lastMonEndDay - lastWeekNum + 1; // 上个月的起始日期
    let curStartDate = 1;
    let nextStartDate = 1;

    for (let i = 0; i < row * column; i++) {
      if (i < lastWeekNum) {
        // 上个月的日期
        const lastDate = getLastDate(yd, md - 1);
        daysArr.push({
          cls: "arco-calendar-cell-date prev",
          y: lastDate.getFullYear(),
          m: lastDate.getMonth() + 1,
          d: prevStartDate++,
        });
      } else if (i >= lastWeekNum + curMonEndDay) {
        // 下个月的日期
        const nextDate = getLastDate(yd, md + 1);
        daysArr.push({
          cls: "arco-calendar-cell-date next",
          y: nextDate.getFullYear(),
          m: nextDate.getMonth() + 1,
          d: nextStartDate++,
        });
      } else {
        const isToday =
          yd === date.GetYear() &&
          md === date.GetMonth() &&
          curStartDate === date.GetDate();
        daysArr.push({
          cls: "arco-calendar-cell-date" + (isToday ? " action" : ""),
          y: yd,
          m: md,
          d: curStartDate++,
        });
      }
    }
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
              <p>{renderText(item)}</p>
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
    const toDate = { y: date.GetYear(), m: date.GetMonth(), d: date.GetDate() };
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
