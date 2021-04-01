import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Card } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import './index.css';

function Home() {
	const history = useHistory();
	const [ events, setEvents ] = useState([]);
	const [ value, setValue ] = useState('Sort Event');

	const handleSelect = (e) => {
		setValue(e);
	};

	useEffect(() => {
        let eventArray = JSON.parse(localStorage.getItem('events'));
        if(value === 'Free'){
            setEvents(eventArray.filter((event) => event.price === 0))
        }
        else if( value === 'Discount'){
            setEvents(eventArray.slice().sort((r1, r2) => {
                return r2.discount -r1.discount;
            }))
        }
        else if( value === 'Not Discount'){
            setEvents(eventArray.filter((event) => event.discount === 0))
        }
        else{
			if(eventArray !== null){
				setEvents(eventArray);
			}
        }
	}, [value]);

	return (
		<Container>
			<div className="header my-3">
				<div onClick={() => history.push('/')} className="heading">MyKinderPass</div>
				<div>
					<Button onClick={() => history.push('/createEvent')}>Create Event</Button>
				</div>
			</div>
			<div className="filter">
				<DropdownButton alignRight title={value} id="dropdown-menu-align-right" onSelect={handleSelect}>
					<Dropdown.Item eventKey="Sort Event">None</Dropdown.Item>
					<Dropdown.Item eventKey="Free">Free</Dropdown.Item>
					<Dropdown.Item eventKey="Discount">Discount</Dropdown.Item>
					<Dropdown.Item eventKey="Not Discount">Not Discount</Dropdown.Item>
				</DropdownButton>
			</div>
			<div id="card">
                {events.length === 0 ?
                <div className="no-result">
                    No Event Found !
                </div>
                :
				events.map((event, idx) => (
                    <div key={idx} id="card-body">
                    <Card border="dark" style={{ width: '18rem' }}>
							<Card.Header>Event Name: {event.eventName}</Card.Header>
							<Card.Body>
								<Card.Text>{event.eventDiscription}</Card.Text>
								<Card.Text>Venue: {event.venue}</Card.Text>
								<Card.Text>Price: {event.price} Rs</Card.Text>
								<Card.Text>Discount: {event.discount}%</Card.Text>
							</Card.Body>
						</Card>
					</div>
				))}
			</div>
		</Container>
	);
}

export default Home;
