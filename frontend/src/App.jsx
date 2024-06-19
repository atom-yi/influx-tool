import {useState} from "react";
import DbInfoPage from './pages/DbInfoPage';
import {Tabs} from "antd";
import {HomeOutlined, SaveOutlined, SearchOutlined} from "@ant-design/icons";
import {TabOperator} from "./context.js";
import DataSavePage from "./pages/DataSavePage.jsx";
import DataQueryPage from "./pages/DataQueryPage.jsx";

const tabPanels = [
    {
        icon: <HomeOutlined className="text-red-400 font-bold"/>,
        key: 'main',
        label: <span className="text-red-400 font-bold">数据库信息</span>,
        children: <DbInfoPage/>,
        closable: false,
    }
];

function App() {
    const [items, setItems] = useState([...tabPanels]);
    const [activeTabKey, setActiveTabKey] = useState(items[0].key);

    function newDataInsertPage(dbInfo) {
        const key = `query-${new Date().getTime()}`;
        setItems([...items, {
            icon: <SearchOutlined className="text-red-400 font-bold"/>,
            key: key,
            label: <span className="text-red-400 font-bold">Save:{dbInfo.name}</span>,
            children: <DataSavePage dbInfo={dbInfo}/>,
            closable: true,
        }]);
        setActiveTabKey(key);
    }

    function newQueryPage(dbInfo) {
        const key = `save-${new Date().getTime()}`;
        setItems([...items, {
            icon: <SaveOutlined className="text-red-400 font-bold"/>,
            key: key,
            label: <span className="text-red-400 font-bold">Query:{dbInfo.name}</span>,
            children: <DataQueryPage dbInfo={dbInfo}/>,
            closable: true,
        }]);
        setActiveTabKey(key);
    }

    const removeTab = (targetKey) => {
        let lastIdx = -1;
        let newActiveKey = activeTabKey;
        items.forEach((item, idx) => {
            if (item.key === targetKey) {
                lastIdx = idx - 1;
            }
        });

        const newItems = items.filter(item => item.key !== targetKey)
        if (newItems.length > 0 && newActiveKey === targetKey) {
            if (lastIdx >= 0) {
                newActiveKey = newItems[lastIdx].key;
            } else {
                newActiveKey = newItems[0].key;
            }
        }
        setItems(newItems);
        setActiveTabKey(newActiveKey);
    }

    const updateTab = (key, action) => {
        if (action !== 'add') {
            removeTab(key);
        }
    }

    return (
        <div id="App" className="h-full">
            <TabOperator.Provider value={{insertView: newDataInsertPage, queryView: newQueryPage}}>
                <Tabs
                    hideAdd
                    activeKey={activeTabKey}
                    type="editable-card"
                    onEdit={updateTab}
                    onTabClick={(targetKey) => setActiveTabKey(targetKey)}
                    items={items}
                />
            </TabOperator.Provider>
        </div>
    )
}

export default App
