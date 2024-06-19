import {Button, Divider, Input, Row} from "antd";

export default function DataQueryPage({dbInfo}) {
    return (
        <div>
            <Divider orientation="left" orientationMargin="0">数据库信息</Divider>
            <Row><h1><span className="font-bold">URL:</span>{dbInfo.url} </h1></Row>
            <Row><h1><span className="font-bold">DB: </span>{dbInfo.name} </h1></Row>
            <Divider orientation="left" orientationMargin="0">SQL查询</Divider>
            <Row><Input.TextArea rows={4} placeholder="请在此处输入查询SQL" maxLength={6}/></Row>
            <Row justify="end"><Button type="primary" className="ml-0 mr-3">查询</Button></Row>
            <Divider orientation="left" orientationMargin="0">查询结果</Divider>
            <Row><Input.TextArea rows={4} maxLength={6}/></Row>
        </div>
    );
}