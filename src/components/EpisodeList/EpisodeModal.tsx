import './EpisodeModal.css';

const EpisodeModal = (probs: {
  sum: string | undefined;
  closeModal: Function;
  episodeName: string | undefined;
}) => {
  return (
    <div className="modalBackground" onClick={() => probs.closeModal(false)}>
      <div className="modalContainer">
        <div className="modal__head">
          <div className="modal__head__tittle">{probs.episodeName}</div>
          <div
            className="modal__head__exit"
            onClick={() => probs.closeModal(false)}
          >
            X
          </div>
        </div>
        <div className="modal__body">{probs.sum}</div>
      </div>
    </div>
  );
};

export default EpisodeModal;