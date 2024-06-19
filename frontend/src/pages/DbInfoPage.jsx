import {Button, Form, Input, message, Modal, Row, Table} from "antd";
import {useContext, useState} from "react";
import {deleteDbInfoInLS, getAllDbInfoFromLS, insertDbInfoToLS} from "../util/db_info.js";
import {TabOperator} from "../context.js";

const dbInfoColumns = [
    {
        title: '序号',
        dataIndex: 'key',
        key: 'idx',
    },
    {
        title: 'URL',
        dataIndex: 'url',
        key: 'url',
    },
    {
        title: '数据库名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: '密码',
        dataIndex: 'password',
        key: 'password',
    },
];

const formLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 20
    }
};

function DbList({dbInfos, deleteDbInfo}) {
    const tabOperator = useContext(TabOperator);
    const tableColumns = [...dbInfoColumns,
        {
            title: '操作',
            key: 'operations',
            render: (text, record) => (<div>
                <Button size="small" onClick={() => tabOperator.queryView(record)}>新建查询</Button>
                <Button size="small" onClick={() => tabOperator.insertView(record)}>数据录入</Button>
                <Button size="small" danger onClick={() => deleteDbInfo(record)}>删除</Button>
            </div>),
        },
    ];

    return (
        <Table
            className="w-full"
            size="small"
            dataSource={dbInfos}
            pagination={false}
            columns={tableColumns}
        />
    )
}

export default function DbInfoPage() {
    const [form] = Form.useForm();
    const [newDbModalOpen, setNewDbModalOpen] = useState(false);
    const [dbInfos, setDbInfos] = useState(getAllDbInfoFromLS());

    function newDbInfo() {
        form.validateFields()
            .then((values) => {
                const dbInfo = {
                    url: values.url,
                    name: values.name,
                    username: values.username,
                    password: values.password,
                };
                insertDbInfoToLS(dbInfo);
                setDbInfos(getAllDbInfoFromLS());

                message.success('添加数据库信息成功');
                setNewDbModalOpen(false)
            })
            .catch((errorInfo) => {
                console.log('Validate Failed:', errorInfo);
            });
    }

    function deleteDbInfo(dbInfo) {
        deleteDbInfoInLS(dbInfo);
        setDbInfos(getAllDbInfoFromLS());
        message.success('删除数据库信息成功');
    }

    return (
        <div>
            <Row justify="end">
                <Button
                    type="primary"
                    onClick={() => setNewDbModalOpen(true)}
                    className="text-white shadow-lg bg-rose-400 shadow-2xl shadow-rose-700 animate-bounce mr-2">
                    添加数据库
                </Button>
            </Row>

            <Modal title="添加数据库"
                   forceRender
                   open={newDbModalOpen}
                   onOk={newDbInfo}
                   width="80%"
                   onCancel={() => setNewDbModalOpen(false)}>
                <Form
                    form={form}
                    className="w-full"
                    {...formLayout}
                    name="dbInfo">
                    <Form.Item
                        label="URL"
                        name="url"
                        rules={[
                            {
                                required: true,
                                message: '请输入数据库URL',
                            }
                        ]}>
                        <Input placeholder="如: http://127.0.0.1:8086"/>
                    </Form.Item>
                    <Form.Item
                        label="数据库名称"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '请输入数据库名称',
                            }
                        ]}>
                        <Input placeholder="如: test"/>
                    </Form.Item>
                    <Form.Item
                        label="用户名"
                        name="username">
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password">
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>

            <Row>
                <DbList dbInfos={dbInfos}
                        setDbInfos={setDbInfos}
                        deleteDbInfo={deleteDbInfo} />
            </Row>
        </div>
    )
}