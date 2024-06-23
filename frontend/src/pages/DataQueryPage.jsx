import {Button, Divider, Input, message, Row, Space} from "antd";
import {useState} from "react";
import DateConvertor from "../components/DateConvertor.jsx";

function getQueryUrl(dbInfo, sql) {
    return `${dbInfo.url}/query?db=${dbInfo.name}&q=${encodeURIComponent(sql)}`
}

export default function DataQueryPage({dbInfo}) {
    const [sql, setSql] = useState("")
    const [result, setResult] = useState("")

    function query() {
        if (sql.trim() === "") {
            message.error("请输入查询SQL!")
            return
        }

        fetch(getQueryUrl(dbInfo, sql), {method: 'POST'})
            .then(res => res.json())
            .then(res => {
                setResult(JSON.stringify(res))
            })
            .catch(err => {
                setResult(err.toString())
            })
    }

    function watchInputSql(e) {
        if (!e.ctrlKey || e.code !== "Enter") {
            return;
        }
        e.preventDefault();

        query();
    }

    function formatResultByJson() {
        setResult(JSON.stringify(JSON.parse(result), null, 4))
    }

    function compressResultInJson() {
        setResult(JSON.stringify(JSON.parse(result)))
    }

    return (
        <div className="mx-5">
            <Divider orientation="left" orientationMargin="0">数据库信息</Divider>
            <Row><h1><span className="font-bold">URL:</span>{dbInfo.url} </h1></Row>
            <Row><h1><span className="font-bold">DB: </span>{dbInfo.name} </h1></Row>
            <Divider orientation="left" orientationMargin="0">时间转换工具</Divider>
            <Row><DateConvertor /></Row>
            <Divider orientation="left" orientationMargin="0">SQL查询</Divider>
            <Row>
                <Input.TextArea
                    onKeyDown={watchInputSql}
                    showCount
                    rows={3}
                    value={sql}
                    placeholder="请在此处输入查询SQL，ctrl+enter快速查询"
                    onChange={e => setSql(e.target.value)}/>
            </Row>
            <Row justify="start">
                <Button type="primary" className="mt-2" onClick={query}>查询</Button>
            </Row>
            <Divider orientation="left" orientationMargin="0">查询结果</Divider>
            <Space className="mb-2">
                <Button size="small" onClick={formatResultByJson}>JSON格式化结果</Button>
                <Button size="small" onClick={compressResultInJson}>JSON结果压缩</Button>
            </Space>
            <Row>
                <Input.TextArea
                    showCount
                    rows={8}
                    value={result}
                    onChange={e => setResult(e.target.value)}/>
            </Row>
        </div>
    );
}