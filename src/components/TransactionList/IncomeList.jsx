import React, { useState, useEffect } from "react";
import ListContainer from './ListContainer';
import ListAxiosAPI from "../../api/ListAxiosAPI";

const IncomeList = () => {
    const [listData, setListData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await ListAxiosAPI.getListIncome();
                console.log(data);
                const transformedData = data.map(item => ({
                    money: item.money,
                    date: item.date,
                    category: item.category,
                    detail: item.detail,
                    deal: "수입"
                }));
                setListData(transformedData);
            } catch (error) {
                console.error('조회 실패', error);
            }
        };
    
        fetchData();
    }, []);
    
    return (
        <>
            <ListContainer listData={listData} />
        </>
    );
};
export default IncomeList;
