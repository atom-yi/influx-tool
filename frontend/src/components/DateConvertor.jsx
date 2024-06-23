import {DatePicker, Input, InputNumber, Select, Space} from "antd";
import {DoubleLeftOutlined, DoubleRightOutlined} from "@ant-design/icons";
import {useState} from "react";
import dayjs from "dayjs";

const UNIT_MAP = {
    "ns": {fromMs: ms => ms * 1000000000, toMs: ns => ns / 1000000000},
    "us": {fromMs: ms => ms * 1000, toMs: us => us / 1000},
    "ms": {fromMs: ms => ms, toMs: ms => ms},
    "s":  {fromMs: ms => ms / 1000, toMs: s => s * 1000},
    "m":  {fromMs: ms => ms / 60000, toMs: m => m * 60000},
    "h":  {fromMs: ms => ms / 3600000, toMs: h => h * 3600000},
    "d":  {fromMs: ms => ms / 86400000, toMs: d => d * 86400000},
    "w":  {fromMs: ms => ms / 604800000, toMs: w => w * 604800000},
}

export default function DateConvertor() {
    const [dateFormatter, setDateFormatter] = useState("YYYY-MM-DD HH:mm:ss")
    const [unit, setUnit] = useState('ms');
    const [timestamp, setTimestamp] = useState(dayjs().valueOf());
    const [currentDate, setCurrentDate] = useState(dayjs());

    function updateDataFormatter(e) {
        setDateFormatter(e.target.value);
        setCurrentDate(dayjs(UNIT_MAP[unit].toMs(timestamp).format(dateFormatter)));
    }

    function updateUnit(selectedUnit) {
        setUnit(selectedUnit);
        setTimestamp(Math.floor(UNIT_MAP[selectedUnit].fromMs(currentDate.valueOf())))
    }

    function onChangeCurrentDate(selectedDate) {
        if (selectedDate === null) {
            return;
        }

        setCurrentDate(selectedDate);
        setTimestamp(Math.floor(UNIT_MAP[unit].fromMs(selectedDate.valueOf())));
    }

    function onChangeTimestamp(newTimestampStr) {
        const newTimestamp = Number.parseInt(newTimestampStr)
        setTimestamp(Math.floor(newTimestamp));
        setCurrentDate(dayjs(UNIT_MAP[unit].toMs(newTimestamp)));
    }

    return (
        <div>
            <Space>
                <span>时间戳单位：</span>
                <Select
                    style={{ width: 80 }}
                    defaultValue="ms"
                    onChange={updateUnit}
                    options={[
                        {
                            value: 'ns',
                            label: '纳秒',
                        },
                        {
                            value: 'us',
                            label: '微秒',
                        },
                        {
                            value: 'ms',
                            label: '毫秒',
                        },
                        {
                            value: 's',
                            label: '秒',
                        },
                        {
                            value: 'm',
                            label: '分钟',
                        },
                        {
                            value: 'h',
                            label: '小时',
                        },
                        {
                            value: 'd',
                            label: '天',
                        },
                    ]}
                />
                <span>日期格式：</span>
                <Input value={dateFormatter} onChange={updateDataFormatter}/>
            </Space>
            <Space className="mt-3">
                <DatePicker
                    showTime
                    allowClear={false}
                    preserveInvalidOnBlur={true}
                    onChange={onChangeCurrentDate}
                    value={currentDate}
                    format={dateFormatter}/>
                <p>
                    <DoubleLeftOutlined/>
                    输入内容自动转换
                    <DoubleRightOutlined/>
                </p>
                <InputNumber style={{ width: 300 }}
                             addonAfter={unit}
                             value={timestamp.toString()}
                             onChange={onChangeTimestamp}/>
            </Space>
        </div>
    )
}