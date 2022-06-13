import { Book } from "../data-manage/model/book-model"

export interface PieChartData {
    labels: [],
    datasets: [{
        label: string,
        data:  Array<number>,
        backgroundColor: Array<string>,
        borderColor:  Array<string>,
        borderWidth: 1
    }]
};

export interface LineChartData {
    labels: [],
    datasets: [{
        label: string,
        data:  Array<number>,
        backgroundColor: string,
        borderColor:  string,
    }]
};

export const GetGenreChartData = async (data: Book[]) => {
    const charGenreLabels = [...new Set(data.map((book) => { return book.genre }))].sort()
    let chartGenreData =  charGenreLabels.map((label) => {
        return data.filter(x=> {return x.genre === label}).length
    });   
    let genereBook = {
        labels: charGenreLabels,
        datasets: [{
            label: "No of Books by Genre",
            data: chartGenreData,
            backgroundColor:['rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'],
            borderColor:['rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'],
            borderWidth:1
        }],
    } as PieChartData;

    const charPublishedLabels = [...new Set(data.map((book) => { return book.published }))].sort()
    let charPublishedData =  charPublishedLabels.map((label) => {
        return data.filter(x=> {return x.published === label}).length
    });
    let publishedBook = {
        labels : charPublishedLabels,
        datasets:[{
            label:"No of Books by Year Published",
            data : charPublishedData,
            borderColor:'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }]
    }  as LineChartData

    return {genereBook,publishedBook};

}