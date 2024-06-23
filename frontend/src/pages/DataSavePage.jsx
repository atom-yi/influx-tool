import {Button, Divider, Input, message, Row, Space} from "antd";
import {useState} from "react";
import DateConvertor from "../components/DateConvertor.jsx";

function getWriteUrl(dbInfo) {
    return `${dbInfo.url}/write?db=${dbInfo.name}`;
}

export default function DataSavePage({dbInfo}) {
    const [insertContent, setInsertContent] = useState("");
    const [result, setResult] = useState("");

    function insertToDb() {
        if (insertContent.trim() === "") {
            message.error("请输入插入的数据");
            return;
        }

        fetch(getWriteUrl(dbInfo), {
            method: "POST",
            body: insertContent,
            headers: {
                "Content-Type": "raw"
            }
        })
            .then(res => res.json())
            .then(res => {
                setResult(JSON.stringify(res));
            })
            .catch(err => {
                setResult(err.toString())
            });
    }

    function watchInsertContentInput(e) {
        if (!e.ctrlKey || e.code !== "Enter") {
            return;
        }
        e.preventDefault();
        insertToDb();
    }

    return (
        <div className="mx-5">
            <Divider orientation="left" orientationMargin="0">数据库信息</Divider>
            <Row><h1><span className="font-bold">URL:</span>{dbInfo.url} </h1></Row>
            <Row><h1><span className="font-bold">DB: </span>{dbInfo.name} </h1></Row>
            <Divider orientation="left" orientationMargin="0">时间转换工具</Divider>
            <Row><DateConvertor/></Row>
            <Divider orientation="left" orientationMargin="0">数据录入</Divider>
            <Input.TextArea
                onKeyDown={watchInsertContentInput}
                onChange={e => setInsertContent(e.target.value)}
                rows={4}
                value={insertContent}
                placeHolder="输入插入的数据，格式：measurement_name,tag1=tag_value field1=field_value timestamp"/>
            <Space className="mt-2">
                <Button size="small" type="primary" onClick={() => insertToDb()}>插入数据</Button>
            </Space>
            <Divider orientation="left" orientationMargin="0">结果</Divider>
            <Input.TextArea
                onChange={e => setResult(e.target.value)}
                value={result}
                rows={3}/>
        </div>
    );
}