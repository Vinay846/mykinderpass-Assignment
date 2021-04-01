import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import { useHistory } from 'react-router-dom'


function CreateEvent() {
	const [ eventName, setEventName ] = useState('');
	const [ eventDiscription, setEventDiscription ] = useState('');
	const [ venue, setVenue ] = useState('');
	const [ price, setPrice ] = useState(0);
	const [ discount, setDiscount ] = useState(0);
	const [ salePrice, setSalePrice ] = useState(Number(price));
    const history = useHistory();


	const handleSaveEvent = () => {
		let newEvent = { EventId: 'EventId-' + uuid(), eventName, eventDiscription, venue, price, discount };
		if (localStorage.getItem('events') == null) {
			let events = [];
			events.push(newEvent);
            localStorage.setItem('events', JSON.stringify(events));
		}else{
			let events = JSON.parse(localStorage.getItem('events'));
			events.push(newEvent);
            localStorage.setItem('events', JSON.stringify(events));

        }
		history.push('/');
	};

	useEffect(
		() => {
			setSalePrice(price * (1 - discount / 100));
		},[ price, discount ]);

	return (
		<div className="container">
			<Form>
				<Form.Group controlId="exampleForm.ControlInput1">
					<Form.Label>Event Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Event Name"
						value={eventName}
						onChange={(e) => setEventName(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="exampleForm.ControlTextarea1">
					<Form.Label>Event Description</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						value={eventDiscription}
						onChange={(e) => setEventDiscription(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="exampleForm.ControlInput1">
					<Form.Label>Venue</Form.Label>
					<Form.Control
						type="text"
						placeholder="Venue"
						value={venue}
						onChange={(e) => setVenue(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="exampleForm.ControlInput1">
					<Form.Label>Price</Form.Label>
					<Form.Control
						type="number"
						placeholder="Price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="exampleForm.ControlInput1">
					<Form.Label>Discount(%)</Form.Label>
					<Form.Control
						type="number"
						placeholder="Discount"
						value={discount}
						onChange={(e) => setDiscount(e.target.value)}
					/>
				</Form.Group>

				<Form.Group as={Row} controlId="formPlaintextEmail">
					<Form.Label column sm="2">
						Sale Price
					</Form.Label>
					<Col sm="2">
						<Form.Control plaintext readOnly value={salePrice} />
					</Col>
				</Form.Group>
			</Form>
			<Button onClick={handleSaveEvent}>Save</Button>
		</div>
	);
}

export default CreateEvent;
