import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { BarChart } from "@mui/x-charts";

const Home = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get("/sensor_data").then((res) => {
            setData(res.data);
        }).catch((err) => {
            console.log(err);
        })
    })

    console.log(data);

    return (
        <>
            <Table>
                <TableHead>
                    <TableCell>
                        Oxygen Level
                    </TableCell>
                    <TableCell>
                        Heartbeat
                    </TableCell>
                    <TableCell>
                        Body Temperature
                    </TableCell>
                    <TableCell>
                        Timestamp
                    </TableCell>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow>
                            <TableCell>
                                {item.oxygenLevel.N}
                            </TableCell>
                            <TableCell>
                                {item.heartbeat.N}
                            </TableCell>
                            <TableCell>
                                {item.bodyTemp.S}
                            </TableCell>
                            <TableCell>
                                {item.timeStamp.S}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <BarChart
                xAxis={[
                    {
                        id: "barCategories",
                        data: ["Oxygen Level", "Heartbeat", "Body Temp"],
                        scaleType: "band",
                    },
                ]}
                series={[
                    {
                        data: [data[0].oxygenLevel.N, data[0].heartbeat.N, data[0].bodyTemp.S],
                    },
                ]}
                width={500}
                height={300}
            />
        </>

    )
}

export {Home};
