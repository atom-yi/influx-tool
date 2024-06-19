const DB_INFOS_KEY = "db_infos";

export function getAllDbInfoFromLS() {
    const dbInfosStr = window.localStorage.getItem(DB_INFOS_KEY)
    return dbInfosStr ? JSON.parse(dbInfosStr) : [];
}

export function insertDbInfoToLS(newDbInfo) {
    const dbInfos = getAllDbInfoFromLS()
        .filter(dbInfo => dbInfo.url !== newDbInfo.url || dbInfo.name !== newDbInfo.name);
    dbInfos.unshift(newDbInfo);
    dbInfos.map((dbInfo, index) => dbInfo.key = index + 1);
    window.localStorage.setItem(DB_INFOS_KEY, JSON.stringify(dbInfos));
}

export function deleteDbInfoInLS(deltedDbInfo) {
    const dbInfos = getAllDbInfoFromLS()
        .filter(dbInfo => dbInfo.url !== deltedDbInfo.url || dbInfo.name !== deltedDbInfo.name);
    dbInfos.map((dbInfo, index) => dbInfo.key = index + 1);
    window.localStorage.setItem(DB_INFOS_KEY, JSON.stringify(dbInfos));
}
