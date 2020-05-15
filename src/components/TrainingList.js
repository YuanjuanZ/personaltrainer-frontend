import React from 'react';
import moment from 'moment';

import '../App.css';

function TrainingList() {
    const [trainings, setTrainings] = React.useState([]);
    const [sort, setSort] = React.useState('activity');
    const [query, setQuery] = React.useState('');

    React.useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }
    
    const sortTrainings = () => {
        let returnedTrainings = [];
        if (trainings.length === 0) {
            return returnedTrainings;
        } else {
            if (sort === 'activity') {
                returnedTrainings = trainings.sort((a,b) => (a.activity > b.activity) ? 1 : ((b.activity > a.activity) ? -1 : 0));
            }
            if (sort === 'date') {
                returnedTrainings = trainings.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
            }
            if (sort === 'duration') {
                returnedTrainings = trainings.sort((a,b) => (a.duration > b.duration) ? 1 : ((b.duration > a.duration) ? -1 : 0));
            }
            return returnedTrainings;
        }
    }

    const searchFor = (training) => {
        if (query.length === 0) {
            return true;
        }
        if (training.activity.toLowerCase().includes(query.toLowerCase())
        ||training.duration == query.toLowerCase()
        || training.date.toLowerCase().includes(query.toLowerCase())) {
            return true;
        }
        return false;
    }

    return (
        <div className="customer-list">
            <h1>Trainings</h1>
            <h3>Note: Click the headers to sort by them</h3>
            <input value={query} type="text" placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
            <div className="customer-list-headers">
                <div onClick={() => setSort('activity')}>Activity</div>
                <div onClick={() => setSort('duration')}>Duration</div>
                <div onClick={() => setSort('date')}>Date</div>
            </div>
            {sortTrainings().map((training, index) => (
                searchFor(training) &&
                <div className="customer-list-item" key={index}>
                    <div>{training.activity}</div>
                    <div>{training.duration}</div>
                    <div>{moment(training.date).format('DD.MM.YYYY, h:mm')}</div>
                </div>
            ))}
        </div>
    )
}

export default TrainingList;