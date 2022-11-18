import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChannel, getAllChannel } from '../../store/channel';
import {
	getServerDetails,
	getAllCurrentUserServers,
} from '../../store/servers';
import '../../context/Modal.css';
const ChannelModal = ({ serverId, setShowModal }) => {
	serverId = +serverId;
	const serverName = useSelector((state) => state.servers.oneServer);
	// //console.log('servername >>>>', serverName);
	const dispatch = useDispatch();
	const [name, setName] = useState('');
	const [is_voice, setIs_voice] = useState(true);
	const [description, setDescription] = useState('');
	const [errors, setErrors] = useState([]);
	const [frontEndErrors, setFrontEndErrors] = useState([]);
	const [changeColor, setChangeColor] = useState('dark-create-channel-btn');
	useEffect(() => {
		//console.log('use effect ')
		if (name.length) {
			setChangeColor('light-create-channel-btn');
		} else {
			setChangeColor('dark-create-channel-btn');
		}

		console.log('this is change color', changeColor);
		const errors = [];
		if (name.length > 15){
			errors.push('Please provide a channel name less than 32 characters.');
		setFrontEndErrors(errors);
	}, [name]);

	const submitNewChannel = (e) => {
		e.preventDefault();
		setErrors([]);
		if (name.length > 15){
			errors.push('Please provide a channel name less than 32 characters.');
		setErrors(errors);

		const newChannel = {
			name,
			is_voice,
			description,
		};

		if (!frontEndErrors.length) {
			dispatch(createChannel(serverId, newChannel));

			setShowModal(false);
		}
	};

	return (
		<div className="modal">
			<form className="new-channel-modal-form" onSubmit={submitNewChannel}>
				<div className="modal-title">Create New Channel</div>
				<div className="modal-input-form">
					<label className="modal-input-label">CHANNEL NAME</label>
					<div className="new-channel-hash-container">
						<div className="hashtag">#</div>
						<input
							className="modal-input-textbox"
							type="text"
							placeholder="new-channel"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
						</div>
					<label id="modal-DESCRIPTION-label">DESCRIPTION</label>
					<input
						className="modal-input-textbox"
						type="text"
						placeholder="channel-description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div id="grey-footer">
					<div className="create-channel-submit-btn-container">
						<button className={changeColor} type="submit">
							Create Channel
						</button>
					</div>
					</div>
			</form>
		</div>
	);
};
export default ChannelModal;
