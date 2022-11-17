import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateChannel, deleteChannel, getAllChannel } from '../../store/channel';
import {
	getServerDetails,
	getAllCurrentUserServers,
} from '../../store/servers';
import '../../context/Modal.css';

// NOTE How do you i pass in channelId
const UpdateChannelModal = ({ serverId, setShowModal, channelId }) => {
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
  const [showConfirmButton, setShowConfirmButton] = useState(false)

  const confirmDelete = (confirm)=>{
    setShowConfirmButton(confirm)

  }
	useEffect(() => {
		//console.log('use effect ')
		if (name.length) {
			setChangeColor('light-create-channel-btn');
		} else {
			setChangeColor('dark-create-channel-btn');
		}
    if(confirmDelete){

    }
		const errors = [];
		if (name.length > 10)
			errors.push('Please provide a channel name less than 32 characters.');
		setFrontEndErrors(errors);
	}, [name]);

	const submitUpdatedChannel = (e) => {
		e.preventDefault();
		setErrors([]);
		if (name.length > 10)
			errors.push('Please provide a channel name less than 32 characters.');
		setErrors(errors);

		const updateChannelForm = {
			name,
			is_voice,
			description,
		};

		if (!frontEndErrors.length) {
			dispatch(updateChannel(channelId, updateChannelForm));
      dispatch(getServerDetails(serverId))
			setShowModal(false);
		}
	};

  const handleDeleteChannel = (e) =>{
    e.preventDefault();

    dispatch(deleteChannel(channelId))
    dispatch(getServerDetails(serverId))
    setShowModal(false);

  }

  // const handleUpdateChannel = (e) =>{
  //   e.preventDefault()

  // }
	return (
		<div className="modal">
			<form className="new-channel-modal-form" onSubmit={submitUpdatedChannel}>
				<div className="modal-title">Update Channel</div>
				<div className="modal-input-form">
					<label className="modal-input-label">CHANNEL NAME</label>
					<div className='new-channel-hash-container'>
					<div className='hashtag'>#</div>
					<input
						className="modal-input-textbox"
						type="text"
						placeholder="new-channel"
						value={name}
						onChange={(e) => setName(e.target.value)}

					/>
					</div>
					{/* <div> */}
						<label id="modal-DESCRIPTION-label">DESCRIPTION</label>
						<input
							className="modal-input-textbox"
							type="text"
							placeholder="channel-description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					{/* </div> */}
				</div>
				<div id='grey-footer'>

				<div className="create-channel-submit-btn-container">
					<button className={changeColor} type="submit">
						Update Channel
					</button>
          <button className={showConfirmButton ? 'visible':'hide'} onClick={() => confirmDelete(true)}>Delete Channel</button>
          <button className={showConfirmButton ? 'hide':'visible'} onClick={() => confirmDelete(false)}>Cancel Delete</button>
          <button className={showConfirmButton ? 'hide':'visible'} onClick={handleDeleteChannel}>Confirm Delete</button>

				</div>
				</div>
			</form>
		</div>
	);
};
export default UpdateChannelModal;